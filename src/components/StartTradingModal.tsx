import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StartTradingModalProps {
  children: React.ReactNode;
}

const StartTradingModal = ({ children }: StartTradingModalProps) => {
  const [step, setStep] = useState(1);
  const [invoiceType, setInvoiceType] = useState("");
  const [amount, setAmount] = useState("");
  const [port, setPort] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Invoice Encrypted Successfully",
      description: "Your trade invoice has been encrypted and submitted for verification. Track progress in Container Movements.",
    });
    setStep(1);
    setInvoiceType("");
    setAmount("");
    setPort("");
    setDescription("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Invoice Details</h3>
              <p className="text-muted-foreground text-sm">Enter your import/export invoice information</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="invoice-type">Invoice Type</Label>
                <Select value={invoiceType} onValueChange={setInvoiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select invoice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="import">Import Invoice</SelectItem>
                    <SelectItem value="export">Export Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="amount">Invoice Amount</Label>
                <Input
                  id="amount"
                  placeholder="$0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="port">Port</Label>
                <Select value={port} onValueChange={setPort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination port" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shanghai">Shanghai</SelectItem>
                    <SelectItem value="rotterdam">Rotterdam</SelectItem>
                    <SelectItem value="longbeach">Long Beach</SelectItem>
                    <SelectItem value="hamburg">Hamburg</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="dubai">Dubai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of goods/services"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
              <p className="text-muted-foreground text-sm">Upload your invoice and supporting documents</p>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Drop files here or click to browse</p>
              <Button variant="outline" size="sm">Choose Files</Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">commercial_invoice.pdf</span>
                </div>
                <Badge variant="secondary">Uploaded</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm">bill_of_lading.pdf</span>
                </div>
                <Badge variant="secondary">Uploaded</Badge>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Encryption & Verification</h3>
              <p className="text-muted-foreground text-sm">Your invoice will be encrypted using zero-knowledge proofs</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h4 className="font-semibold mb-4">Invoice Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{invoiceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Port:</span>
                  <span className="capitalize">{port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-accent text-accent-foreground">Ready for Encryption</Badge>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Your invoice details will be encrypted</p>
              <p>• Lenders can verify authenticity without seeing sensitive data</p>
              <p>• Process typically completes within 24 hours</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Start Trading
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderStep()}
        </div>
        
        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <Button 
                onClick={handleNext}
                disabled={!invoiceType || !amount || !port}
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Encrypt & Submit
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartTradingModal;