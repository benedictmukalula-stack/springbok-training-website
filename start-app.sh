#!/bin/bash
cd /home/z/my-project
nohup node /home/z/my-project/static-server.js > /home/z/my-project/static-server.log 2>&1 &
echo $! > /home/z/my-project/server.pid
echo "Started server PID: $(cat /home/z/my-project/server.pid)"
