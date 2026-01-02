import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { MapPin, TrendingUp, Filter, Calendar } from "lucide-react";

// Mock data for charts
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

const monthlyTrendData = [
  { month: "Jul", reports: 120, resolved: 100 },
  { month: "Aug", reports: 150, resolved: 130 },
  { month: "Sep", reports: 180, resolved: 160 },
  { month: "Oct", reports: 200, resolved: 185 },
  { month: "Nov", reports: 230, resolved: 210 },
  { month: "Dec", reports: 280, resolved: 250 },
  { month: "Jan", reports: 320, resolved: 290 },
];

const hotspots = [
  { id: 1, name: "Central Park Area", reports: 45, severity: "high", lat: 40.785091, lng: -73.968285 },
  { id: 2, name: "Main Street Market", reports: 32, severity: "medium", lat: 40.758896, lng: -73.985130 },
  { id: 3, name: "Industrial Zone A", reports: 28, severity: "high", lat: 40.712776, lng: -74.005974 },
  { id: 4, name: "Riverside District", reports: 18, severity: "low", lat: 40.748817, lng: -73.985428 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Waste <span className="eco-gradient-text">Analytics</span>
              </h1>
              <p className="text-muted-foreground">
                Data-driven insights for smarter waste management decisions
              </p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="30">
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Waste Type Distribution - Pie Chart */}
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

            {/* Area-wise Reports - Bar Chart */}
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

          {/* Monthly Trend - Line/Area Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="eco-gradient p-1.5 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                </div>
                Monthly Reporting Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendData}>
                    <defs>
                      <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="reports" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorReports)" 
                      name="Reports"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="hsl(var(--secondary))" 
                      fillOpacity={1} 
                      fill="url(#colorResolved)" 
                      name="Resolved"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hotspots Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="eco-gradient p-1.5 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                Waste Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Map Placeholder */}
                <div className="lg:col-span-2 h-80 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className="relative text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Google Maps integration coming soon</p>
                  </div>
                  {/* Mock hotspot markers */}
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-destructive rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-reward-gold rounded-full animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-destructive rounded-full animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-primary rounded-full animate-pulse" />
                </div>

                {/* Hotspot List */}
                <div className="space-y-3">
                  <h4 className="font-semibold mb-4">Top Hotspots</h4>
                  {hotspots.map((hotspot) => (
                    <div
                      key={hotspot.id}
                      className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-sm">{hotspot.name}</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            {hotspot.reports} reports
                          </p>
                        </div>
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
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
