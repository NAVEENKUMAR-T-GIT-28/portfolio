# 🌌 Next-Gen Developer Portfolio

A next-generation, high-performance developer portfolio built with a state-of-the-art tech stack. This project showcases a visually stunning, fully responsive single-page web app experience powered by a **WebGL particle background**, premium **dynamic glassmorphism interfaces**, and a **JSON-driven custom architecture** using **React 19** and **Tailwind CSS**.

---

## ✨ Premium Features & Architecture

### 🌓 1. Theme-Aware Architecture & Dual-State Assets
*   **Dual-Screenshot Engine:** Projects support responsive light and dark assets. Instead of static single image paths, they use theme-aware image objects:
    ```json
    "images": {
      "light": "/src/data/images/projects/project-light.png",
      "dark": "/src/data/images/projects/project-dark.png"
    }
    ```
*   **Adaptive Theme Hook:** Safely resolves system preferences and manual toggles (`dark`, `light`, `system`) inside `ProjectCard.jsx` to render the correct screenshot seamlessly with soft animations.
*   **Default Light Theme Engine:** Boots with an elegant, responsive light theme as the initial load-state, providing instant visual feedback.

### 💻 2. Horizontal Showcase MacBook Cards (`ProjectCard.jsx`)
*   **Horizontal Layout:** High-end horizontal split design on desktop (55% macOS-style MacBook preview, 45% contextual details) and stacks dynamically on mobile.
*   **Virtual MacBook Frame:** Replaces plain image placeholders with an authentic macOS browser frame complete with micro-sized window controls (traffic lights) and custom title URLs reflecting project names.
*   **Crisp Interaction Physics:** Implements tilt mechanics and subtle mouse-following hover-scale effects (e.g. `scale-102` on card, `scale-103` on image) designed to preserve HD visual assets without introducing raster/GPU blur artifacts.
*   **Smart Tags & Metadata:** Displays a clean, uncluttered list showing the top 3 technology tags + `+N` indicator to maximize space efficiency, along with visual metadata labels (e.g. "Full Stack", "Personal Project").

### 🎭 3. Premium Interactive Detail Modals (`ProjectModal.jsx`)
*   **Backdrop Blur Mechanics:** Opens interactive overlay modals on card clicks. Uses `backdrop-blur-xl` combined with dynamic theme-aware background colors (`bg-black/60` on dark theme, `bg-black/20` on light theme) for depth.
*   **Animated Entrance & Exit:** Utilizes Framer Motion's `AnimatePresence` for smooth exit transitions and choreographed stagger animations of content, lists, and badges.
*   **Adaptive Glassmorphism:** Translucent designs built directly for light mode (milky white glass container, soft zinc borders, high contrast text) and dark mode (obsidian dark glass, custom borders).
*   **Accessibility Controls:** Closes seamlessly via standard clicks, clicking outside the container boundary, a dedicated exit button, or by hitting the `Escape` (ESC) keyboard button.

### ⏳ 4. Scroll-Linked Interactive Timeline (`Timeline.jsx` & `TimelineItem.jsx`)
*   **Scroll-Progress Connector:** Employs Framer Motion's `useScroll` and `useTransform` to progressively draw the central vertical line dynamically as the user scrolls.
*   **Viewport-Triggered Pulsing Nodes:** Dynamic circular timeline nodes pulse and reveal themselves using viewport entry intersection hooks.
*   **Icon Mapping Architecture:** Maps JSON string-based types directly to react icons dynamically using a scalable lookup object:
    ```javascript
    const iconMap = {
      graduation: GraduationCap,
      briefcase: Briefcase,
      award: Award,
      rocket: Rocket
    };
    ```
*   **Alternating Chronology:** Alternates layout alignment (left/right) on desktop screens, collapsing cleanly into a left-aligned vertical stack on mobile viewport sizes.

### 📂 5. Decoupled JSON-Driven Logic
*   **Zero-Hardcoding UI:** All layout sections, personal content, professional experiences, and projects are strictly isolated inside JSON configurations under `/src/data`. This allows instant personalization without altering component source files.

---

## 🛠️ Tech Stack & Dependencies

*   **Core Framework:** [React 19](https://react.dev/) & [Vite](https://vite.dev/) (Module bundler & dev server)
*   **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/) with Custom OKLCH Theme Layers
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **WebGL Particle System:** [OGL](https://github.com/oogl/ogl) (High-frequency, lightweight WebGL canvas simulation)
*   **Icons:** [Lucide React](https://lucide.dev/) (High-performance vector SVG icon engine)

---

## 📂 Codebase Directory Structure

```filepath
React Portfolio/
├── index.html                  # Core HTML structure & global head meta tags
├── package.json                # Project dependencies, devDependencies, and scripts
├── vite.config.js              # Vite configuration (port 5173, path definitions)
└── src/
    ├── App.jsx                 # Application root shell, routing configurations, and page mount
    ├── main.jsx                # DOM entry point & React root element mounting
    ├── styles.css              # Custom Tailwind directives, global styling layers & variables
    ├── components/             # Reusable UI component modules
    │   ├── AnimatedButton.jsx  # Physics-based interactive hover button
    │   ├── AvailabilityBadge.jsx # Dynamic pulsating "Available for hire" visual indicator
    │   ├── CategoryTabs.jsx    # Tab-based filtering for skill boards
    │   ├── Footer.jsx          # Site-wide footer with custom quick links
    │   ├── HeroProfile.jsx     # Floating card layout for the home page intro profile
    │   ├── HeroSection.jsx     # Hero landing section header containing bios and social widgets
    │   ├── HeroStats.jsx       # Custom numeric statistics block on hero landing
    │   ├── InfiniteTechCards.jsx # Endless looping horizontal marquee showcasing skill cards
    │   ├── Navbar.jsx          # Glassmorphic responsive top navigation bar
    │   ├── PageShell.jsx       # Fluid entrance transition container for page mounts
    │   ├── ParticleBackground.jsx # Background controller applying section themes to Particles
    │   ├── Particles.jsx       # WebGL OGL Canvas-based high-performance background particles
    │   ├── ProjectCard.jsx     # Horizontal MacBook-framed project showcase card
    │   ├── ProjectModal.jsx    # Theme-adaptive scroll-supporting detail overlay modal
    │   ├── ScrollToTop.jsx     # Interactive window return-to-top component
    │   ├── SectionDivider.jsx  # Glowing separating boundary line
    │   ├── SectionHeading.jsx  # Dual-color text header with gradient accent glows
    │   ├── SocialLinks.jsx     # Decoupled social icon routing dashboard
    │   ├── TechCard.jsx        # Premium glowing detail card for technical capabilities
    │   ├── TechnologyCard.jsx  # Standard grid badge card showing skill labels
    │   ├── TechnologySection.jsx # Context-aware dashboard grouping skillset categories
    │   ├── ThemeProvider.jsx   # Global Context provider managing active light/dark state
    │   ├── ThemeToggle.jsx     # Sun/Moon interactive switcher icon with rotation
    │   ├── Timeline.jsx        # Vertical scroll-progress timeline container component
    │   ├── TimelineCard.jsx    # Chronological detail card layout
    │   ├── TimelineItem.jsx    # Animated item mapping individual timeline JSON models
    │   └── TypewriterRoles.jsx  # Custom automatic typing visual simulator
    ├── data/                   # Decoupled static data files (Zero coding needed to update content)
    │   ├── certifications.json  # Array models mapping credential name, organization, and badges
    │   ├── contact.json        # Dynamic forms configurations and contact targets
    │   ├── education.json      # School history data models
    │   ├── experience.json     # Professional job roles data models
    │   ├── hero.json           # Landing layout definitions, tags, and stats values
    │   ├── navigation.json     # Navigation headers, links, and icons configurations
    │   ├── personal.json       # Bios, names, and contact parameters
    │   ├── projects.json       # Project titles, theme-aware dual screenshots, and code links
    │   ├── skills.json         # Raw listing values for skill grids
    │   ├── socialLinks.json    # Social media handles, active routes, and SVG definitions
    │   ├── technologies.json   # Full list of technology components, titles, categories, and colors
    │   └── timeline.json       # Standard source file feeding the scroll-linked Timeline component
    ├── hooks/
    │   └── useActiveSection.js # Intersection Observer hook driving scroll navigation
    └── pages/                  # Route level layout views
        ├── Certifications.jsx  # Premium grid layout exhibiting certificates & licenses
        ├── Contact.jsx         # Highly secure frontend contact card page
        ├── Experience.jsx      # Scroll-progress timeline shell
        ├── Home.jsx            # Integrated dashboard merging portfolio panels into a main page
        ├── Overview.jsx        # Personal biography page with interactive profiles
        ├── Projects.jsx        # Filterable showcases matching personal / team projects
        └── Technologies.jsx    # Multi-tab modular skill and technology visualization board
```

---

## ⚙️ Installation & Development Setup

Make sure you have [Node.js](https://nodejs.org/) version `18.x` or later installed on your system.

### 1. Clone & Enter the Workspace
```bash
git clone <your-repository-url>
cd "React Portfolio"
```

### 2. Install Development Dependencies
```bash
npm install
```

### 3. Spin Up Local Hot-Reload Server
```bash
npm run dev
```
The application will launch on your local host (usually `http://localhost:5173` or configured ports).

---

## ⚡ Customizing Your Content (Decoupled JSON Editing)

To customize the entire developer portfolio to highlight your own professional brand, simply edit the JSON configurations inside `src/data/`:

*   **Projects Showcase (`projects.json`):**
    Ensure both light and dark screenshots are defined so the dual-state preview is optimized for user settings:
    ```json
    {
      "title": "My Premium Project",
      "description": "An outstanding horizontal showcase web application.",
      "images": {
        "light": "/src/data/images/projects/project-light.png",
        "dark": "/src/data/images/projects/project-dark.png"
      },
      "tags": ["React", "Tailwind", "Framer Motion"],
      "github": "https://github.com/username/repo",
      "demo": "https://demo.url",
      "type": "Full Stack / Personal",
      "contributions": [
        "Architected modular state engine.",
        "Engineered smooth responsive timelines."
      ]
    }
    ```

*   **Interactive Chronology (`timeline.json`):**
    Maintain education and career positions dynamically. Provide an icon string that maps to the dynamic `iconMap` within `TimelineItem.jsx` (`graduation`, `briefcase`, `award`, or `rocket`):
    ```json
    {
      "year": "2024 - Present",
      "title": "Senior Solutions Engineer",
      "organization": "Innovations Corp",
      "description": "Lead developer for next-gen interactive web applications.",
      "icon": "briefcase",
      "tags": ["React", "Typescript", "System Architecture"],
      "highlights": [
        "Boosted core render speeds by 40% using canvas animations.",
        "Modernized client systems using flexible component libraries."
      ]
    }
    ```

---

## 📄 License

This codebase is open-source and available under the [MIT License](LICENSE). Customize it, deploy it, and launch your premium, high-performance developer portfolio!
