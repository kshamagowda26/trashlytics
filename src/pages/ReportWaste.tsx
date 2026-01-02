import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Camera, 
  Upload, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Leaf,
  Package,
  Cpu,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const wasteTypes = [
  { value: "wet", label: "Wet Waste", icon: Leaf, color: "waste-wet" },
  { value: "dry", label: "Dry Waste", icon: Package, color: "waste-dry" },
  { value: "ewaste", label: "E-Waste", icon: Cpu, color: "waste-ewaste" },
  { value: "hazardous", label: "Hazardous", icon: AlertTriangle, color: "waste-hazardous" },
];

const severityLevels = [
  { value: "low", label: "Low", description: "Minor issue, not urgent" },
  { value: "medium", label: "Medium", description: "Moderate concern, needs attention" },
  { value: "high", label: "High", description: "Significant problem, urgent" },
  { value: "critical", label: "Critical", description: "Severe hazard, immediate action needed" },
];

export default function ReportWaste() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ type: string; confidence: number } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    wasteType: "",
    severity: "",
    location: "",
    description: "",
  });
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        simulateAIAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const types = ["wet", "dry", "ewaste", "hazardous"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const confidence = Math.floor(Math.random() * 20) + 80;
      setAiResult({ type: randomType, confidence });
      setFormData(prev => ({ ...prev, wasteType: randomType }));
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    toast({
      title: "Report Submitted Successfully! 🎉",
      description: "You earned 50 Eco-Points for this report.",
    });
    // Reset form
    setStep(1);
    setImagePreview(null);
    setAiResult(null);
    setFormData({ wasteType: "", severity: "", location: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Report <span className="eco-gradient-text">Waste Issue</span>
            </h1>
            <p className="text-muted-foreground">
              Help keep your community clean by reporting waste issues. Our AI will help classify the waste type.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s ? "eco-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 rounded-full transition-all ${step > s ? "eco-gradient" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Image Upload */}
          {step === 1 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Capture Waste Image
                </CardTitle>
                <CardDescription>
                  Upload or take a photo of the waste. Our AI will analyze and classify it automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!imagePreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/30 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <span className="text-lg font-medium text-muted-foreground">Click to upload or drag and drop</span>
                    <span className="text-sm text-muted-foreground mt-2">PNG, JPG up to 10MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Waste preview"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <span className="font-medium">AI is analyzing your image...</span>
                      </div>
                    )}
                    {aiResult && (
                      <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
                        <div className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">AI Classification:</span>
                              <Badge variant={aiResult.type as any}>
                                {wasteTypes.find(w => w.value === aiResult.type)?.label}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Confidence: {aiResult.confidence}%
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {aiResult && (
                  <Button variant="eco" className="w-full mt-6" onClick={() => setStep(2)}>
                    Continue to Details
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Report Details
                </CardTitle>
                <CardDescription>
                  Provide additional information to help authorities respond effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Waste Type Selection */}
                <div className="space-y-2">
                  <Label>Waste Type (AI Suggested)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {wasteTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData(prev => ({ ...prev, wasteType: type.value }))}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          formData.wasteType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <type.icon className="h-5 w-5" style={{ color: `hsl(var(--${type.color}))` }} />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity */}
                <div className="space-y-2">
                  <Label>Severity Level</Label>
                  <Select value={formData.severity} onValueChange={(v) => setFormData(prev => ({ ...prev, severity: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div>
                            <span className="font-medium">{level.label}</span>
                            <span className="text-muted-foreground ml-2">- {level.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter location or use current location"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    Use my current location
                  </Button>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Additional Description</Label>
                  <Textarea
                    placeholder="Describe the issue, size estimation, any specific concerns..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button variant="eco" onClick={() => setStep(3)} className="flex-1">
                    Review Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Review & Submit
                </CardTitle>
                <CardDescription>
                  Review your report before submitting. You'll earn 50 Eco-Points!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Report" className="w-full h-48 object-cover rounded-xl" />
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
                    <div>
                      <span className="text-sm text-muted-foreground">Waste Type</span>
                      <Badge variant={formData.wasteType as any} className="mt-1 block w-fit">
                        {wasteTypes.find(w => w.value === formData.wasteType)?.label}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Severity</span>
                      <p className="font-medium capitalize">{formData.severity || "Not set"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <p className="font-medium">{formData.location || "Not set"}</p>
                    </div>
                    {formData.description && (
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">Description</span>
                        <p className="text-sm">{formData.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold text-primary">You'll earn 50 Eco-Points!</p>
                      <p className="text-sm text-muted-foreground">Plus bonus points when the issue is resolved</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Edit Report
                  </Button>
                  <Button variant="eco" onClick={handleSubmit} className="flex-1">
                    Submit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
