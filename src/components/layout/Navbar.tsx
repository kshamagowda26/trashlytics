import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recycle, Menu, X, User, LayoutDashboard, BarChart3, Layers, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/report", label: "Report Waste" },
  { href: "/classifier", label: "Segregation", icon: Layers },
  { href: "/smart-bin", label: "Smart Bin", icon: Trash2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="eco-gradient p-2 rounded-lg transition-transform group-hover:scale-105">
              <Recycle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold eco-gradient-text">Trashlytics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="eco" size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button variant="eco" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
