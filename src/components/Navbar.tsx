import { useState } from "react";
import { ChevronDown, Search, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-foreground text-xl font-semibold tracking-tight">
              Ase
            </span>
          </div>

          {/* Navigation Links - Desktop */}
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
            <button className="hidden sm:block p-2 text-foreground/70 hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hidden sm:block p-2 text-foreground/70 hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
              Try for free
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-background border-t border-border/30 overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between w-full py-3 text-left text-foreground/80 hover:text-foreground border-b border-border/20 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-base">{item.label}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-6 flex flex-col gap-3">
                <button className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                  Try for free
                </button>
                <div className="flex gap-4 justify-center pt-2">
                  <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-foreground/70 hover:text-foreground transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
