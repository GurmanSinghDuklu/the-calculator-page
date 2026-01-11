import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CheatCode01Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !expiry || !cvc || !name || !email) {
      toast.error("Please fill in all payment details");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Store unlock status in localStorage
        localStorage.setItem("cheatcode01_unlocked", "true");
        localStorage.setItem("cheatcode01_email", email);
        
        // Send confirmation email via edge function
        const unlockUrl = `${window.location.origin}/blog/cheat-code-01/unlocked`;
        
        const { error } = await supabase.functions.invoke('send-purchase-confirmation', {
          body: {
            email: email,
            productName: "The Cheat Code Secret - Millionaire Formula",
            amount: "$20.00 USD",
            unlockUrl: unlockUrl
          }
        });

        if (error) {
          console.error("Error sending confirmation email:", error);
          toast.error("Payment successful, but confirmation email failed to send");
        } else {
          toast.success("Payment successful! Check your email for confirmation.");
        }
        
        setTimeout(() => {
          navigate("/blog/cheat-code-01/unlocked");
        }, 1000);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Payment successful, but there was an issue with the confirmation");
        
        setTimeout(() => {
          navigate("/blog/cheat-code-01/unlocked");
        }, 1000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog/cheat-code-01")}
            className="mb-6"
          >
            ← Back to Article
          </Button>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Unlock The Cheat Code Secret</h1>
                <p className="text-muted-foreground">One-time payment • Instant access</p>
              </div>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">What You'll Get:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>The hidden factor that can reduce your millionaire timeline by 5–15 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>The Two-Portfolio System used by top 1% investors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>How to turn market crashes into wealth acceleration opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>The exact formula millionaires follow (rarely taught publicly)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">$20.00 USD</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send your purchase confirmation and access link here
                </p>
              </div>

              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing Payment..." : "Pay $20.00 USD"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Demo payment page • No real charges will be made
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheatCode01Payment;
