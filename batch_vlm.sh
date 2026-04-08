#!/bin/bash
# Batch VLM analysis for gallery images
OUT="/home/z/my-project/gallery_narratives.json"
echo '[' > "$OUT"

FIRST=true
for i in $(seq 1 44); do
  IMG="/home/z/my-project/public/images/gallery/zip-${i}.jpeg"
  if [ ! -f "$IMG" ]; then
    echo "SKIP: $IMG not found"
    continue
  fi

  if [ "$FIRST" = true ]; then FIRST=false; else echo ',' >> "$OUT"; fi

  z-ai vision \
    -p "You are writing for a corporate training gallery (Springbok Training, Zambia). In 2 sentences describe this photo: what event, who is involved, atmosphere. Warm professional tone. Also give: a short title (max 6 words) and one category from: workshops, graduations, team-building, facilities, networking. Reply ONLY with this JSON: {\"title\": \"...\", \"category\": \"...\", \"narrative\": \"...\"}" \
    -i "$IMG" \
    -o "/home/z/my-project/upload/vlm_zip_${i}.json" 2>/dev/null

  CONTENT=$(cat "/home/z/my-project/upload/vlm_zip_${i}.json" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['choices'][0]['message']['content'])" 2>/dev/null)

  PARSED=$(echo "$CONTENT" | python3 -c "
import json, sys, re
text = sys.stdin.read()
match = re.search(r'\{[^{}]*\"title\"[^{}]*\}', text)
if match:
    d = json.loads(match.group())
    cat = d.get('category','workshops').strip().lower()
    if cat not in ['workshops','graduations','team-building','facilities','networking']: cat='workshops'
    print(json.dumps({'src': '/images/gallery/zip-${i}.jpeg', 'alt': d.get('title',''), 'title': d.get('title',''), 'category': cat, 'description': d.get('narrative','')}))
else:
    try:
        d = json.loads(text)
        cat = d.get('category','workshops').strip().lower()
        if cat not in ['workshops','graduations','team-building','facilities','networking']: cat='workshops'
        print(json.dumps({'src': '/images/gallery/zip-${i}.jpeg', 'alt': d.get('title',''), 'title': d.get('title',''), 'category': cat, 'description': d.get('narrative','')}))
    except:
        print(json.dumps({'src': '/images/gallery/zip-${i}.jpeg', 'alt': 'Springbok event', 'title': 'Training Event', 'category': 'workshops', 'description': text[:300]}))
" 2>/dev/null)

  TITLE=$(echo "$PARSED" | python3 -c "import json,sys; print(json.load(sys.stdin)['title'][:50])" 2>/dev/null)
  echo "  [$i/44] $TITLE"

  echo "$PARSED" >> "$OUT"
  sleep 2
done

echo ']' >> "$OUT"
echo "DONE. All narratives saved."
