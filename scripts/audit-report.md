# Image Audit Report

**Total checked:** 1014
**OK on first pass:** 976
**Suspected broken on first pass:** 38
**Confirmed broken after recheck:** 15
**Patched to family-themed SVG placeholders:** 15
**Healthy URLs in catalog:** 999 / 1014 (98.5%)

**Generated:** 2026-05-13

## Confirmed broken (now using `/placeholders/{family}.svg`)

| Name | House | Family | Reason |
|---|---|---|---|
| Legend Night | Hugo Boss | Amber Spicy | Reused id 36000 (collision with Chrome Legend / Dahlia Divin etc.) |
| Boss Femme | Hugo Boss | Floral | Reused id 800 (collision with Envy/Organza/Ambra/Bvlgari Pour Homme) |
| Downtown | Calvin Klein | Floral | Reused id 36000 |
| Legend Night | Montblanc | Amber Spicy | Reused id 36000 |
| Envy for Women | Gucci | Floral | Reused id 800 |
| Chrome Legend | Azzaro | Aromatic Aquatic | Reused id 36000 |
| Organza | Givenchy | Amber Floral | Reused id 800 |
| Dahlia Divin | Givenchy | Floral | Reused id 36000 |
| Born in Roma Green Stravaganza | Valentino | Aromatic Citrus | Estimated id 90013 — not assigned on Fragrantica |
| Rose Night | Montale | Floral | Reused id 36000 |
| Roses on Ice | Kilian | Floral | Reused id 36000 |
| Ambra | Acqua di Parma | Amber | Reused id 800 |
| Gold | Commodity | Amber Woody | Reused id 33700 |
| Black Opium | Yves Saint Laurent | Amber Vanilla | Reused id 36004 |
| Bvlgari Pour Homme | Bvlgari | Aromatic Fougere | Reused id 800 |

## Note

The 23 timeouts on the first pass were all rate-limit responses from
fimgs.net (CDN throttled our parallel HEADs); they came back healthy on a
second pass with a 1s inter-request delay. They are not patched.

## Per-house health

All 63 houses have ≥95% healthy images. The 15 patched entries are
spread across 12 different houses, with no single house disproportionately
affected.
