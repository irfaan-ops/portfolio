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
