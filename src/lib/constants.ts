export const BRAND = {
  name: "Neuraxine AI",
  tagline: "AI Automation Systems That Work While You Sleep",
  headline: "Automate Your Business with Neuraxine AI",
  colors: {
    neon: "#C6FF00",
    black: "#050505",
    darkGrey: "#111111",
    white: "#FFFFFF",
    silver: "#C0C0C0",
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

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "From $997/mo",
    features: ["AI Chatbot", "WhatsApp Automation", "Basic CRM Sync", "Email Support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "From $2,497/mo",
    features: ["Everything in Starter", "AI Voice Agent", "Lead Generation", "Advanced Analytics", "Priority Support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "From $4,997/mo",
    features: ["Everything in Growth", "Custom Integrations", "Dedicated Account Manager", "SLA Guarantee", "White-label Options"],
    highlighted: false,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    features: ["Fully Bespoke Solutions", "Multi-location Support", "Custom AI Models", "On-premise Options", "24/7 Dedicated Support"],
    highlighted: false,
  },
] as const;

export const BUDGET_OPTIONS = [
  "Under $1,000/mo",
  "$1,000 - $2,500/mo",
  "$2,500 - $5,000/mo",
  "$5,000+/mo",
  "Enterprise / Custom",
] as const;

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
