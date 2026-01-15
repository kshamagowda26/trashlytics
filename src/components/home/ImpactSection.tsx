import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Leaf, 
  Trash2, 
  Recycle, 
  MapPin,
  Users,
  TrendingUp,
  CheckCircle2,
  Camera
} from "lucide-react";

const beforeAfterData = [
  {
    id: 1,
    location: "Central Park Area",
    beforeDesc: "Overflowing trash bins, scattered waste affecting local wildlife and park visitors",
    afterDesc: "Clean, organized waste collection with proper segregation bins installed",
    wasteCollected: "2.5 tons",
    volunteerHours: 120,
    status: "completed",
  },
  {
    id: 2,
    location: "Riverside District",
    beforeDesc: "Plastic waste polluting the river banks, hazardous to aquatic life",
    afterDesc: "River banks restored, regular cleanup drives established by community",
    wasteCollected: "1.8 tons",
    volunteerHours: 95,
    status: "completed",
  },
  {
    id: 3,
    location: "Industrial Zone",
    beforeDesc: "Illegal dumping of construction and electronic waste",
    afterDesc: "Proper e-waste recycling center established, area restored to green space",
    wasteCollected: "4.2 tons",
    volunteerHours: 200,
    status: "completed",
  },
];

const impactStats = [
  { label: "Total Waste Collected", value: "15.5", unit: "tons", icon: Trash2 },
  { label: "Areas Cleaned", value: "47", unit: "locations", icon: MapPin },
  { label: "Volunteers Engaged", value: "1,200+", unit: "people", icon: Users },
  { label: "CO₂ Emissions Saved", value: "8.2", unit: "tons", icon: Leaf },
];

export function ImpactSection() {
  const [selectedCase, setSelectedCase] = useState(0);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 eco-gradient text-primary-foreground">
            Community Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Impact, <span className="eco-gradient-text">Real Change</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how Trashlytics users are transforming their communities through 
            collective action and smart waste management
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="eco-gradient w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.unit}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After Showcase */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Waste Collection - Before & After
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Case Selection */}
              <div className="space-y-3">
                {beforeAfterData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCase(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedCase === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">{item.location}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.wasteCollected} collected
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Before/After Display */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                {/* Before Card */}
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardContent className="pt-6">
                    <Badge variant="destructive" className="mb-4">Before</Badge>
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Trash2 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Waste Issue</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {beforeAfterData[selectedCase].beforeDesc}
                    </p>
                  </CardContent>
                </Card>

                {/* After Card */}
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="pt-6">
                    <Badge className="mb-4 bg-green-500">After</Badge>
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Cleaned & Restored</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {beforeAfterData[selectedCase].afterDesc}
                    </p>
                  </CardContent>
                </Card>

                {/* Stats for selected case */}
                <div className="md:col-span-2 flex items-center justify-center gap-8 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {beforeAfterData[selectedCase].wasteCollected}
                    </p>
                    <p className="text-sm text-muted-foreground">Waste Collected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {beforeAfterData[selectedCase].volunteerHours}
                    </p>
                    <p className="text-sm text-muted-foreground">Volunteer Hours</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of citizens who are actively contributing to cleaner communities 
            through smart waste reporting and management.
          </p>
          <Button variant="eco" size="lg" className="gap-2">
            Start Your Impact Journey
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
