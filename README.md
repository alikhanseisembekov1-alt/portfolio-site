# Alikhan Seisembekov: portfolio

The site is one static page with no build step of its own:

- `public/index.html`: all the markup
- `public/assets/site.css`, `public/assets/site.js`: styles and behaviour (three.js scene, case files, field notes)
- `public/assets/img`, `public/assets/video`: photos, figures and the Lenia animation
- `public/assets/vendor/three.min.js`: three.js r128

Next.js is kept only as the host, so the existing Vercel project keeps working without changing its settings. `next.config.ts` serves `public/index.html` at `/` and redirects the routes of the previous site (`/research`, `/projects`, `/experience`, `/blog`, `/beyond`) to it.

## Run locally

    npm install
    npm run dev

Then open http://localhost:3000.

## Still to do

- Add the CV as `public/assets/cv.pdf` and link it from the contact card and footer (both say "CV available on request").
- Add the missing figures: nanowire micrograph, LangSmith graph screenshot.
- Point `og:image` in `public/index.html` at the final domain once there is one.
