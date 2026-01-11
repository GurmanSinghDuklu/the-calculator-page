import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = {
  emails: {
    send: async (options: any) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        },
        body: JSON.stringify(options),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }
      
      return await response.json();
    }
  }
};

// Get the allowed origin from environment or default to the Supabase URL
const getAllowedOrigin = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  // Extract the project ref and construct the Lovable preview URL pattern
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
  // Allow localhost for development and the production domain
  return "*"; // For demo purposes - in production, restrict to specific domains
};

const corsHeaders = {
  "Access-Control-Allow-Origin": getAllowedOrigin(),
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PurchaseConfirmationRequest {
  email: string;
  productName: string;
  amount: string;
  unlockUrl: string;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validate request body
const validateRequest = (body: any): { valid: boolean; error?: string } => {
  if (!body.email || typeof body.email !== 'string') {
    return { valid: false, error: "Email is required and must be a string" };
  }
  
  if (!EMAIL_REGEX.test(body.email)) {
    return { valid: false, error: "Invalid email format" };
  }
  
  if (body.email.length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  
  if (!body.productName || typeof body.productName !== 'string') {
    return { valid: false, error: "Product name is required" };
  }
  
  if (body.productName.length > 200) {
    return { valid: false, error: "Product name must be less than 200 characters" };
  }
  
  if (!body.amount || typeof body.amount !== 'string') {
    return { valid: false, error: "Amount is required" };
  }
  
  if (!body.unlockUrl || typeof body.unlockUrl !== 'string') {
    return { valid: false, error: "Unlock URL is required" };
  }
  
  // Validate unlock URL is a valid URL
  try {
    new URL(body.unlockUrl);
  } catch {
    return { valid: false, error: "Invalid unlock URL format" };
  }
  
  return { valid: true };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Unauthorized - No authorization header" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client and verify the JWT
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Authenticated user:", user.id);

    // Parse and validate request body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const validation = validateRequest(body);
    if (!validation.valid) {
      console.error("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, productName, amount, unlockUrl }: PurchaseConfirmationRequest = body;

    // Sanitize inputs for HTML to prevent XSS
    const sanitize = (str: string) => str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    console.log("Sending purchase confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Financial Calculator <onboarding@resend.dev>",
      to: [email],
      subject: "🎉 Your Purchase is Complete - Access Your Premium Content",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin: 20px 0;
              }
              .details {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              h1 {
                margin: 0;
                font-size: 28px;
              }
              h2 {
                color: #667eea;
                margin-top: 0;
              }
              .checkmark {
                font-size: 48px;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="checkmark">✅</div>
              <h1>Payment Successful!</h1>
              <p>Thank you for your purchase</p>
            </div>
            
            <div class="content">
              <h2>🎉 Welcome to Premium Content</h2>
              
              <p>Hi there,</p>
              
              <p>Your payment has been successfully processed! You now have instant access to your premium content.</p>
              
              <div class="details">
                <strong>Purchase Details:</strong><br>
                <strong>Product:</strong> ${sanitize(productName)}<br>
                <strong>Amount:</strong> ${sanitize(amount)}<br>
                <strong>Email:</strong> ${sanitize(email)}
              </div>
              
              <p><strong>What you've unlocked:</strong></p>
              <ul>
                <li>🔓 The Cheat Code Millionaire Formula</li>
                <li>💡 The Two-Portfolio System used by top 1% investors</li>
                <li>📈 How to reduce your millionaire timeline by 5–15 years</li>
                <li>🎯 The exact formula millionaires follow (rarely taught publicly)</li>
                <li>🔥 How to turn market crashes into wealth acceleration opportunities</li>
              </ul>
              
              <center>
                <a href="${sanitize(unlockUrl)}" class="button">
                  Access Your Premium Content →
                </a>
              </center>
              
              <p><strong>Important:</strong> Save this email! You can return to your premium content anytime using the link above.</p>
              
              <div class="details">
                <strong>💡 Pro Tip:</strong><br>
                Bookmark the access link so you can revisit this powerful content whenever you need it.
              </div>
              
              <p>If you have any questions or need assistance, feel free to reach out.</p>
              
              <p>Here's to your financial success! 🚀</p>
              
              <p>Best regards,<br>
              <strong>The Financial Calculator Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation email for your purchase.</p>
              <p>© ${new Date().getFullYear()} Financial Calculator. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-purchase-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
