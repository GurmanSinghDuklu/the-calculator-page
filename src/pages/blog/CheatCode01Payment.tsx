import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/blog/cheat-code-01")}
            className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white/20 text-white/40 hover:border-white hover:text-white transition-all mb-8"
          >
            ← Back to Article
          </button>

          <div className="border border-white/10 bg-white/[0.015] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-8 w-8 text-white/60" />
              <div>
                <h1 className="font-display text-3xl font-normal text-white">Unlock The Cheat Code Secret</h1>
                <p className="text-zinc-400 font-heading text-[10px] uppercase tracking-widest mt-1">One-time payment • Instant access</p>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.015] p-6 mb-8">
              <h2 className="font-display text-2xl font-normal text-white mb-4">What You'll Get:</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">The hidden factor that can reduce your millionaire timeline by 5–15 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">The Two-Portfolio System used by top 1% investors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">How to turn market crashes into wealth acceleration opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">The exact formula millionaires follow (rarely taught publicly)</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-white font-display">$20.00 USD</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label htmlFor="email" className="block font-heading text-[10px] uppercase tracking-widest text-white mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <p className="text-xs text-zinc-500 mt-1 font-heading">
                  We'll send your purchase confirmation and access link here
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block font-heading text-[10px] uppercase tracking-widest text-white mb-2">Cardholder Name</label>
                <input
                  id="name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block font-heading text-[10px] uppercase tracking-widest text-white mb-2">Card Number</label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block font-heading text-[10px] uppercase tracking-widest text-white mb-2">Expiry Date</label>
                  <input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block font-heading text-[10px] uppercase tracking-widest text-white mb-2">CVC</label>
                  <input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    maxLength={4}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-5 font-heading text-[10px] uppercase tracking-[0.18em] border border-white bg-white text-black hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? "Processing Payment..." : "Pay $20.00 USD"}
              </button>

              <p className="text-xs text-center text-zinc-500 font-heading">
                Demo payment page • No real charges will be made
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatCode01Payment;
