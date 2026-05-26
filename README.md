# 🌌  Developer Portfolio

A next-generation, high-performance developer portfolio built with a state-of-the-art tech stack. This project showcases a visually stunning, fully responsive single-page web app experience powered by a **WebGL particle background** and dynamic **glassmorphism interfaces** using **Tailwind CSS v4** and **React 19**.

---

## ✨ Features

*   **⚡ High-Performance WebGL Particles:** Custom particle simulation utilizing [OGL](https://github.com/oogl/ogl) (a lightweight WebGL library) inside the `Particles` component. Runs smoothly at 60 FPS, reacts dynamically to light/dark themes, and supports subtle micro-animations.
*   **🎨 Advanced Styling with Tailwind CSS v4:** Leverages the latest Tailwind v4 features, incorporating native custom CSS theme variables, `@theme inline` structure, and modern OKLCH color palettes for maximum color depth and range.
*   **🌓 Adaptive Glassmorphism & Theme Engine:** Fully integrated light and dark modes powered by CSS custom properties and React context (`ThemeProvider`). Incorporates visual glassmorphism (`backdrop-filter`) with glowing border effects and sleek transitions.
*   **📂 Fully JSON-Driven Content:** Zero-hardcoding layout where all portfolio data (personal bio, navigation, social links, education, experience, technologies, and projects) is kept strictly decoupled in standard JSON configuration files under `/src/data`.
*   **🎬 Smooth Orchestrated Transitions:** Uses [Framer Motion](https://www.framer.com/motion/) for fluid page-shell transitions, element entries, responsive sidebar/navbar behavior, and interactive hover-glow states.
*   **🧭 Modern Client-Side Routing:** Utilizes **React Router v7** for clean path-based navigation with full fallback handling.

---

## 🛠️ Tech Stack & Dependencies

*   **Core Framework:** [React 19](https://react.dev/) & [Vite](https://vite.dev/) (Module bundler & dev server)
*   **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH Color Space
*   **Animations:** [Framer Motion v12](https://www.framer.com/motion/)
*   **WebGL Renderer:** [OGL v1](https://github.com/oogl/ogl) (WebGL utility library)
*   **Router:** [React Router v7](https://reactrouter.com/)
*   **Iconography:** [Lucide React](https://lucide.dev/) (High-quality vector icons)

---

## 📂 Project Structure

Below is an annotated mapping of the codebase structure:

```filepath
React Portfolio/
├── index.html                  # Main entry page structure and head metadata
├── package.json                # Project dependencies, devDependencies, and scripts
├── vite.config.js              # Vite configuration (port 517, path aliases)
└── src/
    ├── App.jsx                 # Application entry point with router paths and root layout
    ├── main.jsx                # DOM mounting and initial React node setup
    ├── styles.css              # Custom Tailwind CSS v4 themes, OKLCH systems, and global layer classes
    ├── components/             # Reusable UI components
    │   ├── AnimatedButton.jsx  # Framer-motion-enhanced interactive button
    │   ├── Footer.jsx          # Site footer containing copyright and quick social links
    │   ├── Navbar.jsx          # Glassmorphic, responsive navigation bar
    │   ├── PageShell.jsx       # Transition wrapper for page-level animations
    │   ├── ParticleBackground.js # Dynamic container mapping active paths to background colors
    │   ├── Particles.jsx       # Raw WebGL OGL Canvas particle rendering engine
    │   ├── ProjectCard.jsx     # Rich project card displaying badges, image, and Git/live links
    │   ├── ScrollToTop.jsx     # Smooth window scroll helper button
    │   ├── SectionDivider.jsx  # Elegant layout separator with linear glow lines
    │   ├── SectionHeading.jsx  # Stylized typography header with background text gradients
    │   ├── SocialLinks.jsx     # Renders active links to developer profiles
    │   ├── TechnologyCard.jsx  # Grid card showcasing technology badges with hover glow effects
    │   ├── ThemeProvider.jsx   # React Context supporting system-preferred / manual light-dark toggle
    │   ├── ThemeToggle.jsx     # Interactive toggle button with spinning sun/moon indicators
    │   └── TimelineCard.jsx    # Card structure mapping education/experience chronology
    ├── data/                   # The portfolio data storage (No code changes required to change content)
    │   ├── contact.json        # Contact email, address, phone, and form settings
    │   ├── education.json      # Structured school credentials and achievements
    │   ├── experience.json     # Professional timeline, responsibilities, and badges
    │   ├── navigation.json     # Navbar routing configurations and paths
    │   ├── personal.json       # Name, titles, branding texts, and main CTA values
    │   ├── projects.json       # Project showcases, tag list, and GitHub repository references
    │   ├── skills.json         # Generic skill categories and statistics
    │   ├── socialLinks.json    # Links to GitHub, LinkedIn, Twitter, etc.
    │   └── technologies.json   # Comprehensive list of technologies (SVGs, categories, brand colors)
    ├── hooks/
    │   └── useActiveSection.js # Intersection Observer hook for tracking scroll context
    └── pages/                  # Page-level route views
        ├── Contact.jsx         # Contact me page with integrated messaging forms
        ├── Experience.jsx      # Vertical interactive timeline view of work history
        ├── Home.jsx            # Main interactive landing page combining page units
        ├── Overview.jsx        # Concise visual introduction and bio details
        ├── Projects.jsx        # Project grid overview page
        └── Technologies.jsx    # Complete filtered tech-stack visualization dashboard
```

---

## ⚙️ Installation & Local Setup

Get your development environment up and running in a few simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version `18.x` or later is recommended).

### 1. Clone & Navigate
```bash
git clone <your-repository-url>
cd "React Portfolio"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The server will start, typically on port `517` (e.g., `http://localhost:517` or configured port from your `vite.config.js`).

---

## 🎯 JSON Content Configuration

You do **not** need to touch React component code to update your profile data. Simply modify the JSON files inside `/src/data/`:

*   **`personal.json`**: Update your brand name, firstName, highlightName, job subtitle, and bios.
*   **`technologies.json`**: Add, remove, or edit your programming languages, frameworks, or tools. You can change their brand color tags and point icons to custom SVG links:
    ```json
    {
      "name": "TypeScript",
      "category": "Frontend",
      "icon": "FileType2",
      "color": "#3178C6",
      "imageUrl": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    }
    ```
*   **`projects.json`**: Define your projects. List tags, short descriptions, image path, live demonstration link, and GitHub repository.
*   **`experience.json` & `education.json`**: Maintain chronological details, dates, companies, roles, and major learnings.

---

## 🎨 Theme & Styling System

The application styling is written with **Tailwind CSS v4** inside `src/styles.css`. It features full **OKLCH** color values which allow higher brightness, better color-space interpolation, and dynamic themes.

### Defining custom colors
Custom design tokens are integrated within `@theme inline`:
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-cyan-glow: var(--cyan-glow);
  --color-blue-glow: var(--blue-glow);
  /* ... */
}
```

### Theme Colors Mapping (OKLCH)
Light and Dark variables are stored dynamically inside `:root` and `.dark` block layers:
```css
/* Dark theme overrides */
.dark {
  color-scheme: dark;
  --background: oklch(0.05 0.015 240);
  --foreground: oklch(0.98 0.005 240);
  --primary: oklch(0.78 0.16 220);
  /* ... */
}
```

### Premium Glassmorphism Classes
To achieve the premium look and feel, utility layers such as `.glass-card` and `.glow-hover` are available for global use:
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-card);
}
```


## 📄 License
This project is open-source and available under the [MIT License](LICENSE). Feel free to customize and use it to showcase your stellar developer credentials!
