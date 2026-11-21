# Asyam Daffa' Tsaqif — Portfolio

Next.js (App Router) · React · TypeScript · Tailwind CSS

## Run locally

    npm install
    npm run dev

## Before launch: replace placeholders

Edit `lib/content.ts`:

- `site.url`: production domain (also used for sitemap, robots, and metadata)
- `site.email`, `site.linkedin`, `site.github`
- `experience[1]`: SOC Analyst L1 employer and dates
- `about.paragraphs`: review and add only details you can stand behind

Also update the hard-coded LinkedIn/GitHub labels in `components/Contact.tsx` to match your real handles.

## Structure

- `app/` routes, layout, metadata, robots, sitemap
- `components/` one component per section, plus shared `Section` and `Reveal`
- `lib/content.ts` all copy and data, in one place

## Deploy

    npm run build

Deploys cleanly on Vercel or any Node host. Add an Open Graph image at `app/opengraph-image.png` if you want link previews.
