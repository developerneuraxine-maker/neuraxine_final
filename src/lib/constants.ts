export const BRAND = {
  name: "Neuraxine AI",
  tagline: "AI Automation Systems That Work While You Sleep",
  headline: "Automate Your Business with Neuraxine AI",
  colors: {
    neon: "#C6FF00",
    black: "#0a0a0a",
    darkGrey: "#111111",
    white: "#FFFFFF",
    silver: "#888888",
  },
} as const;

export const SERVICES = [
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    description: "Automated conversations, lead qualification, and follow-ups on WhatsApp 24/7.",
    icon: "💬",
  },
  {
    id: "chatbot",
    title: "AI Chatbot",
    description: "Intelligent chatbots that understand context and convert visitors into leads.",
    icon: "🤖",
  },
  {
    id: "voice",
    title: "AI Voice Agent",
    description: "Natural voice AI that handles calls, bookings, and customer support.",
    icon: "🎙️",
  },
  {
    id: "leads",
    title: "Lead Generation",
    description: "Automated lead capture, scoring, and routing to your sales pipeline.",
    icon: "📊",
  },
  {
    id: "crm",
    title: "CRM Automation",
    description: "Sync leads, automate workflows, and keep your CRM always updated.",
    icon: "⚡",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "AI-powered campaigns with automated funnels from ad to conversion.",
    icon: "📈",
  },
  {
    id: "website",
    title: "Website AI Integration",
    description: "Embed AI assistants directly into your website for instant engagement.",
    icon: "🌐",
  },
  {
    id: "booking",
    title: "Appointment Booking",
    description: "Smart scheduling that books meetings without human intervention.",
    icon: "📅",
  },
  {
    id: "custom",
    title: "Custom Automation",
    description: "Bespoke AI systems tailored to your unique business workflows.",
    icon: "🔧",
  },
] as const;

export const SERVICE_DETAILS: Record<string, {
  tagline: string;
  fullDescription: string;
  features: string[];
  stats: { value: string; label: string }[];
  useCases: string[];
  accent: string;
}> = {
  whatsapp: {
    tagline: "Turn WhatsApp into your #1 sales channel",
    fullDescription:
      "Neuraxine's WhatsApp Automation transforms your business number into a fully autonomous 24/7 sales and support agent. It instantly responds to inquiries, qualifies leads with smart questions, sends follow-up reminders, and routes hot prospects directly to your team — all without a single human touch.",
    features: [
      "Instant auto-reply to every incoming message in under 3 seconds",
      "AI-powered lead qualification with multi-step conversation flows",
      "Automatic follow-up sequences: Day 1, Day 3, Day 7",
      "Broadcast campaigns to segmented contact lists",
      "Product catalogues, media, and PDF delivery via chat",
      "Full conversation history synced to your CRM",
    ],
    stats: [
      { value: "98%", label: "Message open rate" },
      { value: "3s", label: "Average response time" },
      { value: "5×", label: "More replies vs email" },
    ],
    useCases: [
      "Real estate agencies capturing and nurturing property enquiries",
      "Clinics & hospitals handling appointment requests automatically",
      "E-commerce stores sending order updates and recovering abandoned carts",
    ],
    accent: "#25D366",
  },
  chatbot: {
    tagline: "Your smartest employee — available 24/7, never calls in sick",
    fullDescription:
      "Our AI Chatbots are trained specifically on your business — your products, FAQs, services, and tone of voice. They engage every visitor in a natural conversation, answer complex questions, collect contact details, and hand off qualified leads to your sales team in real time.",
    features: [
      "Trained on your own business data, PDFs, and website content",
      "Understands natural language — no rigid menus or button-only flows",
      "Collects name, phone, email, and custom qualifying answers",
      "Integrates with WhatsApp, website, Facebook Messenger, and Instagram",
      "Live handoff to human agent when needed with full chat context",
      "Analytics dashboard: top questions, drop-off points, conversion rate",
    ],
    stats: [
      { value: "80%", label: "Queries resolved without human" },
      { value: "24/7", label: "Always available" },
      { value: "3×", label: "More leads captured" },
    ],
    useCases: [
      "Educational institutes answering admission queries round the clock",
      "SaaS companies qualifying trial sign-ups automatically",
      "Hotels handling room availability and booking requests instantly",
    ],
    accent: "#7c3aed",
  },
  voice: {
    tagline: "AI that calls, listens, and books — just like a real agent",
    fullDescription:
      "Neuraxine AI Voice Agents make and receive phone calls with a natural human-like voice. They handle inbound support calls, outbound follow-ups, appointment reminders, and surveys — at scale. Your team only steps in for complex issues; everything else is handled automatically.",
    features: [
      "Human-sounding AI voice with natural pauses and tone variation",
      "Handles inbound calls: FAQs, support, booking confirmations",
      "Outbound calling: lead follow-up, reminders, re-engagement",
      "Transcribes every call and logs summary to your CRM",
      "Detects intent and routes to the right team if needed",
      "Supports multiple languages and regional accents",
    ],
    stats: [
      { value: "100%", label: "Calls answered" },
      { value: "60%", label: "Reduction in call centre costs" },
      { value: "2×", label: "More appointments booked" },
    ],
    useCases: [
      "Hospitals sending automated appointment reminders and confirmations",
      "Loan companies following up on pending applications via AI calls",
      "Service businesses confirming bookings and collecting feedback",
    ],
    accent: "#0ea5e9",
  },
  leads: {
    tagline: "Never let a hot lead go cold again",
    fullDescription:
      "Our AI Lead Generation systems work across every channel — ads, social media, landing pages, and chat — to capture prospects, score them based on intent, and push the hottest ones to your sales pipeline automatically. Stop manually sorting through hundreds of unqualified contacts.",
    features: [
      "Multi-channel capture: Meta Ads, Google, WhatsApp, website forms",
      "AI lead scoring based on behaviour, responses, and engagement",
      "Instant automated follow-up within 60 seconds of a new lead",
      "Smart segmentation: hot, warm, and cold lists managed automatically",
      "Integration with Sheets, HubSpot, Zoho, Salesforce, and more",
      "Weekly performance report: cost per lead, conversion rate, ROI",
    ],
    stats: [
      { value: "70%", label: "Faster lead response time" },
      { value: "3×", label: "More qualified leads" },
      { value: "40%", label: "Lower cost per acquisition" },
    ],
    useCases: [
      "Real estate developers capturing and pre-qualifying project enquiries",
      "EdTech companies driving course enrolments with automated nurturing",
      "Finance & insurance brokers routing high-intent leads instantly",
    ],
    accent: "#f97316",
  },
  crm: {
    tagline: "Your CRM — always clean, always up to date, zero manual entry",
    fullDescription:
      "Neuraxine CRM Automation eliminates the hours your team spends on data entry. Every lead, call, message, and deal update is automatically logged, tagged, and synced across your systems. Workflows trigger the right action at the right time — follow-up tasks, deal stage updates, and notifications — without anyone lifting a finger.",
    features: [
      "Auto-sync leads from all sources into your CRM in real time",
      "Automated deal stage updates based on customer actions",
      "Smart task creation: follow-up reminders assigned to the right rep",
      "Duplicate detection and contact merging handled automatically",
      "Deep integration with HubSpot, Zoho, Pipedrive, Salesforce, Notion",
      "Custom workflow builder: if/then automation rules with zero code",
    ],
    stats: [
      { value: "5 hrs", label: "Saved per rep per week" },
      { value: "99%", label: "CRM data accuracy" },
      { value: "Zero", label: "Manual data entry" },
    ],
    useCases: [
      "Sales teams automating follow-up task creation after every demo call",
      "Agencies keeping client project statuses synced across tools",
      "Recruiters automatically progressing candidates through pipeline stages",
    ],
    accent: "#14b8a6",
  },
  marketing: {
    tagline: "AI-powered campaigns that run, optimise, and convert on autopilot",
    fullDescription:
      "From ad creative to final conversion, Neuraxine Digital Marketing Automation manages your entire funnel intelligently. Our AI analyses campaign data in real time, reallocates budget to top performers, A/B tests creatives automatically, and triggers personalised follow-up sequences for every prospect — turning ad spend into predictable revenue.",
    features: [
      "AI-generated ad creatives and copy variations tested automatically",
      "Smart budget reallocation to best-performing ads in real time",
      "Automated email & WhatsApp drip sequences for every lead source",
      "Retargeting workflows triggered by website behaviour and ad interaction",
      "Full-funnel analytics: ad spend → lead → sale attribution",
      "Social media post scheduling and AI content generation",
    ],
    stats: [
      { value: "2.8×", label: "Average ROAS improvement" },
      { value: "55%", label: "Reduction in manual work" },
      { value: "45%", label: "Lower cost per conversion" },
    ],
    useCases: [
      "D2C brands automating product launch campaigns end to end",
      "Local businesses running hyper-targeted location-based ad funnels",
      "Coaching & training institutes filling batch seats with automated campaigns",
    ],
    accent: "#ec4899",
  },
  website: {
    tagline: "Turn your website from a brochure into a 24/7 sales machine",
    fullDescription:
      "Neuraxine Website AI Integration embeds intelligent assistants directly into your website that greet visitors, answer questions, guide them through your offerings, and capture leads — all in real time. Your site becomes an active revenue generator instead of a passive information page.",
    features: [
      "Custom AI chat widget that matches your brand design and voice",
      "Trained on your website pages, product catalogue, and FAQs",
      "Proactive engagement: triggers chat based on scroll depth and time-on-page",
      "Lead capture with seamless handoff to WhatsApp or email",
      "Multilingual support — respond to visitors in their language",
      "No-code embed: one line of script, live on your site in minutes",
    ],
    stats: [
      { value: "4×", label: "More website leads captured" },
      { value: "65%", label: "Reduction in bounce rate" },
      { value: "< 1 min", label: "Setup time per page" },
    ],
    useCases: [
      "Consulting firms converting website visitors into booked discovery calls",
      "E-commerce stores answering product questions and upselling in real time",
      "Service businesses qualifying site visitors before they leave",
    ],
    accent: "#06b6d4",
  },
  booking: {
    tagline: "Appointments booked automatically — no back-and-forth, no no-shows",
    fullDescription:
      "Neuraxine Appointment Booking AI handles your entire scheduling process without human involvement. It checks your real-time calendar availability, presents slots to prospects, confirms bookings, sends reminders, and follows up after the appointment — creating a seamless experience that dramatically reduces no-shows and saves your team hours every week.",
    features: [
      "Real-time calendar sync with Google Calendar, Outlook, and Calendly",
      "AI books appointments directly inside WhatsApp and website chat",
      "Automated confirmation messages sent immediately after booking",
      "Reminder sequences: 24 hours before, 1 hour before, and day-of",
      "No-show follow-up with instant rescheduling option",
      "Buffer time, team routing, and multi-location support",
    ],
    stats: [
      { value: "70%", label: "Reduction in no-shows" },
      { value: "100%", label: "Bookings handled automatically" },
      { value: "3 hrs", label: "Saved per day on scheduling" },
    ],
    useCases: [
      "Clinics and hospitals automating patient appointment scheduling",
      "Consultants and coaches filling their calendar without a secretary",
      "Test drive and property site visit bookings handled via WhatsApp AI",
    ],
    accent: "#eab308",
  },
  custom: {
    tagline: "No template fits your business perfectly — so we build from scratch",
    fullDescription:
      "Every business has unique processes, tools, and challenges. Neuraxine Custom Automation starts with a deep audit of your operations and designs a bespoke AI system that fits exactly how you work. From complex multi-step workflows to integrating with legacy software, we engineer a solution that scales with you.",
    features: [
      "In-depth business audit to identify highest-impact automation opportunities",
      "End-to-end custom workflow design — no off-the-shelf limitations",
      "Integration with any tool or software via API, webhooks, or Zapier",
      "Custom AI model fine-tuned on your data, terminology, and processes",
      "Dedicated project manager from design through to go-live",
      "Ongoing optimisation, monitoring, and support post-launch",
    ],
    stats: [
      { value: "100%", label: "Built for your business" },
      { value: "Any", label: "Tool or software supported" },
      { value: "∞", label: "Scalability" },
    ],
    useCases: [
      "Manufacturing companies automating multi-department approval workflows",
      "Large enterprises integrating AI across legacy ERP and CRM systems",
      "Startups building AI-first operations from the ground up",
    ],
    accent: "#C6FF00",
  },
};

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Business Audit",
    description: "We analyze your workflows, pain points, and automation opportunities.",
  },
  {
    step: 2,
    title: "Automation Strategy",
    description: "Custom AI roadmap designed for maximum ROI and scalability.",
  },
  {
    step: 3,
    title: "Development",
    description: "Build and integrate AI systems tailored to your business.",
  },
  {
    step: 4,
    title: "Launch & Optimization",
    description: "Deploy, monitor, and continuously optimize for peak performance.",
  },
] as const;

export const CASE_STUDIES = [
  { metric: "24/7", label: "Lead Handling", description: "Never miss a lead again" },
  { metric: "80%", label: "Faster Response Time", description: "Instant AI responses" },
  { metric: "3X", label: "More Qualified Leads", description: "Smart qualification" },
  { metric: "70%", label: "Less Manual Work", description: "Automated workflows" },
  { metric: "↑", label: "Higher Conversion Rates", description: "Optimized funnels" },
] as const;

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
