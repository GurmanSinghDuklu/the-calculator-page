// AdSense configuration.
//
// TODO(owner): after AdSense approval, replace CLIENT_ID with your real
// publisher ID (looks like "ca-pub-XXXXXXXXXXXXXXXX") and create ad units in
// the AdSense dashboard, pasting each unit's slot ID below. Until a real
// CLIENT_ID is set, ad components render nothing (no broken/empty ad boxes).
//
// The same CLIENT_ID must also be set in:
//   - index.html (the loader <script>)
//   - public/ads.txt
// Search the repo for ADSENSE_CLIENT_ID_PLACEHOLDER to find every spot.

export const ADSENSE_CLIENT_ID = "ca-pub-8712184384438047";

/** True once a real publisher ID has been filled in. Guards all rendering. */
export const ADSENSE_ENABLED =
  ADSENSE_CLIENT_ID.startsWith("ca-pub-") && ADSENSE_CLIENT_ID.length > 10;

// Named ad slots. Create these units in AdSense and paste the numeric slot IDs.
// Keeping them named (not scattered magic numbers) means one place to manage.
export const AD_SLOTS = {
  /** In-content responsive unit shown below each calculator, above the article body. */
  calculatorInContent: "9489053727",
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/** A slot is live only once its placeholder is replaced by a numeric AdSense slot ID. */
export const isSlotConfigured = (name: AdSlotName): boolean =>
  /^\d+$/.test(AD_SLOTS[name]);
