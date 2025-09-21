import Logo from "@/components/Logo";
import WalletConnect from "@/components/WalletConnect";
import ContainerDashboard from "@/components/ContainerDashboard";
import CargoShipFooter from "@/components/CargoShipFooter";
import StartTradingModal from "@/components/StartTradingModal";
import LearnMoreModal from "@/components/LearnMoreModal";
import { ContractInteraction } from "@/components/ContractInteraction";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-ocean py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Trade Finance with
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                Confidentiality
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Import/export invoices are encrypted, allowing lenders to verify authenticity 
              without exposing business-sensitive details. Built for the global trade ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StartTradingModal>
                <Button 
                  size="lg" 
                  className="bg-gradient-container hover:bg-gradient-container/90 text-accent-foreground font-semibold px-8 py-4 rounded-lg shadow-container hover:shadow-glow transition-all duration-300"
                >
                  Start Trading
                </Button>
              </StartTradingModal>
              <LearnMoreModal>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border hover:bg-card px-8 py-4 rounded-lg"
                >
                  Learn More
                </Button>
              </LearnMoreModal>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Secure. Transparent. Efficient.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Revolutionary trade finance platform combining blockchain security with 
              zero-knowledge privacy protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-container rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                <Shield className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Encrypted Invoices</h3>
              <p className="text-muted-foreground">
                Zero-knowledge proofs ensure invoice authenticity while keeping 
                sensitive business data completely private.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-steel rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                <Zap className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Instant Verification</h3>
              <p className="text-muted-foreground">
                Lenders can verify invoice authenticity in real-time without 
                accessing confidential trade details.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-ocean rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                <Globe className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Global Network</h3>
              <p className="text-muted-foreground">
                Connected to major ports worldwide for seamless international 
                trade finance operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <ContainerDashboard />
        </div>
      </section>

      {/* Contract Interaction Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Secure Contract Interactions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interact with FHE-encrypted smart contracts for secure cargo tracking, 
              payments, and trade finance operations.
            </p>
          </div>
          <ContractInteraction />
        </div>
      </section>

      {/* Footer */}
      <CargoShipFooter />
    </div>
  );
};

export default Index;