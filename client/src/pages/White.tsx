import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Zap, Shield, ArrowRight, ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "wouter";

/**
 * Design Philosophy: General Traffic Landing Page
 * - SEO-optimized content for search engines and general audience
 * - Broad appeal with informative content
 * - Multiple engagement paths for different user types
 */
export default function WhitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header with Back Button */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-foreground">General Access</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">General Audience</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Welcome to Our Platform
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive traffic routing and protection system. 
            Whether you're a desktop user, international visitor, or crawler, this page is optimized for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Why You're Here Section */}
      <section className="container py-12">
        <Card className="p-6 border-border/50 bg-secondary/30 space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground">Routing Information</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You've been routed to this page because you match one of the following criteria:
              </p>
              <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                <li>• Desktop or non-mobile device</li>
                <li>• IP address outside of Brazil</li>
                <li>• Crawler or bot user-agent detected</li>
                <li>• Non-in-app browser access</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Overview */}
      <section className="container py-20 space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-foreground">What We Offer</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions for traffic management and user routing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Content Card 1 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-border transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
              <Globe className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Global Reach</h4>
            <p className="text-sm text-muted-foreground">
              Our platform serves users worldwide with optimized content for different regions and device types.
            </p>
          </Card>

          {/* Content Card 2 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-border transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
              <Shield className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Security First</h4>
            <p className="text-sm text-muted-foreground">
              Advanced protection layers ensure legitimate traffic while filtering bots and malicious requests.
            </p>
          </Card>

          {/* Content Card 3 */}
          <Card className="p-6 space-y-4 border-border/50 hover:border-border transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Analytics</h4>
            <p className="text-sm text-muted-foreground">
              Track traffic patterns, user behavior, and routing decisions with comprehensive analytics.
            </p>
          </Card>
        </div>
      </section>

      {/* System Architecture */}
      <section className="container py-20 space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-foreground">How Our System Works</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multi-layer intelligent routing for optimal user experience
          </p>
        </div>

        <div className="space-y-4">
          {/* Layer 1 */}
          <Card className="p-6 border-border/50 hover:border-border transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Geo-Blocking Layer</h4>
                <p className="text-sm text-muted-foreground">
                  The system first checks your IP address location. Brazilian IPs (BR) proceed to the next layer, 
                  while all other locations are routed to this page for general content.
                </p>
              </div>
            </div>
          </Card>

          {/* Layer 2 */}
          <Card className="p-6 border-border/50 hover:border-border transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Device Detection</h4>
                <p className="text-sm text-muted-foreground">
                  For Brazilian users, the system identifies whether you're on a mobile device accessing from 
                  an in-app browser (Instagram, Facebook, TikTok, WhatsApp). Desktop users are routed here.
                </p>
              </div>
            </div>
          </Card>

          {/* Layer 3 */}
          <Card className="p-6 border-border/50 hover:border-border transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Bot Detection</h4>
                <p className="text-sm text-muted-foreground">
                  The system verifies that requests come from real users, not bots or crawlers. 
                  Known bots (Googlebot, Facebot, etc.) are routed to this page for SEO purposes.
                </p>
              </div>
            </div>
          </Card>

          {/* Layer 4 */}
          <Card className="p-6 border-border/50 hover:border-border transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Smart Routing</h4>
                <p className="text-sm text-muted-foreground">
                  Based on all criteria, users are routed to either the premium black page 
                  (Brazil + Mobile + In-App + Not a Bot) or this general white page.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6 p-12 rounded-lg bg-secondary/30 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground">Interested in Advanced Cloaker?</h3>
          <p className="text-muted-foreground">
            Explore our system and discover how intelligent routing can improve your campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/30 backdrop-blur-sm mt-20">
        <div className="container py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold text-foreground">Advanced Cloaker</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise traffic routing and protection system
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/"><a className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</a></Link></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 Advanced Cloaker. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Deployed on Vercel with Next.js Edge Middleware
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
