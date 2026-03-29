import {
  ArrowRight,
  Brain,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Terminal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface Skill {
  name: string;
  color: string;
  glow: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
}

interface Project {
  title: string;
  description: string;
  stack: string[];
  stackColors: string[];
  github?: string;
  live?: string;
  highlight?: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 className="w-4 h-4" />,
    skills: [
      { name: "React", color: "#61dafb", glow: "rgba(97,218,251,0.3)" },
      { name: "TypeScript", color: "#3178c6", glow: "rgba(49,120,198,0.3)" },
      { name: "JavaScript", color: "#f7df1e", glow: "rgba(247,223,30,0.3)" },
      { name: "Redux", color: "#764abc", glow: "rgba(118,74,188,0.3)" },
      { name: "Zustand", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
      { name: "HTML/CSS", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
    ],
  },
  {
    title: "Backend",
    icon: <Terminal className="w-4 h-4" />,
    skills: [
      { name: "Node.js", color: "#22c55e", glow: "rgba(34,197,94,0.3)" },
      { name: "NestJS", color: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
      { name: "Express.js", color: "#a3a3a3", glow: "rgba(163,163,163,0.3)" },
      { name: "REST APIs", color: "#39d5e6", glow: "rgba(57,213,230,0.3)" },
      { name: "Java", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
      { name: "Python", color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
    ],
  },
  {
    title: "Database",
    icon: <Database className="w-4 h-4" />,
    skills: [
      { name: "PostgreSQL", color: "#336791", glow: "rgba(51,103,145,0.3)" },
      { name: "ClickHouse", color: "#ffcc01", glow: "rgba(255,204,1,0.3)" },
      { name: "MongoDB", color: "#22c55e", glow: "rgba(34,197,94,0.3)" },
      { name: "MikroORM", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
    ],
  },
  {
    title: "Cloud & Infra",
    icon: <Cloud className="w-4 h-4" />,
    skills: [
      { name: "AWS S3", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
      { name: "AWS SQS", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
      { name: "AWS Kinesis", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
      { name: "CDN", color: "#39d5e6", glow: "rgba(57,213,230,0.3)" },
      { name: "Microservices", color: "#22c55e", glow: "rgba(34,197,94,0.3)" },
    ],
  },
  {
    title: "Gen AI",
    icon: <Brain className="w-4 h-4" />,
    skills: [
      { name: "LangChain", color: "#22c55e", glow: "rgba(34,197,94,0.3)" },
      { name: "RAG", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
      { name: "Groq LLM", color: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
      { name: "Vector Stores", color: "#39d5e6", glow: "rgba(57,213,230,0.3)" },
      { name: "Contextual AI", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
    ],
  },
  {
    title: "Tools & More",
    icon: <Cpu className="w-4 h-4" />,
    skills: [
      { name: "Git", color: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
      { name: "DSA", color: "#39d5e6", glow: "rgba(57,213,230,0.3)" },
      { name: "Material-UI", color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
      { name: "Bootstrap", color: "#a855f7", glow: "rgba(168,85,247,0.3)" },
      { name: "Chrome Ext.", color: "#22c55e", glow: "rgba(34,197,94,0.3)" },
    ],
  },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Associate Software Developer",
    company: "Apty",
    location: "Hyderabad",
    period: "March 2025 – Present",
    current: true,
    bullets: [
      "End-to-end ownership of 5 key features: Segments, Segment Groups, KC Gallery, Email Service, and Analytics Export Microservice",
      "Built responsive UIs with React and Material-UI; efficient state management via Zustand",
      "Designed and integrated RESTful APIs with MikroORM + PostgreSQL",
      "Developed Email and Analytics Export microservices using AWS SQS and S3 with pre-signed URL delivery",
      "Engineered high-performance KC Gallery: ~40% fewer API calls via Intersection Observer lazy loading, pagination, and AWS S3 + CDN",
      "Optimized SQL queries for analytical insights and reports",
    ],
  },
  {
    role: "Application Developer",
    company: "IBM",
    location: "Bangalore",
    period: "Dec 2023 – Feb 2025",
    current: false,
    bullets: [
      "Developed responsive UIs using ReactJS, HTML, CSS, JavaScript, and Bootstrap",
      "Optimized application performance with efficient data processing and aggregation",
      "Collaborated with cross-functional teams to translate business requirements into technical solutions",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Twi Learn",
    location: "Remote",
    period: "Oct 2023 – Dec 2023",
    current: false,
    bullets: [
      "Built responsive React UIs and contributed to RESTful API development using Node.js/Express",
      "Designed scalable data models with MongoDB",
    ],
  },
  {
    role: "DSA Intern",
    company: "Face Prep",
    location: "Remote",
    period: "Aug 2023 – Oct 2023",
    current: false,
    bullets: [
      "Mentored and guided fellow students in mastering Data Structures and Algorithms",
      "Participated in LeetCode and HackerRank competitive coding platforms",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "AI Coding Companion",
    description:
      "AI-powered Chrome extension to understand and debug coding concepts from YouTube videos in real time. Features a RAG-based system with timestamp-based context + semantic transcript search, intelligent debugging with structured outputs (problem → reason → fix → code), and Groq LLM for low-latency inference.",
    stack: [
      "React.js",
      "Node.js",
      "LangChain",
      "RAG",
      "Groq LLM",
      "Chrome APIs",
    ],
    stackColors: [
      "#61dafb",
      "#22c55e",
      "#22c55e",
      "#a855f7",
      "#f43f5e",
      "#f59e0b",
    ],
    highlight: "Gen AI · Chrome Extension",
    github: "https://github.com/keerthanasiripuram",
  },
  {
    title: "TripEase",
    description:
      "Comprehensive travel management platform built on the MERN stack with Python ML integration. Features Document Management, Weather Info, Map Integration, Profile Sharing, Expense Management, and ML-powered hotel, places, and trip recommendations using content-based filtering.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Python", "ML"],
    stackColors: [
      "#61dafb",
      "#22c55e",
      "#a3a3a3",
      "#22c55e",
      "#3b82f6",
      "#f59e0b",
    ],
    highlight: "Full Stack · ML",
    github: "https://github.com/keerthanasiripuram",
  },
  {
    title: "Insurance Fraud Detection",
    description:
      "Machine learning system to detect fraudulent insurance claims. Implements supervised classification algorithms with feature engineering and model evaluation pipelines to accurately flag suspicious claim patterns.",
    stack: ["Python", "scikit-learn", "Pandas", "ML"],
    stackColors: ["#3b82f6", "#f59e0b", "#22c55e", "#a855f7"],
    highlight: "Machine Learning",
    github: "https://github.com/keerthanasiripuram/IFDS",
  },
];

const EDUCATION: Education[] = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Sree Chaitanya College of Engineering, Karimnagar",
    period: "Aug 2019 – Jul 2023",
    score: "CGPA: 8.3 / 10",
  },
  {
    degree: "Board of Intermediate Education",
    institution: "SR Junior College, Karimnagar",
    period: "Jun 2017 – Mar 2019",
    score: "98%",
  },
  {
    degree: "Board of Secondary Education",
    institution: "St. Mary's High School, Kothapally",
    period: "Completed 2017",
    score: "93%",
  },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function SectionTitle({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="mb-12">
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-2"
        style={{ color: "var(--cyan)" }}
      >
        {accent}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div
        className="mt-3 h-0.5 w-16 rounded-full"
        style={{ background: "var(--cyan)" }}
      />
    </div>
  );
}

// ─── Hero decorative element ──────────────────────────────────────────────────

function HeroDecoration() {
  const lines = [
    { indent: 0, text: "const developer = {" },
    { indent: 1, text: 'name: "Keerthana Siripuram",' },
    { indent: 1, text: 'role: "Full Stack Developer",' },
    { indent: 1, text: "skills: [" },
    { indent: 2, text: '"React", "Node.js",' },
    { indent: 2, text: '"NestJS", "AWS",' },
    { indent: 2, text: '"LangChain", "RAG",' },
    { indent: 1, text: "]," },
    { indent: 1, text: 'passion: "Building impactful products",' },
    { indent: 1, text: 'experience: "2.5+ years",' },
    { indent: 0, text: "};" },
  ];

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow orbs */}
      <div
        className="absolute top-8 right-8 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: "var(--cyan)" }}
      />
      <div
        className="absolute bottom-8 left-8 w-32 h-32 rounded-full blur-3xl opacity-15 animate-pulse"
        style={{ background: "var(--cyan-glow)", animationDelay: "1s" }}
      />

      {/* Avatar image */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="relative rounded-2xl overflow-hidden animate-pulse-cyan"
          style={{
            border: "1px solid oklch(0.82 0.12 195 / 0.3)",
            boxShadow: "0 0 40px oklch(0.82 0.12 195 / 0.2)",
          }}
        >
          <img
            src="/assets/generated/keerthana-hero.dim_600x600.png"
            alt="Keerthana Siripuram"
            className="w-64 h-64 md:w-72 md:h-72 object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, oklch(0.13 0.04 240) 100%)",
            }}
          />
        </div>

        {/* Floating code card */}
        <motion.div
          className="relative font-mono text-xs rounded-xl p-4 w-full max-w-xs"
          style={{
            background: "oklch(0.18 0.05 235 / 0.9)",
            border: "1px solid oklch(0.28 0.05 235)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {lines.map((line, i) => (
            <motion.div
              key={line.text}
              className="leading-5"
              style={{ paddingLeft: `${line.indent * 12}px` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
            >
              <span style={{ color: "var(--label-text)" }}>
                {line.indent === 0 ? (
                  <span style={{ color: "var(--cyan)" }}>{line.text}</span>
                ) : line.text.includes('"') ? (
                  <>
                    <span style={{ color: "var(--label-text)" }}>
                      {line.text.split(":")[0]}
                    </span>
                    {line.text.includes(":") && (
                      <span style={{ color: "#22c55e" }}>
                        {`:${line.text.split(":").slice(1).join(":")}`}
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ color: "var(--cyan)" }}>{line.text}</span>
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen font-sans"
      style={{ color: "var(--body-text)" }}
    >
      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(0.13 0.04 240 / 0.95)"
            : "oklch(0.13 0.04 240 / 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid oklch(0.28 0.05 235)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
              style={{
                background: "oklch(0.82 0.12 195 / 0.15)",
                border: "1px solid oklch(0.82 0.12 195 / 0.4)",
                color: "var(--cyan)",
              }}
            >
              KS
            </div>
            <span className="hidden sm:block font-semibold text-white text-sm">
              Keerthana Siripuram
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            data-ocid="nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                style={{
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "var(--cyan)"
                      : "var(--body-text)",
                  background:
                    activeSection === link.href.replace("#", "")
                      ? "oklch(0.82 0.12 195 / 0.1)"
                      : "transparent",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/keerthana-siripuram/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.resume.button"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                border: "1px solid oklch(0.82 0.12 195 / 0.5)",
                color: "var(--cyan)",
                boxShadow: "0 0 10px oklch(0.82 0.12 195 / 0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.82 0.12 195 / 0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px oklch(0.82 0.12 195 / 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 10px oklch(0.82 0.12 195 / 0.1)";
              }}
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md"
              style={{ color: "var(--body-text)" }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              data-ocid="nav.mobile_menu.button"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
              style={{
                borderTop: "1px solid oklch(0.28 0.05 235)",
                background: "oklch(0.13 0.04 240 / 0.98)",
              }}
              data-ocid="nav.mobile.panel"
            >
              <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                    className="px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
                    style={{ color: "var(--body-text)" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section
          id="home"
          ref={(el) => {
            sectionRefs.current.home = el;
          }}
          className="min-h-screen flex items-center pt-16"
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                >
                  Hi, I'm{" "}
                  <span style={{ color: "var(--cyan)" }}>Keerthana</span>
                  <br />
                  <span style={{ color: "var(--cyan)" }}>Siripuram</span>
                </motion.h1>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center gap-2 text-lg font-medium"
                >
                  <span style={{ color: "var(--cyan)" }}>
                    Full Stack Developer
                  </span>
                  <span style={{ color: "var(--label-text)" }}>·</span>
                  <span style={{ color: "var(--body-text)" }}>
                    React · Node.js · NestJS · Gen AI
                  </span>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-base leading-relaxed max-w-lg"
                  style={{ color: "var(--body-text)" }}
                >
                  Results-driven developer with{" "}
                  <strong className="text-white">2.5+ years</strong> building
                  scalable web applications and microservices. Recently expanded
                  into <strong className="text-white">Generative AI</strong>,
                  crafting context-aware systems with RAG, LangChain, and LLM
                  APIs.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--label-text)" }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Hyderabad, India</span>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    type="button"
                    onClick={() => scrollTo("#projects")}
                    data-ocid="hero.explore.primary_button"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: "var(--cyan)",
                      color: "oklch(0.13 0.04 240)",
                      boxShadow: "0 0 20px oklch(0.82 0.12 195 / 0.35)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    Explore My Work <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    data-ocid="hero.contact.secondary_button"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      border: "1px solid oklch(0.82 0.12 195 / 0.5)",
                      color: "var(--cyan)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "oklch(0.82 0.12 195 / 0.08)";
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    Let's Connect
                  </button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4"
                >
                  <a
                    href="https://github.com/keerthanasiripuram"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="hero.github.link"
                    className="p-2 rounded-lg transition-all"
                    style={{
                      border: "1px solid oklch(0.28 0.05 235)",
                      color: "var(--label-text)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--cyan)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.82 0.12 195 / 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--label-text)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.28 0.05 235)";
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/keerthana-siripuram/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="hero.linkedin.link"
                    className="p-2 rounded-lg transition-all"
                    style={{
                      border: "1px solid oklch(0.28 0.05 235)",
                      color: "var(--label-text)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--cyan)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.82 0.12 195 / 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--label-text)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.28 0.05 235)";
                    }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:keerthana.siripuram1201@gmail.com"
                    data-ocid="hero.email.link"
                    className="p-2 rounded-lg transition-all"
                    style={{
                      border: "1px solid oklch(0.28 0.05 235)",
                      color: "var(--label-text)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--cyan)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.82 0.12 195 / 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--label-text)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.28 0.05 235)";
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Right */}
              <div className="hidden lg:flex items-center justify-center">
                <HeroDecoration />
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          ref={(el) => {
            sectionRefs.current.about = el;
          }}
          className="py-24"
          style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <SectionTitle accent="Who I Am" title="About Me" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "var(--body-text)" }}
                >
                  I'm a results-driven Software Developer with{" "}
                  <strong className="text-white">2.5+ years</strong> of
                  experience building scalable, high-performance web
                  applications. I specialize in full-stack development with
                  React, Node.js, and NestJS.
                </p>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "var(--body-text)" }}
                >
                  I have strong expertise in developing responsive UIs,
                  designing RESTful APIs, and architecting microservices. I'm
                  experienced in distributed, asynchronous systems using{" "}
                  <strong className="text-white">AWS (S3, SQS)</strong> for
                  scalable cloud infrastructure.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--body-text)" }}
                >
                  Recently, I've expanded into{" "}
                  <strong className="text-white">Generative AI</strong>,
                  developing context-aware systems using RAG, LangChain, and LLM
                  APIs — building intelligent, AI-driven applications that push
                  the boundaries of what software can do.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                {[
                  {
                    icon: "🚀",
                    label: "2.5+ Years Experience",
                    sub: "Full-stack development",
                  },
                  {
                    icon: "🏢",
                    label: "IBM · Apty",
                    sub: "Enterprise product development",
                  },
                  {
                    icon: "🤖",
                    label: "Gen AI Enthusiast",
                    sub: "RAG · LangChain · LLM APIs",
                  },
                  {
                    icon: "☁️",
                    label: "Cloud Native",
                    sub: "AWS S3 · SQS · Kinesis",
                  },
                  {
                    icon: "🎓",
                    label: "B.Tech CSE — CGPA 8.3",
                    sub: "Sree Chaitanya College of Engg.",
                  },
                  {
                    icon: "📍",
                    label: "Hyderabad, India",
                    sub: "Open to remote & relocation",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all"
                    style={{
                      background: "oklch(0.18 0.05 235 / 0.6)",
                      border: "1px solid oklch(0.28 0.05 235)",
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {item.label}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--label-text)" }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section
          id="skills"
          ref={(el) => {
            sectionRefs.current.skills = el;
          }}
          className="py-24"
          style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <SectionTitle accent="What I Know" title="Technical Skills" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_CATEGORIES.map((cat, catIndex) => (
                <motion.div
                  key={cat.title}
                  data-ocid={`skills.${cat.title.toLowerCase().replace(/ /g, "_")}.card`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className="rounded-xl p-5"
                  style={{
                    background: "oklch(0.18 0.05 235 / 0.8)",
                    border: "1px solid oklch(0.28 0.05 235)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: "var(--cyan)" }}>{cat.icon}</span>
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `${skill.glow}`,
                          color: skill.color,
                          border: `1px solid ${skill.color}40`,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div
              className="mt-10 p-6 rounded-xl"
              style={{
                background: "oklch(0.18 0.05 235 / 0.6)",
                border: "1px solid oklch(0.28 0.05 235)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Java Assessment", issuer: "HackerRank" },
                  { name: "MERN Stack Development", issuer: "Udemy" },
                ].map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                    style={{
                      background: "oklch(0.82 0.12 195 / 0.08)",
                      border: "1px solid oklch(0.82 0.12 195 / 0.3)",
                    }}
                  >
                    <span className="text-sm" style={{ color: "var(--cyan)" }}>
                      🏅
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {cert.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--label-text)" }}
                      >
                        {cert.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section
          id="experience"
          ref={(el) => {
            sectionRefs.current.experience = el;
          }}
          className="py-24"
          style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <SectionTitle accent="Where I've Worked" title="Work Experience" />
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--cyan), oklch(0.28 0.05 235))",
                }}
              />
              <div className="space-y-8 pl-12">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    data-ocid={`experience.item.${i + 1}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-9 top-4 w-3 h-3 rounded-full"
                      style={{
                        background: exp.current
                          ? "var(--cyan)"
                          : "oklch(0.28 0.05 235)",
                        boxShadow: exp.current
                          ? "0 0 10px var(--cyan)"
                          : "none",
                        border: "2px solid oklch(0.13 0.04 240)",
                      }}
                    />
                    <div
                      className="p-5 rounded-xl transition-all"
                      style={{
                        background: "oklch(0.18 0.05 235 / 0.8)",
                        border: "1px solid oklch(0.28 0.05 235)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.82 0.12 195 / 0.4)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.28 0.05 235)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(0)";
                      }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className="text-sm font-semibold"
                              style={{ color: "var(--cyan)" }}
                            >
                              {exp.company}
                            </span>
                            <span style={{ color: "var(--label-text)" }}>
                              ·
                            </span>
                            <span
                              className="text-sm"
                              style={{ color: "var(--label-text)" }}
                            >
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {exp.current && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                background: "oklch(0.82 0.12 195 / 0.15)",
                                color: "var(--cyan)",
                                border: "1px solid oklch(0.82 0.12 195 / 0.3)",
                              }}
                            >
                              Current
                            </span>
                          )}
                          <span
                            className="text-sm"
                            style={{ color: "var(--label-text)" }}
                          >
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.bullets.map((b) => (
                          <li
                            key={b.slice(0, 40)}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--body-text)" }}
                          >
                            <ChevronRight
                              className="w-4 h-4 mt-0.5 flex-shrink-0"
                              style={{ color: "var(--cyan)" }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section
          id="projects"
          ref={(el) => {
            sectionRefs.current.projects = el;
          }}
          className="py-24"
          style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <SectionTitle accent="What I've Built" title="Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((proj, i) => (
                <motion.div
                  key={proj.title}
                  data-ocid={`projects.item.${i + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-6 rounded-xl flex flex-col gap-4 cursor-default transition-all duration-300"
                  style={{
                    background: "oklch(0.18 0.05 235 / 0.8)",
                    border: "1px solid oklch(0.28 0.05 235)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.82 0.12 195 / 0.4)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.35), 0 0 20px oklch(0.82 0.12 195 / 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.28 0.05 235)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.35)";
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {proj.highlight && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                          style={{
                            background: "oklch(0.82 0.12 195 / 0.12)",
                            color: "var(--cyan)",
                            border: "1px solid oklch(0.82 0.12 195 / 0.3)",
                          }}
                        >
                          {proj.highlight}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-white">
                        {proj.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`projects.item.${i + 1}.live.link`}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            border: "1px solid oklch(0.28 0.05 235)",
                            color: "var(--label-text)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--cyan)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--label-text)";
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid={`projects.item.${i + 1}.github.link`}
                          className="p-2 rounded-lg transition-colors"
                          style={{
                            border: "1px solid oklch(0.28 0.05 235)",
                            color: "var(--label-text)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--cyan)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--label-text)";
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--body-text)" }}
                  >
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.stack.map((tech, ti) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: `${proj.stackColors[ti] || "#39d5e6"}20`,
                          color: proj.stackColors[ti] || "#39d5e6",
                          border: `1px solid ${proj.stackColors[ti] || "#39d5e6"}40`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section
          id="education"
          ref={(el) => {
            sectionRefs.current.education = el;
          }}
          className="py-24"
          style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Education */}
              <div>
                <SectionTitle accent="Academic Background" title="Education" />
                <div className="space-y-4">
                  {EDUCATION.map((edu, i) => (
                    <motion.div
                      key={edu.institution}
                      data-ocid={`education.item.${i + 1}`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-xl"
                      style={{
                        background: "oklch(0.18 0.05 235 / 0.8)",
                        border: "1px solid oklch(0.28 0.05 235)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h3 className="font-bold text-white text-sm">
                            {edu.degree}
                          </h3>
                          <p
                            className="text-sm mt-0.5"
                            style={{ color: "var(--cyan)" }}
                          >
                            {edu.institution}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: "var(--label-text)" }}
                          >
                            {edu.period}
                          </p>
                        </div>
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-lg flex-shrink-0"
                          style={{
                            background: "oklch(0.82 0.12 195 / 0.12)",
                            color: "var(--cyan)",
                            border: "1px solid oklch(0.82 0.12 195 / 0.3)",
                          }}
                        >
                          {edu.score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div
                id="contact"
                ref={(el) => {
                  sectionRefs.current.contact = el;
                }}
              >
                <SectionTitle accent="Get In Touch" title="Contact" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--body-text)" }}
                  >
                    I'm currently open to new opportunities and collaborations.
                    Whether you have a project in mind or just want to say hello
                    — my inbox is always open!
                  </p>

                  <div className="space-y-3">
                    <a
                      href="mailto:keerthana.siripuram1201@gmail.com"
                      data-ocid="contact.email.link"
                      className="flex items-center gap-3 p-4 rounded-xl transition-all group"
                      style={{
                        background: "oklch(0.18 0.05 235 / 0.8)",
                        border: "1px solid oklch(0.28 0.05 235)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.82 0.12 195 / 0.4)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.28 0.05 235)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(0)";
                      }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: "oklch(0.82 0.12 195 / 0.15)",
                          color: "var(--cyan)",
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: "var(--label-text)" }}
                        >
                          Email
                        </div>
                        <div className="text-sm font-semibold text-white">
                          keerthana.siripuram1201@gmail.com
                        </div>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 ml-auto"
                        style={{ color: "var(--label-text)" }}
                      />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/keerthana-siripuram/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="contact.linkedin.link"
                      className="flex items-center gap-3 p-4 rounded-xl transition-all"
                      style={{
                        background: "oklch(0.18 0.05 235 / 0.8)",
                        border: "1px solid oklch(0.28 0.05 235)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.82 0.12 195 / 0.4)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.28 0.05 235)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(0)";
                      }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: "oklch(0.76 0.14 215 / 0.15)",
                          color: "oklch(0.76 0.14 215)",
                        }}
                      >
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: "var(--label-text)" }}
                        >
                          LinkedIn
                        </div>
                        <div className="text-sm font-semibold text-white">
                          keerthana-siripuram
                        </div>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 ml-auto"
                        style={{ color: "var(--label-text)" }}
                      />
                    </a>

                    <a
                      href="https://github.com/keerthanasiripuram"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="contact.github.link"
                      className="flex items-center gap-3 p-4 rounded-xl transition-all"
                      style={{
                        background: "oklch(0.18 0.05 235 / 0.8)",
                        border: "1px solid oklch(0.28 0.05 235)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.82 0.12 195 / 0.4)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "oklch(0.28 0.05 235)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "translateY(0)";
                      }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: "oklch(0.60 0.03 240 / 0.2)",
                          color: "var(--body-text)",
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div
                          className="text-xs font-medium"
                          style={{ color: "var(--label-text)" }}
                        >
                          GitHub
                        </div>
                        <div className="text-sm font-semibold text-white">
                          keerthanasiripuram
                        </div>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 ml-auto"
                        style={{ color: "var(--label-text)" }}
                      />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-6"
        style={{ borderTop: "1px solid oklch(0.28 0.05 235 / 0.5)" }}
      >
        <div
          className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
          style={{ color: "var(--label-text)" }}
        >
          <span>© {year} Keerthana Siripuram. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
            using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
