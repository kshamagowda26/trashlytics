import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserProgress } from "@/hooks/useUserProgress";
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
  Medal,
  Crown,
  Loader2,
  Lock
} from "lucide-react";
import { format } from "date-fns";

// Leaderboard data (will be replaced with real data later)
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

// Default badges that can be earned
const defaultBadges = [
  { name: "First Report", icon: "🌱", required_points: 0 },
  { name: "10 Reports", icon: "🌿", required_points: 500 },
  { name: "Community Hero", icon: "🦸", required_points: 1000 },
  { name: "E-Waste Expert", icon: "♻️", required_points: 1500 },
  { name: "Top Contributor", icon: "🏆", required_points: 2000 },
];

// Icon mapping for rewards
const getRewardIcon = (iconName: string) => {
  switch (iconName) {
    case "Award": return "🏅";
    case "TreeDeciduous": return "🌳";
    case "ShoppingBag": return "🛍️";
    case "Crown": return "👑";
    case "Leaf": return "🍃";
    default: return "🎁";
  }
};

export default function ProgressPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    progress,
    badges,
    rewards,
    userRewards,
    reports,
    loading: dataLoading,
    pointsToNextLevel,
    levelProgress,
    claimReward,
  } = useUserProgress();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const ecoPoints = progress?.eco_points || 0;
  const level = progress?.level || 1;
  const totalReports = progress?.total_reports || 0;
  const resolvedReports = progress?.resolved_reports || 0;
  const pendingReports = progress?.pending_reports || 0;
  const userName = user.email?.split("@")[0] || "Eco Warrior";

  // Check if reward is claimed
  const isRewardClaimed = (rewardId: string) => 
    userRewards.some((r) => r.reward_id === rewardId);

  // Check if reward is unlocked (has enough points)
  const isRewardUnlocked = (pointsRequired: number) => ecoPoints >= pointsRequired;

  // Handle claim reward
  const handleClaimReward = async (rewardId: string) => {
    await claimReward(rewardId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, <span className="eco-gradient-text">{userName}</span>
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
              value={totalReports}
              icon={<FileText className="h-5 w-5" />}
              trend={`Started from 0`}
            />
            <StatCard
              title="Resolved"
              value={resolvedReports}
              icon={<CheckCircle2 className="h-5 w-5" />}
              trend={totalReports > 0 ? `${Math.round((resolvedReports / totalReports) * 100)}% success` : "No reports yet"}
              variant="success"
            />
            <StatCard
              title="Pending"
              value={pendingReports}
              icon={<Clock className="h-5 w-5" />}
              trend="In progress"
              variant="warning"
            />
            <StatCard
              title="Eco Points"
              value={ecoPoints}
              icon={<Award className="h-5 w-5" />}
              trend={`Level ${level}`}
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
                    {level}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Level {level} Eco Warrior</span>
                      <span className="text-sm text-muted-foreground">{pointsToNextLevel(ecoPoints)} pts to next level</span>
                    </div>
                    <Progress value={levelProgress(ecoPoints)} className="h-3" />
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-reward-gold" />
                    Your Badges
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {defaultBadges.map((badge) => {
                      const earned = badges.some((b) => b.badge_name === badge.name) || 
                                    ecoPoints >= badge.required_points;
                      return (
                        <div
                          key={badge.name}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            earned
                              ? "bg-primary/10 border-primary/30"
                              : "bg-muted/50 border-border opacity-50"
                          }`}
                        >
                          <span className="text-xl">{badge.icon}</span>
                          <span className="text-sm font-medium">{badge.name}</span>
                        </div>
                      );
                    })}
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
                  const progressPercent = Math.min((ecoPoints / reward.points_required) * 100, 100);
                  const unlocked = isRewardUnlocked(reward.points_required);
                  const claimed = isRewardClaimed(reward.id);
                  
                  return (
                    <div
                      key={reward.id}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        claimed
                          ? "bg-primary/10 border-primary/50 shadow-md"
                          : unlocked
                          ? "bg-primary/5 border-primary/30 shadow-sm"
                          : "bg-muted/30 border-border"
                      }`}
                    >
                      {claimed && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Claimed
                        </div>
                      )}
                      {!claimed && unlocked && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Unlocked
                        </div>
                      )}
                      {!claimed && !unlocked && (
                        <div className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Locked
                        </div>
                      )}
                      <div className="text-3xl mb-2">{getRewardIcon(reward.icon)}</div>
                      <h4 className="font-semibold text-sm mb-1">{reward.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{reward.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{ecoPoints}/{reward.points_required} pts</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        
                        {!claimed && unlocked && (
                          <Button 
                            size="sm" 
                            className="w-full mt-2" 
                            onClick={() => handleClaimReward(reward.id)}
                          >
                            Claim Reward
                          </Button>
                        )}
                        {!unlocked && (
                          <p className="text-xs text-muted-foreground text-center">
                            {reward.points_required - ecoPoints} pts to unlock
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
                {reports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No reports yet. Start by reporting waste!</p>
                    <Link to="/report">
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Report
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="eco-gradient p-2 rounded-lg">
                            <FileText className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{report.waste_type}</h4>
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
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(report.created_at), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  {leaderboardData.map((leaderUser) => (
                    <div
                      key={leaderUser.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.01] ${getRankStyle(leaderUser.rank)}`}
                    >
                      {/* Rank */}
                      <div className="w-8 flex justify-center">
                        {getRankIcon(leaderUser.rank)}
                      </div>
                      
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="text-2xl">{leaderUser.avatar}</div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{leaderUser.name}</p>
                          <p className="text-xs text-muted-foreground">{leaderUser.badge}</p>
                        </div>
                      </div>
                      
                      {/* Points */}
                      <div className="text-right">
                        <p className="font-bold text-sm">{leaderUser.points.toLocaleString()}</p>
                        <p className="text-xs text-green-500">+{leaderUser.trend}</p>
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

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  variant?: "default" | "success" | "warning" | "eco";
}

function StatCard({ title, value, icon, trend, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "bg-card",
    success: "bg-green-500/10 border-green-500/30",
    warning: "bg-yellow-500/10 border-yellow-500/30",
    eco: "bg-primary/10 border-primary/30",
  };

  return (
    <Card className={`${variantStyles[variant]} border`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="text-primary">{icon}</div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      </CardContent>
    </Card>
  );
}
