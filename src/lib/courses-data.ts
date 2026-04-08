export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseAddon {
  id: string;
  name: string;
  pricePerDelegate: number;
}

export interface Course {
  slug: string;
  title: string;
  categoryId: string;
  categoryTitle: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  deliveryModes: ("Public" | "In-House" | "Online")[];
  basePricePerDay: number;
  targetAudience: string[];
  learningOutcomes: string[];
  modules: CourseModule[];
  accreditation: string;
  addOns: CourseAddon[];
  level: "Foundation" | "Intermediate" | "Advanced" | "Custom";
}

export interface CategoryInfo {
  id: string;
  title: string;
  icon: string;
}

const STANDARD_ADDONS: CourseAddon[] = [
  { id: "certificate", name: "Certificate of Completion", pricePerDelegate: 500 },
  { id: "materials", name: "Training Materials Pack", pricePerDelegate: 300 },
  { id: "support", name: "Post-Training Support (30 Days)", pricePerDelegate: 200 },
  { id: "lunch", name: "Lunch & Refreshments", pricePerDelegate: 150 },
];

export const ALL_COURSES: Course[] = [
  // ═══════════════════════════════════════════════
  // LEADERSHIP & MANAGEMENT
  // ═══════════════════════════════════════════════
  {
    slug: "leadership-and-team-building",
    title: "Leadership and Team Building",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Designed to improve leadership skills and allow delegates to lead successful and high performing teams. Our team building workshops are packed full of useful teamwork training exercises, tips and techniques that new and experienced managers will find essential.",
    fullDescription: "This comprehensive programme is designed to equip managers and aspiring leaders with the essential skills needed to build, motivate, and lead high-performing teams. Drawing on over 17 years of corporate training experience across Africa, this course combines proven leadership frameworks with practical team-building exercises that deliver immediate results in the workplace.\n\nParticipants will explore different leadership styles, understand team dynamics, and learn how to create an environment where collaboration and innovation thrive. Through interactive role-plays, case studies, and group exercises, delegates will develop the confidence and competence to lead their teams through change, conflict, and complex challenges.\n\nThe programme addresses the critical link between effective leadership and organisational performance, ensuring that delegates leave with a practical toolkit they can apply immediately to strengthen team cohesion, improve communication, and drive measurable business outcomes.",
    duration: "3 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Team Leaders", "Managers", "Senior Managers", "Department Heads", "Aspiring Leaders"],
    learningOutcomes: [
      "Understand and apply key leadership styles to different team situations",
      "Build trust and psychological safety within teams",
      "Develop strategies for motivating diverse team members",
      "Improve communication and conflict resolution skills",
      "Create high-performing teams with clear goals and accountability",
      "Lead teams effectively through change and uncertainty"
    ],
    modules: [
      { title: "Foundations of Leadership", topics: ["Leadership vs Management", "Key Leadership Theories", "Assessing Your Leadership Style", "Emotional Intelligence for Leaders"] },
      { title: "Building Effective Teams", topics: ["Team Development Stages", "Team Roles & Dynamics", "Creating Psychological Safety", "Building a Shared Vision"] },
      { title: "Motivation & Engagement", topics: ["Understanding Motivation Theories", "Intrinsic vs Extrinsic Motivation", "Recognition & Reward Strategies", "Engaging Remote & Hybrid Teams"] },
      { title: "Communication & Conflict", topics: ["Effective Team Communication", "Active Listening Techniques", "Managing Team Conflict", "Giving & Receiving Feedback"] },
      { title: "Leading Through Change", topics: ["Change Management Fundamentals", "Resistance to Change", "Leading Without Authority", "Action Planning & Commitment"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "coaching-for-managers",
    title: "Coaching for Managers",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Shows delegates tried and tested methods about 1-2-1 training, executive coaching and how to develop people in order to improve productivity and motivation. We explain through discussion, role-play and case study how to coach staff.",
    fullDescription: "This programme equips managers with the coaching skills necessary to unlock their team members' potential and drive sustainable performance improvement. Participants will learn structured coaching methodologies, powerful questioning techniques, and practical frameworks that can be applied immediately in the workplace.\n\nThrough extensive role-play exercises, real-world case studies, and peer coaching practice, delegates will develop the confidence to conduct effective 1-2-1 coaching sessions. The course covers the GROW model, active listening at an advanced level, and how to adapt coaching style to different individuals and situations.\n\nManagers will leave with a comprehensive coaching toolkit that enables them to develop their people, improve productivity, increase engagement, and create a culture of continuous learning within their organisations.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Line Managers", "Senior Managers", "HR Professionals", "Team Leaders", "Department Heads"],
    learningOutcomes: [
      "Apply the GROW coaching model in 1-2-1 sessions",
      "Use powerful questioning techniques to facilitate insight",
      "Adapt coaching style to individual needs and situations",
      "Provide constructive feedback that drives performance",
      "Build a coaching culture within your team or organisation",
      "Measure and evaluate coaching effectiveness"
    ],
    modules: [
      { title: "Coaching Fundamentals", topics: ["What is Coaching?", "Coaching vs Mentoring vs Managing", "The GROW Model", "Building a Coaching Mindset"] },
      { title: "Core Coaching Skills", topics: ["Advanced Active Listening", "Powerful Questioning Techniques", "Observation & Intuition", "Silence & Reflection"] },
      { title: "The Coaching Conversation", topics: ["Structuring a Coaching Session", "Goal Setting with Coachees", "Overcoming Resistance", "Practice Coaching Triads"] },
      { title: "Sustaining Coaching Impact", topics: ["Creating a Coaching Culture", "Measuring Coaching ROI", "Developing Your Coaching Style", "Action Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Advanced"
  },
  {
    slug: "delegation-skills",
    title: "Delegation Skills",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Enables delegates to understand the techniques and strategies that will allow them to use delegation as a tool to achieve greater personal productivity, hit organizational deadlines, increase motivation and decrease stress levels.",
    fullDescription: "Effective delegation is one of the most critical skills for any manager, yet many struggle to delegate appropriately. This course provides a structured approach to delegation that ensures tasks are assigned to the right people, with the right level of support and accountability.\n\nParticipants will learn how to overcome common barriers to delegation, including the 'I can do it better myself' mentality, fear of losing control, and concerns about team capability. Through practical exercises and real-world scenarios, delegates will develop the confidence to delegate effectively while maintaining quality standards.\n\nThe programme also covers how delegation contributes to team development, succession planning, and organisational resilience. Delegates will leave with a personal action plan for improving their delegation practices and empowering their teams.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Managers", "Team Leaders", "Supervisors", "Project Managers", "Small Business Owners"],
    learningOutcomes: [
      "Understand the benefits and barriers of effective delegation",
      "Identify which tasks to delegate and which to retain",
      "Apply a structured delegation process",
      "Set clear expectations and provide appropriate support",
      "Use delegation as a tool for team development",
      "Monitor delegated tasks without micromanaging"
    ],
    modules: [
      { title: "Understanding Delegation", topics: ["What is Effective Delegation?", "Benefits & Barriers", "Common Delegation Mistakes", "The Delegation Mindset"] },
      { title: "The Delegation Process", topics: ["Choosing What to Delegate", "Selecting the Right Person", "Setting Clear Expectations", "Agreeing Authority & Resources"] },
      { title: "Support & Accountability", topics: ["Monitoring Progress", "Providing Feedback", "Handling Mistakes", "Recognising Achievement"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "stress-management",
    title: "Stress Management",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Over the years we have trained thousands of people to enable them to recognize stress symptoms and causes. Our training has a proven track record in stress reduction and managing stress at work with practical tips and techniques.",
    fullDescription: "Workplace stress is a leading cause of reduced productivity, absenteeism, and staff turnover. This course provides participants with the knowledge and practical tools to identify, understand, and manage stress effectively, both personally and within their teams.\n\nDrawing on evidence-based approaches from cognitive behavioural therapy, mindfulness, and positive psychology, this programme equips delegates with a comprehensive stress management toolkit. Participants will learn to recognise their own stress triggers, develop healthier coping mechanisms, and build personal resilience.\n\nThe course also addresses organisational approaches to stress management, helping managers create healthier work environments that support employee wellbeing while maintaining high performance standards.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Managers", "HR Staff", "Team Leaders", "Customer-Facing Staff"],
    learningOutcomes: [
      "Recognise the physical and psychological signs of stress",
      "Identify personal and workplace stress triggers",
      "Apply evidence-based stress management techniques",
      "Build personal resilience and coping strategies",
      "Create a healthier work-life balance",
      "Support colleagues and team members experiencing stress"
    ],
    modules: [
      { title: "Understanding Stress", topics: ["What is Stress?", "The Stress Response", "Signs & Symptoms", "Personal Stress Assessment"] },
      { title: "Managing Personal Stress", topics: ["Cognitive Restructuring", "Mindfulness Techniques", "Breathing & Relaxation", "Time Management Strategies"] },
      { title: "Building Resilience", topics: ["The Resilience Framework", "Positive Psychology Techniques", "Healthy Habits", "Work-Life Balance"] },
      { title: "Workplace Stress", topics: ["Organisational Stress Factors", "Creating a Supportive Culture", "Manager's Role in Stress Prevention", "Action Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "managing-meetings",
    title: "Managing Meetings",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Enables people to organize and chair meetings that are more effective and more motivating for those that attend. Learn to involve and focus the group, use the power of persuasion and reach agreement constructively.",
    fullDescription: "Poorly managed meetings are one of the biggest time-wasters in organisations today. This course provides practical techniques for planning, chairing, and participating in meetings that are focused, productive, and engaging for all attendees.\n\nParticipants will learn how to set clear agendas, manage group dynamics, handle difficult participants, and ensure that meetings lead to concrete decisions and actions. The course covers both in-person and virtual meeting facilitation, addressing the unique challenges of each format.\n\nThrough practical exercises including mock meetings, delegates will develop the skills to transform meetings from time-drains into valuable collaborative sessions that drive progress and build team alignment.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Managers", "Team Leaders", "Project Managers", "Executive Assistants"],
    learningOutcomes: [
      "Plan and structure meetings for maximum effectiveness",
      "Use facilitation techniques to encourage participation",
      "Manage time effectively during meetings",
      "Handle difficult participants and challenging dynamics",
      "Ensure meetings produce clear decisions and action items",
      "Run engaging virtual and hybrid meetings"
    ],
    modules: [
      { title: "Meeting Fundamentals", topics: ["Why Meetings Fail", "Types of Meetings", "Planning & Agenda Setting", "Role Clarity"] },
      { title: "Chairing Skills", topics: ["Opening & Closing Effectively", "Managing Time", "Encouraging Participation", "Handling Dominant Participants"] },
      { title: "Decision Making & Actions", topics: ["Decision-Making Methods", "Reaching Consensus", "Capturing Actions & Minutes", "Follow-Up Techniques"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "appraisal-skills",
    title: "Appraisal Skills",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Teaches delegates how to raise the motivation of employees and improve performance through setting objectives, giving effective feedback and praise. Includes tips for managing conflict in appraisals and writing effective performance reviews.",
    fullDescription: "Performance appraisals are a powerful tool for driving employee engagement and organisational success when conducted effectively. This programme provides managers with the skills and confidence to deliver meaningful appraisals that motivate employees, address performance gaps, and align individual goals with organisational objectives.\n\nParticipants will learn structured approaches to setting SMART objectives, delivering constructive feedback, and conducting difficult performance conversations. The course includes extensive practice sessions where delegates can refine their skills in a safe environment with peer and facilitator feedback.\n\nThe programme also covers the documentation aspects of appraisals, including how to write effective performance reviews that serve as both developmental tools and legal records. Delegates will leave equipped to transform their organisation's appraisal process into a positive, forward-looking experience.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Line Managers", "HR Managers", "Department Heads", "Team Leaders", "Senior Executives"],
    learningOutcomes: [
      "Conduct structured and effective performance appraisals",
      "Set clear, measurable SMART objectives",
      "Deliver constructive and motivational feedback",
      "Handle difficult conversations and conflict during appraisals",
      "Write effective performance review documentation",
      "Link individual performance to organisational goals"
    ],
    modules: [
      { title: "The Appraisal Framework", topics: ["Purpose & Benefits of Appraisals", "The Appraisal Cycle", "Preparation & Planning", "Creating the Right Environment"] },
      { title: "Setting Objectives", topics: ["SMART Goal Framework", "Aligning Individual & Team Goals", "Competency-Based Objectives", "Development Planning"] },
      { title: "Feedback Skills", topics: ["The SBI Feedback Model", "Positive Reinforcement", "Constructive Criticism", "Managing Emotional Reactions"] },
      { title: "Documentation & Follow-Up", topics: ["Writing Effective Reviews", "Performance Improvement Plans", "Legal Considerations", "Ongoing Performance Management"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "project-management-for-non-project-managers",
    title: "Project Management for Non-Project Managers",
    categoryId: "leadership",
    categoryTitle: "Leadership & Management",
    shortDescription: "Presents delegates with useful strategies for organizing projects, improving project management skills, managing projects effectively, project planning and becoming a great project manager.",
    fullDescription: "In today's fast-paced business environment, project management skills are essential for professionals across all functions, not just dedicated project managers. This course provides practical, easy-to-apply project management techniques that can be used immediately to improve the planning and execution of workplace projects.\n\nParticipants will learn a structured approach to project management that covers the complete project lifecycle from initiation through to closure. The course emphasises practical tools and templates that can be adapted to projects of any size, from small improvements to large organisational change initiatives.\n\nThrough hands-on exercises, delegates will practice creating project charters, building work breakdown structures, developing schedules, managing risks, and communicating progress to stakeholders. The programme is specifically designed for professionals who manage projects as part of their role without formal project management training.",
    duration: "3 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Managers", "Team Leaders", "Operations Staff", "IT Professionals", "HR Professionals"],
    learningOutcomes: [
      "Apply a structured project management methodology",
      "Create clear project charters and scope statements",
      "Develop work breakdown structures and project schedules",
      "Identify and manage project risks effectively",
      "Communicate project progress to stakeholders",
      "Close projects and capture lessons learned"
    ],
    modules: [
      { title: "Project Fundamentals", topics: ["What is a Project?", "The Project Lifecycle", "Stakeholder Analysis", "Creating a Project Charter"] },
      { title: "Planning & Scheduling", topics: ["Scope Definition", "Work Breakdown Structures", "Gantt Charts & Timelines", "Resource Planning"] },
      { title: "Risk & Quality Management", topics: ["Risk Identification & Assessment", "Risk Mitigation Strategies", "Quality Planning", "Setting Success Criteria"] },
      { title: "Execution & Control", topics: ["Monitoring Progress", "Managing Change Requests", "Issue Resolution", "Stakeholder Communication"] },
      { title: "Project Closure", topics: ["Project Handover", "Lessons Learned", "Post-Project Review", "Celebrating Success"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },

  // ═══════════════════════════════════════════════
  // SALES & CUSTOMER SERVICE
  // ═══════════════════════════════════════════════
  {
    slug: "customer-service-and-customer-care",
    title: "Customer Service and Customer Care",
    categoryId: "sales",
    categoryTitle: "Sales & Customer Service",
    shortDescription: "Essential for developing a Customer Caring or 'Customers First' attitude to delivering service effectively and consistently. Learn tips and techniques on how to handle different customers in face-to-face and telephone interactions.",
    fullDescription: "Outstanding customer service is the cornerstone of business success and competitive advantage. This comprehensive programme develops the skills, attitudes, and behaviours needed to deliver exceptional service experiences that build customer loyalty and drive business growth.\n\nParticipants will explore the complete customer journey, from first contact through to post-service follow-up. The course covers both face-to-face and telephone-based service delivery, ensuring delegates can handle a wide range of customer interactions with confidence and professionalism.\n\nThrough interactive exercises, role-plays, and real-world case studies, delegates will learn how to handle difficult customers, manage complaints effectively, and turn negative experiences into positive outcomes. The programme instils a genuine 'Customers First' mindset that transforms service delivery.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Customer Service Staff", "Front Desk Officers", "Sales Teams", "Call Centre Agents", "All Client-Facing Staff"],
    learningOutcomes: [
      "Deliver consistent, high-quality customer service",
      "Communicate effectively with different customer types",
      "Handle complaints and difficult situations professionally",
      "Build rapport and long-term customer relationships",
      "Exceed customer expectations consistently",
      "Apply service recovery techniques to resolve issues"
    ],
    modules: [
      { title: "Service Excellence Foundations", topics: ["What is Customer Care?", "The Customer Journey", "First Impressions", "Building a Service Mindset"] },
      { title: "Communication Skills", topics: ["Verbal & Non-Verbal Communication", "Active Listening", "Telephone Etiquette", "Written Communication"] },
      { title: "Handling Difficult Situations", topics: ["De-escalation Techniques", "Managing Complaints", "Saying No Positively", "Service Recovery Strategies"] },
      { title: "Building Relationships", topics: ["Customer Rapport", "Personalisation", "Follow-Up & Aftercare", "Measuring Customer Satisfaction"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "introduction-to-selling",
    title: "Introduction to Selling",
    categoryId: "sales",
    categoryTitle: "Sales & Customer Service",
    shortDescription: "A highly structured, interactive foundation training that focuses on bringing out the best of delegates in a supportive environment. Our trainers use their 20 years of selling and training experience to increase confidence and competence.",
    fullDescription: "This foundational sales programme provides a comprehensive introduction to professional selling techniques. Designed for those new to sales or wanting to refresh their skills, the course covers the complete sales cycle from prospecting through to closing and follow-up.\n\nWith over 20 years of selling and training experience, our facilitators create a supportive environment where delegates can practice new skills, build confidence, and develop their personal selling style. The programme combines proven sales methodologies with practical exercises that mirror real-world selling situations.\n\nParticipants will learn how to identify customer needs, present solutions persuasively, handle objections, and close deals effectively. The course also covers the importance of relationship selling and building long-term customer partnerships that generate repeat business.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["New Sales Staff", "Business Development Officers", "Account Executives", "Entrepreneurs", "Customer Service Staff moving to Sales"],
    learningOutcomes: [
      "Understand the psychology of buying and selling",
      "Plan and prepare for effective sales conversations",
      "Ask effective questions to identify customer needs",
      "Present solutions that address customer pain points",
      "Handle common objections with confidence",
      "Close sales and build ongoing customer relationships"
    ],
    modules: [
      { title: "Sales Fundamentals", topics: ["The Sales Process", "The Psychology of Buying", "Building Your Sales Confidence", "Professional Selling vs Order-Taking"] },
      { title: "Prospecting & Preparation", topics: ["Identifying Prospects", "Research & Planning", "Setting Sales Objectives", "Making Initial Contact"] },
      { title: "The Sales Conversation", topics: ["Questioning Techniques", "Active Listening", "Presenting Solutions", "Features vs Benefits"] },
      { title: "Closing & Follow-Up", topics: ["Recognising Buying Signals", "Closing Techniques", "Overcoming Objections", "Post-Sale Relationship Building"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "telesales-and-telemarketing",
    title: "Telesales and Telemarketing",
    categoryId: "sales",
    categoryTitle: "Sales & Customer Service",
    shortDescription: "Developed for telemarketers who make a significant number of prospecting calls and telesales professionals who handle large volumes of incoming sales calls. Written with both the customer and organization in mind.",
    fullDescription: "Telephone-based selling is a critical channel for many businesses, requiring a unique set of skills that combine sales technique with vocal communication excellence. This course is specifically designed for professionals who conduct sales and prospecting activities primarily by telephone.\n\nThe programme covers both outbound telemarketing (prospecting and cold calling) and inbound telesales (handling incoming enquiries and converting them to sales). Delegates will learn how to create a professional telephone presence, build rapport quickly, and guide conversations toward successful outcomes.\n\nThrough extensive practical exercises including recorded role-plays, participants will refine their telephone technique, objection handling, and closing skills. The course also addresses call planning, time management for high-volume calling, and maintaining motivation and resilience.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Telesales Agents", "Telemarketers", "Inside Sales Staff", "Call Centre Staff", "Business Development Representatives"],
    learningOutcomes: [
      "Plan and structure effective telesales calls",
      "Create a professional and engaging telephone presence",
      "Overcome gatekeepers and reach decision-makers",
      "Handle objections specific to telephone selling",
      "Close sales and confirm orders by phone",
      "Manage call volume and maintain personal motivation"
    ],
    modules: [
      { title: "Telephone Excellence", topics: ["Vocal Techniques", "Creating Rapport by Phone", "Professional Opening Scripts", "The Power of Your Voice"] },
      { title: "Outbound Calling", topics: ["Prospecting Strategies", "Overcoming Gatekeepers", "Cold Call Techniques", "Managing Rejection"] },
      { title: "Inbound Sales", topics: ["Handling Incoming Enquiries", "Needs Analysis by Phone", "Presenting Solutions", "Closing & Confirming"] },
      { title: "Performance Management", topics: ["Call Metrics & KPIs", "Time Management", "Motivation & Resilience", "Continuous Improvement"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "telephone-skills-and-customer-care",
    title: "Telephone Skills and Customer Care",
    categoryId: "sales",
    categoryTitle: "Sales & Customer Service",
    shortDescription: "For those wishing to learn telephone etiquette and handling customers on the telephone. Develop effective Customer Care training that enables you to deliver service consistently.",
    fullDescription: "The telephone remains one of the most important customer touchpoints for many organisations. This course focuses specifically on developing exceptional telephone communication skills and customer care techniques that ensure every call delivers a positive impression.\n\nParticipants will learn professional telephone etiquette, including how to answer calls, transfer calls, place callers on hold, and end conversations courteously. The course covers techniques for managing challenging calls, dealing with angry customers, and ensuring caller satisfaction.\n\nThrough practical exercises and real-world scenarios, delegates will develop the confidence and skill to handle any telephone interaction professionally. The programme also covers how to project warmth and professionalism through voice alone, building rapport without the benefit of face-to-face communication.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Receptionists", "Call Centre Staff", "Customer Service Agents", "Admin Staff", "All Phone-Based Roles"],
    learningOutcomes: [
      "Apply professional telephone etiquette in all situations",
      "Communicate warmth and professionalism through voice",
      "Handle calls efficiently and courteously",
      "Manage difficult callers and resolve complaints by phone",
      "Transfer calls and take messages accurately",
      "Project a positive organisational image on every call"
    ],
    modules: [
      { title: "Telephone Etiquette", topics: ["Professional Greetings", "Voice & Tone Management", "Holding & Transferring Calls", "Taking Accurate Messages"] },
      { title: "Customer Interaction", topics: ["Active Listening by Phone", "Questioning Techniques", "Managing Expectations", "Ending Calls Positively"] },
      { title: "Challenging Situations", topics: ["Handling Angry Callers", "De-escalation by Phone", "Saying No Politely", "Escalation Procedures"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "account-management",
    title: "Account Management",
    categoryId: "sales",
    categoryTitle: "Sales & Customer Service",
    shortDescription: "Covers fostering client relationships, working with sales and marketing teams to prepare presentations and sales pitches, designing marketing strategies, handling client communications and writing client reports.",
    fullDescription: "Effective account management is the key to retaining and growing your most valuable customer relationships. This advanced programme provides the strategic and tactical skills needed to manage complex client accounts, identify growth opportunities, and build lasting partnerships.\n\nParticipants will learn how to develop account plans that align with both client objectives and organisational goals. The course covers relationship mapping, stakeholder management, and how to navigate the complex decision-making structures within client organisations.\n\nThrough case studies, practical exercises, and group discussions, delegates will develop the skills to prepare compelling client presentations, design effective account strategies, and manage client communications professionally. The programme emphasises the commercial acumen needed to grow accounts while maintaining strong, trust-based relationships.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Account Managers", "Key Account Managers", "Business Development Managers", "Client Relationship Managers", "Sales Managers"],
    learningOutcomes: [
      "Develop strategic account plans for key clients",
      "Map and manage complex stakeholder relationships",
      "Identify and capitalise on growth opportunities",
      "Prepare and deliver compelling client presentations",
      "Manage client communications and expectations professionally",
      "Build trust-based partnerships that drive long-term revenue"
    ],
    modules: [
      { title: "Account Strategy", topics: ["Account Planning Framework", "Client Needs Analysis", "Relationship Mapping", "Setting Account Objectives"] },
      { title: "Stakeholder Management", topics: ["Identifying Decision Makers", "Building Multi-Level Relationships", "Managing Internal Politics", "Expanding Your Contact Network"] },
      { title: "Growth & Communication", topics: ["Upselling & Cross-Selling", "Client Presentations & Pitches", "Reporting & Reviews", "Managing Difficult Conversations"] },
      { title: "Commercial Excellence", topics: ["Revenue Forecasting", "Contract Negotiation", "Client Retention Strategies", "Measuring Account Success"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Advanced"
  },

  // ═══════════════════════════════════════════════
  // PERSONAL DEVELOPMENT
  // ═══════════════════════════════════════════════
  {
    slug: "assertiveness-skills",
    title: "Assertiveness Skills",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Allows delegates to develop confidence and self-esteem so that their opinions will no longer go unnoticed in the workplace. Provides effective tactics to build courage and defy work bullies.",
    fullDescription: "Assertiveness is a critical skill that enables professionals to communicate their needs, opinions, and boundaries clearly and respectfully, without being aggressive or passive. This programme helps delegates develop the confidence and skills to express themselves effectively in any workplace situation.\n\nParticipants will explore the differences between aggressive, passive, and assertive communication styles, understanding when each is appropriate and how to choose the right approach. The course provides practical techniques for saying no, handling criticism, making requests, and managing conflict assertively.\n\nThrough role-plays, group exercises, and self-assessment tools, delegates will build the self-awareness and confidence to communicate assertively in challenging workplace situations, including interactions with difficult colleagues, demanding managers, and workplace bullies.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Team Members", "New Managers", "Customer-Facing Staff", "Admin Professionals"],
    learningOutcomes: [
      "Distinguish between aggressive, passive, and assertive behaviour",
      "Communicate needs and opinions clearly and respectfully",
      "Say no without feeling guilty or damaging relationships",
      "Handle criticism and feedback constructively",
      "Deal with difficult people and workplace bullying",
      "Build lasting self-confidence and professional presence"
    ],
    modules: [
      { title: "Understanding Assertiveness", topics: ["Communication Styles", "The Assertiveness Spectrum", "Self-Assessment", "Benefits of Assertiveness"] },
      { title: "Assertive Techniques", topics: ["Saying No Effectively", "Making Requests", "Expressing Opinions", "Handling Criticism"] },
      { title: "Practical Application", topics: ["Managing Difficult Conversations", "Dealing with Bullies", "Email Assertiveness", "Building Confidence"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "dealing-with-difficult-people",
    title: "Dealing with Difficult People",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Effectively demonstrates how to neutralize problem situations in the workplace. Covers scenarios such as working with aggressive people, handling bullies at work, and dealing with unreasonable people.",
    fullDescription: "Every workplace has its share of challenging personalities and difficult situations. This course equips participants with the understanding, strategies, and practical techniques needed to manage difficult people effectively while maintaining their own professionalism and emotional wellbeing.\n\nParticipants will explore the psychology behind difficult behaviour, understanding why people act the way they do and how to respond constructively rather than reactively. The course covers a wide range of difficult personality types, from the aggressive and demanding to the passive-aggressive and uncooperative.\n\nThrough extensive role-play exercises and case studies based on real workplace scenarios, delegates will develop practical skills for de-escalating conflicts, setting boundaries, and maintaining productive working relationships with even the most challenging colleagues and clients.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Managers", "HR Staff", "Customer Service Staff", "Team Leaders"],
    learningOutcomes: [
      "Understand the psychology behind difficult behaviour",
      "Identify different types of difficult personalities",
      "Apply de-escalation techniques in tense situations",
      "Set and maintain professional boundaries",
      "Manage personal emotions when dealing with difficult people",
      "Maintain productive working relationships despite challenges"
    ],
    modules: [
      { title: "Understanding Difficult Behaviour", topics: ["Why People Are Difficult", "Common Personality Types", "The Impact on Teams", "Self-Reflection"] },
      { title: "Response Strategies", topics: ["Staying Calm Under Pressure", "De-escalation Techniques", "Active Listening & Empathy", "Setting Boundaries"] },
      { title: "Practical Scenarios", topics: ["Aggressive Colleagues", "Passive-Aggressive Behaviour", "Unreasonable Demands", "Bullying & Harassment"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "time-management",
    title: "Time Management",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Created to ensure that delegates can make their time keeping as efficient and effective as possible. Supplies a time management training course full of tools and tips for improving time management and time planning.",
    fullDescription: "Time is the one resource that every professional has in equal measure, yet few manage it effectively. This practical programme provides delegates with a comprehensive toolkit of proven techniques and strategies for taking control of their time and dramatically improving their personal productivity.\n\nParticipants will learn how to prioritise tasks using established frameworks, eliminate time-wasting activities, and create systems that support effective time management. The course covers both traditional techniques and modern approaches, including how to manage digital distractions and leverage technology effectively.\n\nThrough practical exercises and personal action planning, delegates will develop a personalised time management system that works for their specific role and working style. The programme emphasises sustainable habits that can be maintained long after the training is complete.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Managers", "Admin Staff", "Project Teams", "Anyone feeling overwhelmed"],
    learningOutcomes: [
      "Prioritise tasks using the Eisenhower Matrix and other frameworks",
      "Identify and eliminate common time-wasting activities",
      "Plan and schedule work for maximum productivity",
      "Manage interruptions and maintain focus",
      "Set and achieve realistic deadlines",
      "Develop sustainable time management habits"
    ],
    modules: [
      { title: "Time Management Principles", topics: ["Where Does Your Time Go?", "The Cost of Poor Time Management", "Key Principles", "Personal Time Audit"] },
      { title: "Prioritisation & Planning", topics: ["Eisenhower Matrix", "ABC Method", "Daily & Weekly Planning", "Setting Realistic Deadlines"] },
      { title: "Productivity Techniques", topics: ["Managing Interruptions", "Batching & Time Blocking", "Delegation Strategies", "Managing Digital Distractions"] },
      { title: "Sustainable Habits", topics: ["Building Routines", "Energy Management", "Work-Life Balance", "Your Personal Action Plan"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "time-management-with-microsoft-outlook",
    title: "Time Management with Microsoft Outlook",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Learn to use Outlook as a tool to manage your tasks, calendar, meetings, delegations, contacts and emails, while also being introduced to the latest features.",
    fullDescription: "Microsoft Outlook is one of the most powerful productivity tools available, yet most professionals use only a fraction of its capabilities. This course shows delegates how to leverage the full power of Outlook to manage their time, tasks, communications, and schedule more effectively.\n\nParticipants will learn advanced techniques for email management, calendar optimisation, task tracking, and contact management. The course covers features such as categories, rules, quick steps, and search folders that can dramatically reduce the time spent on administrative tasks.\n\nThrough hands-on exercises with real-world scenarios, delegates will configure Outlook as a personal productivity hub. The programme includes the latest Outlook features and integration capabilities, ensuring participants can immediately apply their learning to transform their daily workflow.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Outlook Users", "Admin Staff", "Managers", "Executive Assistants", "Project Teams"],
    learningOutcomes: [
      "Configure Outlook for optimal productivity",
      "Manage emails efficiently using rules, categories, and quick steps",
      "Optimise your calendar for effective scheduling",
      "Use tasks and to-do lists to track commitments",
      "Leverage Outlook's latest features and integrations",
      "Create a personal productivity system within Outlook"
    ],
    modules: [
      { title: "Email Mastery", topics: ["Inbox Zero Strategies", "Rules & Automation", "Categories & Colour Coding", "Quick Steps", "Search Folders"] },
      { title: "Calendar & Scheduling", topics: ["Calendar Best Practices", "Scheduling Meetings", "Recurring Appointments", "Shared Calendars", "Time Blocking"] },
      { title: "Tasks & Productivity", topics: ["Task Management", "To-Do Lists", "Delegation Tracking", "Follow-Up Flags", "Integration Tips"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "advanced-presentation-skills",
    title: "Advanced Presentation Skills",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Gives you a platform to demonstrate your leadership qualities, communication skills, sales ability, influence and promotion potential. We teach proven skills that will enable you to perform at an advanced level.",
    fullDescription: "This advanced programme is designed for experienced presenters who want to elevate their skills to an expert level. It goes beyond basic presentation techniques to address the strategic, psychological, and performative aspects of delivering high-impact presentations that inspire, persuade, and motivate.\n\nParticipants will work on real presentations they need to deliver, receiving expert coaching and peer feedback throughout. The course covers advanced storytelling techniques, audience psychology, stage presence, and how to handle high-pressure presentation situations including board meetings, conferences, and pitches.\n\nThrough extensive practice sessions, video review, and personalised coaching, delegates will refine their delivery style, learn to think on their feet, and develop the ability to connect authentically with any audience. The programme is ideal for senior professionals who present regularly and want to maximise their impact.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Senior Managers", "Executives", "Sales Directors", "Business Development Leaders", "Conference Speakers"],
    learningOutcomes: [
      "Deliver compelling, high-impact presentations",
      "Use advanced storytelling to engage and persuade audiences",
      "Manage nerves and project executive presence",
      "Handle challenging Q&A sessions with confidence",
      "Adapt presentation style to different audiences and contexts",
      "Create memorable messages that drive action"
    ],
    modules: [
      { title: "Advanced Content Design", topics: ["Storytelling for Business", "Audience Psychology", "Structuring for Impact", "Data Visualisation"] },
      { title: "Delivery Mastery", topics: ["Voice & Body Language", "Executive Presence", "Managing Nerves", "Thinking on Your Feet"] },
      { title: "Handling Challenges", topics: ["Difficult Questions", "Hostile Audiences", "Technical Failures", "Time Pressure"] },
      { title: "Practice & Polish", topics: ["Video Review Sessions", "Peer Coaching", "Personal Action Planning", "Real Presentation Rehearsal"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Advanced"
  },
  {
    slug: "powerpoint-presentation-skills",
    title: "PowerPoint Presentation Skills",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Teaches the skills and techniques which will give you both the confidence and competence to enjoy making PowerPoint presentations, sharpen your image and increase your credibility with colleagues and clients.",
    fullDescription: "PowerPoint is the most widely used presentation tool in business, yet many professionals create slides that detract from their message rather than enhance it. This course teaches participants how to design and deliver effective PowerPoint presentations that support their message and engage their audience.\n\nParticipants will learn the principles of visual design, how to create clean and professional slides, and how to use PowerPoint's advanced features to create dynamic presentations. The course also covers the delivery aspects of presenting with PowerPoint, ensuring that the technology serves the message rather than overwhelming it.\n\nThrough practical exercises, delegates will create their own presentation templates, learn time-saving design techniques, and practice delivering presentations with confidence. The programme covers the latest PowerPoint features and best practices for both in-person and virtual presentations.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Managers", "Sales Staff", "Trainers", "Anyone who presents regularly"],
    learningOutcomes: [
      "Design clean, professional PowerPoint slides",
      "Apply visual design principles to enhance clarity",
      "Use PowerPoint's advanced features effectively",
      "Create reusable templates for consistent branding",
      "Deliver presentations that complement your slides",
      "Adapt presentations for virtual delivery"
    ],
    modules: [
      { title: "Design Principles", topics: ["Visual Hierarchy", "Colour & Typography", "Slide Layouts", "When Less is More"] },
      { title: "PowerPoint Techniques", topics: ["Master Slides & Templates", "Animations & Transitions", "Charts & Graphics", "SmartArt & Icons"] },
      { title: "Delivery & Integration", topics: ["Presenter Tools", "Notes & Handouts", "Virtual Presentation Tips", "Practice Session"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "training-the-trainer",
    title: "Training the Trainer",
    categoryId: "personal",
    categoryTitle: "Personal Development",
    shortDescription: "Essential if you have just been promoted to a training or coaching role or wish to refresh your training skills. Benefits Training Managers who want to know the fundamentals of developing organizational training programmes.",
    fullDescription: "This comprehensive programme equips new and aspiring trainers with the knowledge, skills, and confidence to design and deliver effective training programmes. It covers the complete training cycle from needs analysis through to evaluation, providing a solid foundation for anyone responsible for developing others in the workplace.\n\nParticipants will learn how to design engaging training sessions using adult learning principles, facilitate group activities, manage different learning styles, and assess training effectiveness. The course includes extensive practice sessions where delegates deliver short training segments and receive constructive feedback.\n\nThe programme also addresses the organisational aspects of training, including how to conduct training needs analyses, develop training plans, and create a culture of continuous learning. It is ideal for professionals who have been promoted into training roles or who are taking on training responsibilities alongside their primary role.",
    duration: "3 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["New Trainers", "Training Managers", "HR Officers", "Subject Matter Experts", "Team Leaders with Training Responsibilities"],
    learningOutcomes: [
      "Design training programmes using adult learning principles",
      "Deliver engaging and effective training sessions",
      "Facilitate group activities and manage group dynamics",
      "Adapt training delivery to different learning styles",
      "Evaluate training effectiveness and measure impact",
      "Develop organisational training strategies"
    ],
    modules: [
      { title: "The Training Cycle", topics: ["Training Needs Analysis", "Setting Learning Objectives", "Design Principles", "Evaluation Methods"] },
      { title: "Learning & Facilitation", topics: ["Adult Learning Theory", "Learning Styles", "Facilitation Techniques", "Questioning Skills"] },
      { title: "Training Delivery", topics: ["Opening with Impact", "Managing Group Dynamics", "Using Visual Aids", "Handling Difficult Delegates"] },
      { title: "Assessment & Evaluation", topics: ["Formative Assessment", "Summative Evaluation", "Kirkpatrick Model", "Feedback & Improvement"] },
      { title: "Organisational Training", topics: ["Training Strategy", "Budgeting & Resources", "Building a Learning Culture", "Action Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Advanced"
  },

  // ═══════════════════════════════════════════════
  // ADMINISTRATION & OPERATIONS
  // ═══════════════════════════════════════════════
  {
    slug: "document-control-and-records-management",
    title: "Document Control and Records Management",
    categoryId: "admin",
    categoryTitle: "Administration & Operations",
    shortDescription: "Conveys practical methods for identifying and developing systems of records management and document control that every organization needs. Each participant will develop a plan of action and skills to implement an appropriate program.",
    fullDescription: "Effective document control and records management are essential for organisational efficiency, compliance, and risk management. This programme provides practical methods for establishing and maintaining robust systems that ensure documents and records are properly created, stored, retrieved, and disposed of.\n\nParticipants will learn the principles of document control including version management, approval workflows, and distribution control. The course covers both physical and electronic records management, addressing the unique challenges and opportunities of each format.\n\nThrough practical exercises and case studies, delegates will develop a comprehensive plan of action for implementing or improving document control and records management systems within their organisations. The programme is aligned with international standards and best practices.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Records Managers", "Admin Managers", "Compliance Officers", "QA Managers", "IT Staff managing document systems"],
    learningOutcomes: [
      "Establish effective document control systems",
      "Implement version control and approval workflows",
      "Develop records retention and disposal policies",
      "Manage both physical and electronic records",
      "Ensure compliance with regulatory requirements",
      "Create a document management implementation plan"
    ],
    modules: [
      { title: "Document Control Fundamentals", topics: ["What is Document Control?", "Document Lifecycle", "Version Management", "Approval Processes"] },
      { title: "Records Management", topics: ["Records Management Principles", "Classification Systems", "Retention Schedules", "Disposal Procedures"] },
      { title: "Systems & Compliance", topics: ["Electronic vs Physical Records", "ISO Standards", "Audit Readiness", "Implementation Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "electronic-records-management",
    title: "Electronic Records Management",
    categoryId: "admin",
    categoryTitle: "Administration & Operations",
    shortDescription: "Tailor-made to provide detailed in-depth understanding of modern electronic records management for employees involved in records management across a wide range of organizations from private to public sectors.",
    fullDescription: "As organisations increasingly move to digital-first operations, the management of electronic records has become a critical competency. This course provides an in-depth understanding of electronic records management (ERM) principles, technologies, and best practices.\n\nParticipants will explore the full spectrum of ERM, from email management and document imaging to cloud storage and enterprise content management systems. The course addresses key challenges including information governance, data protection, metadata management, and long-term digital preservation.\n\nThrough practical demonstrations and hands-on exercises, delegates will develop the skills to evaluate, implement, and manage electronic records systems. The programme covers both the technical and procedural aspects of ERM, ensuring participants can bridge the gap between technology and organisational needs.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Records Managers", "IT Managers", "Compliance Officers", "Information Governance Professionals", "Admin Managers"],
    learningOutcomes: [
      "Understand electronic records management principles and standards",
      "Evaluate and select appropriate ERM technologies",
      "Implement metadata and classification schemes",
      "Manage email and other electronic communications as records",
      "Ensure legal compliance for electronic records",
      "Plan and execute an ERM implementation project"
    ],
    modules: [
      { title: "ERM Foundations", topics: ["Electronic Records Principles", "Information Governance", "Digital Preservation", "Regulatory Requirements"] },
      { title: "Technology & Systems", topics: ["Document Management Systems", "Cloud Storage Solutions", "Metadata Management", "Search & Retrieval"] },
      { title: "Implementation", topics: ["Email Management", "Scanning & Imaging", "Access Control & Security", "Implementation Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "letter-and-report-writing",
    title: "Letter and Report Writing",
    categoryId: "admin",
    categoryTitle: "Administration & Operations",
    shortDescription: "Allows delegates to gain useful letter writing tools, tips and techniques including constructive letter and report templates. Also demonstrates the particulars of writing effective emails while improving punctuation and grammar.",
    fullDescription: "Clear, professional written communication is a fundamental skill in every organisation. This course provides delegates with the tools, techniques, and templates needed to produce well-structured letters, reports, and emails that achieve their intended purpose.\n\nParticipants will learn the principles of effective business writing, including how to structure documents for clarity and impact, adapt tone for different audiences, and use plain language to convey complex information. The course covers the specific requirements of letters, reports, memos, and email communication.\n\nThrough practical writing exercises and peer review sessions, delegates will improve their grammar, punctuation, and overall writing style. The programme provides reusable templates and checklists that participants can apply immediately in their daily work.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["All Professionals", "Admin Staff", "Managers", "Executive Assistants", "Report Writers"],
    learningOutcomes: [
      "Write clear, concise, and professional business documents",
      "Structure letters and reports for maximum impact",
      "Adapt writing style and tone for different audiences",
      "Apply correct grammar, punctuation, and formatting",
      "Write effective emails that get results",
      "Use templates and checklists to improve writing efficiency"
    ],
    modules: [
      { title: "Writing Principles", topics: ["Plain Language", "Audience Analysis", "Tone & Style", "Structure & Flow"] },
      { title: "Letter & Report Writing", topics: ["Business Letter Format", "Report Structures", "Executive Summaries", "Templates & Checklists"] },
      { title: "Email & Grammar", topics: ["Email Best Practices", "Common Grammar Mistakes", "Punctuation Review", "Proofreading Techniques"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Foundation"
  },
  {
    slug: "excel-dashboards-and-reporting",
    title: "Excel Dashboards and Reporting",
    categoryId: "admin",
    categoryTitle: "Administration & Operations",
    shortDescription: "Dashboards provide at-a-glance views of KPIs relevant to particular objectives or business processes. Business Intelligence is a highly sought-after commodity in today's world and dashboards are the most frequently used method.",
    fullDescription: "Excel dashboards are powerful tools for visualising key performance indicators and business metrics in a clear, accessible format. This course teaches participants how to create professional, interactive dashboards that transform raw data into actionable business intelligence.\n\nDelegates will learn how to use Excel's advanced features including pivot tables, charts, conditional formatting, and form controls to build dashboards that update automatically with new data. The course covers dashboard design principles that ensure visual clarity and user-friendliness.\n\nThrough hands-on exercises with real business data, participants will build complete dashboards from scratch, learning best practices for data organisation, visual design, and interactivity. The programme equips delegates with a highly sought-after skill set that adds immediate value to their organisations.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Business Analysts", "Finance Staff", "Operations Managers", "Data Analysts", "Any Excel User"],
    learningOutcomes: [
      "Design professional Excel dashboards from scratch",
      "Use pivot tables and charts to summarise complex data",
      "Apply conditional formatting for visual impact",
      "Create interactive dashboards with form controls",
      "Automate dashboard updates with dynamic data ranges",
      "Apply dashboard design principles for clarity"
    ],
    modules: [
      { title: "Dashboard Foundations", topics: ["Dashboard Design Principles", "Data Preparation", "Pivot Tables Review", "Chart Types"] },
      { title: "Building Dashboards", topics: ["Dynamic Charts", "Conditional Formatting", "Form Controls", "Interactive Elements"] },
      { title: "Advanced Techniques", topics: ["Dynamic Data Ranges", "Power Query Basics", "Dashboard Templates", "Distribution & Sharing"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "financial-modeling-using-excel",
    title: "Financial Modeling Using Excel",
    categoryId: "admin",
    categoryTitle: "Administration & Operations",
    shortDescription: "Effectively prepare and build financial models for different investment alternatives, understand time value of money, WACC, construct forecasted financial statement models, perform sensitivity analysis and use free cash flow techniques.",
    fullDescription: "Financial modelling is a core competency for finance professionals and business decision-makers. This comprehensive programme teaches participants how to build robust, flexible financial models using Microsoft Excel, from basic concepts through to advanced modelling techniques.\n\nParticipants will learn the fundamental principles of financial modelling, including time value of money, weighted average cost of capital (WACC), and free cash flow analysis. The course then progresses to building complete financial models including three-statement models, discounted cash flow (DCF) models, and sensitivity analysis frameworks.\n\nThrough extensive hands-on exercises, delegates will build financial models from scratch, learning industry best practices for model structure, formula construction, error checking, and presentation. The programme is designed for finance professionals who need to create or work with financial models regularly.",
    duration: "3 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Finance Analysts", "Accountants", "Investment Analysts", "Business Strategists", "CFOs and Finance Managers"],
    learningOutcomes: [
      "Build three-statement integrated financial models",
      "Apply DCF valuation methodologies",
      "Perform sensitivity and scenario analysis",
      "Calculate and apply WACC effectively",
      "Use Excel advanced functions for financial modelling",
      "Present and communicate model results clearly"
    ],
    modules: [
      { title: "Financial Modelling Fundamentals", topics: ["Model Design Principles", "Time Value of Money", "WACC Calculation", "Excel Best Practices"] },
      { title: "Building Core Models", topics: ["Revenue & Cost Models", "Three-Statement Models", "Cash Flow Analysis", "Balance Sheet Integration"] },
      { title: "Valuation & Analysis", topics: ["DCF Valuation", "Comparable Analysis", "Sensitivity Analysis", "Scenario Modeling"] },
      { title: "Advanced Topics", topics: ["Debt Scheduling", "Circular References", "Error Checking", "Model Audit & Review"] },
      { title: "Presentation & Communication", topics: ["Dashboard Design", "Executive Summaries", "Model Documentation", "User Guides"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Advanced"
  },

  // ═══════════════════════════════════════════════
  // HUMAN RESOURCES
  // ═══════════════════════════════════════════════
  {
    slug: "interviewing-skills",
    title: "Interviewing Skills",
    categoryId: "hr",
    categoryTitle: "Human Resources",
    shortDescription: "Tailored for delegates who would like to gain better interviewing skills and learn how to conduct successful interviews for choosing the right employees. Also covers recruitment and employment law.",
    fullDescription: "Hiring the right people is one of the most important decisions any manager or HR professional makes. This course provides comprehensive training in interview techniques that improve the quality of hiring decisions while ensuring a fair, professional, and legally compliant recruitment process.\n\nParticipants will learn structured interview methodologies including competency-based interviewing, behavioural interviewing, and situational judgement techniques. The course covers the complete interview process from pre-screening and shortlisting through to final selection and offer management.\n\nThrough extensive role-play exercises, delegates will practice conducting interviews, asking effective questions, evaluating candidates objectively, and making evidence-based selection decisions. The programme also covers relevant employment law considerations to ensure the recruitment process is fair and compliant.",
    duration: "2 Days",
    deliveryModes: ["Public", "In-House"],
    basePricePerDay: 3500,
    targetAudience: ["HR Managers", "Recruitment Officers", "Line Managers", "Department Heads", "Business Owners"],
    learningOutcomes: [
      "Conduct structured, competency-based interviews",
      "Design effective interview questions and assessment criteria",
      "Evaluate candidates objectively using scoring systems",
      "Make evidence-based selection decisions",
      "Ensure legal compliance throughout the recruitment process",
      "Create a positive candidate experience"
    ],
    modules: [
      { title: "Interview Planning", topics: ["Job Analysis & Person Specs", "Competency Frameworks", "Question Design", "Interview Structure"] },
      { title: "Interview Techniques", topics: ["Behavioural Interviewing", "Situational Questions", "Probing Techniques", "Active Listening"] },
      { title: "Evaluation & Decision Making", topics: ["Scoring & Assessment", "Bias Awareness", "Reference Checking", "Final Selection"] },
      { title: "Legal & Process", topics: ["Employment Law Basics", "Equal Opportunities", "Offer Management", "Onboarding Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },
  {
    slug: "disciplinary-procedures",
    title: "Disciplinary Procedures",
    categoryId: "hr",
    categoryTitle: "Human Resources",
    shortDescription: "Addresses the finding that 75% of managers were unaware of the correct procedures for disciplining employees. Covers how to deal with under-performing staff and conduct disciplinary meetings effectively.",
    fullDescription: "Research shows that 75% of managers are unaware of the correct procedures for disciplining employees, exposing their organisations to significant legal risk and potential employment tribunals. This course provides managers with the knowledge and skills to handle disciplinary situations correctly, fairly, and effectively.\n\nParticipants will learn the legal framework governing disciplinary procedures, the importance of following correct processes, and how to conduct disciplinary meetings that are both fair to the employee and protective of the organisation. The course covers the complete disciplinary process from informal performance management through to formal hearings.\n\nThrough case studies and role-play exercises, delegates will practice conducting disciplinary meetings, managing difficult conversations, and documenting proceedings correctly. The programme emphasises the importance of consistency, documentation, and procedural fairness throughout the disciplinary process.",
    duration: "1 Day",
    deliveryModes: ["Public", "In-House", "Online"],
    basePricePerDay: 3500,
    targetAudience: ["Line Managers", "HR Officers", "Department Heads", "Small Business Owners", "Team Leaders"],
    learningOutcomes: [
      "Understand the legal framework for disciplinary procedures",
      "Follow correct disciplinary processes step by step",
      "Conduct fair and effective disciplinary meetings",
      "Document disciplinary proceedings accurately",
      "Distinguish between performance management and disciplinary action",
      "Apply consistent and fair disciplinary standards"
    ],
    modules: [
      { title: "Legal Framework", topics: ["Employment Law Overview", "ACAS/Zambian Code of Practice", "Employee Rights", "Employer Obligations"] },
      { title: "The Disciplinary Process", topics: ["Informal vs Formal Action", "Investigation Procedures", "The Hearing Process", "Appeals Process"] },
      { title: "Conducting Meetings", topics: ["Meeting Preparation", "Running the Hearing", "Questioning Techniques", "Documentation & Outcomes"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Intermediate"
  },

  // ═══════════════════════════════════════════════
  // CORPORATE SOLUTIONS
  // ═══════════════════════════════════════════════
  {
    slug: "existing-standard-course-inhouse",
    title: "Existing Standard Course (In-House)",
    categoryId: "corporate",
    categoryTitle: "Corporate Solutions",
    shortDescription: "Our standard courses delivered at your location. Cost effective with no travel, lodging, or location expenses. A team building experience with the synergistic effect of being trained together.",
    fullDescription: "Our in-house training service brings any of our standard courses directly to your organisation. This delivery mode eliminates travel and accommodation costs for participants while creating a focused, team-oriented learning environment that enhances the training experience.\n\nBy training together at your location, your team benefits from shared learning experiences and the ability to immediately apply new skills within their actual work context. Our facilitators adapt the standard course content to reference your organisation's specific situations, challenges, and examples.\n\nThis is our most popular delivery format for organisations with five or more participants, offering significant cost savings per delegate compared to public courses. We handle all logistics including venue coordination, materials preparation, and post-training support to ensure a seamless experience.",
    duration: "Varies",
    deliveryModes: ["In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Organisations with 5+ participants", "Teams wanting shared learning", "Companies seeking cost-effective training", "Remote/regional organisations"],
    learningOutcomes: [
      "Receive any standard course at your premises",
      "Benefit from team-oriented shared learning",
      "Apply skills immediately in the workplace context",
      "Reduce training costs with no participant travel",
      "Customise examples to your industry context",
      "Build team cohesion through shared development"
    ],
    modules: [
      { title: "Needs Assessment", topics: ["Training Needs Analysis", "Course Selection", "Participant Profiling", "Logistics Planning"] },
      { title: "Delivery", topics: ["On-Site Facilitation", "Contextual Adaptation", "Interactive Exercises", "Team Activities"] },
      { title: "Post-Training", topics: ["Impact Assessment", "Follow-Up Support", "Certification", "Continuous Development Plan"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Custom"
  },
  {
    slug: "tailor-made-training-course",
    title: "Tailor-Made Training Course",
    categoryId: "corporate",
    categoryTitle: "Corporate Solutions",
    shortDescription: "Completely bespoke training courses developed to suit your specific learning objectives. Our team of experienced consultants can develop entirely new training courses that meet your training needs.",
    fullDescription: "When off-the-shelf training doesn't meet your unique requirements, our bespoke training design service creates entirely new programmes tailored specifically to your organisation. Our team of experienced consultants works closely with you to understand your challenges, objectives, and desired outcomes.\n\nThe development process begins with a thorough training needs analysis, followed by collaborative design workshops where we co-create the programme content with your subject matter experts. This ensures the training is highly relevant, practical, and aligned with your organisational culture and goals.\n\nEvery bespoke programme is developed from scratch, incorporating your specific case studies, processes, terminology, and scenarios. The result is a training programme that feels like it was always part of your organisation, delivering maximum impact and return on your training investment.",
    duration: "Varies",
    deliveryModes: ["In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Organisations with unique training needs", "Companies undergoing change", "Industry-specific requirements", "Large-scale training initiatives"],
    learningOutcomes: [
      "Receive a programme designed entirely for your needs",
      "Include your specific case studies and scenarios",
      "Align training content with organisational goals",
      "Develop internal capability and knowledge",
      "Create sustainable learning solutions",
      "Maximise training ROI with targeted content"
    ],
    modules: [
      { title: "Discovery & Analysis", topics: ["Training Needs Analysis", "Stakeholder Interviews", "Skills Gap Assessment", "Objective Setting"] },
      { title: "Design & Development", topics: ["Content Creation", "Activity Design", "Materials Development", "Pilot Testing"] },
      { title: "Delivery & Refinement", topics: ["Facilitation", "Feedback Collection", "Content Refinement", "Future Planning"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Custom"
  },
  {
    slug: "customized-existing-standard-course",
    title: "Customized Existing Standard Course",
    categoryId: "corporate",
    categoryTitle: "Corporate Solutions",
    shortDescription: "Our standard courses adapted and customized to align with your organizational goals and specific requirements while maintaining proven course structures.",
    fullDescription: "Our customisation service offers the best of both worlds: the proven structure and quality of our standard courses, enhanced with content that specifically addresses your organisation's needs. This approach delivers faster turnaround than fully bespoke development while maintaining high relevance.\n\nWe work with you to identify which elements of our standard courses to adapt, modify, or extend. This might include adding industry-specific examples, incorporating your internal processes and terminology, or extending certain modules while condensing others based on your team's existing knowledge.\n\nCustomised courses are ideal for organisations that need training grounded in proven methodologies but want the content to reflect their specific operating environment, challenges, and strategic priorities. This approach typically delivers 30-50% faster than fully bespoke development.",
    duration: "Varies",
    deliveryModes: ["In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Organisations needing sector-specific adaptation", "Teams with specific skill gaps", "Companies with standard processes to incorporate", "Budget-conscious training buyers"],
    learningOutcomes: [
      "Get proven course content adapted to your context",
      "Include industry-specific examples and case studies",
      "Align content with internal processes and terminology",
      "Benefit from faster development than bespoke courses",
      "Maintain proven learning methodologies",
      "Achieve higher relevance and engagement"
    ],
    modules: [
      { title: "Customisation Planning", topics: ["Needs Assessment", "Gap Analysis", "Customisation Scope", "Timeline Planning"] },
      { title: "Content Adaptation", topics: ["Case Study Development", "Exercise Customisation", "Material Branding", "Content Extension"] },
      { title: "Delivery & Review", topics: ["Customised Delivery", "Impact Measurement", "Continuous Improvement", "Knowledge Transfer"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Custom"
  },
  {
    slug: "springbok-training-partnership",
    title: "Springbok Creating Training Partnership",
    categoryId: "corporate",
    categoryTitle: "Corporate Solutions",
    shortDescription: "A long-term training partnership model where we work closely with your organization to continuously develop and deliver training programmes aligned with your evolving business needs.",
    fullDescription: "Our Training Partnership model establishes a long-term strategic relationship between Springbok and your organisation. Rather than approaching training as a series of one-off events, we become an extension of your learning and development function, providing continuous support and expertise.\n\nPartnership clients benefit from preferential pricing, dedicated account management, priority scheduling, and access to our full range of training resources. We work with you to develop annual training plans, track skill development across your organisation, and measure the business impact of your training investment.\n\nThis model is ideal for organisations committed to building a learning culture and developing their people as a strategic priority. The partnership approach ensures training is consistently aligned with your evolving business needs and delivers compounding returns over time.",
    duration: "Varies",
    deliveryModes: ["In-House"],
    basePricePerDay: 3500,
    targetAudience: ["Large organisations", "Companies with ongoing training needs", "Organisations building learning cultures", "Multi-site operations"],
    learningOutcomes: [
      "Establish a strategic training partnership",
      "Develop annual training plans aligned to business goals",
      "Access preferential pricing and priority scheduling",
      "Track and measure training impact across the organisation",
      "Build a sustainable learning culture",
      "Receive continuous expert support and guidance"
    ],
    modules: [
      { title: "Partnership Setup", topics: ["Strategic Alignment", "Needs Assessment", "Partnership Framework", "Success Metrics"] },
      { title: "Ongoing Delivery", topics: ["Annual Training Calendar", "Resource Allocation", "Progress Tracking", "Quarterly Reviews"] },
      { title: "Impact Measurement", topics: ["ROI Analysis", "Skill Development Tracking", "Business Impact Assessment", "Continuous Improvement"] }
    ],
    accreditation: "Accredited by The Business Continuity Institute",
    addOns: STANDARD_ADDONS,
    level: "Custom"
  }
];

export const ALL_CATEGORIES: CategoryInfo[] = [
  { id: "leadership", title: "Leadership & Management", icon: "Crown" },
  { id: "sales", title: "Sales & Customer Service", icon: "TrendingUp" },
  { id: "personal", title: "Personal Development", icon: "UserCheck" },
  { id: "admin", title: "Administration & Operations", icon: "Settings" },
  { id: "hr", title: "Human Resources", icon: "Users" },
  { id: "corporate", title: "Corporate Solutions", icon: "Building2" },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(categoryId: string): Course[] {
  return ALL_COURSES.filter((c) => c.categoryId === categoryId);
}

export function getAllCourses(): Course[] {
  return ALL_COURSES;
}

export function getAllCategories(): CategoryInfo[] {
  return ALL_CATEGORIES;
}

// ═══════════════════════════════════════════════
// AI-POWERED SEMANTIC SEARCH
// ═══════════════════════════════════════════════
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function calculateRelevance(query: string, course: Course): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  let score = 0;

  // 1. Title matching (highest weight)
  const titleTokens = tokenize(course.title);
  const titleMatches = queryTokens.filter((qt) =>
    titleTokens.some((tt) => tt.includes(qt) || qt.includes(tt))
  );
  score += titleMatches.length * 10;
  // Exact title phrase match
  if (course.title.toLowerCase().includes(query.toLowerCase())) score += 25;

  // 2. Category matching (boost)
  if (tokenize(course.categoryTitle).some((ct) =>
    queryTokens.some((qt) => ct.includes(qt) || qt.includes(ct))
  )) {
    score += 8;
  }

  // 3. Short description matching
  const descTokens = tokenize(course.shortDescription);
  const descMatches = queryTokens.filter((qt) =>
    descTokens.some((dt) => dt.includes(qt) || qt.includes(dt))
  );
  score += descMatches.length * 4;

  // 4. Target audience matching
  const audienceText = course.targetAudience.join(" ").toLowerCase();
  const audienceMatches = queryTokens.filter((qt) => audienceText.includes(qt));
  score += audienceMatches.length * 6;

  // 5. Learning outcomes matching
  const outcomesText = course.learningOutcomes.join(" ").toLowerCase();
  const outcomeMatches = queryTokens.filter((qt) => outcomesText.includes(qt));
  score += outcomeMatches.length * 5;

  // 6. Module topics matching
  const topicsText = course.modules
    .flatMap((m) => m.topics)
    .join(" ")
    .toLowerCase();
  const topicMatches = queryTokens.filter((qt) => topicsText.includes(qt));
  score += topicMatches.length * 3;

  // 7. Level matching
  if (queryTokens.some((qt) => course.level.toLowerCase().includes(qt))) {
    score += 5;
  }

  // 8. Delivery mode matching
  const modesText = course.deliveryModes.join(" ").toLowerCase();
  if (queryTokens.some((qt) => modesText.includes(qt))) {
    score += 3;
  }

  // 9. Intent-based phrase detection
  const lowerQuery = query.toLowerCase();
  const intentPhrases: Record<string, string[]> = {
    leadership: ["leadership", "leader", "manage", "team lead", "supervisor", "boss"],
    sales: ["sales", "sell", "customer", "client", "revenue", "deal"],
    personal: ["confidence", "presentation", "time management", "assertive", "communicate"],
    admin: ["admin", "document", "records", "excel", "financial", "report writing", "office"],
    hr: ["hr", "human resource", "interview", "hire", "recruit", "discipline", "employee"],
    corporate: ["corporate", "in-house", "inhouse", "bespoke", "custom", "partnership"],
    online: ["online", "virtual", "remote", "digital"],
    foundation: ["beginner", "basic", "foundation", "intro", "new"],
    advanced: ["advanced", "senior", "executive", "expert"],
  };

  for (const [, phrases] of Object.entries(intentPhrases)) {
    if (phrases.some((phrase) => lowerQuery.includes(phrase))) {
      score += 2;
    }
  }

  // 10. Full query coverage bonus
  const allText = [
    course.title,
    course.shortDescription,
    course.categoryTitle,
    ...course.targetAudience,
    ...course.learningOutcomes,
    course.modules.flatMap((m) => m.topics).join(" "),
  ].join(" ").toLowerCase();

  const coverageRatio =
    queryTokens.filter((qt) => allText.includes(qt)).length / queryTokens.length;
  score += coverageRatio * 15;

  return score;
}

export function searchCourses(query: string): { course: Course; score: number }[] {
  if (!query || query.trim().length === 0) {
    return ALL_COURSES.map((course) => ({ course, score: 0 }));
  }

  const results = ALL_COURSES.map((course) => ({
    course,
    score: calculateRelevance(query, course),
  }));

  return results.filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
}

export function getRelevanceInsight(score: number): string {
  if (score >= 30) return "Excellent match";
  if (score >= 20) return "Strong match";
  if (score >= 10) return "Good match";
  if (score >= 5) return "Partial match";
  return "Related result";
}
