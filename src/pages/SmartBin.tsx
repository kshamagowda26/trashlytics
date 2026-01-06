import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Trash2, 
  Wifi, 
  Battery, 
  Sun, 
  Radio, 
  Bell, 
  Truck, 
  Cloud, 
  MapPin,
  Activity,
  Cpu,
  Route,
  Zap,
  Eye,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Sparkles
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

const workflowSteps = [
  { icon: Trash2, label: "Smart Bin", description: "Sensors detect fill level" },
  { icon: Radio, label: "IoT Gateway", description: "Data transmitted wirelessly" },
  { icon: Cloud, label: "Cloud Platform", description: "Analytics & processing" },
  { icon: Bell, label: "Smart Alerts", description: "Notifications sent" },
  { icon: Truck, label: "Collection", description: "Optimized pickup" }
];

const benefits = [
  "Reduce collection costs by 30-50%",
  "Optimize truck routes in real-time",
  "Prevent overflow and littering",
  "Track waste generation patterns",
  "Lower carbon footprint",
  "Improve citizen satisfaction"
];

const mockBins = [
  { id: 1, location: "Central Park", fill: 85, status: "critical" },
  { id: 2, location: "Main Street", fill: 45, status: "normal" },
  { id: 3, location: "Tech Hub", fill: 72, status: "warning" },
  { id: 4, location: "City Hospital", fill: 30, status: "normal" },
  { id: 5, location: "Shopping Mall", fill: 92, status: "critical" },
  { id: 6, location: "University", fill: 58, status: "normal" }
];

const technicalSpecs = [
  { label: "Sensor Type", value: "Ultrasonic HC-SR04" },
  { label: "Range", value: "2cm - 400cm" },
  { label: "Accuracy", value: "±3mm" },
  { label: "Connectivity", value: "LoRaWAN / GSM / WiFi" },
  { label: "Battery", value: "10,000mAh Li-ion" },
  { label: "Solar Panel", value: "5W Monocrystalline" },
  { label: "Camera", value: "5MP with Edge AI" },
  { label: "Processor", value: "ESP32-CAM Module" }
];

export default function SmartBin() {
  const [simulatorFill, setSimulatorFill] = useState([65]);
  const [isConnected, setIsConnected] = useState(true);

  const getFillStatus = (fill: number) => {
    if (fill >= 80) return { label: "Critical", color: "text-red-500", bg: "bg-red-500" };
    if (fill >= 60) return { label: "Warning", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Normal", color: "text-green-500", bg: "bg-green-500" };
  };

  const fillStatus = getFillStatus(simulatorFill[0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-4 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Wifi className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">IoT Innovation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="eco-gradient-text">Smart Bin</span> Concept
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our IoT-enabled waste bin design that integrates seamlessly with 
            the Trashlytics platform for intelligent waste management.
          </p>
        </section>

        {/* Smart Bin Mockup */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="grid md:grid-cols-2">
                {/* Bin Visual */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                  <div className="relative">
                    {/* Bin Body */}
                    <div className="w-48 h-64 bg-gradient-to-b from-muted to-muted/80 rounded-t-xl rounded-b-3xl border-4 border-muted-foreground/20 relative overflow-hidden shadow-2xl">
                      {/* Fill Level Visualization */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 transition-all duration-500 rounded-b-2xl"
                        style={{ height: `${simulatorFill[0]}%` }}
                      />
                      
                      {/* Fill Level Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                          <span className="text-4xl font-bold text-foreground">{simulatorFill[0]}%</span>
                          <p className="text-sm text-muted-foreground">Fill Level</p>
                        </div>
                      </div>
                      
                      {/* Sensor Indicators */}
                      <div className="absolute top-2 left-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Eye className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    
                    {/* Solar Panel */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-r from-blue-900 to-blue-700 rounded-t-lg border-2 border-blue-500 flex items-center justify-center">
                      <Sun className="h-4 w-4 text-yellow-400" />
                    </div>
                    
                    {/* Status Indicators */}
                    <div className="absolute -right-16 top-1/4 space-y-3">
                      <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
                        <Battery className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-medium">98%</span>
                      </div>
                      <div className="flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
                        <Wifi className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
                        <span className="text-xs font-medium">{isConnected ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Controls */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">Interactive Bin Simulator</h3>
                  <p className="text-muted-foreground mb-6">
                    Adjust the fill level to see how the smart bin responds
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block">Fill Level: {simulatorFill[0]}%</label>
                      <Slider
                        value={simulatorFill}
                        onValueChange={setSimulatorFill}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <span className="font-medium">Status</span>
                      <Badge className={`${fillStatus.bg} text-white`}>
                        {fillStatus.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <span className="font-medium">Connection</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsConnected(!isConnected)}
                      >
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                    
                    {simulatorFill[0] >= 80 && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-pulse">
                        <div className="flex items-center gap-2 text-red-500">
                          <Bell className="h-5 w-5" />
                          <span className="font-medium">Alert: Collection needed!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Smart Features */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Smart Features</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Our smart bins are equipped with cutting-edge technology for efficient waste management
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

        {/* How It Works */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            A seamless 5-step flow from waste detection to optimized collection
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="eco-gradient p-4 rounded-2xl mb-3 mx-auto w-fit">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">{step.label}</h4>
                  <p className="text-xs text-muted-foreground max-w-[120px]">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-primary hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Key Benefits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Live Dashboard Preview</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Real-time monitoring of all smart bins across the city
          </p>
          <div className="max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      City Bin Status Map
                    </CardTitle>
                    <CardDescription>6 bins monitored in real-time</CardDescription>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Critical</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockBins.map((bin) => {
                    const status = getFillStatus(bin.fill);
                    return (
                      <div key={bin.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{bin.location}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${status.bg}`} />
                        </div>
                        <Progress value={bin.fill} className={`h-2 [&>div]:${status.bg}`} />
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Fill: {bin.fill}%</span>
                          <span className={status.color}>{status.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Total Bins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">18</div>
                    <div className="text-xs text-muted-foreground">Normal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">4</div>
                    <div className="text-xs text-muted-foreground">Warning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">2</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Technical Specifications</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Hardware components powering our smart bin solution
          </p>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute top-0 right-0 opacity-10">
                <Sparkles className="h-40 w-40" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Interested in Our Pilot Program?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                We're looking for cities and organizations to pilot our smart bin technology. 
                Join us in revolutionizing waste management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Zap className="h-5 w-5" />
                  Join Pilot Program
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
