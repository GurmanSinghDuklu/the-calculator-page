import { Button } from "@/components/ui/button";
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

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm tracking-wide uppercase text-muted-foreground">Share this article</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.twitter, "_blank")}
          className="gap-2"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.facebook, "_blank")}
          className="gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.linkedin, "_blank")}
          className="gap-2"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.email, "_blank")}
          className="gap-2"
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="gap-2"
        >
          <Link2 className="h-4 w-4" />
          Copy Link
        </Button>
      </div>
    </div>
  );
};
