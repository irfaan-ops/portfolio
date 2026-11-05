# portfolio

My career portfolio website.

Plain HTML, CSS and JavaScript with no build step, so it deploys as-is on Cloudflare Pages.

## Run locally

```sh
cd public
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on Cloudflare

The site deploys as a Cloudflare Worker that serves the static files in `public/`, configured in
`wrangler.jsonc`. In the Cloudflare dashboard, connect this repository with:

- Build command: (leave empty)
- Deploy command: `npx wrangler deploy`

Every push to `main` then redeploys the site.

## Editing content

All copy lives in `public/index.html`. Anything wrapped in `<mark class="ph">…</mark>` is placeholder
text and shows with a dotted gold underline. Replace the text and remove the `mark` tags as real
details are added, then delete the `.draft-bar` element at the top of the page.

Each career card has a `data-tone` (`emerald`, `oxblood`, `sapphire` or `cognac`) that sets its
colour, and a `data-pattern` (`rosette`, `spiro`, `wave` or `rings`) that sets its engraved
background pattern. To add a role, copy an `<article class="exp">` block and give its
`aria-controls` and detail `id` a new number.

The colour theme lives in the tokens at the top of `public/styles.css`.

## Projects

The Projects section on the home page and each project page are built from `public/projects/data.js`.
Each project opens at `/projects/?p=<slug>`, where its elevation draws itself as the page background:
grid lines first, then the outline from the ground up, the structure floor by floor, the windows and
façade details, and finally dimensions and annotations. Visitors can replay it, and anyone who has
asked their device to reduce motion sees the finished drawing straight away.

To add a project:

1. Copy the Mansard Riyadh entry in `public/projects/data.js`, give it a new `slug`, and update the text.
   Text in `[square brackets]` shows as a placeholder with a dotted underline.
2. Describe its façade under `facade` (all sizes in metres):
   - `blocks`: one per building mass, each with `x` (left edge), `bays` (structural grid widths, left to
     right), `levels` (ground up) and a `roof`. Mark the main block with `main: true`.
   - Level `type` is one of `colonnade` (tall ground floor with piers and shopfronts; `entranceBays`
     picks the bays with the entrance canopy), `punched` (windows in a solid wall; `perBay`, `winW`),
     `curtain` (glazed wall; `module` sets the mullion spacing), `balcony` (glazing behind projecting
     balconies) or `screen` (windows behind a lattice screen).
   - Roof `type` is `mansard` (`h`, `inset`, `dormersPerBay`), `parapet` (`h`) or `flat`.
   - Optional `palms`, leader `notes` (`x`, `y`, `dx`, `dy`, optional `elbowX`, `text`) and a `titleBlock`.
3. Run `node tools/render-elevations.js` to write the card thumbnail and the no-JavaScript fallback
   into `public/assets/projects/`, and commit them.
4. Optionally set `photo` to an image under `public/assets/projects/`; the page fades to it once the
   drawing completes, and shows a button to switch between drawing and photograph.

### Walk-through

A project can follow its drawing with a photographic walk-through: each scene is a photo with a slow
camera move, crossfading into the next. List the scenes under `walkthrough` in `data.js` (`src`,
`label`, `dur` in seconds, and `from`/`to` camera positions, where `x`/`y` are percentages of the frame
and `s` is the zoom). Pushing in (a larger `s` at the end) reads as walking forward; pulling out reads
as stepping back. Scenes whose photo is missing are skipped, so the page still works before the
photos are added. Visitors can pause it; with reduced motion the scenes simply crossfade.

Mansard Riyadh expects its photos at `public/assets/projects/mansard-riyadh/`:
`01-facade.jpg`, `02-entrance.jpg`, `03-foyer.jpg` and `04-lobby.jpg`. Landscape images about
2400px wide, saved as JPEG at around 80% quality, keep the page quick.
