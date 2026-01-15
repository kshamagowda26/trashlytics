import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Wifi, 
  Battery, 
  Sun, 
  Bell, 
  Truck, 
  MapPin,
  Cpu,
  Route,
  Zap,
  CheckCircle2,
  Gauge,
  Sparkles,
  Clock,
  Rocket,
  Target,
  Users,
  Leaf
} from "lucide-react";

const smartFeatures = [
  {
    icon: Gauge,
    title: "Fill Level Monitoring",
    description: "Ultrasonic sensors detect waste levels with 99% accuracy"
  },
  {
    icon: Wifi,
    title: "IoT Connectivity",
    description: "LoRaWAN & GSM for reliable data transmission"
  },
  {
    icon: Cpu,
    title: "AI Classification",
    description: "Edge AI camera identifies waste types automatically"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Instant notifications when bins need collection"
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Dynamic routing reduces fuel costs by 40%"
  },
  {
    icon: Sun,
    title: "Solar Powered",
    description: "Self-sustaining with solar panel & battery backup"
  }
];

const benefits = [
  { icon: Truck, title: "Reduce Collection Costs", description: "Cut operational costs by 30-50% with optimized routes" },
  { icon: Leaf, title: "Lower Carbon Footprint", description: "Fewer unnecessary trips mean reduced emissions" },
  { icon: Users, title: "Community Engagement", description: "Real-time updates keep citizens informed" },
  { icon: Target, title: "Prevent Overflow", description: "Proactive collection prevents littering and overflow" },
];

const roadmap = [
  { phase: "Phase 1", title: "Research & Design", status: "completed", description: "Sensor selection and prototype design" },
  { phase: "Phase 2", title: "Prototype Development", status: "in-progress", description: "Building and testing first smart bin units" },
  { phase: "Phase 3", title: "Pilot Program", status: "upcoming", description: "Deploy 50 bins in partner locations" },
  { phase: "Phase 4", title: "City-wide Rollout", status: "upcoming", description: "Full integration with Trashlytics platform" },
];

export default function SmartBin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="eco-gradient-text">Smart Bin</span> - Upcoming Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're developing IoT-enabled waste bins that integrate seamlessly with 
            Trashlytics for truly intelligent waste management. Join the revolution!
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            Expected Launch: Q3 2026
          </Badge>
        </section>

        {/* Vision Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground mb-6">
                      Imagine a city where waste bins communicate their status in real-time, 
                      collection trucks follow optimized routes, and citizens receive instant 
                      feedback on their recycling efforts.
                    </p>
                    <p className="text-muted-foreground">
                      Smart Bin will transform how cities manage waste, reducing costs, 
                      emissions, and creating cleaner communities for everyone.
                    </p>
                  </div>
                  <div className="relative h-64 bg-muted rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="eco-gradient w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <p className="font-semibold">Smart Bin v2.0</p>
                      <p className="text-sm text-muted-foreground">IoT-Enabled Waste Management</p>
                    </div>
                    {/* Floating indicators */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/90 px-3 py-2 rounded-lg">
                      <Battery className="h-4 w-4 text-green-500" />
                      <span className="text-xs font-medium">Solar Powered</span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 px-3 py-2 rounded-lg">
                      <Wifi className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium">Always Connected</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Smart Features */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Planned Features</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Cutting-edge technology for next-generation waste management
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {smartFeatures.map((feature, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="eco-gradient p-3 rounded-xl w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 mb-20 bg-muted/30 py-16 -mx-4 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Key Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="eco-gradient w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Development Roadmap</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Our journey to revolutionize waste management
          </p>
          <div className="max-w-3xl mx-auto space-y-4">
            {roadmap.map((item, index) => (
              <Card 
                key={index} 
                className={`${
                  item.status === "completed" 
                    ? "border-green-500/50 bg-green-500/5" 
                    : item.status === "in-progress"
                    ? "border-primary/50 bg-primary/5"
                    : "border-border"
                }`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.status === "completed" 
                      ? "bg-green-500" 
                      : item.status === "in-progress"
                      ? "eco-gradient"
                      : "bg-muted"
                  }`}>
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : item.status === "in-progress" ? (
                      <Zap className="h-6 w-6 text-primary-foreground" />
                    ) : (
                      <Clock className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{item.phase}</Badge>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge 
                    className={
                      item.status === "completed" 
                        ? "bg-green-500" 
                        : item.status === "in-progress"
                        ? "eco-gradient"
                        : ""
                    }
                    variant={item.status === "upcoming" ? "outline" : "default"}
                  >
                    {item.status === "completed" ? "Done" : item.status === "in-progress" ? "In Progress" : "Upcoming"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to know when Smart Bin launches. Join our community 
                and get early access to pilot programs in your area.
              </p>
              <Button variant="eco" size="lg">
                <Bell className="h-5 w-5 mr-2" />
                Notify Me at Launch
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
