import React from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Coffee,
  Database,
  FileCheck,
  Gauge,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Menu,
  Monitor,
  Package,
  Play,
  RefreshCw,
  Route,
  Search,
  Server,
  ShieldCheck,
  ShieldOff,
  Terminal,
  TestTube2,
  Users,
  X,
  XCircle,
} from "lucide-react";
import "./styles.css";

const slides = [
  {
    id: "cover",
    label: "Portada",
    section: "Inicio",
    icon: ShieldCheck,
    title: "Laboratorio de Seguridad",
    subtitle: "Flujo DevSecOps sobre aplicacion Node.js",
    notes:
      "Se presenta un pipeline DevSecOps integral que integra seguridad en cada etapa del ciclo CI/CD. El proyecto implementa analisis de dependencias, pruebas unitarias, proteccion de rama principal y despliegue automatizado hacia GitHub Pages.",
    render: (props) => <CoverSlide {...props} />,
  },
  {
    id: "intro",
    label: "Introduccion",
    section: "Contexto",
    icon: BookOpen,
    title: "Introduccion y roles del equipo",
    notes:
      "Explicar que el flujo DevSecOps integra seguridad en la etapa de implementacion del artefacto CI/CD. Cada integrante tiene un rol claro: Moises como Product Designer, Carlos en Frontend, Denise y David en Seguridad, y Mesias como Solution Manager con CI/CD.",
    render: (props) => <IntroSlide {...props} />,
  },
  {
    id: "architecture",
    label: "Arquitectura",
    section: "Diseno",
    icon: Layers,
    title: "Arquitectura del proyecto",
    notes:
      "El proyecto usa Node.js con arquitectura monolitica sencilla. Los componentes core son: package.json, src/index.js (API REST), src/riskChecker.js (motor de reglas), __tests__ (Jest), public/index.html (dashboard) y .github/workflows/devsecops.yml (pipeline).",
    render: (props) => <ArchitectureSlide {...props} />,
  },
  {
    id: "logic",
    label: "Logica de Analisis",
    section: "Implementacion",
    icon: Gauge,
    title: "Security Risk Ratio",
    notes:
      "El motor calcula R = V / D, donde V son vulnerabilidades activas y D el total de dependencias. Se clasifica en tres umbrales: Risk Low (R=0, cero vulnerabilidades), Risk Medium (0 < R < 0.2, deuda tecnica manejable) y Risk High (R >= 0.2, superficie de ataque inaceptable).",
    render: (props) => <LogicSlide {...props} />,
  },
  {
    id: "ci-security",
    label: "Seguridad en CI",
    section: "DevSecOps",
    icon: GitBranch,
    title: "Integracion Continua con seguridad",
    notes:
      "El workflow devsecops.yml se ejecuta en push a main y en Pull Requests. El job build_and_test instala dependencias con npm ci y ejecuta pruebas con npm test. El job security_scan usa npm audit --audit-level=high como puerta de control que bloquea el despliegue si detecta vulnerabilidades altas o criticas.",
    render: (props) => <CISecuritySlide {...props} />,
  },
  {
    id: "incident",
    label: "Incidente Lodash",
    section: "DevSecOps",
    icon: AlertTriangle,
    title: "Identificacion y correccion de vulnerabilidad",
    notes:
      "El pipeline detecto una version insegura de lodash (< 4.17.21) con riesgo de DoS e inyeccion de prototipos. El job security_scan se marco en rojo, bloqueando el progreso. Se actualizo package.json a la version 4.17.21 y se ejecuto npm install para sincronizar package-lock.json.",
    render: (props) => <IncidentSlide {...props} />,
  },
  {
    id: "cd",
    label: "CD",
    section: "DevSecOps",
    icon: Server,
    title: "Despliegue Continuo a GitHub Pages",
    notes:
      "El job deploy depende de security_scan via needs: [security_scan]. Solo se activa tras pasar pruebas y escaneo de seguridad en main. El flujo ejecuta npm run build, empaqueta con upload-pages-artifact@v3 y publica con deploy-pages@v4 en GitHub Pages.",
    render: (props) => <CDSlide {...props} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    section: "Monitoreo",
    icon: Monitor,
    title: "Dashboard y resultados",
    notes:
      "La aplicacion cuenta con un dashboard interactivo en public/index.html que consume de forma asincrona la API REST expuesta por src/index.js. Muestra en tiempo real el Security Risk Ratio, estado CI, seguridad y CD, permitiendo toma de decisiones rapida sin revisar logs.",
    render: (props) => <DashboardSlide {...props} />,
  },
  {
    id: "cu01",
    label: "CU-01",
    section: "Casos de Uso",
    icon: GitBranch,
    title: "CU-01: Control de cambios mediante PR",
    notes:
      "Garantiza que ningun cambio se integre directamente en main sin pasar por rama de trabajo, Pull Request, revision y validaciones automaticas. El pipeline se ejecuta al crear/actualizar un PR y la rama main tiene reglas de proteccion.",
    render: (props) => <CU01Slide {...props} />,
  },
  {
    id: "cu02",
    label: "CU-02",
    section: "Casos de Uso",
    icon: TestTube2,
    title: "CU-02: Validacion con pruebas unitarias en CI",
    notes:
      "Verifica en CI que la logica de riesgo en riskChecker se mantiene correcta mediante pruebas unitarias con Jest. Si las pruebas pasan, el workflow continua con security_scan; si fallan, los jobs posteriores no se ejecutan.",
    render: (props) => <CU02Slide {...props} />,
  },
  {
    id: "cu03",
    label: "CU-03",
    section: "Casos de Uso",
    icon: Search,
    title: "CU-03: Deteccion de vulnerabilidades",
    notes:
      "El sistema compara las dependencias con la base de datos CVE/NVD. Si encuentra una vulnerabilidad grave, detiene el proceso, notifica cual libreria falla y bloquea el despliegue hasta que se corrija con una version segura.",
    render: (props) => <CU03Slide {...props} />,
  },
  {
    id: "cu04",
    label: "CU-04",
    section: "Casos de Uso",
    icon: Play,
    title: "CU-04: Despliegue automatico a GitHub Pages",
    notes:
      "Automatiza el despliegue seguro hacia GitHub Pages. Solo se publica codigo que haya pasado pruebas unitarias y escaneo de seguridad. Las reglas de proteccion de rama y la directiva needs garantizan que ningun artefacto inseguro llegue a produccion.",
    render: (props) => <CU04Slide {...props} />,
  },
  {
    id: "cu05",
    label: "CU-05",
    section: "Casos de Uso",
    icon: BarChart3,
    title: "CU-05: Visualizacion del estado DevSecOps",
    notes:
      "El dashboard centraliza en tiempo real la salud del proyecto (CI, seguridad y CD). Muestra el Security Risk Ratio y confirma la integracion de la cadena DevSecOps con indicadores visuales de cada etapa del pipeline.",
    render: (props) => <CU05Slide {...props} />,
  },
  {
    id: "ia",
    label: "Uso de IA",
    section: "Proceso",
    icon: Code2,
    title: "Declaracion de uso de IA",
    notes:
      "Se uso IA para estructurar el informe tecnico, distribuir tareas entre los 5 integrantes, redactar los 5 casos de uso con formato estandar y generar los diagramas PlantUML de los casos de uso CU-01 y CU-03 con reglas de diseno profesional.",
    render: (props) => <IASlide {...props} />,
  },
  {
    id: "defense",
    label: "Defensa",
    section: "Cierre",
    icon: Play,
    title: "Guion para defender",
    notes:
      "Cada integrante puede tomar un bloque: Mesias abre con CI/CD y despliegue, Denise y David cubren seguridad y vulnerabilidades, Carlos habla del dashboard frontend, Moises presenta arquitectura y diseno. Cerrar con el flujo completo DevSecOps funcionando.",
    render: (props) => <DefenseSlide {...props} />,
  },
];

function getIndexFromHash() {
  const hash = window.location.hash.replace("#", "");
  const found = slides.findIndex((slide) => slide.id === hash);
  return found >= 0 ? found : 0;
}

function App() {
  const [index, setIndex] = React.useState(getIndexFromHash);
  const [direction, setDirection] = React.useState(1);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);
  const active = slides[index];

  const goTo = React.useCallback(
    (nextIndex) => {
      if (nextIndex < 0 || nextIndex >= slides.length || nextIndex === index) return;
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
      window.history.replaceState(null, "", `#${slides[nextIndex].id}`);
      setMenuOpen(false);
    },
    [index],
  );

  const next = React.useCallback(() => goTo(Math.min(index + 1, slides.length - 1)), [goTo, index]);
  const prev = React.useCallback(() => goTo(Math.max(index - 1, 0)), [goTo, index]);

  React.useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        prev();
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
      if (event.key.toLowerCase() === "n") setNotesOpen((value) => !value);
      if (event.key === "Escape") {
        setMenuOpen(false);
        setNotesOpen(false);
        setLightbox(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev]);

  React.useEffect(() => {
    const onHashChange = () => {
      const nextIndex = getIndexFromHash();
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [index]);

  return (
    <div className="deck-shell">
      <DeckRail activeIndex={index} onSelect={goTo} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="stage">
        <header className="deck-topbar">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir indice">
            <Menu size={21} />
          </button>
          <div className="brand-mini">
            <ShieldCheck size={34} color="#22c55e" />
            <span>Laboratorio de Seguridad</span>
          </div>
          <div className="topbar-actions">
            <button className="text-button" onClick={() => setNotesOpen((value) => !value)}>
              Notas
            </button>
            <span className="counter">{String(index + 1).padStart(2, "0")} / {slides.length}</span>
          </div>
        </header>

        <div className="progress-track" aria-hidden="true">
          <motion.div
            className="progress-fill"
            animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 130, damping: 22 }}
          />
        </div>

        <section className="slide-viewport">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={active.id}
              className="slide"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 54 : -54, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -54 : 54, scale: 0.985 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <SlideHeader slide={active} />
              {active.render({ onImageClick: setLightbox })}
            </motion.article>
          </AnimatePresence>
        </section>

        <footer className="deck-controls">
          <button className="nav-button" onClick={prev} disabled={index === 0}>
            <ChevronLeft size={20} />
            Anterior
          </button>
          <div className="dot-row" aria-label="Indice de diapositivas">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                className={`dot ${slideIndex === index ? "active" : ""}`}
                onClick={() => goTo(slideIndex)}
                aria-label={`Ir a ${slide.label}`}
              />
            ))}
          </div>
          <button className="nav-button primary" onClick={next} disabled={index === slides.length - 1}>
            Siguiente
            <ChevronRight size={20} />
          </button>
        </footer>
      </main>

      <AnimatePresence>
        {notesOpen && (
          <motion.aside
            className="notes-panel"
            initial={{ opacity: 0, x: 42 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 42 }}
            transition={{ duration: 0.22 }}
          >
            <div className="notes-head">
              <span>Notas de defensa</span>
              <button className="icon-button" onClick={() => setNotesOpen(false)} aria-label="Cerrar notas">
                <X size={18} />
              </button>
            </div>
            <p>{active.notes}</p>
            <div className="keys">
              <span>Teclas</span>
              <kbd>←</kbd>
              <kbd>→</kbd>
              <kbd>N</kbd>
              <kbd>Esc</kbd>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <X size={22} />
            </button>
            <motion.img
              src={lightbox}
              alt="Vista ampliada"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="lightbox-hint">Click fuera o Esc para cerrar</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeckRail({ activeIndex, onSelect, open, onClose }) {
  return (
    <>
      <aside className={`deck-rail ${open ? "open" : ""}`}>
        <div className="rail-head">
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(34,197,94,0.12)", display: "grid", placeItems: "center", border: "1px solid rgba(34,197,94,0.2)" }}>
            <ShieldCheck size={28} color="#22c55e" />
          </div>
          <div>
            <strong>DevSecOps</strong>
            <span>Laboratorio Seguridad</span>
          </div>
          <button className="icon-button rail-close" onClick={onClose} aria-label="Cerrar indice">
            <X size={18} />
          </button>
        </div>
        <nav className="rail-nav">
          {slides.map((slide, slideIndex) => {
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                className={`rail-item ${slideIndex === activeIndex ? "active" : ""}`}
                onClick={() => onSelect(slideIndex)}
              >
                <span className="rail-number">{String(slideIndex + 1).padStart(2, "0")}</span>
                <Icon size={17} />
                <span className="rail-text">
                  <strong>{slide.label}</strong>
                  <small>{slide.section}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
      {open && <button className="rail-backdrop" onClick={onClose} aria-label="Cerrar indice" />}
    </>
  );
}

function SlideHeader({ slide }) {
  const Icon = slide.icon;
  return (
    <div className="slide-header">
      <div className="section-mark">
        <Icon size={18} />
        <span>{slide.section}</span>
      </div>
      <h1>{slide.title}</h1>
      {slide.subtitle && <p>{slide.subtitle}</p>}
    </div>
  );
}

function CoverSlide({ onImageClick }) {
  return (
    <div className="cover-grid">
      <div className="cover-copy">
        <p className="eyebrow">Universidad de las Fuerzas Armadas ESPE</p>
        <h2>Proyecto: Laboratorio de Seguridad</h2>
        <p>
          Implementacion de un flujo DevSecOps integral sobre una aplicacion Node.js con CI/CD,
          escaneo de dependencias, pruebas unitarias automatizadas y despliegue seguro en GitHub Pages.
        </p>
        <div className="cover-tags">
          <span>Node.js</span>
          <span>GitHub Actions</span>
          <span>npm audit</span>
          <span>Jest</span>
          <span>DevSecOps</span>
        </div>
      </div>
      <div className="hero-badge" aria-label="Emblema ESPE">
        <div className="logo-orbit">
          <div onClick={() => onImageClick("/evidencias/image1.png")} style={{ cursor: "pointer", display: "block" }}><img src="/evidencias/image1.png"  alt="ESPE" style={{ width: 140, height: 140, objectFit: "contain" }} /></div>
        </div>
        <div className="team-block">
          <span>Grupo 6</span>
          <strong>Benalcazar Moises</strong>
          <strong>Cepeda David</strong>
          <strong>Mariscal Mesias</strong>
          <strong>Nato Carlos</strong>
          <strong>Rea Denise</strong>
        </div>
      </div>
    </div>
  );
}

function IntroSlide(_) {
  const roles = [
    [Users, "Moises Benalcazar", "Product Designer", "Define la experiencia y diseno del producto, lidera la vision UX del dashboard."],
    [Code2, "Carlos Nato", "Desarrollo Frontend", "Asegura la interfaz de la aplicacion y el dashboard de monitoreo en public/index.html."],
    [ShieldCheck, "Denise Rea", "Seguridad del Software", "Configura defensas y mitigaciones tecnicas, gestiona politicas de seguridad."],
    [ShieldOff, "David Cepeda", "Seguridad del Software", "Implementa escaneo de dependencias y analisis de vulnerabilidades en el pipeline."],
    [GitBranch, "Mesias Mariscal", "Solution Manager", "Supervisa calidad de la solucion, CI con pruebas unitarias, CD con despliegue a GitHub Pages, proteccion de rama principal."],
  ];

  return (
    <div className="roles-grid">
      {roles.map(([Icon, name, role, desc], idx) => (
        <motion.div
          className="role-card"
          key={name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <Icon className="role-icon" size={24} />
          <strong>{name}</strong>
          <span>{role}</span>
          <p>{desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ArchitectureSlide(_) {
  const components = [
    ["package.json", "Nucleo de configuracion y gobernanza. Gestiona dependencias y scripts del ciclo de vida.", "ink"],
    ["src/index.js", "Punto de entrada del backend. Servidor HTTP nativo que expone API REST con payload JSON.", "cream"],
    ["src/riskChecker.js", "Motor de reglas de negocio. Centraliza el algoritmo de evaluacion de riesgos.", "blue"],
    ["__tests__/", "Capa QA con Jest. Pruebas unitarias automatizadas garantizando logica determinista.", "terracotta"],
    ["public/index.html", "Dashboard de monitoreo. Consume API local y renderiza estado de seguridad.", "cream"],
    [".github/workflows/", "Pipeline CI/CD que automatiza pruebas, auditoria de dependencias y despliegue.", "blue"],
  ];

  return (
    <div className="architecture-layout">
      <div className="arch-diagram">
        {components.map(([name, detail, tone], idx) => (
          <motion.div
            className={`arch-layer ${tone}`}
            key={name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <strong>{name}</strong>
            <span>{detail}</span>
          </motion.div>
        ))}
        <div className="dependency-arrow">
          <ArrowRight size={18} />
          Arquitectura monolitica sencilla · Node.js
        </div>
      </div>
      <div className="principles">
        <h2>Principio: Security as Code</h2>
        <p>
          La seguridad se parametriza de forma automatizada integrandose directamente en el pipeline
          CI/CD. Cada componente tiene una responsabilidad clara y la seguridad no es un add-on, sino
          parte del flujo de desarrollo.
        </p>
        <div className="architecture-truth">
          <strong>Stack tecnico</strong>
          <span>Node.js + npm · Jest para pruebas · GitHub Actions para CI/CD</span>
          <span>npm audit para escaneo de dependencias · GitHub Pages para despliegue</span>
        </div>
        <div className="principle-list">
          <span>CI automatizado</span>
          <span>Escaneo de dependencias</span>
          <span>Proteccion de rama</span>
          <span>CD seguro</span>
        </div>
      </div>
    </div>
  );
}

function LogicSlide(_) {
  const levels = [
    ["low", CheckCircle, "Risk Low", "R = 0", "Estado optimo. Cero vulnerabilidades conocidas. Pipeline fluye sin bloqueos."],
    ["medium", AlertTriangle, "Risk Medium", "0 < R < 0.2", "Exposicion moderada. Deuda tecnica manejable que requiere monitoreo."],
    ["high", XCircle, "Risk High", "R >= 0.2", "Criticidad. Superficie de ataque inaceptable. Requiere intervencion inmediata."],
  ];

  return (
    <div className="risk-layout">
      <div className="risk-formula">
        <ShieldCheck size={32} color="#22c55e" />
        <code>R = V / D</code>
        <p>
          <strong>Security Risk Ratio:</strong> Relacion matematica entre vulnerabilidades activas (V)
          y el total de dependencias instaladas (D). Normaliza la evaluacion para que sea justa y
          proporcional al tamano del proyecto.
        </p>
      </div>
      <div className="risk-levels">
        {levels.map(([cls, Icon, title, formula, desc], idx) => (
          <motion.div
            className={`risk-card risk-${cls}`}
            key={cls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.1 }}
          >
            <Icon size={36} />
            <strong>{title}</strong>
            <code>{formula}</code>
            <p>{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CISecuritySlide(_) {
  const steps = [
    ["1", "Push / PR", "El workflow se dispara en push a main o al crear/actualizar un Pull Request."],
    ["2", "build_and_test", "Descarga codigo, configura Node.js 20, instala dependencias con npm ci y ejecuta npm test."],
    ["3", "security_scan", "Ejecuta npm audit --audit-level=high. Si detecta vulnerabilidades altas o criticas, detiene el pipeline."],
    ["4", "Gate de seguridad", "Actua como puerta de control: solo permite continuar al despliegue si no hay vulnerabilidades criticas."],
  ];

  return (
    <div className="pipeline-devs">
      <div className="pipeline-block">
        <h3>Workflow: devsecops.yml</h3>
        {steps.map(([num, title, desc], idx) => (
          <motion.div
            className="pipeline-box"
            key={num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <strong><span style={{ color: "#22c55e", marginRight: 8 }}>{num}.</span>{title}</strong>
            <p>{desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="pipeline-block">
        <h3>Jobs del pipeline</h3>
        <motion.div
          className="pipeline-box"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <strong style={{ color: "#3b82f6" }}>build_and_test</strong>
          <p>Node.js 20 · npm ci · npm test (Jest). Comprueba que la aplicacion compile y las pruebas unitarias pasen.</p>
        </motion.div>
        <motion.div
          className="pipeline-box"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <strong style={{ color: "#22c55e" }}>security_scan</strong>
          <p>npm audit --audit-level=high. Identifica vulnerabilidades conocidas. Si encuentra high/critical, el pipeline se detiene.</p>
        </motion.div>
        <motion.div
          className="pipeline-box"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <strong style={{ color: "#f59e0b" }}>deploy</strong>
          <p>Depende de security_scan via needs. Solo se ejecuta si build_and_test y security_scan son exitosos en main.</p>
        </motion.div>
        <div className="command-strip" style={{ marginTop: 8 }}>
          <Terminal size={20} />
          <code>npm audit --audit-level=high</code>
          <span>Puerta de control DevSecOps</span>
        </div>
      </div>
    </div>
  );
}

function IncidentSlide({ onImageClick }) {
  return (
    <div className="two-column">
      <div className="narrative">
        <h2>Vulnerabilidad detectada: Lodash</h2>
        <p>
          Durante la ejecucion inicial del pipeline, el job <strong>security_scan</strong> reporto un
          fallo. Se identifico que el proyecto utilizaba una version insegura de la libreria
          <strong> lodash inferior a 4.17.21</strong>.
        </p>
        <div className="architecture-truth">
          <strong>Riesgo detectado</strong>
          <span>Vulnerabilidades que podrian permitir ataques de Denegacion de Servicio (DoS) o inyeccion de prototipos.</span>
          <span>El job security_scan se marco en rojo, bloqueando el progreso y demostrando la efectividad de los controles preventivos.</span>
        </div>
      </div>
      <div>
        <div className="pipeline-block">
          <h3>Proceso de remediacion</h3>
          {[
            ["1", "Deteccion", "El pipeline falla en security_scan. Los logs muestran la vulnerabilidad en lodash."],
            ["2", "Actualizacion", "Se modifica package.json fijando la version estable lodash@4.17.21."],
            ["3", "Sincronizacion", "Se ejecuta npm install para actualizar package-lock.json y sincronizar el arbol de dependencias."],
            ["4", "Validacion", "Pipeline se re-ejecuta. npm audit devuelve 0 vulnerabilities. El job security_scan pasa en verde."],
          ].map(([num, title, desc], idx) => (
            <motion.div
              className="pipeline-box"
              key={num}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <strong>
                <span style={{ color: idx === 0 ? "#ef4444" : "#22c55e", marginRight: 8 }}>{num}.</span>
                {title}
              </strong>
              <p>{desc}</p>
            </motion.div>
          ))}
          <figure className="evidence-shot" style={{ marginTop: 8, borderRadius: 14, overflow: "hidden" }}>
            <img src="/evidencias/image2.png" alt="npm install lodash" onClick={() => onImageClick("/evidencias/image2.png")} />
            <figcaption style={{ padding: "8px 12px", background: "#101827", color: "#8b949e", fontSize: "0.72rem" }}>
              npm install para sincronizar package-lock.json tras actualizar lodash
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function CDSlide(_) {
  const steps = [
    ["1", "Gate superado", "build_and_test y security_scan completados exitosamente en rama main."],
    ["2", "Build", "npm run build limpia dist/, copia archivos estaticos desde public/ y genera version de produccion."],
    ["3", "Empaquetado", "actions/upload-pages-artifact@v3 empaqueta y almacena el contenido de dist/ como artefacto GitHub."],
    ["4", "Publicacion", "actions/deploy-pages@v4 despliega el sitio estatico en GitHub Pages. URL publica y estable."],
  ];

  return (
    <div className="devsecops-layout">
      <div className="pipeline-flow">
        {steps.map(([num, title, desc], idx) => (
          <motion.div
            className="pipeline-step"
            key={num}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <span>{num}</span>
            <strong>{title}</strong>
            <p>{desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="devsecops-side">
        <div className="gate-panel dark">
          <Lock size={24} />
          <div>
            <strong>Dependencia: needs: [security_scan]</strong>
            <p>El job deploy solo se activa si build_and_test y security_scan pasan correctamente. Esto garantiza que ningun artefacto inseguro llegue a produccion.</p>
          </div>
        </div>
        <div className="gate-grid">
          <div>
            <CheckCircle size={20} />
            <strong>Build</strong>
            <span>npm run build</span>
          </div>
          <div>
            <Package size={20} />
            <strong>Artifact</strong>
            <span>upload-pages@v3</span>
          </div>
          <div>
            <Server size={20} />
            <strong>Deploy</strong>
            <span>deploy-pages@v4</span>
          </div>
          <div>
            <ShieldCheck size={20} />
            <strong>Seguro</strong>
            <span>Gates OK</span>
          </div>
        </div>
        <div className="artifact-list">
          <strong>URL de produccion</strong>
          <span>GitHub Pages</span>
          <span>sample_dev_sec_ops</span>
        </div>
      </div>
      <div className="command-strip">
        <Terminal size={20} />
        <code>npm run build && deploy</code>
        <span>Construccion + empaquetado + publicacion en GitHub Pages</span>
      </div>
    </div>
  );
}

function DashboardSlide({ onImageClick }) {
  const items = [
    [Activity, "CI Status", "Pruebas unitarias Jest ejecutadas exitosamente en el pipeline."],
    [ShieldCheck, "Seguridad", "npm audit paso sin detectar vulnerabilidades de nivel alto o critico."],
    [Server, "CD Status", "Despliegue automatico completado. Sitio disponible en GitHub Pages."],
    [Gauge, "Risk Ratio", "Security Risk Ratio calculado en tiempo real: R = V / D."],
    [Monitor, "Timestamp", "Marcas de tiempo actualizadas con cada ejecucion del pipeline."],
  ];

  return (
    <div className="evidence-layout">
      <figure className="evidence-feature">
        <img src="/evidencias/image3.png" alt="Dashboard de monitoreo DevSecOps" onClick={() => onImageClick("/evidencias/image3.png")} style={{ width: "100%", display: "block", objectFit: "contain", maxHeight: "50vh", cursor: "pointer" }} />
        <figcaption>
          <strong>Dashboard interactivo en tiempo real</strong>
          <span>public/index.html — Consume API REST de src/index.js mostrando estado CI, seguridad y CD</span>
        </figcaption>
      </figure>
      <div className="evidence-side">
        <div className="principles" style={{ padding: 0 }}>
          <h2 style={{ fontSize: "1.15rem" }}>Cadena DevSecOps</h2>
          {[
            ["CI", "Pruebas unitarias Jest", "#22c55e"],
            ["Seguridad", "npm audit sin bloqueos", "#3b82f6"],
            ["CD", "Despliegue en GitHub Pages", "#f59e0b"],
          ].map(([label, desc, color], idx) => (
            <motion.div
              key={label}
              className="pipeline-box"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12 }}
              style={{ marginBottom: 8 }}
            >
              <strong style={{ color }}>{label}</strong>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="architecture-truth">
          <strong>URL publica</strong>
          <span>Dashboard disponible en GitHub Pages como evidencia auditable del estado de seguridad.</span>
        </div>
      </div>
    </div>
  );
}

function CU01Slide({ onImageClick }) {
  return (
    <UseCaseCard
      icon={GitBranch}
      title="Control de cambios mediante Pull Request"
      actor="Autor del cambio · GitHub Actions · Revisor"
      steps={[
        'Desarrollador crea rama de trabajo a partir de main.',
        'Realiza cambios y ejecuta pruebas locales.',
        'Commit y push de la rama al repositorio remoto.',
        'Abre Pull Request dirigido hacia main.',
        'GitHub Actions ejecuta pipeline automaticamente.',
        'build_and_test: instala dependencias y ejecuta pruebas.',
        'security_scan: revisa dependencias con npm audit.',
        'Revisor analiza PR, cambios y resultados de checks.',
        'Si todo es aprobado, el PR se fusiona con main.',
        'Pipeline se re-ejecuta para validar estado final.',
      ]}
      image="/evidencias/image4.png"
      previewLayout="side-by-side"
      imageAlt="Diagrama CU-01"
      infoPosition="below"
      alternativeImage="/evidencias/image5.png"
      alternativeImageAlt="Flujo alternativo CU-01"
      preconditions="Repositorio en GitHub, rama main protegida, workflow devsecops.yml configurado, reglas de proteccion activas."
      alternative="Si pruebas fallan, PR marcado como fallido. Si security_scan detecta vulnerabilidad alta, el pipeline se detiene. Cambios directos a main son bloqueados por reglas de proteccion."
      alternativeSteps={[
        'Si las pruebas fallan, el PR se marca como fallido y los jobs posteriores no avanzan.',
        'Si security_scan encuentra vulnerabilidades altas/criticas, el pipeline se detiene y se notifica a los responsables.',
        'Intentos de push directo a main son rechazados por las reglas de proteccion de la rama.'
      ]}
      result="Cambio integrado solo tras aprobar pruebas, escaneo de seguridad y revision. Trazabilidad completa de ramas, commits y validaciones."
      onImageClick={onImageClick}
    />
  );
}

function CU02Slide({ onImageClick }) {
  return (
    <UseCaseCard
      icon={TestTube2}
      title="Validacion automatica con pruebas unitarias"
      actor="Pipeline GitHub Actions · Job build_and_test"
      steps={[
        'Se realiza push a main o se abre un Pull Request.',
        'Workflow DevSecOps inicia el job build_and_test.',
        'Instala dependencias con npm ci.',
        'Ejecuta npm test (framework Jest).',
        'Si las pruebas pasan, el workflow continua con security_scan.',
        'En pushes a main, puede continuar con deploy.',
      ]}
      image="/evidencias/image6.png"
      imageAlt="Diagrama CU-02"
      previewLayout="side-by-side"
      infoPosition="below"
      preconditions="Repositorio con pruebas unitarias para riskChecker, Jest configurado, workflow con npm ci y npm test."
      alternative="Si alguna prueba falla, npm test finaliza con codigo distinto de cero. El job build_and_test falla y los jobs security_scan y deploy no se ejecutan."
      result="PR con cambios correctos: pruebas pasan y pipeline avanza. Cambios que rompen pruebas: pipeline se detiene en build_and_test y reporta fallo."
      onImageClick={onImageClick}
    />
  );
}

function CU03Slide({ onImageClick }) {
  return (
    <UseCaseCard
      icon={Search}
      title="Deteccion y correccion de vulnerabilidades"
      actor="Equipo de Desarrollo · GitHub Actions · Base CVE/NVD"
      steps={[
        'Integrante anade libreria y sube cambios al repositorio.',
        'GitHub Actions se activa y lee la lista de dependencias.',
        'Sistema compara dependencias con base de datos CVE/NVD.',
        'Si no encuentra problemas, da visto bueno y permite continuar.',
      ]}
      image="/evidencias/image7.png"
      previewLayout="side-by-side"
      imageAlt="Diagrama CU-03"
      infoPosition="below"
      preconditions="package.json con lista de dependencias, GitHub Actions configurado con reglas automaticas de revision."
      alternative="Sistema encuentra vulnerabilidad grave: detiene el proceso, muestra mensaje con la libreria afectada y el motivo. Equipo actualiza a version segura, vuelve a subir y el pipeline continua."
      alternativeSteps={[
        'Sistema detecta vulnerabilidad grave en la dependencia y detiene el pipeline.',
        'Se notifica la libreria afectada y el motivo del bloqueo.',
        'Equipo actualiza a una version segura, commit y push; el pipeline se re-ejecuta y continua si pasa.'
      ]}
      result="Ninguna version de la aplicacion se publica si contiene dependencias con vulnerabilidades conocidas."
      onImageClick={onImageClick}
    />
  );
}

function CU04Slide({ onImageClick }) {
  return (
    <UseCaseCard
      icon={Play}
      title="Despliegue automatico controlado"
      actor="Pipeline GitHub Actions · Solution Manager"
      steps={[
        'Pull Request aprobado se fusiona hacia main.',
        'Workflow devsecops.yml se dispara por push a main.',
        'build_and_test: instalacion y pruebas unitarias con Jest.',
        'security_scan: auditoria con npm audit --audit-level=high.',
        'Ambos jobs exitosos → se inicia deploy (needs: [security_scan]).',
        'npm run build genera carpeta dist/ con archivos estaticos.',
        'upload-pages-artifact@v3 empaqueta y sube dist/.',
        'deploy-pages@v4 publica en GitHub Pages.',
      ]}
      image="/evidencias/image8.png"
      previewLayout="side-by-side"
      imageAlt="Workflow DevSecOps exitoso"
      infoPosition="below"
      preconditions="Workflow devsecops.yml configurado, reglas de proteccion en main, GitHub Pages activado con origen GitHub Actions."
      alternative="Si build_and_test falla: pipeline detenido. Si security_scan detecta vulnerabilidades: despliegue bloqueado. Merge directo sin PR: rechazado por reglas de proteccion."
      result="Aplicacion publicada en GitHub Pages solo cuando el codigo es seguro y funcional. Dashboard disponible publicamente reflejando estado de seguridad actual."
      onImageClick={onImageClick}
    />
  );
}

function CU05Slide({ onImageClick }) {
  return (
    <UseCaseCard
      icon={BarChart3}
      title="Visualizacion del estado DevSecOps"
      actor="Equipo de Desarrollo · GitHub Actions"
      steps={[
        'Sistema inicia monitoreo consumiendo payload JSON de la API.',
        'Dashboard visualiza Security Risk Ratio R = V / D.',
        'Equipo verifica que el indicador este en Risk Low (R = 0).',
        'Interfaz confirma integracion de cadena DevSecOps.',
        'CI: pruebas unitarias Jest pasaron satisfactoriamente.',
        'Seguridad: npm audit no bloqueo el proceso.',
        'CD: despliegue automatico hacia produccion completado.',
      ]}
      image="/evidencias/image9.png"
      previewLayout="side-by-side"
      imageAlt="Dashboard DevSecOps evidencia"
      infoPosition="below"
      preconditions="Backend (src/index.js) exponiendo API REST. Motor riskChecker.js procesando densidad de vulnerabilidades. Dashboard publicado en GitHub Pages."
      alternative="Risk Medium (0 < R < 0.2): dashboard alerta sobre deuda tecnica manejable. Risk High (R >= 0.2): superficie de ataque inaceptable, requiere intervencion inmediata."
      result="Interfaz centralizada que comunica en tiempo real la salud del proyecto, permitiendo toma de decisiones basada en el Security Risk Ratio."
      onImageClick={onImageClick}
    />
  );
}

function UseCaseCard({ icon: Icon, title, actor, steps = [], image, imageAlt, preconditions, alternative, alternativeSteps = [], result, onImageClick, previewLayout, infoPosition, alternativeImage, alternativeImageAlt }) {
  const [open, setOpen] = React.useState(true);
  const onKeyOpenImage = (e, src) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onImageClick && onImageClick(src);
    }
  };

  return (
    <div className={`use-case-card ${infoPosition === 'below' ? 'info-below' : ''}`} role="region" aria-label={title}>
      <div className="use-case-main">
        <div className="usecase-header">
          {Icon && <Icon size={24} className="usecase-icon" />}
          <div>
            <h3>{title}</h3>
            <p className="uc-actor">Actor: {actor}</p>
          </div>
          <button className="collapse-button" aria-expanded={open} onClick={() => setOpen((v) => !v)} aria-label="Mostrar u ocultar detalles">
            {open ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div className={`usecase-timeline ${open ? 'open' : 'collapsed'}`}>
          <ol>
            {steps.map((step, idx) => (
              <li key={idx} className="timeline-step" tabIndex={0}>
                <span className="step-number">{String(idx + 1).padStart(2, '0')}</span>
                <div className="step-body">
                  <p>{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {image && previewLayout !== 'side-by-side' && (
          <figure className="evidence-shot" style={{ marginTop: 10, borderRadius: 14, overflow: 'hidden' }}>
            <img src={image} alt={imageAlt || title} onClick={() => onImageClick && onImageClick(image)} onKeyDown={(e) => onKeyOpenImage(e, image)} tabIndex={0} style={{ cursor: 'pointer' }} />
            <figcaption style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', background: '#101827', color: '#8b949e', fontSize: '0.72rem' }}>
              <span style={{ flex: 1 }}>{imageAlt}</span>
              <button className="collapse-button" onClick={() => onImageClick && onImageClick(image)} aria-label={`Ver imagen ${imageAlt}`}>Ver imagen</button>
            </figcaption>
          </figure>
        )}
      </div>

      {/* If infoPosition is 'below', render a full-width info block under the main area */}
      {infoPosition === 'below' ? (
        <>
          {previewLayout === 'side-by-side' && (
            <div className="side-thumbnail">
              <div className="thumb-wrap" role="button" tabIndex={0} onClick={() => onImageClick && onImageClick(image)} onKeyDown={(e) => onKeyOpenImage(e, image)} aria-label={`Vista previa ${imageAlt}`}>
                <img src={image} alt={imageAlt || title} />
              </div>
              <div className="thumb-actions">
                <button className="preview-btn" onClick={() => onImageClick && onImageClick(image)} aria-label={`Ampliar ${imageAlt}`}>
                  <Search size={14} />
                  <span>Haz clic para ampliar</span>
                </button>
              </div>

              {alternativeImage && (
                <div className="alt-thumb" style={{ marginTop: 10 }}>
                  <div className="thumb-wrap small" role="button" tabIndex={0} onClick={() => onImageClick && onImageClick(alternativeImage)} onKeyDown={(e) => onKeyOpenImage(e, alternativeImage)} aria-label={`Flujo alternativo ${alternativeImageAlt}`}>
                    <img src={alternativeImage} alt={alternativeImageAlt || 'Flujo alternativo'} />
                  </div>
                  <div className="thumb-actions">
                    <button className="preview-btn" onClick={() => onImageClick && onImageClick(alternativeImage)} aria-label={`Abrir flujo alternativo`}>
                      <Search size={12} />
                      <span>Flujo alternativo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="info-below-block">
            <div>
              <strong>Precondiciones</strong>
              <p>{preconditions}</p>
            </div>
            <div>
              <strong>Flujo alternativo</strong>
              {alternativeSteps && alternativeSteps.length > 0 ? (
                <ol className="alt-flow">
                  {alternativeSteps.map((s, i) => (
                    <li key={i} tabIndex={0} className="timeline-step">
                      <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
                      <div className="step-body"><p>{s}</p></div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>{alternative}</p>
              )}
            </div>
            <div>
              <strong>Resultado esperado</strong>
              <p>{result}</p>
            </div>
          </div>
        </>
      ) : previewLayout === 'side-by-side' ? (
        <div className="two-column-preview">
          <div className="thumbnail">
            <div className="thumb-wrap" role="button" tabIndex={0} onClick={() => onImageClick && onImageClick(image)} onKeyDown={(e) => onKeyOpenImage(e, image)} aria-label={`Vista previa ${imageAlt}`}>
              <img src={image} alt={imageAlt || title} />
            </div>
            <div className="thumb-actions">
              <button className="preview-btn" onClick={() => onImageClick && onImageClick(image)} aria-label={`Ampliar ${imageAlt}`}>
                <Search size={14} />
                <span>Haz clic para ampliar</span>
              </button>
            </div>
          </div>
          <aside className="use-case-side side-info">
            <div>
              <strong>Precondiciones</strong>
              <p>{preconditions}</p>
            </div>
            <div>
              <strong>Flujo alternativo</strong>
              {alternativeSteps && alternativeSteps.length > 0 ? (
                <ol className="alt-flow">
                  {alternativeSteps.map((s, i) => (
                    <li key={i} tabIndex={0} className="timeline-step">
                      <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
                      <div className="step-body"><p>{s}</p></div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>{alternative}</p>
              )}
            </div>
            <div>
              <strong>Resultado esperado</strong>
              <p>{result}</p>
            </div>
          </aside>
        </div>
      ) : (
        <aside className="use-case-side">
          <div>
            <strong>Precondiciones</strong>
            <p>{preconditions}</p>
          </div>
          <div>
            <strong>Flujo alternativo</strong>
            {alternativeSteps && alternativeSteps.length > 0 ? (
              <ol className="alt-flow">
                {alternativeSteps.map((s, i) => (
                  <li key={i} tabIndex={0} className="timeline-step">
                    <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
                    <div className="step-body"><p>{s}</p></div>
                  </li>
                ))}
              </ol>
            ) : (
              <p>{alternative}</p>
            )}
          </div>
          <div>
            <strong>Resultado esperado</strong>
            <p>{result}</p>
          </div>
        </aside>
      )}
    </div>
  );
}

function IASlide(_) {
  const prompts = [
    ["Estructura del informe", "La IA analizo sample_dev_sec_ops y distribuyo los temas entre los 5 integrantes: Mesias, Denise, David, Carlos y Moises, indicando enfoque tecnico y evidencias recomendadas."],
    ["Casos de Uso", "La IA propuso 5 casos de uso DevSecOps: ramas, PRs, GitHub Actions, pruebas unitarias, escaneo de dependencias, proteccion de main, despliegue y dashboard, con formato estandar y buenas practicas."],
    ["Diagramas PlantUML", "Generacion de codigo PlantUML para CU-01 y CU-03 con reglas de diseno: actores a la izquierda, colores suaves, ovalos compactos y lineas limpias sin cruces."],
  ];

  return (
    <div className="two-column">
      <div className="narrative">
        <h2>Uso de inteligencia artificial</h2>
        <p>
          Se empleo IA como herramienta de apoyo para la estructuracion, redaccion y generacion de
          diagramas del informe tecnico y los casos de uso. Todo el contenido fue revisado y validado
          por el equipo.
        </p>
        <div className="problem-map">
          {prompts.map(([title, desc], idx) => (
            <div className="map-row" key={title}>
              <span>{title}</span>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 style={{ color: "#22c55e", marginBottom: 16 }}>Diagramas generados</h2>
        {[
          ["CU-01", "Control de cambios mediante PR", "Actores: Autor del cambio, GitHub Actions, Revisor. Sistema: Repositorio protegido con flujo rama → PR → pruebas → seguridad → revision → merge."],
          ["CU-03", "Deteccion de vulnerabilidades", "Actores: Equipo de Desarrollo, GitHub Actions, Bases CVE/NVD. Relacion extend para bloqueo y notificacion de fallos. Left to right direction."],
        ].map(([title, label, desc], idx) => (
          <motion.div
            className="pipeline-box"
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            style={{ marginBottom: 10 }}
          >
            <strong style={{ color: "#3b82f6" }}>{title}: {label}</strong>
            <p>{desc}</p>
          </motion.div>
        ))}
        <div className="architecture-truth" style={{ marginTop: 12 }}>
          <strong>Prompt ejemplo</strong>
          <span>"Genera los diagramas del CU-01 con actores a la izquierda y sistema central, flujo apaisado del proceso. Usa colores suaves, ovalos compactos y lineas limpias sin cruces."</span>
        </div>
      </div>
    </div>
  );
}

function DefenseSlide(_) {
  const script = [
    ["1", "Introduccion", "Flujo DevSecOps integral en Node.js con CI/CD, seguridad automatizada y roles especializados."],
    ["2", "Pipeline", "build_and_test + security_scan + deploy. npm audit como puerta de control, proteccion de main."],
    ["3", "Incidente real", "Deteccion de lodash vulnerable, remediacion con actualizacion a 4.17.21 y re-validacion del pipeline."],
    ["4", "Casos de uso", "5 CU que cubren PR, pruebas unitarias, deteccion de vulnerabilidades, despliegue y dashboard."],
    ["5", "Resultado", "Pipeline DevSecOps completamente funcional, 0 vulnerabilidades, dashboard en GitHub Pages."],
  ];

  return (
    <div className="defense-script">
      {script.map(([num, title, text]) => (
        <div className="script-row" key={num}>
          <span>{num}</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>
      ))}
      <div className="closing-line">
        <CheckCircle size={28} />
        <p>
          El proyecto demuestra que la seguridad no es un add-on, sino parte integral del ciclo de
          vida del software. Cada cambio pasa por validacion automatica antes de llegar a produccion.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
