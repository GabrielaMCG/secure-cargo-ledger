import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, ArrowDownLeft, Clock, Shield, Eye, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContainerData {
  id: string;
  type: "import" | "export";
  amount: string;
  status: "verified" | "pending" | "encrypted";
  port: string;
  eta: string;
}

const mockData: ContainerData[] = [
  {
    id: "CTR001",
    type: "import",
    amount: "$2.4M",
    status: "verified",
    port: "Shanghai",
    eta: "2 days"
  },
  {
    id: "CTR002", 
    type: "export",
    amount: "$1.8M",
    status: "encrypted",
    port: "Rotterdam",
    eta: "5 days"
  },
  {
    id: "CTR003",
    type: "import", 
    amount: "$3.2M",
    status: "pending",
    port: "Long Beach",
    eta: "1 day"
  },
  {
    id: "CTR004",
    type: "export",
    amount: "$950K",
    status: "verified", 
    port: "Hamburg",
    eta: "3 days"
  },
  {
    id: "CTR005",
    type: "import",
    amount: "$4.1M", 
    status: "encrypted",
    port: "Singapore",
    eta: "4 days"
  },
  {
    id: "CTR006",
    type: "export",
    amount: "$1.3M",
    status: "pending",
    port: "Dubai",
    eta: "6 days"
  }
];

const ContainerDashboard = () => {
  const [selectedContainer, setSelectedContainer] = useState<ContainerData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-primary text-primary-foreground";
      case "encrypted": return "bg-accent text-accent-foreground"; 
      case "pending": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <Shield className="w-3 h-3" />;
      case "encrypted": return <Shield className="w-3 h-3" />;
      case "pending": return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Dashboard Updated",
      description: "Container movements have been refreshed with latest data.",
    });
  };

  const handleViewDetails = (container: ContainerData) => {
    setSelectedContainer(container);
  };

  const handleDownloadDocs = (containerId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading encrypted documents for ${containerId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Container Movements</h2>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-primary"></div>
              <span>Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-accent"></div>
              <span>Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-secondary"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-grid">
        {mockData.map((container) => (
          <Card key={container.id} className="container-box hover:animate-container-pulse cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {container.type === "import" ? (
                  <ArrowDownLeft className="w-5 h-5 text-primary" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-accent" />
                )}
                <span className="font-mono text-sm text-muted-foreground">{container.id}</span>
              </div>
              <Badge className={`${getStatusColor(container.status)} text-xs`}>
                <span className="flex items-center space-x-1">
                  {getStatusIcon(container.status)}
                  <span className="capitalize">{container.status}</span>
                </span>
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-foreground">{container.amount}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {container.type} Invoice
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">{container.port}</div>
                  <div className="text-xs text-muted-foreground">Port</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{container.eta}</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
              </div>

              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(container);
                  }}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadDocs(container.id);
                  }}
                  className="flex-1"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Docs
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Container Details Modal */}
      <Dialog open={!!selectedContainer} onOpenChange={() => setSelectedContainer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Container Details: {selectedContainer?.id}</span>
              <Badge className={`${getStatusColor(selectedContainer?.status || '')} text-xs`}>
                {selectedContainer?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          {selectedContainer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Invoice Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="capitalize">{selectedContainer.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-mono">{selectedContainer.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="capitalize">{selectedContainer.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Port:</span>
                        <span>{selectedContainer.port}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ETA:</span>
                        <span>{selectedContainer.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Verification</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Zero-Knowledge Proof Generated</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Shield className="w-4 h-4 text-accent" />
                        <span>Encrypted Storage Active</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Last Updated: 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Download Encrypted Docs
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Share Verification Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Verification Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Invoice Uploaded</span>
                      <span className="text-muted-foreground ml-2">3 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Encryption Completed</span>
                      <span className="text-muted-foreground ml-2">2.5 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Available for Verification</span>
                      <span className="text-muted-foreground ml-2">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContainerDashboard;