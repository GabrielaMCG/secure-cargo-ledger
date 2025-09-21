import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe, FileText, Lock, Users, ArrowRight } from "lucide-react";

interface LearnMoreModalProps {
  children: React.ReactNode;
}

const LearnMoreModal = ({ children }: LearnMoreModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Learn About Confidential Trade Finance</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-container rounded-lg flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Revolutionary Trade Finance Platform</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines blockchain security with zero-knowledge proofs to create 
                a new standard for international trade finance, where lenders can verify invoice 
                authenticity without compromising business confidentiality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-sm">Zero-Knowledge Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground text-center">
                    Prove invoice authenticity without revealing sensitive business data
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                  <CardTitle className="text-sm">Instant Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground text-center">
                    Real-time verification reduces processing time from weeks to hours
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-sm">Global Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground text-center">
                    Connected to major ports and financial institutions worldwide
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-primary" />
                    <span>Encrypted Invoice Storage</span>
                  </CardTitle>
                  <CardDescription>
                    All invoice data is encrypted using advanced cryptographic methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• End-to-end encryption for all sensitive data</li>
                    <li>• Zero-knowledge proofs for verification</li>
                    <li>• Immutable blockchain records</li>
                    <li>• Selective disclosure of information</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span>Multi-Party Verification</span>
                  </CardTitle>
                  <CardDescription>
                    Multiple stakeholders can verify without compromising privacy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Importers and exporters maintain confidentiality</li>
                    <li>• Banks verify without seeing trade secrets</li>
                    <li>• Insurance companies assess risk accurately</li>
                    <li>• Regulators ensure compliance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-4">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center">How It Works</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Upload Invoice</h4>
                    <p className="text-sm text-muted-foreground">
                      Securely upload your import/export invoice and supporting documents
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      Invoice data is encrypted and zero-knowledge proofs are generated
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Lenders verify authenticity without accessing confidential details
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Financing</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive competitive financing offers based on verified invoice data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">For Importers/Exporters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Maintain complete business confidentiality</li>
                    <li>• Access competitive financing rates</li>
                    <li>• Faster approval processes</li>
                    <li>• Reduced documentation requirements</li>
                    <li>• Lower transaction costs</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">For Lenders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Verify invoice authenticity instantly</li>
                    <li>• Reduce fraud risk significantly</li>
                    <li>• Automate due diligence processes</li>
                    <li>• Improve portfolio risk management</li>
                    <li>• Expand into new markets confidently</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-container/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h4 className="font-semibold">Ready to Transform Your Trade Finance?</h4>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of businesses already using our platform for secure, efficient trade finance.
                  </p>
                  <Button className="bg-gradient-container hover:bg-gradient-container/90">
                    Get Started Today <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreModal;