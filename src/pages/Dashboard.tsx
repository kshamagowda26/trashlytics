import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  TrendingUp,
  Plus,
  MapPin,
  Star,
  Zap
} from "lucide-react";

// Mock user data
const userData = {
  name: "Alex Johnson",
  level: 5,
  ecoPoints: 1250,
  pointsToNextLevel: 500,
  currentLevelProgress: 75,
  totalReports: 23,
  resolvedReports: 18,
  pendingReports: 5,
  badges: [
    { name: "First Report", icon: "🌱", earned: true },
    { name: "10 Reports", icon: "🌿", earned: true },
    { name: "Community Hero", icon: "🦸", earned: true },
    { name: "E-Waste Expert", icon: "♻️", earned: false },
    { name: "Top Contributor", icon: "🏆", earned: false },
  ],
  recentReports: [
    { id: 1, type: "E-Waste", location: "Main Street Park", status: "resolved", date: "2024-01-15" },
    { id: 2, type: "Dry Waste", location: "City Center", status: "pending", date: "2024-01-14" },
    { id: 3, type: "Wet Waste", location: "Riverside Area", status: "in-progress", date: "2024-01-13" },
  ],
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, <span className="eco-gradient-text">{userData.name}</span>
              </h1>
              <p className="text-muted-foreground">Track your impact and manage your waste reports</p>
            </div>
            <Link to="/report">
              <Button variant="eco" className="gap-2">
                <Plus className="h-5 w-5" />
                New Report
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Reports"
              value={userData.totalReports}
              icon={<FileText className="h-5 w-5" />}
              trend="+3 this week"
            />
            <StatCard
              title="Resolved"
              value={userData.resolvedReports}
              icon={<CheckCircle2 className="h-5 w-5" />}
              trend="78% success rate"
              variant="success"
            />
            <StatCard
              title="Pending"
              value={userData.pendingReports}
              icon={<Clock className="h-5 w-5" />}
              trend="Avg 2 days"
              variant="warning"
            />
            <StatCard
              title="Eco Points"
              value={userData.ecoPoints}
              icon={<Award className="h-5 w-5" />}
              trend={`Level ${userData.level}`}
              variant="eco"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Level Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="eco-gradient text-primary-foreground w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold">
                    {userData.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Level {userData.level} Eco Warrior</span>
                      <span className="text-sm text-muted-foreground">{userData.pointsToNextLevel} pts to next level</span>
                    </div>
                    <Progress value={userData.currentLevelProgress} className="h-3" />
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-reward-gold" />
                    Your Badges
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {userData.badges.map((badge) => (
                      <div
                        key={badge.name}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                          badge.earned
                            ? "bg-primary/10 border-primary/30"
                            : "bg-muted/50 border-border opacity-50"
                        }`}
                      >
                        <span className="text-xl">{badge.icon}</span>
                        <span className="text-sm font-medium">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/report" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Plus className="h-4 w-4" />
                    Report New Issue
                  </Button>
                </Link>
                <Link to="/classify" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <TrendingUp className="h-4 w-4" />
                    AI Waste Classifier
                  </Button>
                </Link>
                <Link to="/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <MapPin className="h-4 w-4" />
                    View Analytics Map
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="eco-gradient p-2 rounded-lg">
                        <FileText className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.type}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          report.status === "resolved"
                            ? "default"
                            : report.status === "pending"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  variant = "default",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  variant?: "default" | "success" | "warning" | "eco";
}) {
  const variants = {
    default: "bg-card",
    success: "bg-primary/5 border-primary/20",
    warning: "bg-reward-gold/5 border-reward-gold/20",
    eco: "eco-card",
  };

  return (
    <Card className={variants[variant]}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
          </div>
          <div className="eco-gradient p-2 rounded-lg text-primary-foreground">
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-primary" />
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
