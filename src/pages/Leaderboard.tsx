import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Flame, Leaf, TrendingUp, Crown } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Sarah Green", points: 12450, streak: 45, avatar: "🌱", badge: "Eco Champion", trend: "+320" },
  { rank: 2, name: "Raj Patel", points: 11200, streak: 38, avatar: "🌿", badge: "Waste Warrior", trend: "+280" },
  { rank: 3, name: "Emma Wilson", points: 10850, streak: 32, avatar: "🍃", badge: "Planet Saver", trend: "+195" },
  { rank: 4, name: "Michael Chen", points: 9600, streak: 28, avatar: "♻️", badge: "Green Hero", trend: "+150" },
  { rank: 5, name: "Priya Sharma", points: 8900, streak: 25, avatar: "🌍", badge: "Earth Guardian", trend: "+120" },
  { rank: 6, name: "David Kim", points: 8200, streak: 22, avatar: "🌲", badge: "Nature Ally", trend: "+98" },
  { rank: 7, name: "Lisa Anderson", points: 7500, streak: 18, avatar: "🌻", badge: "Eco Advocate", trend: "+85" },
  { rank: 8, name: "James Brown", points: 6800, streak: 15, avatar: "🌾", badge: "Green Scout", trend: "+72" },
  { rank: 9, name: "Anita Desai", points: 6100, streak: 12, avatar: "🌴", badge: "Eco Starter", trend: "+60" },
  { rank: 10, name: "Tom Williams", points: 5400, streak: 10, avatar: "🌵", badge: "Green Rookie", trend: "+45" },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
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

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold eco-gradient-text">
                Eco Leaderboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Celebrating our top eco-warriors who are making a real difference. 
              Join the ranks and compete for a greener planet!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="eco-glass border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="eco-gradient w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">86,450</h3>
                <p className="text-muted-foreground">Total Points Earned</p>
              </CardContent>
            </Card>
            
            <Card className="eco-glass border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="eco-gradient w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Flame className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">45 Days</h3>
                <p className="text-muted-foreground">Longest Streak</p>
              </CardContent>
            </Card>
            
            <Card className="eco-glass border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="eco-gradient w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">+1,420</h3>
                <p className="text-muted-foreground">Points This Week</p>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Table */}
          <Card className="eco-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top 10 Eco-Warriors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] ${getRankStyle(user.rank)}`}
                  >
                    {/* Rank */}
                    <div className="w-12 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-3xl">{user.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {user.badge}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-orange-500">
                          <Flame className="h-4 w-4" />
                          <span className="font-semibold">{user.streak}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      
                      <div className="text-center">
                        <span className="text-sm text-green-500 font-medium">{user.trend}</span>
                        <p className="text-xs text-muted-foreground">This Week</p>
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{user.points.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Motivation Section */}
          <div className="mt-12 text-center">
            <Card className="eco-glass border-primary/30 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">🏆 How to Climb the Ranks</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex gap-3">
                  <div className="eco-gradient w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Report Waste Daily</h3>
                    <p className="text-sm text-muted-foreground">Earn 50 points for each waste report submitted</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="eco-gradient w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Maintain Streaks</h3>
                    <p className="text-sm text-muted-foreground">Bonus multiplier for consecutive days of activity</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="eco-gradient w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Unlock Achievements</h3>
                    <p className="text-sm text-muted-foreground">Complete challenges for massive point boosts</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
