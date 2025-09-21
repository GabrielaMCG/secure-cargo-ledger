import cargoShip from "@/assets/cargo-ship.png";

const CargoShipFooter = () => {
  return (
    <footer className="relative bg-gradient-ocean border-t border-border overflow-hidden">
      {/* Ocean waves background */}
      <div className="absolute inset-0 bg-gradient-ocean">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-2 bg-primary/30 animate-ocean-wave" style={{ animationDelay: "0s" }}></div>
          <div className="w-full h-2 bg-primary/20 animate-ocean-wave" style={{ animationDelay: "1s" }}></div>
          <div className="w-full h-2 bg-primary/10 animate-ocean-wave" style={{ animationDelay: "2s" }}></div>
        </div>
      </div>

      {/* Animated cargo ship */}
      <div className="cargo-ship">
        <img 
          src={cargoShip} 
          alt="Cargo Ship" 
          className="w-full h-full object-contain filter brightness-0 invert opacity-60"
        />
      </div>

      {/* Footer content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">TradeVault</h3>
            <p className="text-muted-foreground text-sm">
              Confidential trade finance platform enabling secure invoice verification 
              without exposing sensitive business data.
            </p>
          </div>

          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Invoice Tokenization</li>
              <li>Encrypted Verification</li>
              <li>Port Integration</li>
              <li>Lender Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Security</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Zero-Knowledge Proofs</li>
              <li>Blockchain Security</li>
              <li>Data Encryption</li>
              <li>Audit Trail</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TradeVault. Revolutionizing trade finance with confidentiality.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CargoShipFooter;