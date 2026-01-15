import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Mail, 
  FileText, 
  Award, 
  TrendingUp,
  CheckCircle2,
  Clock,
  Loader2,
  Save,
  Leaf,
  Target,
  BarChart3
} from "lucide-react";

interface Profile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  email_notifications: boolean;
  weekly_digest: boolean;
  dark_mode: boolean;
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { progress, reports, loading: progressLoading } = useUserProgress();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    avatar_url: null,
    email_notifications: true,
    weekly_digest: true,
    dark_mode: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    if (data) {
      setProfile({
        full_name: data.full_name || "",
        email: data.email || user.email || "",
        avatar_url: data.avatar_url,
        email_notifications: data.email_notifications ?? true,
        weekly_digest: data.weekly_digest ?? true,
        dark_mode: data.dark_mode ?? false,
      });
    } else if (error && error.code !== "PGRST116") {
      console.error("Error fetching profile:", error);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        email_notifications: profile.email_notifications,
        weekly_digest: profile.weekly_digest,
        dark_mode: theme === "dark",
      })
      .eq("user_id", user.id);
    
    setSaving(false);
    
    if (error) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated! 🌿",
        description: "Your settings have been saved successfully.",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const ecoPoints = progress?.eco_points || 0;
  const level = progress?.level || 1;
  const totalReports = progress?.total_reports || 0;
  const resolvedReports = progress?.resolved_reports || 0;
  const pendingReports = progress?.pending_reports || 0;
  const userName = profile.full_name || user.email?.split("@")[0] || "Eco Warrior";
  const userInitials = userName.slice(0, 2).toUpperCase();

  // Calculate impact metrics
  const co2Saved = (resolvedReports * 2.5).toFixed(1); // Estimated kg of CO2 saved
  const treesEquivalent = Math.floor(resolvedReports / 10); // 10 reports = 1 tree equivalent

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="eco-gradient text-2xl text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{userName}</h1>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="eco-gradient text-primary-foreground">Level {level}</Badge>
                <Badge variant="outline">{ecoPoints} Eco-Points</Badge>
                <Badge variant="outline">{totalReports} Reports</Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="dashboard" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="impact" className="gap-2">
                <Leaf className="h-4 w-4" />
                My Impact
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="eco-gradient p-3 rounded-xl">
                        <FileText className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{totalReports}</p>
                        <p className="text-sm text-muted-foreground">Total Reports</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500/10 p-3 rounded-xl">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{resolvedReports}</p>
                        <p className="text-sm text-muted-foreground">Resolved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500/10 p-3 rounded-xl">
                        <Clock className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{pendingReports}</p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{ecoPoints}</p>
                        <p className="text-sm text-muted-foreground">Eco-Points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest waste reports</CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No reports yet. Start making an impact!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reports.slice(0, 5).map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="eco-gradient p-2 rounded-lg">
                              <FileText className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{report.waste_type}</p>
                              <p className="text-xs text-muted-foreground">{report.location}</p>
                            </div>
                          </div>
                          <Badge variant={report.status === "resolved" ? "default" : "outline"}>
                            {report.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name || ""}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your reports
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={profile.email_notifications}
                      onCheckedChange={(checked) =>
                        setProfile({ ...profile, email_notifications: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Get a summary of community impact
                      </p>
                    </div>
                    <Switch
                      id="weeklyDigest"
                      checked={profile.weekly_digest}
                      onCheckedChange={(checked) =>
                        setProfile({ ...profile, weekly_digest: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="eco" onClick={saveProfile} disabled={saving} className="gap-2">
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Settings
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                  <CardContent className="pt-6 text-center">
                    <Leaf className="h-10 w-10 text-green-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-green-600">{co2Saved} kg</p>
                    <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                  <CardContent className="pt-6 text-center">
                    <Target className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-emerald-600">{treesEquivalent}</p>
                    <p className="text-sm text-muted-foreground">Trees Equivalent</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20">
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-10 w-10 text-teal-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-teal-600">Level {level}</p>
                    <p className="text-sm text-muted-foreground">Eco Warrior</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Environmental Impact</CardTitle>
                  <CardDescription>
                    Every report you make contributes to a cleaner environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Reports Resolved</span>
                      <span className="text-sm text-muted-foreground">
                        {resolvedReports}/{totalReports}
                      </span>
                    </div>
                    <Progress 
                      value={totalReports > 0 ? (resolvedReports / totalReports) * 100 : 0} 
                      className="h-3"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <h4 className="font-semibold mb-3">Impact Breakdown</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Wet Waste: Composted for fertilizer</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span>Dry Waste: Recycled materials</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span>E-Waste: Safely disposed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span>Hazardous: Special handling</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
