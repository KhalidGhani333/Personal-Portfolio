import {
  Home,
  User,
  FolderKanban,
  Gift,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Target,
  Hammer,
  Zap,
  MessageCircle,
  TrendingUp,
  LifeBuoy,
  Rocket,
  Clock,
  ShoppingCart,
  ShoppingBag,
  FileText,
  Building2,
  AudioLines,
  Watch,
  BookOpen,
  UtensilsCrossed,
  Gem,
  Flower2,
  ListTodo,
  SprayCan,
  Bot,
  Package,
  MessageSquare,
  HeartPulse,
  Briefcase,
} from 'lucide-react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiPython,
  SiGithub,
  SiN8N,
} from 'react-icons/si'
import { OpenAIIcon, GoHighLevelIcon } from '../lib/icons'

export const BRAND = {
  name: 'Khalid Ghani',
  mark: 'KHALID',
  tagline: 'AI Automation, Applied Differently.',
  subline: 'AI Automation Engineer & Website Developer. That\'s Khalid.',
  bio: 'Building GoHighLevel and n8n automation systems and React / Next.js interfaces that turn manual busywork into workflows that run themselves.',
  email: 'khalidghani.333@gmail.com',
  whatsapp: '923123549066',
  github: 'https://github.com/KhalidGhani333',
  linkedin: 'https://www.linkedin.com/in/khalid-ghani-1a5a45272/',
  facebook: 'https://www.facebook.com/khalidghani.ghani',
  cta: 'Book a Call',
}

export const STATS = [
  { value: '20+', label: 'Projects', Icon: Rocket },
  { value: '2+', label: 'Years of experience', Icon: Clock },
]

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'about', label: 'About Me', Icon: User },
  { id: 'projects', label: 'Projects', Icon: FolderKanban },
  { id: 'what-you-get', label: 'What You Get', Icon: Gift },
  { id: 'faq', label: 'FAQ', Icon: HelpCircle },
]

export const NAV_IDS = NAV_ITEMS.map((item) => item.id)

// Tech stack chips for the sidebar's scrolling marquee, replacing the old
// placeholder client-name text.
// `color: null` means "monochrome brand mark" - it inherits the
// marquee's text color instead of a fixed hex, so it stays visible against
// both the light and dark sidebar card variants.
export const TECH_STACK = [
  { Icon: SiReact, color: '#61DAFB', label: 'React' },
  { Icon: SiNextdotjs, color: null, label: 'Next.js' },
  { Icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
  { Icon: SiTailwindcss, color: '#38BDF8', label: 'Tailwind CSS' },
  { Icon: SiJavascript, color: '#F7DF1E', label: 'JavaScript' },
  { Icon: SiNodedotjs, color: '#339933', label: 'Node.js' },
  { Icon: SiHtml5, color: '#E34F26', label: 'HTML5' },
  { Icon: SiCss, color: '#1572B6', label: 'CSS' },
  { Icon: SiPython, color: '#3776AB', label: 'Python' },
  { Icon: OpenAIIcon, color: null, label: 'OpenAI' },
  { Icon: SiGithub, color: null, label: 'GitHub' },
  { Icon: GoHighLevelIcon, color: '#E8C200', label: 'GoHighLevel' },
  { Icon: SiN8N, color: '#EA4B71', label: 'n8n' },
]

export const TRAITS = [
  { label: 'Creative', Icon: Sparkles },
  { label: 'Reliable', Icon: ShieldCheck },
  { label: 'Strategist', Icon: Target },
  { label: 'Builder', Icon: Hammer },
  { label: 'Efficient', Icon: Zap },
]

export const TIMELINE = [
  {
    year: '01',
    title: 'Started as a Website Developer Intern',
    text: 'Joined Craftech Digital as a frontend intern, developing reusable components and integrating APIs - my first real exposure to production codebases.',
    handle: '@khalidghani.333',
    time: '2 years ago',
    role: 'Frontend Developer Intern',
    company: 'Craftech Digital',
    period: 'Aug 2024 - Oct 2024',
    details: [
      'Developed reusable frontend components used across multiple pages.',
      'Integrated REST APIs to connect frontend interfaces with backend data.',
      'Got my first hands-on exposure to production codebases and real team workflows.',
    ],
  },
  {
    year: '02',
    title: 'Went full time building with Next.js',
    text: 'Joined Beacon Marketing Solutions as a Next.js Website Developer, shipping responsive web apps with React.js, Next.js, TypeScript, and Tailwind CSS.',
    handle: '@khalidghani.333',
    time: '1 year ago',
    role: 'Next.js Frontend Developer',
    company: 'Beacon Marketing Solutions',
    period: 'Feb 2025 - Apr 2026',
    details: [
      'Built responsive, production web applications using React.js and Next.js.',
      'Used TypeScript to keep component architecture type-safe and maintainable.',
      'Styled interfaces with Tailwind CSS for fast, consistent UI development.',
    ],
  },
  {
    year: '03',
    title: 'Moved into AI automation engineering',
    text: 'Now at Techgenics, designing GoHighLevel and n8n automation systems - CRM workflows, lead qualification, appointment booking, and webhook/API integrations that cut manual work down to near zero.',
    handle: '@khalidghani.333',
    time: 'This year',
    role: 'AI Automation Engineer',
    company: 'Techgenics',
    period: 'Apr 2026 - Present',
    details: [
      'Designed and implemented AI-powered business automation solutions using GoHighLevel (GHL) and n8n.',
      'Built CRM workflows for lead capture, qualification, appointment booking, and pipeline automation.',
      'Developed email & SMS automation, webhook/API integrations, and internal notification workflows.',
      'Reduced manual work by automating customer journeys and business processes.',
    ],
  },
]

export const PROJECTS = [
  {
    number: '01',
    name: 'Healthcare CRM & Business Automation',
    description: 'End-to-end CRM automation - lead qualification, appointment booking, pipelines, and email/SMS follow-ups.',
    tags: ['GoHighLevel', 'n8n', 'CRM', 'Automation'],
    image: '/case-studies/healthcare-crm.svg',
  },
  {
    number: '02',
    name: 'AI Projects',
    description: 'AI-powered agents and workflows. Click to browse all of them.',
    tags: ['OpenAI', 'Agents', 'Automation'],
    link: '/ai-projects',
    image: '/ai-projects/robotics-textbook.png',
  },
  {
    number: '03',
    name: 'Full Stack Projects',
    description: "End-to-end apps with a frontend, backend, and database. Click to browse all of them.",
    tags: ['React', 'Node.js', 'Database'],
    link: '/full-stack-projects',
    image: '/full-stack-projects/evolution-of-todo.png',
  },
  {
    number: '04',
    name: 'Frontend Projects',
    description: 'E-commerce stores, tools, and mini apps. Click to browse all of them.',
    tags: ['React', 'Next.js', 'TypeScript'],
    link: '/frontend-projects',
    image: '/frontend-projects/casa-de-aroma.png',
  },
]

// Earlier frontend work - e-commerce sites, tools, and mini apps - shown in
// the dedicated /frontend-projects grid rather than the main case-study
// carousel above. `tone` picks a gradient from FRONTEND_TONES so the grid
// reads as varied without needing hand-picked colors per card.
export const FRONTEND_TONES = [
  ['#E8C200', '#8a6d00'],
  ['#3b82f6', '#1e3a8a'],
  ['#f97316', '#7c2d12'],
  ['#22c55e', '#14532d'],
  ['#ec4899', '#831843'],
  ['#a855f7', '#4c1d95'],
]

export const FRONTEND_PROJECTS = [
  {
    name: 'Robert Poston - Author Website',
    description: 'Cinematic book landing page for a spiritual drama novel, with a hero story, author bio, and gallery.',
    tags: ['Next.js', 'Tailwind CSS'],
    live: 'https://robertposton.vercel.app/',
    github: 'https://github.com/KhalidGhani333/robert-poston-book',
    image: '/frontend-projects/robert-poston.png',
    Icon: BookOpen,
    tone: 0,
  },
  {
    name: 'Jerk King Restaurant',
    description: 'Multi-location Caribbean restaurant site with online ordering, catering, and franchise pages.',
    tags: ['Next.js', 'Tailwind CSS'],
    live: 'https://jerk-king.vercel.app/',
    github: 'https://github.com/KhalidGhani333/jerk-king-restaurent',
    image: '/frontend-projects/jerk-king.png',
    Icon: UtensilsCrossed,
    tone: 1,
  },
  {
    name: 'Khidmat Marble & Tile Polishing',
    description: 'Arabic-language service site for a Riyadh marble and tile polishing business, with WhatsApp and call booking.',
    tags: ['Next.js', 'Tailwind CSS', 'RTL'],
    live: 'https://khidmat-lilac.vercel.app/',
    github: 'https://github.com/KhalidGhani333/khidmat-Marble',
    image: '/frontend-projects/khidmat-marble.png',
    Icon: Gem,
    tone: 2,
  },
  {
    name: 'No Limit Beauty',
    description: 'Handmade turmeric skincare storefront with product catalog, shop pages, and checkout flow.',
    tags: ['Next.js', 'Tailwind CSS', 'E-commerce'],
    live: 'https://axistechstaging-limit-beauty.vercel.app/',
    github: 'https://github.com/KhalidGhani333/No-Limit-Beauty',
    image: '/frontend-projects/no-limit-beauty.png',
    Icon: Flower2,
    tone: 3,
  },
  {
    name: 'Casa De Aroma',
    description: 'Luxury fragrance e-commerce store with a curated perfume catalog, categories, and checkout.',
    tags: ['Next.js', 'Tailwind CSS', 'E-commerce'],
    live: 'https://axistechstaging-casa-de-aroma.vercel.app/',
    github: 'https://github.com/KhalidGhani333/luxe-canvas',
    image: '/frontend-projects/casa-de-aroma.png',
    Icon: SprayCan,
    tone: 5,
  },
  {
    name: 'Casa De Aroma (Light)',
    description: 'Light-theme variant of the Casa De Aroma storefront, same catalog with a bright, airy design.',
    tags: ['Next.js', 'Tailwind CSS', 'E-commerce'],
    live: 'https://axistechstaging-casa-de-aroma-light.vercel.app/',
    github: 'https://github.com/KhalidGhani333/casa-de-aroma_light',
    image: '/frontend-projects/casa-de-aroma-light.png',
    Icon: SprayCan,
    tone: 0,
  },
  {
    name: 'Ecommerce Website (Custom API)',
    description: 'Products seamlessly integrated with a custom API for a smooth shopping experience.',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    live: 'https://class-10-assignment-kappa.vercel.app/',
    github: 'https://github.com/KhalidGhani333/class-10-assignment',
    image: '/frontend-projects/custom-api-ecommerce.png',
    Icon: ShoppingBag,
    tone: 1,
  },
  {
    name: 'Company Portfolio',
    description: 'Portfolio highlighting services, features, progress, and contact details.',
    tags: ['HTML', 'CSS', 'TypeScript'],
    live: 'https://giaic-html-css-final-assignment.vercel.app',
    github: 'https://github.com/KhalidGhani333/GIAIC-HTML-CSS-Assignments',
    image: '/frontend-projects/company-portfolio.png',
    Icon: Building2,
    tone: 4,
  },
  {
    name: 'Text-To-Voice-Convertor',
    description: 'Input text to generate natural-sounding voice notes.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://text-to-voice-convertor-zeta.vercel.app',
    github: 'https://github.com/KhalidGhani333/Text-To-Voice-Convertor',
    image: '/frontend-projects/text-to-voice.png',
    Icon: AudioLines,
    tone: 0,
  },
  {
    name: 'Watch E-commerce Website',
    description: 'E-commerce store for selling timepieces.',
    tags: ['HTML', 'CSS'],
    live: 'https://time-box-web-page.vercel.app',
    github: 'https://github.com/KhalidGhani333/Time-Box-WebPage',
    image: '/frontend-projects/watch-ecommerce.png',
    Icon: Watch,
    tone: 1,
  },
  {
    name: 'Dynamic Resume Builder',
    description: 'Create, edit, and share resumes dynamically with a unique URL, PDF download, and print options.',
    tags: ['HTML', 'CSS', 'TypeScript'],
    live: 'https://hackathon-milestone-5-iota.vercel.app',
    github: 'https://github.com/KhalidGhani333/Hackathon',
    image: '/frontend-projects/resume-builder.png',
    Icon: FileText,
    tone: 3,
  },
]

// End-to-end apps (frontend + backend + database) shown in the dedicated
// /full-stack-projects grid. Empty for now - filled in once those project
// screenshots and links are ready.
export const FULL_STACK_PROJECTS = [
  {
    name: 'Burney Boyz',
    description: 'E-commerce storefront curating trending gadgets and gear, with product categories and checkout.',
    tags: ['Next.js', 'Tailwind CSS', 'E-commerce'],
    live: 'https://burney-boyz.vercel.app/',
    github: 'https://github.com/naeemhussain-ai/burney-boyz-storefront',
    image: '/full-stack-projects/burney-boyz.png',
    Icon: Package,
    tone: 2,
  },
  {
    name: 'The Evolution of Todo',
    description: 'Multi-user task manager with JWT-based authentication, sign-up, and shared task tracking.',
    tags: ['React', 'Node.js', 'JWT'],
    live: 'https://the-evolution-of-todo-bvn8.vercel.app/',
    github: 'https://github.com/KhalidGhani333/The-Evolution-of-Todo',
    image: '/full-stack-projects/evolution-of-todo.png',
    Icon: ListTodo,
    tone: 4,
  },
  {
    name: 'Ecommerce Website (Sanity)',
    description: 'Fully functional ecommerce website, fetching data effortlessly through a Sanity backend.',
    tags: ['Next.js', 'Tailwind', 'TypeScript', 'Sanity'],
    live: 'https://ecommerce-marketplace-omega.vercel.app/',
    github: 'https://github.com/KhalidGhani333/Ecommerce-Hackhton',
    image: '/full-stack-projects/sanity-ecommerce.png',
    Icon: ShoppingCart,
    tone: 0,
  },
]

// AI agents and workflow projects shown in the dedicated /ai-projects grid.
export const AI_PROJECTS = [
  {
    name: 'Simple Customized Chatbot',
    description: 'Conversational AI assistant with an agent-based architecture, built on the OpenAI Agents SDK and Gemini API.',
    tags: ['Python', 'OpenAI Agents SDK', 'Gemini', 'Chainlit'],
    live: null,
    github: 'https://github.com/KhalidGhani333/simple_customized_chatbot',
    Icon: MessageSquare,
    tone: 3,
  },
  {
    name: 'Health & Wellness Planner Agent',
    description: 'AI agent that helps users manage health goals - meal planning, workout recommendations, progress tracking, and check-ins.',
    tags: ['Python', 'OpenAI Agents SDK'],
    live: null,
    github: 'https://github.com/KhalidGhani333/Health-and-Wellness-Planner-Agent',
    Icon: HeartPulse,
    tone: 4,
  },
  {
    name: 'Physical AI Humanoid Robotics Textbook',
    description: 'Documentation site for a humanoid robotics and physical AI textbook, with tutorials and blog content.',
    tags: ['Docusaurus', 'React', 'Markdown'],
    live: 'https://physical-ai-humanoid-robotics-textb-sooty-psi.vercel.app/',
    github: 'https://github.com/KhalidGhani333/Physical-AI-Humanoid-Robotics-Textbook',
    image: '/ai-projects/robotics-textbook.png',
    Icon: Bot,
    tone: 1,
  },
  {
    name: 'Personal AI Employee',
    description: 'Autonomous digital employee that monitors Gmail, WhatsApp, and LinkedIn, automates social posting, and tracks finances with human approval checkpoints.',
    tags: ['Python', 'TypeScript', 'MCP', 'Playwright', 'Docker'],
    live: null,
    github: 'https://github.com/KhalidGhani333/Personal-AI-Employee',
    Icon: Briefcase,
    tone: 5,
  },
]

export const WHAT_YOU_GET = [
  {
    title: 'Clear communication',
    text: 'You always know where the project stands, in plain language, on your schedule.',
    Icon: MessageCircle,
  },
  {
    title: 'Fast turnaround',
    text: 'Systems shipped in weeks, not quarters, without cutting corners on quality.',
    Icon: Zap,
  },
  {
    title: 'Systems that scale',
    text: 'Built to handle more volume and more complexity as your business grows.',
    Icon: TrendingUp,
  },
  {
    title: 'Long term support',
    text: "A partner who sticks around after launch, not just for the handoff.",
    Icon: LifeBuoy,
  },
]

export const FAQS = [
  {
    question: 'What exactly do you build?',
    answer:
      'Business automation systems that connect the tools you already use, things like CRMs, forms, calendars, and email/SMS, into one workflow that runs on its own.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A single workflow system usually ships in one to two weeks. Larger, multi-system builds are scoped individually after a call, typically four to eight weeks.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer:
      'No. You explain the problem in plain language, I handle the architecture, the build, and the documentation so your team can operate it comfortably.',
  },
  {
    question: 'What tools do you work with?',
    answer:
      'Most automation builds run on GoHighLevel (GHL) and n8n, along with custom React and Next.js interfaces, styled with Tailwind CSS, when a project needs a dedicated front end.',
  },
  {
    question: 'What happens after launch?',
    answer:
      "Every project includes a support window after go-live, and ongoing retainers are available if you'd like a dedicated developer on call long term.",
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a call. We will talk through what is manual today, what should be automated first, and whether it is a Starter Build or a Custom Project.',
  },
]
