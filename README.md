# nickahlers.com

Professional portfolio site I built to showcase projects, skills, and experience as a Frontend Engineer.

### Live site: nickahlers.com

## Tech Stack

Framework: Next.js - 16.2.2
Styling: Tailwind - 4
Animations: Motion - 12.38.0
Language: TypeScript - 5
Deployment: Vercel


## Notable Technical Details

Built with custom animation using Motion's useScroll, useSpring, and useTransform hooks. Project cards stack on scroll and an animated timeline appears in the Experience section. 3D components built with isometric CSS transforms and layered planes via a custom LogoAnimation component
Dark-only design enforced at the layout level with a dark editorial aesthetic and sky blue accents throughout.
Performance first architecture using Next.js App Router conventions, server components where applicable, and optimized font and image loading


## Project Structure
app/
├── components/        # Reusable UI components
├── sections/          # Page sections (Hero, Projects, Experience, etc.)
├── lib/               # Utilities and constants
└── page.tsx           # Root page

Run locally:
yarn next dev

Open http://localhost:3000 to view it in the browser.

Build locally:
yarn next build