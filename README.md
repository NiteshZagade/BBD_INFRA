BBD Infra — Next.js site

Short overview
- Tech: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion.
- Pages: Home, About, Projects, Project Details (/projects/[slug]), Plant & Machinery, Clients, Careers, Contact, Awards, Finance, Insights, Leadership, Social Responsibility, Admin (localStorage demo).
- Design: “Our Expertise” card row, “Iconic Projects” cards (home + projects), counters, hero typewriter, blue footer CTA.
- Map: “Maharashtra Project Footprint” uses a Datawrapper embed by default (fully local alternatives are included).

Run locally
- npm run dev — start dev server at http://localhost:3000
- npm run build — production build
- npm start — run production server
- npm run lint — lint (if configured)

Current state
- Projects root (`/projects`) is intentionally blank per request.
- All category routes were removed (deleted `src/app/projects/categories/*`).
- Iconic Projects on Home still link to detail pages at `/projects/[slug]`.

Content control
- Iconic Projects data: src/app/projects/data.ts
  - Each project needs a unique slug.
  - Card image path: public/images/projects/<slug>-1.(jpg|jpeg|png|webp|avif)
  - Detail image path: public/images/projects/<slug>-2.(jpg|jpeg|png|webp|avif)
  - “View More” pages read from the same data file.

- Plant & Machinery images: public/images/plants
  - Filenames must match the slug list in src/app/plant-machinery/page.tsx.
  - The component auto‑tries .jpg/.jpeg/.png/.webp/.avif and shows a fallback if missing.

Map options (choose one)
- Datawrapper (current): Home embeds chart id OnBCa.
  - Component: src/components/DatawrapperEmbed.tsx
  - Change chart: <DatawrapperEmbed chartId="NEW_ID" /> in src/app/page.tsx.

- Local image overlay (pins + tooltips):
  - Component: src/components/MaharashtraMapImage.tsx
  - Place map image at public/images/maps/maharashtra-districts.png
  - Adjust pin positions/labels in the markers array in the component.

- Local SVG (customisable):
  - Component: src/components/MaharashtraMap.tsx (stylised silhouette now).
  - If you provide a districts SVG, we can wire district‑level hover + tooltips.

Notes
- All site images are served from /public/images; swap images freely, names must match code references.
- The Admin page is a lightweight demo that stores values in localStorage only (no backend).

GitHub
- To push this code to your repo:
  - git init (if not already)
  - git remote add origin https://github.com/NiteshZagade/BBD_INFRA.git
  - git add . && git commit -m "Initial site setup"
  - git branch -M main && git push -u origin main

File hints
- Home: src/app/page.tsx
- About: src/app/about/page.tsx
- Projects listing: src/app/projects/page.tsx
- Project details: src/app/projects/[slug]/page.tsx
- Iconic Projects section: src/components/IconicProjects.tsx
- Datawrapper embed: src/components/DatawrapperEmbed.tsx
- Local maps: src/components/MaharashtraMap*.tsx
