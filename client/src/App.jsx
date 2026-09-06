import { useEffect, useState } from 'react'

const LINKS = {
  email: 'divijjjw@gmail.com',
  linkedin: 'https://www.linkedin.com/in/divij-jhunjhunwala-418b3027a/',
  github: 'https://github.com/DJJW26',
}

// Static resume PDF served from client/public (works on GitHub Pages).
// Local Express dev still serves the same file via /api/resume.
const RESUME_URL = `${import.meta.env.BASE_URL}Divij-Jhunjhunwala-Resume.pdf`

const SKILLS = [
  {
    title: 'Languages',
    items: ['C/C++', 'Java', 'Python', 'JavaScript', 'Dart'],
  },
  {
    title: 'Web Technologies',
    items: ['HTML', 'CSS', 'SvelteKit', 'Node.js', 'Express.js'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'Firebase', 'Supabase'],
  },
  {
    title: 'Dev Tools',
    items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Android Studio', 'Flutter', 'npm', 'Figma', 'Canva', 'NumPy'],
  },
  {
    title: 'Core Concepts',
    items: ['OOPS', 'Data Structures', 'Algorithms', 'Problem Solving'],
  },
]

const EXPERIENCE = [
  'Led a team of developers to design and deploy official platforms for major school events (X-UBERANCE).',
  'Represented school in multiple hackathons including Smart Bengal Hackathon; led a team of 20+ developers at events.',
  'Integrated backend services with NoSQL databases and spearheaded design of frontend systems.',
  'Managed task delegation and version control workflows.',
]

const PROJECTS = [
  {
    title: 'Energy-Aware VM Placement (CloudSim)',
    tag: 'Cloud · Java',
    description:
      'Implemented and compared energy-aware VM placement heuristics (Round-Robin vs PABFD vs MBFD) in CloudSim 3.0.3, reproducing Beloglazov et al. (2012).',
    bullets: [
      'Implemented the PABFD policy from scratch (minimum power-increase placement): 48.6% energy saved vs baseline with zero SLA violation',
      'MBFD with static-threshold migration saved 57.7% at ~3% SLA violation — the paper’s energy-vs-SLA trade-off',
    ],
    stack: ['Java', 'CloudSim 3.0.3', 'Data Centers'],
    link: 'https://github.com/DJJW26/CloudSim',
    featured: true,
  },
  {
    title: 'Speech Evaluation Web Application',
    tag: 'AI / ML · Web',
    description:
      'Led a team of 3 to build a web app that evaluates uploaded speech videos.',
    bullets: [
      'Integrated ML models for sentiment analysis, pitch detection, and facial emotion recognition',
      'Built backend services with Python + Flask and HuggingFace models',
    ],
    stack: ['Python', 'Flask', 'HuggingFace', 'ML'],
    link: 'https://github.com/DJJW26',
  },
  {
    title: 'Parking Lot Application',
    tag: 'Mobile · Flutter',
    description:
      'Parking lot interface to handle logistics.',
    bullets: ['Built with Flutter and Dart to manage parking logistics'],
    stack: ['Flutter', 'Dart'],
    link: 'https://github.com/DJJW26',
  },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['About', '#about'],
    ['Skills', '#skills'],
    ['Experience', '#experience'],
    ['Projects', '#projects'],
    ['Contact', '#contact'],
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-slate-900 dark:text-white">
          <span className="text-cyan-600 dark:text-cyan-400">&gt;_</span> divij.dev
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀ Light' : '🌙 Dark'}
          </button>
          <a
            href={RESUME_URL}
            download
            className="rounded-lg bg-cyan-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            Resume
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀' : '🌙'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:text-slate-200"
          >
            ☰
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-slate-700 dark:text-slate-200"
            >
              {label}
            </a>
          ))}
          <a href={RESUME_URL} download className="mt-2 block rounded-lg bg-cyan-600 px-4 py-2 text-center text-sm font-semibold text-white">
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal visible max-w-3xl">
          <p className="font-mono text-sm text-cyan-600 dark:text-cyan-400">
            // hello world, I am
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Divij Jhunjhunwala
          </h1>
          <p className="mt-3 font-mono text-lg text-slate-600 sm:text-xl dark:text-slate-300">
            B.Tech CSE @ VIT Chennai <span className="caret-blink text-cyan-500">▍</span>
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Second-year B.Tech. CSE student with a strong interest in Artificial
            Intelligence and Machine Learning. Seeking an internship to gain
            practical experience and contribute to real-world projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="glow rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              Contact Me
            </a>
            <a
              href={RESUME_URL}
              download
              className="rounded-lg border border-dashed border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300"
            >
              ⬇ Resume (.pdf)
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <a href={`mailto:${LINKS.email}`} className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">
              ✉ {LINKS.email}
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">
              ⌨ GitHub
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ kicker, title, desc }) {
  return (
    <div className="reveal mb-10">
      <p className="font-mono text-sm text-cyan-600 dark:text-cyan-400">{kicker}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {desc && <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{desc}</p>}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <SectionHeading kicker="// about" title="Education & Objective" />
      <div className="reveal grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">🎓 B.Tech in Computer Science & Engineering</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Vellore Institute of Technology, Chennai — 2nd Year
          </p>
          <p className="mt-1 font-mono text-sm text-cyan-600 dark:text-cyan-400">
            Expected Graduation: 2029
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['AI', 'Machine Learning', 'Full-Stack', 'Mobile'].map((t) => (
              <span key={t} className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">🎯 Currently</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Seeking a software engineering / AI-ML internship to gain practical
            experience and contribute to real-world projects. I enjoy leading
            and collaboration, shipping hackathon builds, building cloud
            projects, and bridging ML models with usable web and mobile
            frontends.
          </p>
          <p className="mt-3 font-mono text-xs text-slate-500 dark:text-slate-500">
            $ status: open_to_internships --year 2
          </p>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="// skills" title="Tech Stack" desc="Taken directly from my resume — languages, frameworks, databases, and tools I use." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <div
              key={group.title}
              className="reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">
                {group.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="reveal rounded-2xl border border-dashed border-cyan-500/50 bg-cyan-50/50 p-5 dark:bg-cyan-500/5">
            <h3 className="font-mono text-sm font-bold text-cyan-700 dark:text-cyan-300">
              Currently exploring →
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Deepening DSA in C++/Java, and ML fundamentals (NumPy, HuggingFace)
              alongside full-stack builds with Node + Express.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <SectionHeading kicker="// experience" title="Leadership & Experience" />
      <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Vice-President, Computer Club
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              St. Xavier's Collegiate School
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            ● leadership
          </span>
        </div>
        <ul className="mt-5 space-y-3">
          {EXPERIENCE.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <span className="mt-0.5 font-mono text-cyan-600 dark:text-cyan-400">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="// projects"
          title="Selected Projects"
          desc="Builds from my resume. Code lives on GitHub — reach out if you'd like a live demo."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className={`reveal flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900${p.featured ? ' md:col-span-2' : ''}`}
            >
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {p.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.description}</p>
              <ul className="mt-3 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">+</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3 pt-2">
                <a
                  href={p.link || LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                >
                  View on GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = LINKS.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <SectionHeading kicker="// contact" title="Get In Touch" desc="Internship opportunities, hackathons, or just to say hi — my inbox is open." />
      <div className="reveal grid gap-6 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">Find me here</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href={`mailto:${LINKS.email}`} className="block rounded-lg bg-slate-50 p-3 transition hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-slate-700">
              <span className="font-mono text-xs text-slate-500">EMAIL</span>
              <span className="block truncate text-slate-800 dark:text-slate-100">{LINKS.email}</span>
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="block rounded-lg bg-slate-50 p-3 transition hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-slate-700">
              <span className="font-mono text-xs text-slate-500">GITHUB</span>
              <span className="block truncate text-slate-800 dark:text-slate-100">github.com/DJJW26</span>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="block rounded-lg bg-slate-50 p-3 transition hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-slate-700">
              <span className="font-mono text-xs text-slate-500">LINKEDIN</span>
              <span className="block truncate text-slate-800 dark:text-slate-100">Divij Jhunjhunwala</span>
            </a>
          </div>
          <a
            href={RESUME_URL}
            download
            className="mt-4 block rounded-lg border border-dashed border-slate-300 p-3 text-center text-sm font-semibold text-slate-600 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-300"
          >
            ⬇ Download resume (.pdf)
          </a>
        </div>
        <div className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-10 md:col-span-3">
          <p className="font-mono text-sm text-cyan-600 dark:text-cyan-400">$ send a message</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            The fastest way to reach me is email.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Tell me about your internship, project idea, or hackathon — I usually
            reply within a day or two.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Hi Divij — let's talk")}`}
              className="glow rounded-lg bg-cyan-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              ✉ Email Me
            </a>
            <button
              onClick={copyEmail}
              className="rounded-lg border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              {copied ? '✓ Copied!' : '⧉ Copy Email'}
            </button>
          </div>
          <p className="mt-5 font-mono text-xs text-slate-400 dark:text-slate-500">
            {LINKS.email}
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
        <p className="font-mono">© {new Date().getFullYear()} Divij Jhunjhunwala — built with React + Tailwind + Express</p>
        <div className="flex gap-4">
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`} className="hover:text-cyan-600">Email</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true // default dark (your choice)
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useReveal()

  // Re-observe after first render for all .reveal elements
  useEffect(() => {
    document.querySelectorAll('#top .reveal').forEach((el) => el.classList.add('visible'))
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
