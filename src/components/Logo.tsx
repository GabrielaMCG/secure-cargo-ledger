import { useState } from "react";
import { Lock } from "lucide-react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center space-x-3 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Container Box */}
        <div className="w-10 h-8 bg-gradient-container rounded-sm border-2 border-accent/30 relative transform transition-transform duration-300 group-hover:scale-110">
          {/* Container lines */}
          <div className="absolute inset-x-0 top-1/3 h-px bg-accent/50"></div>
          <div className="absolute inset-x-0 bottom-1/3 h-px bg-accent/50"></div>
          
          {/* Keyhole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Lock 
              size={12} 
              className={`text-foreground transition-colors duration-300 ${
                isHovered ? 'text-primary' : ''
              }`} 
            />
          </div>
        </div>
        
        {/* Glow effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-primary/20 rounded-sm blur-md -z-10 animate-pulse"></div>
        )}
      </div>
      
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          TradeVault
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          Confidential Finance
        </span>
      </div>
    </div>
  );
};

export default Logo;