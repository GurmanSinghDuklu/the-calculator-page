import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  linkTo?: string;
  className?: string;
}

export const Logo = ({ size = "md", linkTo = "/", className = "" }: LogoProps) => {
  const scale = {
    sm: { the: "text-[11px]", calc: "text-[22px]", page: "text-[22px]", gap: "-space-y-0.5" },
    md: { the: "text-[14px]", calc: "text-[28px]", page: "text-[28px]", gap: "-space-y-1"   },
    lg: { the: "text-[22px]", calc: "text-[44px]", page: "text-[44px]", gap: "-space-y-1.5" },
  }[size];

  const content = (
    <div className={`flex flex-col leading-none font-display ${scale.gap} select-none ${className}`}>
      <span className={`${scale.the} text-white tracking-[0.3em] uppercase`}>The</span>
      <span className={`${scale.calc} tracking-tight uppercase`}
        style={{ color: "#22C55E" }}>Calc</span>
      <span className={`${scale.page} text-white tracking-tight uppercase`}>App</span>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="hover:opacity-80 transition-opacity">{content}</Link>;
  }
  return content;
};

export default Logo;