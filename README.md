# Andrewsthetics Compound Source Directory — v0.2

Supplier-first static prototype. No individual compound records, no backend, no live inventory scraping, and no dependencies. Intended for lawful consumer-product supplier listings. Public GitHub Pages is not a secure paid-access host and restricts commercial use; do not publish paid-only content there.

## Install or update
Unzip the archive and upload/replace index.html, style.css, app.js and data.js at the root of the existing GitHub repository. Commit the changes. For a new public prototype, enable Pages in Settings > Pages, Deploy from a branch > main > /(root). Open index.html locally to preview.

## Add websites
Only edit data.js. Add an object inside the suppliers array for each eligible website; separate objects with commas. Example (fictional):

```js
{
  name: "Example Supplier",
  website: "https://example.com",
  overview: "Vitamins, minerals and amino acids.",
  notes: "Important information about the website. Disclose any affiliate relationship here.",
  promoCode: "EXAMPLE10"
}
```

Use an empty string for promoCode if no code is known; the promo section is automatically hidden. Search matches terms in names, URLs, overviews and notes, not live external inventories. Counts and alphabetical sorting update automatically. The example is not included in the live data.
