import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trash2, Leaf, Package, Cpu, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const smartBins = [
  {
    id: 1,
    location: "Central Park - Zone A",
    type: "wet" as const,
    fillLevel: 75,
    lastCollected: "2 hours ago",
    status: "Active",
  },
  {
    id: 2,
    location: "Main Street - Block 5",
    type: "dry" as const,
    fillLevel: 45,
    lastCollected: "5 hours ago",
    status: "Active",
  },
  {
    id: 3,
    location: "Tech Hub - Building C",
    type: "ewaste" as const,
    fillLevel: 90,
    lastCollected: "1 day ago",
    status: "Needs Collection",
  },
  {
    id: 4,
    location: "City Hospital - Entrance",
    type: "hazardous" as const,
    fillLevel: 30,
    lastCollected: "3 hours ago",
    status: "Active",
  },
];

const typeConfig = {
  wet: { label: "Wet Waste", icon: Leaf, color: "hsl(var(--waste-wet))" },
  dry: { label: "Dry Waste", icon: Package, color: "hsl(var(--waste-dry))" },
  ewaste: { label: "E-Waste", icon: Cpu, color: "hsl(var(--waste-ewaste))" },
  hazardous: { label: "Hazardous", icon: Trash2, color: "hsl(var(--waste-hazardous))" },
};

export default function SmartBin() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="eco-gradient-text">Smart Bin</span> Monitoring
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of smart waste bins across the city
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Total Bins</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-waste-wet">18</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-waste-hazardous">3</div>
              <div className="text-sm text-muted-foreground">Needs Collection</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-waste-ewaste">3</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Bins Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {smartBins.map((bin) => {
            const config = typeConfig[bin.type];
            const Icon = config.icon;
            const isUrgent = bin.fillLevel >= 80;
            
            return (
              <Card key={bin.id} className={`glass-card transition-all hover:shadow-lg ${isUrgent ? 'border-waste-hazardous/50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-xl" 
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: config.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{bin.location}</CardTitle>
                        <p className="text-sm text-muted-foreground">{config.label}</p>
                      </div>
                    </div>
                    <Badge variant={bin.type}>
                      {bin.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Fill Level */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Fill Level</span>
                      <span className={`font-medium ${isUrgent ? 'text-waste-hazardous' : ''}`}>
                        {bin.fillLevel}%
                      </span>
                    </div>
                    <Progress 
                      value={bin.fillLevel} 
                      className={`h-2 ${isUrgent ? '[&>div]:bg-waste-hazardous' : '[&>div]:bg-primary'}`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Last collected: {bin.lastCollected}</span>
                    </div>
                    {isUrgent && (
                      <Button size="sm" variant="outline" className="gap-1 text-waste-hazardous border-waste-hazardous/50">
                        <Bell className="h-3 w-3" />
                        Alert
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
