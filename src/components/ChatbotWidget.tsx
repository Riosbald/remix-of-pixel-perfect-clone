import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Calendar, Video, Send } from "lucide-react";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send - could integrate with backend later
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
            aria-label="Open ASE Assistant"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[350px] bg-card border border-border rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">ASE</span>
                </div>
                <div>
                  <h3 className="text-primary-foreground font-medium">ASE Assistant</h3>
                  <p className="text-primary-foreground/70 text-xs">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-background min-h-[200px]">
              {/* Welcome Message */}
              <div className="bg-muted rounded-lg p-3 mb-4">
                <p className="text-foreground text-sm">
                  👋 Welcome to ASE! I'm here to help you discover how our process automation solutions can transform your business. How can I assist you today?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Speak to us</span>
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Book a meeting</span>
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Video className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Watch a demo</span>
                </motion.button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
