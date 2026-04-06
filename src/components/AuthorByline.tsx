export function AuthorByline() {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-xs font-heading text-white/70">
        MD
      </div>
      <div>
        <p className="text-xs text-white/65 font-sans">
          <span className="text-white/85">Mandeep Singh</span>{" "}
          <span className="text-white/40">·</span>{" "}
          25+ Years UK Financial Services
        </p>
      </div>
    </div>
  );
}
