import { Badge } from "@/components/ui/badge";
import { Leaf, Package, Cpu, AlertTriangle } from "lucide-react";

const wasteTypes = [
  {
    type: "Wet Waste",
    variant: "wet" as const,
    icon: Leaf,
    description: "Organic, biodegradable waste like food scraps, garden waste",
    examples: ["Food leftovers", "Fruit peels", "Vegetable waste", "Tea leaves"],
    severity: "Low",
  },
  {
    type: "Dry Waste",
    variant: "dry" as const,
    icon: Package,
    description: "Recyclable materials that don't decompose easily",
    examples: ["Paper", "Cardboard", "Plastic bottles", "Metal cans"],
    severity: "Medium",
  },
  {
    type: "E-Waste",
    variant: "ewaste" as const,
    icon: Cpu,
    description: "Electronic devices and components requiring special disposal",
    examples: ["Old phones", "Batteries", "Cables", "Circuit boards"],
    severity: "High",
  },
  {
    type: "Hazardous",
    variant: "hazardous" as const,
    icon: AlertTriangle,
    description: "Dangerous materials that can harm health or environment",
    examples: ["Chemicals", "Medical waste", "Paint", "Pesticides"],
    severity: "Critical",
  },
];

export function WasteTypesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn to <span className="eco-gradient-text">Segregate Right</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding waste types is the first step to responsible disposal. 
            Our AI helps you classify correctly every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wasteTypes.map((waste, index) => (
            <div
              key={waste.type}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1 cursor-default animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-waste-${waste.variant}/10`}>
                  <waste.icon className={`h-6 w-6 text-waste-${waste.variant}`} style={{ color: `hsl(var(--waste-${waste.variant}))` }} />
                </div>
                <Badge variant={waste.variant}>{waste.severity}</Badge>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{waste.type}</h3>
              <p className="text-sm text-muted-foreground mb-4">{waste.description}</p>

              {/* Examples */}
              <div className="flex flex-wrap gap-2">
                {waste.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
