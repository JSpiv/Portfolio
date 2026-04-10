import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  text: "#1A1A1A",
  textMuted: "#6B6B6B",
  accent: "#2D2D2D",
  accentLight: "#E8E8E4",
  border: "#E5E5E0",
  tag: "#F0EFEB",
  handwritten: "#3A5A40",
  handwrittenBg: "#F5F0E8",
  cardHover: "#FDFCFA",
};

const PROJECTS = [
  {
    title: "Lyla",
    description:
      "We are developing an IOS app that provides insights for people with Type 1 Diabetes. We pair glucose data (from a CGM) with Apple Health activity and stress signals to conduct on device machine learning for advanced analyses. Backed by the MIT Sandbox Innovation Fund Program.",
    tech: ["Python", "Scikit-Learn", "NumPy"],
    url: "https://lylabiosciences.com/#why-lyla",
    image: null,
    badge: "Sandbox Funded",
  },
  {
    title: "ArgusAI",
    description:
      "Created an AI email assistant as a Chrome extension: natural-language inbox control with a FastAPI backend and Gemini built in. With privacy in mind, no email content stored server-side. Cleaning up the project in order to host live with per-user usage limits.",
    tech: ["Python", "FastAPI", "REST APIs", "Docker"],
    url: "https://github.com/JSpiv/ArgusAI",
    image: "/argus.png",
    badge: null,
  },
  {
    title: "Patent Search Engine",
    description:
      "This project was a timed exercise in which the goal was to create a functiioning patent searching tool (and to do it quickly!). Over about 2 hours, I put together a semantic retrieval system for a small corpus of patents using FAISS, optional graph-based random-walk reranking, and a Streamlit UI for queries.",
    tech: ["FAISS", "Streamlit", "Python"],
    url: "https://github.com/JSpiv/PatentSearchEngine",
    image: null,
    badge: null,
  },
  {
    title: "No-Show Rate Predictor",
    description:
      "Working with clincians out of Saint Louis, I demonstrated a method in which clinical data can be used to predict future no-show rates using thousands of synthetic data points. On this synthetic clinical data, I trained four model types (logistic regression, elastic net, random forest, and XGBoost) to predict appointment no-shows and wrote a brief sumamry of my results and recomendations for a future pipeline for the clinical study.",
    tech: ["Python", "Scikit-Learn"],
    url: "https://github.com/JSpiv/NoShowModelling",
    image: null,
    badge: null,
  },
];

const SCHOOL_WORK = [
  {
    title: "Snekoban",
    course: "6.1010 — Fundamentals of Programming",
    description:
      "I built a Sokoban-style puzzle game from scratch. It had grid-based state management, immutable board updates, and a BFS solver that finds the shortest winning sequence by searching over frozen game states. In this lab we continued to explore BFS and the importance of immutable data structures while creating a small but exciting game.",

    type: "project",
  },
  {
    title: "LISP Interpreter",
    course: "6.1010 — Fundamentals of Programming",
    description:
      "I designed a full Scheme interpreter written in Python across two parts. Tokenizer, recursive parser, scoped environments, user-defined functions, cons-cell linked lists, and special forms like let and set. In this lab, we put together many of the skills learned in 6.1010 (object-oriented programming, recursion, etc.) to implement a working interpreter. At the end, we even wrote and ran recursive Scheme programs in a working REPL (too many parenthesis)",

    type: "project",
  },
  {
    title: "SAT Solver",
    course: "6.1010 — Fundamentals of Programming",
    description:
      "I implemented a Boolean satisfiability solver using recursive backtracking on CNF formulas. We picked a literal, propagated, recurse, and backtracked on contradiction. In this lab, we continues to explore recursion and dove deep into recursive backtracking. In the end, we applied it to a real scheduling problem: encoding room assignments, student preferences, and capacity constraints as a CNF formula and letting the solver figure out the rest.",

    type: "project",
  },
  {
    title: "Image Deblurring & Hybrid Images",
    course: "18.C06 — Linear Algebra",
    description:
      "Using Julia, I applied linear algebra to image processing by building circular convolution matrices for blur and edge detection. The goal of this project was to create a hybrid image of 2 original images (Monroe and Einstein)where Einstein appears up close but resolves into Marilyn Monroe from a distance, which exploits how human vision processes spatial frequencies.",
    grade: "",
    type: "project",
    image: "/hybrid-image.png",
  },
];

const TECH_STACK = [
  "Python",
  "Next.js",
  "React",
  "PyTorch",
  "FAISS",
  "Streamlit",
  "TensorFlow",
  "Scikit-Learn",
  "NumPy",
  "SQL",
  "Docker",
  "FastAPI",
  "OpenCV",
  "R",
  "REST APIs",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${COLORS.border}`
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 20,
          color: COLORS.text,
          letterSpacing: "-0.02em",
        }}
      >
        My Work
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {["Projects", "Without AI", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            style={{
              color: COLORS.textMuted,
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = COLORS.text)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.textMuted)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 32px 80px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            color: COLORS.textMuted,
            marginBottom: 16,
            letterSpacing: "0.05em",
          }}
        >
          Hi, I'm
        </p>
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 400,
            color: COLORS.text,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          John Spivey
          <span
            style={{
              display: "block",
              color: COLORS.textMuted,
              fontSize: "clamp(24px, 4vw, 40px)",
              marginTop: 8,
            }}
          >
            Student-Athlete @ MIT
          </span>
        </h1>
      </div>

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}
      >
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 18,
            lineHeight: 1.7,
            color: COLORS.textMuted,
            maxWidth: 520,
            marginTop: 40,
          }}
        >
          I build things at the intersection of machine learning, artifical intelligence, and real-world
          problems ranging from medical imaging to athletic performance. I am a MIT varsity
          baseball player, CSAIL researcher, and founder of a Sandbox-funded
          startup.
        </p>

        <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
          {[
            { label: "GitHub", icon: "↗", href: "https://github.com/JSpiv" },
            {
              label: "LinkedIn",
              icon: "↗",
              href: "https://www.linkedin.com/in/john-spivey-281446341",
            },
            {
              label: "Email",
              icon: "↗",
              href: "mailto:jspiv3@mit.edu",
            },
            {
              label: "Resume",
              icon: "↓",
              href: "/resume.pdf",
              download: "resume.pdf",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                color: COLORS.text,
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: `1.5px solid ${COLORS.border}`,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = COLORS.text)}
              onMouseLeave={(e) => (e.target.style.borderColor = COLORS.border)}
            >
              {link.label} <span style={{ fontSize: 11 }}>{link.icon}</span>
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 64,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        {TECH_STACK.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: COLORS.textMuted,
              background: COLORS.tag,
              padding: "5px 12px",
              borderRadius: 4,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    if (!imageOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setImageOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageOpen]);

  return (
    <FadeIn delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: 32,
          border: `1px solid ${hovered ? "#CDCDC8" : COLORS.border}`,
          borderRadius: 12,
          background: hovered ? COLORS.cardHover : COLORS.surface,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "none",
          boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.04)" : "none",
          cursor: "default",
        }}
      >
        {project.badge && (
          <span
            style={{
              display: "inline-block",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              fontWeight: 600,
              color: COLORS.handwritten,
              background: "rgba(58,90,64,0.08)",
              padding: "3px 10px",
              borderRadius: 3,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {project.badge}
          </span>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 22,
              fontWeight: 400,
              color: COLORS.text,
              margin: 0,
            }}
          >
            {project.title}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: COLORS.textMuted,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {project.url.includes("github.com") ? "GitHub ↗" : "site ↗"}
              </a>
            )}
            {project.image && (
              <button
                type="button"
                onClick={() => setImageOpen(true)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  color: COLORS.textMuted,
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                image
              </button>
            )}
          </div>
        </div>
        {imageOpen && project.image && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project preview"
            onClick={() => setImageOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "min(90vw, 720px)", maxHeight: "90vh" }}
            >
              <button
                type="button"
                onClick={() => setImageOpen(false)}
                aria-label="Close preview"
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 18,
                  lineHeight: 1,
                  cursor: "pointer",
                  color: COLORS.text,
                }}
              >
                ×
              </button>
              <img
                src={project.image}
                alt={`${project.title} preview`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
        )}
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: COLORS.textMuted,
            margin: "0 0 20px",
          }}
        >
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: COLORS.textMuted,
                background: COLORS.tag,
                padding: "3px 10px",
                borderRadius: 3,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}
    >
      <FadeIn>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: COLORS.textMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Selected Work
        </p>
        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 36,
            fontWeight: 400,
            color: COLORS.text,
            margin: "0 0 48px",
            letterSpacing: "-0.02em",
          }}
        >
          Projects
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gap: 20 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function SchoolCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
    if (!imageOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setImageOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [imageOpen]);

  return (
    <FadeIn delay={index * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: 28,
          border: `1px solid ${hovered ? "#D5CFBF" : "#E0DBD0"}`,
          borderRadius: 10,
          background: hovered ? "#FAF7F0" : COLORS.handwrittenBg,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "none",
          boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.03)" : "none",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 8,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: COLORS.handwritten,
                background: "rgba(58,90,64,0.08)",
                padding: "2px 8px",
                borderRadius: 3,
              }}
            >
              {item.course}
            </span>
          </div>
          {item.grade && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.handwritten,
              }}
            >
              {item.grade}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            margin: "8px 0 10px",
          }}
        >
          <h3
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 19,
              fontWeight: 400,
              color: COLORS.text,
              margin: 0,
            }}
          >
            {item.title}
          </h3>
          {item.image && (
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: COLORS.textMuted,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                flexShrink: 0,
              }}
            >
              image
            </button>
          )}
        </div>
        {imageOpen && item.image && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project preview"
            onClick={() => setImageOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "min(90vw, 720px)", maxHeight: "90vh" }}
            >
              <button
                type="button"
                onClick={() => setImageOpen(false)}
                aria-label="Close preview"
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.surface,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 18,
                  lineHeight: 1,
                  cursor: "pointer",
                  color: COLORS.text,
                }}
              >
                ×
              </button>
              <img
                src={item.image}
                alt={`${item.title} preview`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
        )}
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: COLORS.textMuted,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </FadeIn>
  );
}

function WithoutAI() {
  return (
    <section
      id="without-ai"
      style={{
        padding: "80px 32px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <FadeIn>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: COLORS.handwritten,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
        </p>
        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 36,
            fontWeight: 400,
            color: COLORS.text,
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          Without AI
        </h2>
        <p
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: COLORS.textMuted,
            maxWidth: 560,
            marginBottom: 48,
          }}
        >
          This academic work was completed entirely on my own (no AI tools, no shortcuts).
        </p>
      </FadeIn>

      <div style={{ display: "grid", gap: 16 }}>
        {SCHOOL_WORK.map((item, i) => (
          <SchoolCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "80px 32px 120px", maxWidth: 900, margin: "0 auto" }}
    >
      <FadeIn>
        <div
          style={{
            padding: 48,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            background: COLORS.surface,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: COLORS.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 32,
              fontWeight: 400,
              color: COLORS.text,
              margin: "0 0 16px",
            }}
          >
            Let's build
          </h2>
          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 16,
              color: COLORS.textMuted,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            I am always open to new projects and good conversations.
          </p>
          <a
            href="mailto:jspiv3@mit.edu"
            style={{
              display: "inline-block",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 14,
              color: COLORS.surface,
              background: COLORS.accent,
              padding: "12px 32px",
              borderRadius: 8,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            jspiv3@mit.edu
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "24px 32px",
        borderTop: `1px solid ${COLORS.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: COLORS.textMuted,
        }}
      >
        © 2026
      </span>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: COLORS.textMuted,
        }}
      >
        John Spivey
      </span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:ital,wght@0,400;0,500;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; }
        ::selection { background: ${COLORS.accentLight}; }
        a:hover { opacity: 0.8; }
      `}</style>
      <Nav />
      <Hero />
      <Projects />
      <WithoutAI />
      <Contact />
      <Footer />
    </>
  );
}
