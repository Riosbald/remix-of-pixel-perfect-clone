import { useState } from "react";
import { ChevronDown, Search, User } from "lucide-react";

const navItems = [
  { label: "Platform", hasDropdown: false },
  { label: "Solutions", hasDropdown: true },
  { label: "Get started", hasDropdown: true },
  { label: "Insights", hasDropdown: false },
  { label: "Company", hasDropdown: true },
  { label: "Events", hasDropdown: false },
];

export const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-foreground text-lg font-medium tracking-tight">
              celonis
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      hoveredItem === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
              Try for free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
