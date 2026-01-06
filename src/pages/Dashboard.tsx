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
  Zap,
  Gift,
  Target,
  Trophy,
  Leaf,
  Flame,
  Medal,
  Crown
} from "lucide-react";

// Leaderboard data
const leaderboardData = [
  { rank: 1, name: "Sarah Green", points: 12450, streak: 45, avatar: "🌱", badge: "Eco Champion", trend: "+320" },
  { rank: 2, name: "Raj Patel", points: 11200, streak: 38, avatar: "🌿", badge: "Waste Warrior", trend: "+280" },
  { rank: 3, name: "Emma Wilson", points: 10850, streak: 32, avatar: "🍃", badge: "Planet Saver", trend: "+195" },
  { rank: 4, name: "Michael Chen", points: 9600, streak: 28, avatar: "♻️", badge: "Green Hero", trend: "+150" },
  { rank: 5, name: "Priya Sharma", points: 8900, streak: 25, avatar: "🌍", badge: "Earth Guardian", trend: "+120" },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50";
    case 2:
      return "bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/50";
    case 3:
      return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50";
    default:
      return "bg-card border-border";
  }
};

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

// Rewards data with clear explanations
const rewards = [
  {
    id: 1,
    title: "Plant a Tree",
    description: "Your reports help fund tree planting in your city",
    pointsRequired: 500,
    icon: "🌳",
    benefit: "1 tree planted in your name",
    unlocked: true,
  },
  {
    id: 2,
    title: "Eco Certificate",
    description: "Official recognition for your environmental efforts",
    pointsRequired: 1000,
    icon: "📜",
    benefit: "Digital certificate to share",
    unlocked: true,
  },
  {
    id: 3,
    title: "Community Champion",
    description: "Get featured on our community leaderboard",
    pointsRequired: 1500,
    icon: "🏅",
    benefit: "Profile badge + social recognition",
    unlocked: false,
  },
  {
    id: 4,
    title: "Eco Store Discount",
    description: "Redeem points for sustainable product discounts",
    pointsRequired: 2000,
    icon: "🛍️",
    benefit: "20% off partner eco-stores",
    unlocked: false,
  },
  {
    id: 5,
    title: "Zero Waste Kit",
    description: "Earn a starter kit for sustainable living",
    pointsRequired: 3000,
    icon: "🎁",
    benefit: "Reusable items delivered free",
    unlocked: false,
  },
];

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
                <Link to="/classifier" className="block">
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

          {/* Rewards Section */}
          <Card className="mt-6" id="rewards">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Rewards & Motivation
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Earn eco-points by reporting waste and unlock amazing rewards!
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {rewards.map((reward) => {
                  const progress = Math.min((userData.ecoPoints / reward.pointsRequired) * 100, 100);
                  return (
                    <div
                      key={reward.id}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        reward.unlocked
                          ? "bg-primary/5 border-primary/30 shadow-sm"
                          : "bg-muted/30 border-border"
                      }`}
                    >
                      {reward.unlocked && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Unlocked
                        </div>
                      )}
                      <div className="text-3xl mb-2">{reward.icon}</div>
                      <h4 className="font-semibold text-sm mb-1">{reward.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{reward.description}</p>
                      
                      <div className="bg-muted rounded-lg p-2 mb-3">
                        <div className="flex items-center gap-1 text-xs font-medium text-primary">
                          <Trophy className="h-3 w-3" />
                          {reward.benefit}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{reward.pointsRequired} pts</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        {!reward.unlocked && (
                          <p className="text-xs text-muted-foreground">
                            {reward.pointsRequired - userData.ecoPoints} pts to unlock
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* How to Earn Points */}
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  How to Earn Eco-Points
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">+50 pts</span>
                      <p className="text-xs text-muted-foreground">Report waste</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">+100 pts</span>
                      <p className="text-xs text-muted-foreground">Resolved report</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">+25 pts</span>
                      <p className="text-xs text-muted-foreground">Daily check-in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">+200 pts</span>
                      <p className="text-xs text-muted-foreground">Earn a badge</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports & Leaderboard Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="eco-gradient p-2 rounded-lg">
                          <FileText className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{report.type}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
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
                          className="text-xs"
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

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Eco Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.01] ${getRankStyle(user.rank)}`}
                    >
                      {/* Rank */}
                      <div className="w-8 flex justify-center">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-foreground truncate">{user.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {user.badge}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Streak */}
                      <div className="hidden sm:flex items-center gap-1 text-orange-500">
                        <Flame className="h-4 w-4" />
                        <span className="font-semibold text-sm">{user.streak}</span>
                      </div>
                      
                      {/* Points */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{user.points.toLocaleString()}</div>
                        <span className="text-xs text-green-500">{user.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
