import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users, 
  Leaf,
  Star,
  Award,
  Loader2,
  MapPin
} from "lucide-react";

interface LeaderboardEntry {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  eco_points: number;
  level: number;
  total_reports: number;
  resolved_reports: number;
  rank: number;
}

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

// Mock area-based leaderboard data (until we have real location data)
const areaLeaderboards = {
  "Downtown": [
    { name: "Alex Green", points: 2450, reports: 45 },
    { name: "Maya Chen", points: 2100, reports: 38 },
    { name: "Jordan Park", points: 1850, reports: 32 },
  ],
  "Suburbs": [
    { name: "Sam Wilson", points: 1950, reports: 35 },
    { name: "Taylor Reed", points: 1720, reports: 30 },
    { name: "Casey Brown", points: 1580, reports: 28 },
  ],
  "Industrial": [
    { name: "Morgan Lee", points: 3200, reports: 58 },
    { name: "Jamie Scott", points: 2800, reports: 50 },
    { name: "Riley Kim", points: 2400, reports: 42 },
  ],
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState("Downtown");
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_leaderboard');
    
    if (error) {
      console.error("Error fetching leaderboard:", error);
    } else if (data) {
      setLeaders(data as LeaderboardEntry[]);
    }
    setLoading(false);
  };

  const currentUserRank = leaders.find(l => l.user_id === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Community Champions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="eco-gradient-text">Leaderboard</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating the top eco-warriors making a difference in their communities
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold">{leaders.length}</p>
                <p className="text-sm text-muted-foreground">Active Contributors</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold">
                  {leaders.reduce((acc, l) => acc + l.total_reports, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-3xl font-bold">
                  {leaders.reduce((acc, l) => acc + l.eco_points, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Eco-Points</p>
              </CardContent>
            </Card>
          </div>

          {/* Current User Rank */}
          {currentUserRank && (
            <Card className="mb-8 border-primary/50 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="eco-gradient w-12 h-12 rounded-xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Your Ranking</p>
                      <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">#{currentUserRank.rank}</p>
                    <p className="text-sm text-muted-foreground">{currentUserRank.eco_points} pts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="global" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="global" className="gap-2">
                <Trophy className="h-4 w-4" />
                Global Rankings
              </TabsTrigger>
              <TabsTrigger value="area" className="gap-2">
                <MapPin className="h-4 w-4" />
                By Area
              </TabsTrigger>
            </TabsList>

            {/* Global Leaderboard */}
            <TabsContent value="global">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : leaders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No contributors yet. Be the first!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {/* Top 3 Podium */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {leaders.slice(0, 3).map((leader, index) => (
                      <Card 
                        key={leader.user_id} 
                        className={`${getRankStyle(index + 1)} border-2 ${index === 0 ? "md:order-2" : index === 1 ? "md:order-1" : "md:order-3"}`}
                      >
                        <CardContent className="pt-6 text-center">
                          <div className="mb-3">{getRankIcon(index + 1)}</div>
                          <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-primary/20">
                            <AvatarImage src={leader.avatar_url || undefined} />
                            <AvatarFallback className="eco-gradient text-primary-foreground">
                              {(leader.full_name || "U").slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{leader.full_name || "Eco Warrior"}</h3>
                          <Badge className="eco-gradient text-primary-foreground mt-2">
                            Level {leader.level}
                          </Badge>
                          <div className="mt-4 space-y-1">
                            <p className="text-2xl font-bold">{leader.eco_points.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Eco-Points</p>
                          </div>
                          <div className="flex justify-center gap-4 mt-4 text-sm">
                            <div>
                              <p className="font-semibold">{leader.total_reports}</p>
                              <p className="text-muted-foreground">Reports</p>
                            </div>
                            <div>
                              <p className="font-semibold">{leader.resolved_reports}</p>
                              <p className="text-muted-foreground">Resolved</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Rest of the leaderboard */}
                  {leaders.slice(3).map((leader) => (
                    <Card 
                      key={leader.user_id} 
                      className={`transition-all hover:bg-muted/50 ${leader.user_id === user?.id ? "border-primary/50 bg-primary/5" : ""}`}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 flex justify-center">
                            {getRankIcon(leader.rank)}
                          </div>
                          <Avatar className="h-12 w-12 border border-border">
                            <AvatarImage src={leader.avatar_url || undefined} />
                            <AvatarFallback className="bg-muted">
                              {(leader.full_name || "U").slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{leader.full_name || "Eco Warrior"}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">Lvl {leader.level}</Badge>
                              <span>{leader.total_reports} reports</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{leader.eco_points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">pts</p>
                          </div>
                          {leader.rank <= 10 && (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Area-based Leaderboard */}
            <TabsContent value="area">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Select Area</CardTitle>
                  <CardDescription>View top contributors in specific areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(areaLeaderboards).map((area) => (
                      <button
                        key={area}
                        onClick={() => setSelectedArea(area)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedArea === area 
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {area}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Top Contributors in {selectedArea}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {areaLeaderboards[selectedArea as keyof typeof areaLeaderboards].map((person, index) => (
                      <div 
                        key={person.name} 
                        className={`flex items-center gap-4 p-4 rounded-xl border ${getRankStyle(index + 1)}`}
                      >
                        <div className="w-10 flex justify-center">
                          {getRankIcon(index + 1)}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="eco-gradient text-primary-foreground">
                            {person.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold">{person.name}</h4>
                          <p className="text-sm text-muted-foreground">{person.reports} reports in this area</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{person.points.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">pts</p>
                        </div>
                      </div>
                    ))}
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
