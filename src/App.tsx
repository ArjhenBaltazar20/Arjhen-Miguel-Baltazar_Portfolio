import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Theme = "light" | "dark";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#credentials" },
];

const skills = [
  {
    number: "01",
    title: "UI/UX Design",
    note: "I design clear flows before pretty screens.",
    tools: ["Figma", "Wireframes", "Prototypes", "User flows"],
  },
  {
    number: "02",
    title: "Web Development",
    note: "I turn ideas into responsive, working interfaces.",
    tools: ["React", "JavaScript", "HTML/CSS", "Responsive UI"],
  },
  {
    number: "03",
    title: "Data Analysis",
    note: "I use data to ask better questions and explain patterns.",
    tools: ["SQL", "Data cleaning", "Dashboards", "Insights"],
  },
  {
    number: "04",
    title: "Tools & Platforms",
    note: "I version my work and use AI tools to prototype and debug faster.",
    tools: ["Git/GitHub", "VS Code", "Claude", "ChatGPT", "Cursor", "GitHub Copilot"],
  },
  {
    number: "05",
    title: "Design & Digital Media",
    note: "I keep visuals consistent, lightweight, and ready to ship.",
    tools: ["Layout prototyping", "UI design systems", "Asset optimization", "Vector icons"],
  },
];

const certificates = [
  {
    title: "SQL Intermediate",
    issuer: "SoloLearn",
    image: "/assets/certificates/sql-intermediate.webp",
    url: "https://www.sololearn.com/certificates/CC-L4HHLS8K",
  },
  {
    title: "Introduction to SQL",
    issuer: "SoloLearn",
    image: "/assets/certificates/sql-introduction.webp",
    url: "https://www.sololearn.com/certificates/CC-1BYSIO15",
  },
  {
    title: "Introduction to C++",
    issuer: "SoloLearn",
    image: "/assets/certificates/cpp-introduction.webp",
    url: "https://www.sololearn.com/certificates/CC-HVZ0ETEV",
  },
];

const projects = [
  {
    number: "01",
    title: "Shallow Sleep",
    category: "2D Visual Novel · Academic Project",
    year: "2024",
    description:
      "A 2D interactive visual novel built with Pygame. The project brings together narrative flow, environmental art, character design, interface decisions, and Python logic to turn a story concept into a playable experience.",
    contribution:
      "The work challenged our team to connect visual storytelling with technical implementation while keeping every scene consistent with the game’s unsettling atmosphere.",
    tags: ["Python", "Pygame", "Game UI", "Visual storytelling"],
    images: [
      {
        src: "/assets/projects/shallow-sleep-lobby.webp",
        alt: "Shallow Sleep lobby scene with a reception desk, vending machine, and elevator",
      },
      {
        src: "/assets/projects/shallow-sleep-fire-scene.webp",
        alt: "Shallow Sleep room scene showing the environment on fire",
      },
      {
        src: "/assets/projects/shallow-sleep-exit.webp",
        alt: "Shallow Sleep hallway scene with an exit door",
      },
      {
        src: "/assets/projects/shallow-sleep-characters.webp",
        alt: "Character lineup created for the Shallow Sleep visual novel",
      },
    ],
    tone: "game",
  },
  {
    number: "02",
    title: "CT Laboratory Information System",
    category: "UI/UX Design · Group Project",
    year: "2024",
    description:
      "CT Laboratory Information System is a group project exploring how to make laboratory work easier to manage. Designed for students, professors, and technicians, it brings role-based access, request submission and tracking, and a dashboard for monitoring laboratory activity into one interface.",
    contribution:
      "We focused on organizing complex laboratory tasks into understandable role-based flows and building a consistent Figma component system for the interface.",
    tags: ["Figma", "Role-based UX", "Dashboard", "Design system"],
    images: [
      {
        src: "/assets/projects/ct-lab-login.webp",
        alt: "CT Laboratory Information System student login screen",
      },
      {
        src: "/assets/projects/ct-lab-dashboard.webp",
        alt: "CT Laboratory Information System inventory dashboard",
      },
      {
        src: "/assets/projects/ct-lab-dialogs.webp",
        alt: "Success, request submitted, and restricted access dialogs for the laboratory system",
      },
      {
        src: "/assets/projects/ct-lab-components.webp",
        alt: "Figma component library for the CT Laboratory Information System",
      },
    ],
    tone: "lab",
  },
  {
    number: "03",
    title: "CiTracker",
    category: "Web + Android · Academic System",
    year: "2025",
    description:
      "CiTracker is a web and Android academic tracking system for CompTech students and professors. It streamlines attendance, class management, grading, and student requests, with NFC-based attendance scanning and dashboards tailored to each role.",
    contribution:
      "The project explores how one system can support different academic workflows while keeping the mobile experience direct, familiar, and easy to scan.",
    tags: ["Android", "Web app", "NFC attendance", "Role dashboards"],
    images: [
      {
        src: "/assets/projects/citracker-dashboard.webp",
        alt: "CiTracker student dashboard with grades, attendance, and upcoming activities",
      },
      {
        src: "/assets/projects/citracker-login.webp",
        alt: "CiTracker mobile login screen for CompTech accounts",
      },
      {
        src: "/assets/projects/citracker-web-login.webp",
        alt: "CiTracker web sign-in landing page for the Industrial Technology workspace",
      },
      {
        src: "/assets/projects/citracker-professor-dashboard.webp",
        alt: "CiTracker professor dashboard showing classes, assessments, and concerns",
      },
    ],
    tone: "tracker",
  },
  {
    number: "04",
    title: "Laboratory Security System",
    category: "Embedded System · Group Project",
    year: "2025",
    description:
      "An embedded-systems project created to demonstrate our team’s technical skills and ideas through a practical laboratory security concept.",
    contribution:
      "The prototype combines an ESP32 with ultrasonic presence detection, gas sensing, temperature and humidity monitoring, an alert buzzer, and an I2C display for visible system status.",
    tags: ["ESP32", "Sensors", "Embedded systems", "Security concept"],
    images: [
      {
        src: "/assets/projects/lab-security-prototype.webp",
        alt: "Laboratory Security System prototype components including ESP32, ultrasonic sensor, gas sensor, DHT11, buzzer, and LCD",
      },
    ],
    tone: "security",
    pending: "The finished laboratory security model is coming soon.",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className="icon" fill="none" viewBox="0 0 20 20">
      {diagonal ? (
        <>
          <path d="M5 15 15 5" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M7.5 5H15v7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </>
      ) : (
        <>
          <path d="M3 10h13" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="m12 6 4 4-4 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </>
      )}
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "light" ? (
    <svg aria-hidden="true" className="theme-icon" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.7 15.3A9 9 0 0 1 8.7 3.3 9 9 0 1 0 20.7 15.3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  ) : (
    <svg aria-hidden="true" className="theme-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function SectionLabel({ children, index }: { children: React.ReactNode; index: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span className="section-label-line" />
      {children}
    </div>
  );
}

function ProjectGallery({
  images,
  title,
  tone,
  pending,
}: {
  images: Array<{ src: string; alt: string }>;
  title: string;
  tone: string;
  pending?: string;
}) {
  const [active, setActive] = useState(0);
  const showPrevious = () => setActive((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActive((current) => (current + 1) % images.length);

  return (
    <div className={`case-gallery case-gallery-${tone}`}>
      <div className="case-gallery-topline">
        <span>PROJECT GALLERY</span>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <button
        aria-label={`Show next ${title} image`}
        className="case-gallery-stage"
        onClick={showNext}
        type="button"
      >
        <img
          alt={images[active].alt}
          decoding="async"
          key={images[active].src}
          loading="lazy"
          src={images[active].src}
        />
        {images.length > 1 ? (
          <span className="gallery-advance">
            Click to advance <ArrowIcon />
          </span>
        ) : null}
      </button>
      <div className="gallery-controls">
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              aria-label={`Show ${title} image ${index + 1}`}
              aria-pressed={active === index}
              className={active === index ? "is-active" : ""}
              key={image.src}
              onClick={() => setActive(index)}
              type="button"
            >
              <img alt="" decoding="async" loading="lazy" src={image.src} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
          {pending ? (
            <div className="gallery-pending" title={pending}>
              <span>+</span>
              <small>more soon</small>
            </div>
          ) : null}
        </div>
        {images.length > 1 ? (
          <div className="gallery-arrows">
            <button aria-label="Previous image" onClick={showPrevious} type="button">
              ←
            </button>
            <button aria-label="Next image" onClick={showNext} type="button">
              →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectCaseStudy({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className={`case-study ${index % 2 === 1 ? "is-reversed" : ""}`} data-reveal>
      <div className="case-study-copy">
        <div className="case-study-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div>
          <span className="case-study-number">{project.number}</span>
          <h3>{project.title}</h3>
          <p className="case-study-description">{project.description}</p>
          <div className="case-study-insight">
            <span>WHAT WE EXPLORED</span>
            <p>{project.contribution}</p>
          </div>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="repo-note">
            <span aria-hidden="true">🔒</span>
            <span>
              <strong>Source code:</strong> This repository is private.{" "}
              <a
                href={`mailto:arjhennmiguelbaltazar@gmail.com?subject=${encodeURIComponent(
                  `Repository access request: ${project.title}`,
                )}`}
              >
                Make a request for access
              </a>
              .
            </span>
          </p>
        </div>
        <a className="project-link" href="#contact">
          Ask me about this project <ArrowIcon diagonal />
        </a>
      </div>
      <ProjectGallery
        images={project.images}
        pending={"pending" in project ? project.pending : undefined}
        title={project.title}
        tone={project.tone}
      />
    </article>
  );
}

function DraggableSticker({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className: string;
  label: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const drag = useRef({ active: false, startX: 0, startY: 0, x: 0, y: 0 });

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    drag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      x: position.x,
      y: position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.current.active) return;
    setPosition({
      x: drag.current.x + event.clientX - drag.current.startX,
      y: drag.current.y + event.clientY - drag.current.startY,
    });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    drag.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 20 : 8;
    const next = { ...position };
    if (event.key === "ArrowLeft") next.x -= step;
    else if (event.key === "ArrowRight") next.x += step;
    else if (event.key === "ArrowUp") next.y -= step;
    else if (event.key === "ArrowDown") next.y += step;
    else if (event.key === "Escape") {
      next.x = 0;
      next.y = 0;
    } else return;
    event.preventDefault();
    setPosition(next);
  };

  return (
    <button
      aria-label={`${label}. Drag with pointer or move with arrow keys. Press Escape to reset.`}
      className={`draggable-sticker ${className}`}
      data-drag
      onDoubleClick={() => setPosition({ x: 0, y: 0 })}
      onKeyDown={onKeyDown}
      onPointerCancel={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      type="button"
    >
      {children}
    </button>
  );
}

function CursorTrail() {
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const points = Array.from({ length: 6 }, () => ({ x: -100, y: -100 }));
    let target = { x: -100, y: -100 };
    let active = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target = { x: event.clientX, y: event.clientY };
    };
    const onOver = (event: PointerEvent) => {
      const targetElement = event.target as Element;
      active = Boolean(targetElement.closest("a, button, [data-cursor='creative']"));
      trailRefs.current.forEach((node) => node?.classList.toggle("is-active", active));
    };
    const animate = () => {
      points.forEach((point, index) => {
        const destination = index === 0 ? target : points[index - 1];
        const ease = index === 0 ? 0.3 : 0.22;
        point.x += (destination.x - point.x) * ease;
        point.y += (destination.y - point.y) * ease;
        const node = trailRefs.current[index];
        if (node) node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      });
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-trail">
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          className="cursor-trail-dot"
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          style={{ opacity: 1 - index * 0.14, scale: `${1 - index * 0.1}` }}
        />
      ))}
    </div>
  );
}

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;
    const startMusic = () => {
      void audio.play();
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
    };

    void audio.play().catch(() => {
      window.addEventListener("pointerdown", startMusic, { once: true });
      window.addEventListener("keydown", startMusic, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
      audio.pause();
    };
  }, []);

  return (
    <audio
      aria-hidden="true"
      autoPlay
      loop
      preload="auto"
      ref={audioRef}
      src="/assets/audio/nomyn-elsewhere.mp3"
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem("arjhen-theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("arjhen-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <CursorTrail />
      <BackgroundMusic />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a
            aria-label="Arjhen Miguel Baltazar, home"
            className="brand"
            href="#top"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark brand-profile">
              <img alt="" src="/assets/arjhen-formal.webp" />
            </span>
            <span className="brand-copy">
              <strong>Arjhen Miguel Baltazar</strong>
              <small>Design · Code · Data</small>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="desktop-nav">
            {navItems.map((item) => (
              <a className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              type="button"
            >
              <ThemeIcon theme={theme} />
            </button>
            <a className="header-cta" href="#contact">
              Hire an intern <ArrowIcon />
            </a>
            <button
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              <span>05</span>
              Let&apos;s work together
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <div className="availability-pill">
                <span className="status-dot" />
                Available for OJT · 2nd Semester, Nov 2026 – Apr 2027
              </div>
              <p className="eyebrow">
                UI/UX Designer · Web Developer · Data Analyst Intern
              </p>
              <h1>
                Learning fast.
                <br />
                Building with <span className="scribble">purpose.</span>
              </h1>
              <p className="hero-intro">
                Hi, I&apos;m <strong>Arjhen Miguel Baltazar</strong>, an aspiring UI/UX designer,
                web developer, and data analyst who turns curiosity into thoughtful digital work.
              </p>
              <div className="hero-actions">
                <a className="button button-primary magnetic" href="#work">
                  See what I&apos;ve built <ArrowIcon />
                </a>
                <a className="text-link" href="#about">
                  Meet the person behind the pixels <ArrowIcon diagonal />
                </a>
              </div>
              <div className="document-actions" aria-label="Download application documents">
                <a download href="/documents/arjhen-baltazar-resume.pdf">
                  Download Resume <ArrowIcon diagonal />
                </a>
                <a download href="/documents/arjhen-baltazar-cv.pdf">
                  Download CV <ArrowIcon diagonal />
                </a>
              </div>
              <div className="hero-proof" aria-label="Internship details">
                <div>
                  <strong>600 hrs</strong>
                  <span>target training hours</span>
                </div>
                <div>
                  <strong>Nov–Apr</strong>
                  <span>2nd Semester, 2026–2027</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>target roles</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" data-cursor="creative" data-reveal>
              <div className="photo-window">
                <div className="window-bar">
                  <div className="window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span>arjhen-outdoors.jpg</span>
                  <span>01</span>
                </div>
                <div className="photo-wrap">
                  <img alt="Arjhen Baltazar sitting outdoors" src="/assets/arjhen-hero.webp" />
                  <div className="photo-gradient" />
                  <p className="photo-caption">
                    Ready to learn, contribute, and grow with the right team.
                  </p>
                </div>
              </div>

              <DraggableSticker className="music-sticker" label="Currently playing card">
                <span className="sticker-kicker">CURRENTLY PLAYING</span>
                <span className="track-row">
                  <span className="album-art">AB</span>
                  <span>
                    <strong>Focus Mode</strong>
                    <small>Arjhen&apos;s mix</small>
                  </span>
                  <span className="equalizer" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
                <span className="progress-track">
                  <span />
                </span>
              </DraggableSticker>

              <DraggableSticker className="coffee-sticker" label="Coffee fueled card">
                <span className="coffee-cup" aria-hidden="true">
                  <i />
                </span>
                <span>
                  <strong>Powered by</strong>
                  <small>coffee + curiosity</small>
                </span>
              </DraggableSticker>

              <div className="drag-hint">
                <span>↖</span> try dragging the cards
              </div>
            </div>
          </div>

          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              <span>UI/UX DESIGN</span>
              <i /> <span>WEB DEVELOPMENT</span>
              <i />
              <span>DATA ANALYSIS</span>
              <i /> <span>CURIOUS MIND</span>
              <i />
              <span>UI/UX DESIGN</span>
              <i /> <span>WEB DEVELOPMENT</span>
              <i />
              <span>DATA ANALYSIS</span>
              <i /> <span>CURIOUS MIND</span>
              <i />
            </div>
          </div>
        </section>

        <section className="section intro-section" id="about">
          <div className="container">
            <SectionLabel index="01">A quick introduction</SectionLabel>
            <div className="intro-layout">
              <div className="intro-heading" data-reveal>
                <p className="hand-note">more than a résumé</p>
                <h2>
                  I&apos;m early in my career,
                  <br />
                  <span>not short on ambition.</span>
                </h2>
              </div>
              <div className="intro-content" data-reveal>
                <p className="lead">
                  I&apos;m a Computer Technology student at the College of Industrial Technology
                  who likes the space where
                  <strong> design, technology, and real people meet.</strong>
                </p>
                <p>
                  At CIT, I&apos;ve designed, built, and analyzed academic systems, from Figma
                  prototypes and responsive web apps to Android tools and embedded prototypes. I
                  work with care, take feedback well, and finish what I start. As an OJT intern, I
                  want to help a partner company ship clear, usable interfaces and make sense of its
                  data, while learning from experienced teammates.
                </p>

                <dl className="academic-card" aria-label="Academic background">
                  <div>
                    <dt>Degree</dt>
                    <dd>Bachelor of Industrial Technology</dd>
                  </div>
                  <div>
                    <dt>Major</dt>
                    <dd>Computer Technology</dd>
                  </div>
                  <div>
                    <dt>Institution</dt>
                    <dd>Bulacan State University – College of Industrial Technology</dd>
                  </div>
                  <div>
                    <dt>Expected graduation</dt>
                    <dd>2027</dd>
                  </div>
                </dl>

                <div className="competencies">
                  <span className="competencies-label">Core competencies</span>
                  <ul>
                    <li>
                      <strong>UI/UX prototyping:</strong> turning requirements into user flows,
                      wireframes, and Figma prototypes
                    </li>
                    <li>
                      <strong>Responsive front-end development:</strong> building and debugging
                      interfaces with React, HTML, CSS, and JavaScript
                    </li>
                    <li>
                      <strong>Data analysis with SQL:</strong> cleaning data and turning queries into
                      clear insights
                    </li>
                    <li>
                      <strong>AI-assisted development and version control:</strong> rapid
                      prototyping with AI tools and managing code with Git/GitHub
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="about-collage" data-reveal>
              <div className="about-photo-card" data-cursor="creative">
                <div className="tape tape-one" />
                <img
                  alt="Arjhen Baltazar sitting beside a window"
                  src="/assets/arjhen-sitting.webp"
                />
                <p>Curious on and off the clock.</p>
              </div>
              <div className="manifesto-card">
                <span className="card-index">MY WORKING NOTES</span>
                <blockquote>
                  “Make it clear.
                  <br />
                  Make it useful.
                  <br />
                  Then make it memorable.”
                </blockquote>
                <span className="signature">— Arjhen</span>
              </div>
              <div className="mini-note note-one">
                <span>NOW LEARNING</span>
                Better product thinking
              </div>
              <div className="mini-note note-two">
                <span>BASED IN</span>
                Philippines
              </div>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <SectionLabel index="02">Selected work</SectionLabel>
            <div className="section-heading-row" data-reveal>
              <h2>Projects shaped by teamwork and curiosity.</h2>
              <p>
                A closer look at the games and systems I helped imagine, design, and build during my
                academic journey.
              </p>
            </div>

            <div className="case-study-list">
              {projects.map((project, index) => (
                <ProjectCaseStudy index={index} key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container">
            <SectionLabel index="03">What I bring</SectionLabel>
            <div className="skills-layout">
              <div className="skills-intro" data-reveal>
                <p className="hand-note">a useful mix</p>
                <h2>Three lenses. One growing toolkit.</h2>
                <p className="skills-note">Plus the tools and design craft behind them.</p>
                <p>
                  I can think about the user, understand the implementation, and stay curious about
                  what the data says.
                </p>
              </div>
              <div className="skills-list">
                {skills.map((skill) => (
                  <article className="skill-row" data-reveal key={skill.number}>
                    <span className="skill-number">{skill.number}</span>
                    <div>
                      <h3>{skill.title}</h3>
                      <p>{skill.note}</p>
                    </div>
                    <div className="skill-tools">
                      {skill.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <span className="skill-arrow">
                      <ArrowIcon diagonal />
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section credentials-section" id="credentials">
          <div className="container">
            <SectionLabel index="04">Learning receipts</SectionLabel>
            <div className="section-heading-row" data-reveal>
              <h2>Proof that I keep showing up.</h2>
              <p>
                Certifications are one part of my learning journey. The bigger goal is applying each
                lesson to something real.
              </p>
            </div>
            <div className="certificate-grid">
              {certificates.map((certificate, index) => (
                <a
                  aria-label={`View verified ${certificate.title} certificate on SoloLearn`}
                  className="certificate-card"
                  data-reveal
                  href={certificate.url}
                  key={certificate.title}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="certificate-image">
                    <img
                      alt={`${certificate.title} certificate`}
                      decoding="async"
                      loading="lazy"
                      src={certificate.image}
                    />
                    <span>0{index + 1}</span>
                  </div>
                  <div className="certificate-copy">
                    <div>
                      <span>{certificate.issuer}</span>
                      <h3>{certificate.title}</h3>
                    </div>
                    <span className="circle-link">
                      <ArrowIcon diagonal />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-noise" />
          <div className="container contact-inner" data-reveal>
            <p className="contact-kicker">
              INTERESTED IN BRINGING ME ONTO YOUR TEAM FOR OJT? LET&apos;S CONNECT.
            </p>
            <h2>
              Let&apos;s turn my potential
              <br />
              into <span>real impact.</span>
            </h2>
            <p>
              If you&apos;re looking for a curious, coachable intern who cares about both the
              details and the people using the product, I&apos;d love to hear from you.
            </p>
            <a
              className="button contact-button"
              href="mailto:arjhennmiguelbaltazar@gmail.com?subject=Internship%20Opportunity"
            >
              Start a conversation <ArrowIcon diagonal />
            </a>
            <dl className="contact-details" aria-label="Quick contact details">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:arjhennmiguelbaltazar@gmail.com">
                    arjhennmiguelbaltazar@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href="https://www.linkedin.com/in/arjhen-baltazar" rel="noreferrer" target="_blank">
                    linkedin.com/in/arjhen-baltazar
                  </a>
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href="https://github.com/ArjhenBaltazar20" rel="noreferrer" target="_blank">
                    github.com/ArjhenBaltazar20
                  </a>
                </dd>
              </div>
              <div>
                <dt>Preferred deployment</dt>
                <dd>Malolos / Bulacan / Metro Manila / Pampanga / Remote</dd>
              </div>
            </dl>
            <div className="contact-footer">
              <span>Available for OJT · 600 hours</span>
              <span>2nd Semester · Nov 2026 – Apr 2027</span>
              <span>Replies with coffee in hand</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-contact-stage">
          <div className="footer-contact-heading">
            <span>CONTACT / CONNECT</span>
            <p>Find me in these corners of the internet.</p>
          </div>
          <div className="footer-contact-links">
            <a
              className="footer-contact-card footer-contact-email"
              href="mailto:arjhennmiguelbaltazar@gmail.com"
            >
              <span>GMAIL</span>
              <strong>arjhennmiguelbaltazar@gmail.com</strong>
              <ArrowIcon diagonal />
            </a>
            <a
              className="footer-contact-card footer-contact-github"
              href="https://github.com/ArjhenBaltazar20"
              rel="noreferrer"
              target="_blank"
            >
              <span>GITHUB</span>
              <strong>@ArjhenBaltazar20</strong>
              <ArrowIcon diagonal />
            </a>
            <a
              className="footer-contact-card footer-contact-linkedin"
              href="https://www.linkedin.com/in/arjhen-baltazar"
              rel="noreferrer"
              target="_blank"
            >
              <span>LINKEDIN</span>
              <strong>/in/arjhen-baltazar</strong>
              <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">AB</span>
            <span className="brand-copy">
              <strong>Arjhen Miguel Baltazar</strong>
              <small>Design · Code · Data</small>
            </span>
          </a>
          <div className="footer-legal">
            <p>© 2026 Arjhen Miguel Baltazar. All Rights Reserved.</p>
            <p>College of Industrial Technology, Bulacan State University</p>
          </div>
          <a className="back-top" href="#top">
            Back to top <span>↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
