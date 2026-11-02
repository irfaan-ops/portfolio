# portfolio

My career portfolio website.

Plain HTML, CSS and JavaScript with no build step, so it deploys as-is on Cloudflare Pages.

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on Cloudflare Pages

Create a Pages project from this repository with:

- Framework preset: None
- Build command: (leave empty)
- Build output directory: `/`

## Editing content

All copy lives in `index.html`. Anything wrapped in `<mark class="ph">…</mark>` is placeholder
text and shows with a dotted gold underline. Replace the text and remove the `mark` tags as real
details are added, then delete the `.draft-bar` element at the top of the page.

Each experience card has a `data-season` of `spring`, `summer`, `autumn` or `winter`, which sets
its colours and background motif. To add a role, copy an `<article class="exp">` block and give
its `aria-controls` and detail `id` a new number.
