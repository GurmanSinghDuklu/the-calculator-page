import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  linkTo?: string;
  className?: string;
}

// Geometric minimalist icon component
const LogoIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const iconSizes = {
    sm: { width: 40, height: 40, strokeWidth: 1.3 },
    md: { width: 48, height: 48, strokeWidth: 1.3 },
    lg: { width: 72, height: 72, strokeWidth: 1 },
  };

  const { width, height, strokeWidth } = iconSizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Triangle frame */}
      <path
        d="M20 4L36 34H4L20 4Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Vertical line with circle */}
      <line
        x1="20"
        y1="12"
        x2="20"
        y2="28"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Small circle accent */}
      <circle
        cx="20"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export const Logo = ({ size = "md", linkTo = "/", className = "" }: LogoProps) => {
  const textSizes = {
    sm: "text-base md:text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };

  const gapSizes = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  const content = (
    <div className={`flex items-center ${gapSizes[size]} ${className}`}>
      <LogoIcon size={size} />
      <div className="flex items-baseline">
        <span className={`font-serif ${textSizes[size]} font-light text-foreground tracking-tight leading-none`}>
          The
        </span>
        <span className={`font-serif ${textSizes[size]} font-normal text-foreground tracking-tight leading-none ml-1.5`}>
          Calculator
        </span>
        <span className={`font-serif ${textSizes[size]} font-bold text-foreground tracking-tight leading-none ml-1.5`}>
          Page
        </span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="group">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
