# Unravel Chrome Extension (Stage 1 Foundation)

This folder contains the initial Stage 1 extension implementation aligned with `app_context/PRD_Chrome_Extention.md`.

## Implemented requirements

- `E-1.1` Product page detection on supported retailers
- `E-1.2` Fiber content extraction and normalization from page DOM
- `E-1.3` Sustainability score using the Stage 1 weighted ensemble in the PRD
- `E-1.4` Brand reputation feature input via local ratings dataset
- `E-1.5` Trend label classification by keyword matching
- `E-1.6` Health impact flagging
- `E-1.7` Cost-per-wear estimate
- `E-1.8` React popup panel
- `E-1.9` “See Full Trend Analysis” deep link
- `E-1.10` Extension icon badge coloring
- `E-1.11` Manual fiber input fallback in popup

## Development

```bash
cd extension
npm install
npm run build
```

Load the built extension from `extension/dist` in Chrome (`chrome://extensions` -> Developer mode -> Load unpacked).

## Notes

- The service worker attempts backend scoring at `http://localhost:8000/api/v1/score` and falls back to local scoring if the backend is unavailable.
- Retailer selectors are maintained in `src/config/retailerSelectors.json` for easier updates when site DOMs change.
