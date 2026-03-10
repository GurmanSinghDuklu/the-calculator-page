import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  url?: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const { toast } = useToast();
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const ButtonComponent = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-2 px-4 border border-white/20 text-white/60 hover:border-white hover:text-white transition-all"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">Share this article</h3>
      <div className="flex flex-wrap gap-2">
        <ButtonComponent
          icon={Twitter}
          label="Twitter"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
        />
        <ButtonComponent
          icon={Facebook}
          label="Facebook"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
        />
        <ButtonComponent
          icon={Linkedin}
          label="LinkedIn"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
        />
        <ButtonComponent
          icon={Mail}
          label="Email"
          onClick={() => window.open(shareLinks.email, "_blank")}
        />
        <ButtonComponent
          icon={Link2}
          label="Copy Link"
          onClick={copyToClipboard}
        />
      </div>
    </div>
  );
};
