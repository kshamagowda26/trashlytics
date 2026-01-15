import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { MapPin, TrendingUp, Filter, Activity, Zap } from "lucide-react";

// Real-time simulation data
const generateRealtimeData = () => ({
  totalReports: Math.floor(Math.random() * 50) + 1250,
  resolvedToday: Math.floor(Math.random() * 20) + 45,
  activeCollectors: Math.floor(Math.random() * 10) + 25,
  co2Saved: (Math.random() * 2 + 15).toFixed(1),
});

const wasteTypeData = [
  { name: "Wet Waste", value: 35, color: "hsl(142, 70%, 45%)" },
  { name: "Dry Waste", value: 40, color: "hsl(45, 90%, 50%)" },
  { name: "E-Waste", value: 15, color: "hsl(280, 70%, 50%)" },
  { name: "Hazardous", value: 10, color: "hsl(0, 80%, 50%)" },
];

const areaWiseData = [
  { area: "Downtown", reports: 245, resolved: 210 },
  { area: "Suburbs", reports: 180, resolved: 165 },
  { area: "Industrial", reports: 320, resolved: 280 },
  { area: "Residential", reports: 150, resolved: 140 },
  { area: "Commercial", reports: 200, resolved: 175 },
];

const hotspots = [
  { id: 1, name: "Central Park Area", reports: 45, severity: "high" },
  { id: 2, name: "Main Street Market", reports: 32, severity: "medium" },
  { id: 3, name: "Industrial Zone A", reports: 28, severity: "high" },
  { id: 4, name: "Riverside District", reports: 18, severity: "low" },
];

export default function Analytics() {
  const [realtimeStats, setRealtimeStats] = useState(generateRealtimeData());
  const [trendData, setTrendData] = useState([
    { time: "Now-6", reports: 12, resolved: 10 },
    { time: "Now-5", reports: 15, resolved: 12 },
    { time: "Now-4", reports: 18, resolved: 15 },
    { time: "Now-3", reports: 14, resolved: 13 },
    { time: "Now-2", reports: 22, resolved: 18 },
    { time: "Now-1", reports: 19, resolved: 17 },
    { time: "Now", reports: 25, resolved: 20 },
  ]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats(generateRealtimeData());
      setLastUpdate(new Date());
      
      // Update trend data
      setTrendData(prev => {
        const newData = [...prev.slice(1)];
        const newReports = Math.floor(Math.random() * 15) + 10;
        const newResolved = Math.floor(newReports * 0.8);
        newData.push({ time: "Now", reports: newReports, resolved: newResolved });
        return newData.map((item, i) => ({
          ...item,
          time: i === newData.length - 1 ? "Now" : `Now-${newData.length - 1 - i}`
        }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Real-Time <span className="eco-gradient-text">Analytics</span>
              </h1>
              <p className="text-muted-foreground">
                Live data-driven insights for smarter waste management
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-600">
                Live • Updated {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">{realtimeStats.totalReports}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                  <div className="eco-gradient p-3 rounded-xl">
                    <Activity className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600">{realtimeStats.resolvedToday}</p>
                    <p className="text-sm text-muted-foreground">Resolved Today</p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">{realtimeStats.activeCollectors}</p>
                    <p className="text-sm text-muted-foreground">Active Collectors</p>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-emerald-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-emerald-600">{realtimeStats.co2Saved} kg</p>
                    <p className="text-sm text-muted-foreground">CO₂ Saved Today</p>
                  </div>
                  <div className="bg-emerald-500/10 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Activity Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorReportsLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="reports" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorReportsLive)" 
                      name="Reports"
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Waste Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="eco-gradient p-1.5 rounded-lg">
                    <Filter className="h-4 w-4 text-primary-foreground" />
                  </div>
                  Waste Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {wasteTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {wasteTypeData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Area-wise Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="eco-gradient p-1.5 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  Area-wise Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={areaWiseData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis dataKey="area" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="reports" fill="hsl(var(--primary))" name="Total Reports" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="resolved" fill="hsl(var(--secondary))" name="Resolved" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotspots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="eco-gradient p-1.5 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                Active Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm">{hotspot.name}</h5>
                      <Badge
                        variant={
                          hotspot.severity === "high"
                            ? "destructive"
                            : hotspot.severity === "medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {hotspot.severity}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{hotspot.reports}</p>
                    <p className="text-xs text-muted-foreground">active reports</p>
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
