import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Zap, TrendingUp, Lock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

/**
 * Design Philosophy: Premium Conversion-Focused Page
 * - High-value content for qualified traffic
 * - Emphasis on exclusivity and premium benefits
 * - Strong call-to-action with conversion focus
 */
export default function BlackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      {/* Header with Back Button */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-foreground">Premium Access</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Exclusive Content</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Welcome to Premium Access
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You've been identified as a qualified user from Brazil accessing via mobile in-app browser. 
            This is exclusive, premium content designed specifically for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              <Zap className="w-4 h-4" />
              Claim Your Offer
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Status Badge */}
      <section className="container py-12">
        <Card className="p-6 border-primary/20 bg-primary/5 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Routing Criteria Met</h3>
              <p className="text-sm text-muted-foreground">
                ✓ Location: Brazil (BR) | ✓ Device: Mobile | ✓ Browser: In-App | ✓ Not a Bot
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Benefits Section */}
      <section className="container py-20 space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-foreground">Premium Benefits</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exclusive advantages for qualified users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Higher Conversion Rates</h4>
            <p className="text-sm text-muted-foreground">
              Targeted content specifically designed for Brazilian mobile users, optimized for in-app browser experience.
            </p>
          </Card>

          {/* Benefit 2 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Instant Access</h4>
            <p className="text-sm text-muted-foreground">
              No waiting, no verification delays. Premium content loads immediately with optimized performance.
            </p>
          </Card>

          {/* Benefit 3 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Secure & Private</h4>
            <p className="text-sm text-muted-foreground">
              Your data is protected with enterprise-grade security. Multi-layer verification ensures authenticity.
            </p>
          </Card>
        </div>
      </section>

      {/* Offer Section */}
      <section className="container py-20">
        <Card className="p-12 space-y-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground">Limited Time Offer</h3>
            <p className="text-lg text-muted-foreground max-w-2xl">
              As a qualified user from Brazil, you have exclusive access to this premium offer. 
              This opportunity is limited and personalized for your profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">What You Get:</h4>
              <ul className="space-y-3">
                {[
                  "Premium content access",
                  "Exclusive mobile optimization",
                  "Priority support",
                  "Early access to new features",
                  "Special Brazilian market pricing"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Pricing:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Regular Price</span>
                  <span className="text-foreground line-through">R$ 299,00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-muted-foreground">Your Price</span>
                  <span className="text-2xl font-bold text-primary">R$ 99,00</span>
                </div>
                <div className="text-sm text-primary font-medium">
                  ✓ 67% discount for Brazilian mobile users
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="gap-2 flex-1">
              <Zap className="w-4 h-4" />
              Activate Premium Access
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              View Full Details
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/30 backdrop-blur-sm mt-20">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Advanced Cloaker. Premium Access Page.
            </p>
            <div className="flex gap-6">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
