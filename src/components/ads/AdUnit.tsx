import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_ENABLED, AD_SLOTS, AdSlotName } from "./adsenseConfig";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdUnitProps {
  /** Which named slot from AD_SLOTS to render. */
  slot: AdSlotName;
  /** Optional label above the ad — honest disclosure, and AdSense-compliant. */
  label?: string;
  className?: string;
}

/**
 * A single responsive AdSense unit.
 *
 * Renders nothing at all until a real publisher ID is configured (see
 * adsenseConfig.ts), so pages never show an empty ad frame before approval.
 * Server-side (SSG) it also renders nothing — the ad only initializes in the
 * browser, after the AdSense script has loaded.
 */
export const AdUnit = ({ slot, label = "Advertisement", className = "" }: AdUnitProps) => {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || pushed.current || typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet / blocked — fail silently, no console noise.
    }
  }, []);

  // Before approval, or during SSG, render nothing so there's no empty box.
  if (!ADSENSE_ENABLED) return null;

  return (
    <div className={`my-10 ${className}`}>
      <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2 text-center">
        {label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={AD_SLOTS[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
