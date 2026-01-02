import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Sparkles, 
  Loader2,
  Leaf,
  Package,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Camera,
  MessageSquare
} from "lucide-react";

const wasteTypes = [
  { value: "wet", label: "Wet Waste", icon: Leaf, color: "waste-wet", tips: ["Compostable", "Use green bin", "Avoid plastic bags"] },
  { value: "dry", label: "Dry Waste", icon: Package, color: "waste-dry", tips: ["Recyclable", "Clean before disposal", "Use blue bin"] },
  { value: "ewaste", label: "E-Waste", icon: Cpu, color: "waste-ewaste", tips: ["Special disposal needed", "Find e-waste center", "Remove batteries"] },
  { value: "hazardous", label: "Hazardous", icon: AlertTriangle, color: "waste-hazardous", tips: ["Handle with care", "Never mix with other waste", "Contact authorities"] },
];

export default function AIClassifier() {
  const [mode, setMode] = useState<"image" | "text">("image");
  const [textInput, setTextInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ type: string; confidence: number; suggestions: string[] } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWaste = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const types = ["wet", "dry", "ewaste", "hazardous"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const confidence = Math.floor(Math.random() * 15) + 85;
      const wasteInfo = wasteTypes.find(w => w.value === randomType);
      
      setResult({
        type: randomType,
        confidence,
        suggestions: wasteInfo?.tips || [],
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const currentWaste = result ? wasteTypes.find(w => w.value === result.type) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI <span className="eco-gradient-text">Waste Classifier</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload an image or describe your waste item. Our AI will instantly classify it 
              and provide disposal guidance.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={mode === "image" ? "eco" : "outline"}
              onClick={() => setMode("image")}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              Image Upload
            </Button>
            <Button
              variant={mode === "text" ? "eco" : "outline"}
              onClick={() => setMode("text")}
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Text Description
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {mode === "image" ? "Upload Waste Image" : "Describe Your Waste"}
                </CardTitle>
                <CardDescription>
                  {mode === "image" 
                    ? "Take a photo or upload an image of the waste item"
                    : "Describe the waste item in detail for accurate classification"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mode === "image" ? (
                  <>
                    {!imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/30 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                        <span className="text-lg font-medium text-muted-foreground">Click to upload</span>
                        <span className="text-sm text-muted-foreground mt-2">or drag and drop</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Waste preview"
                          className="w-full h-64 object-cover rounded-2xl"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null);
                            setResult(null);
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="eco"
                      className="w-full mt-4"
                      disabled={!imagePreview || isAnalyzing}
                      onClick={analyzeWaste}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Classify Waste
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Textarea
                      placeholder="Example: Old smartphone with cracked screen, includes charger cable..."
                      className="min-h-[200px] resize-none"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                    <Button
                      variant="eco"
                      className="w-full mt-4"
                      disabled={!textInput.trim() || isAnalyzing}
                      onClick={analyzeWaste}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Classify Waste
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card className={result ? "border-primary/30" : ""}>
              <CardHeader>
                <CardTitle>Classification Result</CardTitle>
                <CardDescription>
                  AI-powered waste type detection with disposal guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="h-64 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <Sparkles className="h-8 w-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="mt-6 font-medium">AI is analyzing...</p>
                    <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                  </div>
                ) : result && currentWaste ? (
                  <div className="animate-fade-in">
                    {/* Result Header */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 mb-6">
                      <div className="eco-gradient p-3 rounded-xl">
                        <currentWaste.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <Badge variant={result.type as any} className="mb-1">
                          {currentWaste.label}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Confidence:</span>
                          <span className="font-semibold text-primary">{result.confidence}%</span>
                        </div>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>

                    {/* Disposal Tips */}
                    <div>
                      <h4 className="font-semibold mb-3">Disposal Guidelines</h4>
                      <ul className="space-y-2">
                        {result.suggestions.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-6">
                      <Button variant="eco" className="flex-1">
                        Report This Waste
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setResult(null)}>
                        Classify Another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-muted-foreground">No classification yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload an image or describe your waste
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Waste Types Reference */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Waste Type Reference</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {wasteTypes.map((waste) => (
                <Card key={waste.value} className="text-center">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-3 rounded-xl mb-3`} style={{ backgroundColor: `hsl(var(--${waste.color}) / 0.15)` }}>
                      <waste.icon className="h-6 w-6" style={{ color: `hsl(var(--${waste.color}))` }} />
                    </div>
                    <h3 className="font-semibold">{waste.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {waste.tips[0]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
