import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden leaf-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Waste Management</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Transform Your
            <br />
            <span className="eco-gradient-text">Waste Into Impact</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join thousands of citizens using AI to properly segregate waste, report issues, 
            and earn rewards while building cleaner communities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/signup">
              <Button variant="hero" className="group">
                Start Making Impact
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="glass" size="lg" className="gap-2">
                <MapPin className="h-5 w-5" />
                View Live Map
              </Button>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <FeatureCard
              icon={<Sparkles className="h-5 w-5" />}
              title="AI Segregation"
              description="Smart waste classification using AI"
            />
            <FeatureCard
              icon={<MapPin className="h-5 w-5" />}
              title="Location Tracking"
              description="Report & track waste issues on map"
            />
            <FeatureCard
              icon={<Leaf className="h-5 w-5" />}
              title="Earn Rewards"
              description="Get eco-points for every action"
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card p-4 rounded-xl hover:scale-105 transition-transform cursor-default">
      <div className="flex items-center gap-3">
        <div className="eco-gradient p-2 rounded-lg text-primary-foreground">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
