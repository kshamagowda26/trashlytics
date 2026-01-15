import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  Image as ImageIcon, 
  Upload, 
  ArrowRight, 
  CheckCircle2,
  Loader2,
  MapPin,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

interface WasteReport {
  id: string;
  waste_type: string;
  location: string;
  status: string;
  image_url: string | null;
  after_image_url: string | null;
  created_at: string;
  description: string | null;
}

interface ReportCardProps {
  report: WasteReport;
  onUpdate?: () => void;
}

const wasteTypeLabels: Record<string, string> = {
  wet: "Wet Waste",
  dry: "Dry Waste",
  ewaste: "E-Waste",
  hazardous: "Hazardous",
};

export function ReportCard({ report, onUpdate }: ReportCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [afterPreview, setAfterPreview] = useState<string | null>(report.after_image_url);

  const handleAfterImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_after.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('waste-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('waste-images')
        .getPublicUrl(fileName);
      
      // Update the report with after image
      const { error: updateError } = await supabase
        .from("waste_reports")
        .update({ 
          after_image_url: data.publicUrl,
          status: "resolved"
        })
        .eq("id", report.id);

      if (updateError) throw updateError;

      // Update user progress for resolved report
      const { data: currentProgress } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (currentProgress) {
        await supabase
          .from("user_progress")
          .update({
            eco_points: currentProgress.eco_points + 100, // Bonus for resolved
            resolved_reports: currentProgress.resolved_reports + 1,
            pending_reports: Math.max(0, currentProgress.pending_reports - 1),
          })
          .eq("user_id", user.id);
      }

      setAfterPreview(data.publicUrl);
      toast({
        title: "Report resolved! 🎉",
        description: "You earned 100 bonus Eco-Points for resolving this issue!",
      });
      onUpdate?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Could not upload after image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant={report.status === "resolved" ? "default" : "outline"}>
            {report.status}
          </Badge>
          <Badge variant={report.waste_type as any}>
            {wasteTypeLabels[report.waste_type] || report.waste_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Before/After Comparison */}
        {(report.image_url || afterPreview) && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="grid grid-cols-2 gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                {/* Before Image */}
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {report.image_url ? (
                    <img 
                      src={report.image_url} 
                      alt="Before" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <Badge className="absolute bottom-1 left-1 text-xs bg-red-500/90">
                    Before
                  </Badge>
                </div>
                
                {/* After Image */}
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {afterPreview ? (
                    <img 
                      src={afterPreview} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-8 w-8 text-muted-foreground opacity-50" />
                    </div>
                  )}
                  <Badge className="absolute bottom-1 left-1 text-xs bg-green-500/90">
                    After
                  </Badge>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Before & After Comparison</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-red-500">Before</p>
                  {report.image_url ? (
                    <img 
                      src={report.image_url} 
                      alt="Before" 
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-green-500">After</p>
                  {afterPreview ? (
                    <img 
                      src={afterPreview} 
                      alt="After" 
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Not yet resolved</p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Location & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{report.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(report.created_at), "MMM d, yyyy")}</span>
          </div>
        </div>

        {/* Add After Photo Button */}
        {report.status !== "resolved" && !afterPreview && (
          <label className="block">
            <Button variant="outline" className="w-full gap-2" disabled={isUploading} asChild>
              <span>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Add "After" Photo to Resolve
                  </>
                )}
              </span>
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAfterImageUpload}
              disabled={isUploading}
            />
          </label>
        )}

        {report.status === "resolved" && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Issue resolved!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
