import { useState } from "react";
import { ChevronDown, Search, User, Menu, X, Compass, Users, Lightbulb, PenTool, Upload, DollarSign, LayoutDashboard, Mic, ShoppingCart, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Platform", hasDropdown: true, href: "#" },
  { label: "Solutions", hasDropdown: false, href: "/solutions" },
  { label: "Marketplace", hasDropdown: true, href: "/marketplace" },
  { label: "Insights", hasDropdown: false, href: "/insights" },
  { label: "Company", hasDropdown: false, href: "/company" },
  { label: "Events", hasDropdown: false, href: "/events" },
];

const marketplaceDropdown = {
  discover: [
    { icon: Compass, label: "Explore All Agents", description: "Browse our full agent catalog" },
    { icon: Users, label: "Industry Solutions", description: "Solutions for your sector" },
    { icon: Lightbulb, label: "Community Innovations", description: "User-created automations" },
  ],
  create: [
    { icon: PenTool, label: "Become Agent Creator", description: "Start building agents" },
    { icon: Upload, label: "Publish Automations", description: "Share your workflows" },
    { icon: DollarSign, label: "Monetize Intelligence", description: "Earn from your creations" },
  ],
};

const platformDropdown = [
  { icon: LayoutDashboard, label: "Visual Canvas", description: "Drag-and-drop workflow editor", href: "/visual-canvas" },
  { icon: Mic, label: "Voice-First Interface", description: "Control workflows with voice", href: "#voice" },
  { icon: ShoppingCart, label: "Vendor Management", description: "End-to-end vendor ops", href: "#vendor" },
  { icon: Workflow, label: "BPMN Modeler", description: "Standards-based modeling", href: "#workflow" },
];

export const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30" role="navigation" aria-label="Main navigation">
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
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => { if (!item.hasDropdown && item.href) { navigate(item.href); } }}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
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
                
                {/* Platform Dropdown */}
                <AnimatePresence>
                  {item.label === "Platform" && hoveredItem === "Platform" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 space-y-1">
                        {platformDropdown.map((pd) => (
                          <button
                            key={pd.label}
                            onClick={() => { navigate(pd.href); setHoveredItem(null); }}
                            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group w-full text-left"
                          >
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <pd.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{pd.label}</p>
                              <p className="text-xs text-muted-foreground">{pd.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Marketplace Dropdown */}
                <AnimatePresence>
                  {item.label === "Marketplace" && hoveredItem === "Marketplace" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Discover Column */}
                          <div>
                            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Discover</h4>
                            <div className="space-y-1">
                              {marketplaceDropdown.discover.map((item) => (
                                <button
                                  key={item.label}
                                  onClick={() => { navigate("/marketplace"); setHoveredItem(null); }}
                                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors group w-full text-left"
                                >
                                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Create Column */}
                          <div>
                            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Create</h4>
                            <div className="space-y-1">
                              {marketplaceDropdown.create.map((item) => (
                                <button
                                  key={item.label}
                                  onClick={() => { navigate("/marketplace"); setHoveredItem(null); }}
                                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors group w-full text-left"
                                >
                                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground text-center">
                            Expand your platform's power with our vibrant, ever-growing ecosystem.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                    onClick={() => { if (item.href && item.href !== "#") navigate(item.href); setMobileMenuOpen(false); }}
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
