import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  linkTo?: string;
  className?: string;
}

export const Logo = ({ size = "md", linkTo = "/", className = "" }: LogoProps) => {
  const scale = {
    sm: { the: "text-[11px]", calc: "text-[22px]", page: "text-[22px]", gap: "-space-y-0.5", mark: 30, marginR: "mr-2.5" },
    md: { the: "text-[14px]", calc: "text-[28px]", page: "text-[28px]", gap: "-space-y-1",   mark: 40, marginR: "mr-3"   },
    lg: { the: "text-[22px]", calc: "text-[44px]", page: "text-[44px]", gap: "-space-y-1.5", mark: 62, marginR: "mr-4"  },
  }[size];

  // Icon mark — mirrors the favicon/app icon (public/favicon.svg) so the site
  // and the browser tab/app icon read as the same brand.
  const mark = (
    <svg
      width={scale.mark}
      height={scale.mark}
      viewBox="0 0 512 512"
      className={`shrink-0 ${scale.marginR}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="512" height="512" rx="112" fill="#111318" />
      <rect x="16" y="16" width="480" height="480" rx="98" fill="none" stroke="#22C55E" strokeOpacity="0.18" strokeWidth="4" />
      <rect x="128" y="196" width="256" height="46" rx="23" fill="#22C55E" />
      <rect x="128" y="270" width="256" height="46" rx="23" fill="#FFFFFF" />
    </svg>
  );

  const content = (
    <div className={`flex items-center select-none ${className}`}>
      {mark}
      <div className={`flex flex-col leading-none font-display ${scale.gap}`}>
        <span className={`${scale.the} text-white tracking-[0.3em] uppercase`}>The</span>
        <span className={`${scale.calc} tracking-tight uppercase`}
          style={{ color: "#22C55E" }}>Calc</span>
        <span className={`${scale.page} text-white tracking-tight uppercase`}>App</span>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="hover:opacity-80 transition-opacity">{content}</Link>;
  }
  return content;
};

export default Logo;