import { Camera, Brain, MapPin, Award, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Capture & Report",
    description: "Take a photo of waste or garbage dumping. Our system captures location automatically.",
    color: "bg-primary",
  },
  {
    icon: Brain,
    title: "AI Classification",
    description: "Our AI analyzes the image and classifies waste type with confidence score.",
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    title: "Track Progress",
    description: "Monitor your reports on the map. See when issues are resolved by authorities.",
    color: "bg-accent",
  },
  {
    icon: Award,
    title: "Earn Rewards",
    description: "Get eco-points, unlock badges, and level up as you contribute to cleaner communities.",
    color: "bg-reward-gold",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="eco-gradient-text">Trashlytics</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step process to transform waste management in your community
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />

          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step card */}
              <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                {/* Step number & icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`${step.color} p-4 rounded-2xl text-primary-foreground relative`}>
                    <step.icon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{step.description}</p>
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
