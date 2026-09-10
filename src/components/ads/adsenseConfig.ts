// AdSense configuration.
//
// ADS ARE FULLY DISABLED as of 2026-09-10. Auto ads was strongly suspected
// (never conclusively confirmed by Google) of causing a ~98% site-wide GSC
// impressions collapse starting 2026-08-18. Auto ads was switched off in
// the dashboard on 2026-09-03; impressions had not clearly recovered by
// 2026-09-10, and the owner decided the ad revenue isn't worth the risk
// while the site is still recovering. See memory: gsc-impressions-drop-watch.
//
// The publisher ID is kept here (commented) for whenever ads are revisited —
// the account itself is paused/units removed in the AdSense dashboard, not
// deleted, but the loader script has been removed from index.html entirely
// so nothing Google-ad-related loads on the page at all right now.
//
// To re-enable in future: restore the loader script in index.html, set a
// real ADSENSE_CLIENT_ID below, create/paste a real ad unit slot ID into
// AD_SLOTS, and re-add the line to public/ads.txt.

export const ADSENSE_CLIENT_ID = "ADSENSE_CLIENT_ID_PLACEHOLDER"; // was ca-pub-8712184384438047

/** True once a real publisher ID has been filled in. Guards all rendering. */
export const ADSENSE_ENABLED =
  ADSENSE_CLIENT_ID.startsWith("ca-pub-") && ADSENSE_CLIENT_ID.length > 10;

// Named ad slots. Create these units in AdSense and paste the numeric slot IDs.
// Keeping them named (not scattered magic numbers) means one place to manage.
export const AD_SLOTS = {
  /** In-content responsive unit shown below each calculator, above the article body. */
  calculatorInContent: "AD_SLOT_CALCULATOR_INCONTENT", // was "9489053727"
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/** A slot is live only once its placeholder is replaced by a numeric AdSense slot ID. */
export const isSlotConfigured = (name: AdSlotName): boolean =>
  /^\d+$/.test(AD_SLOTS[name]);
