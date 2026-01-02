import { Link } from "react-router-dom";
import { Recycle, Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="eco-gradient p-2 rounded-lg">
                <Recycle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Trashlytics</span>
            </Link>
            <p className="text-background/70 max-w-md mb-6">
              AI-powered waste management platform empowering citizens to build cleaner, 
              smarter, and more sustainable communities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-background/70 hover:text-background transition-colors">Dashboard</Link></li>
              <li><Link to="/report" className="text-background/70 hover:text-background transition-colors">Report Waste</Link></li>
              <li><Link to="/analytics" className="text-background/70 hover:text-background transition-colors">Analytics</Link></li>
              <li><Link to="/leaderboard" className="text-background/70 hover:text-background transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Waste Guide</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">FAQ</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Trashlytics. All rights reserved.
          </p>
          <p className="text-sm text-background/60 flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for a cleaner planet
          </p>
        </div>
      </div>
    </footer>
  );
}
