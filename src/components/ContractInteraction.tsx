import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { encryptShipmentData, encryptTrackingData, encryptPaymentData } from '../lib/fhe';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Loader2, Ship, MapPin, CreditCard } from 'lucide-react';

export function ContractInteraction() {
  const { createShipment, updateShipmentDetails, addTrackingEvent, processPayment, isPending } = useContract();
  const { toast } = useToast();
  
  // Shipment form state
  const [shipmentForm, setShipmentForm] = useState({
    origin: '',
    destination: '',
    cargoType: '',
    carrier: '',
    consignee: '',
    departureTime: '',
    arrivalTime: '',
    cargoValue: '',
    weight: '',
    volume: ''
  });

  // Tracking form state
  const [trackingForm, setTrackingForm] = useState({
    shipmentId: '',
    latitude: '',
    longitude: '',
    eventType: '',
    description: ''
  });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    shipmentId: '',
    amount: '',
    paymentMethod: '',
    payee: '',
    dueDate: ''
  });

  const handleCreateShipment = async () => {
    try {
      const hash = await createShipment({
        origin: shipmentForm.origin,
        destination: shipmentForm.destination,
        cargoType: shipmentForm.cargoType,
        carrier: shipmentForm.carrier,
        consignee: shipmentForm.consignee,
        departureTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        arrivalTime: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
      });

      toast({
        title: "Shipment Created",
        description: `Transaction hash: ${hash}`,
      });

      // Update shipment details with encrypted data
      if (shipmentForm.cargoValue && shipmentForm.weight && shipmentForm.volume) {
        const encryptedData = encryptShipmentData(
          parseFloat(shipmentForm.cargoValue),
          parseFloat(shipmentForm.weight),
          parseFloat(shipmentForm.volume)
        );

        await updateShipmentDetails(0, {
          cargoValue: encryptedData.cargoValue.encryptedValue,
          weight: encryptedData.weight.encryptedValue,
          volume: encryptedData.volume.encryptedValue,
          proof: encryptedData.cargoValue.proof
        });

        toast({
          title: "Shipment Details Updated",
          description: "Encrypted cargo data has been securely stored on-chain",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shipment",
        variant: "destructive"
      });
    }
  };

  const handleAddTrackingEvent = async () => {
    try {
      const encryptedCoords = encryptTrackingData(
        parseFloat(trackingForm.latitude),
        parseFloat(trackingForm.longitude)
      );

      const hash = await addTrackingEvent(parseInt(trackingForm.shipmentId), {
        latitude: encryptedCoords.encryptedLatitude.encryptedValue,
        longitude: encryptedCoords.encryptedLongitude.encryptedValue,
        eventType: trackingForm.eventType,
        description: trackingForm.description,
        proof: encryptedCoords.encryptedLatitude.proof
      });

      toast({
        title: "Tracking Event Added",
        description: `Transaction hash: ${hash}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tracking event",
        variant: "destructive"
      });
    }
  };

  const handleProcessPayment = async () => {
    try {
      const encryptedAmount = encryptPaymentData(parseFloat(paymentForm.amount));

      const hash = await processPayment(parseInt(paymentForm.shipmentId), {
        amount: encryptedAmount.encryptedValue,
        paymentMethod: paymentForm.paymentMethod,
        payee: paymentForm.payee,
        dueDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        proof: encryptedAmount.proof
      });

      toast({
        title: "Payment Processed",
        description: `Transaction hash: ${hash}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="shipment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shipment" className="flex items-center gap-2">
            <Ship className="w-4 h-4" />
            Create Shipment
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Add Tracking
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Process Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipment">
          <Card>
            <CardHeader>
              <CardTitle>Create Secure Cargo Shipment</CardTitle>
              <CardDescription>
                Create a new shipment with FHE-encrypted cargo data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={shipmentForm.origin}
                    onChange={(e) => setShipmentForm({...shipmentForm, origin: e.target.value})}
                    placeholder="Port of origin"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={shipmentForm.destination}
                    onChange={(e) => setShipmentForm({...shipmentForm, destination: e.target.value})}
                    placeholder="Port of destination"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <Input
                    id="cargoType"
                    value={shipmentForm.cargoType}
                    onChange={(e) => setShipmentForm({...shipmentForm, cargoType: e.target.value})}
                    placeholder="e.g., Electronics, Textiles"
                  />
                </div>
                <div>
                  <Label htmlFor="carrier">Carrier Address</Label>
                  <Input
                    id="carrier"
                    value={shipmentForm.carrier}
                    onChange={(e) => setShipmentForm({...shipmentForm, carrier: e.target.value})}
                    placeholder="0x..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cargoValue">Cargo Value (USD)</Label>
                  <Input
                    id="cargoValue"
                    type="number"
                    value={shipmentForm.cargoValue}
                    onChange={(e) => setShipmentForm({...shipmentForm, cargoValue: e.target.value})}
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={shipmentForm.weight}
                    onChange={(e) => setShipmentForm({...shipmentForm, weight: e.target.value})}
                    placeholder="5000"
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Volume (m³)</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={shipmentForm.volume}
                    onChange={(e) => setShipmentForm({...shipmentForm, volume: e.target.value})}
                    placeholder="100"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCreateShipment} 
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Shipment...
                  </>
                ) : (
                  'Create Secure Shipment'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Add Tracking Event</CardTitle>
              <CardDescription>
                Add encrypted location tracking to shipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trackingShipmentId">Shipment ID</Label>
                  <Input
                    id="trackingShipmentId"
                    type="number"
                    value={trackingForm.shipmentId}
                    onChange={(e) => setTrackingForm({...trackingForm, shipmentId: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <Input
                    id="eventType"
                    value={trackingForm.eventType}
                    onChange={(e) => setTrackingForm({...trackingForm, eventType: e.target.value})}
                    placeholder="e.g., Departure, In Transit, Arrival"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.000001"
                    value={trackingForm.latitude}
                    onChange={(e) => setTrackingForm({...trackingForm, latitude: e.target.value})}
                    placeholder="40.7128"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.000001"
                    value={trackingForm.longitude}
                    onChange={(e) => setTrackingForm({...trackingForm, longitude: e.target.value})}
                    placeholder="-74.0060"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={trackingForm.description}
                  onChange={(e) => setTrackingForm({...trackingForm, description: e.target.value})}
                  placeholder="Additional tracking information"
                />
              </div>

              <Button 
                onClick={handleAddTrackingEvent} 
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Event...
                  </>
                ) : (
                  'Add Encrypted Tracking Event'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Process Secure Payment</CardTitle>
              <CardDescription>
                Process encrypted payment for shipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentShipmentId">Shipment ID</Label>
                  <Input
                    id="paymentShipmentId"
                    type="number"
                    value={paymentForm.shipmentId}
                    onChange={(e) => setPaymentForm({...paymentForm, shipmentId: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (Wei)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                    placeholder="1000000000000000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Input
                    id="paymentMethod"
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm({...paymentForm, paymentMethod: e.target.value})}
                    placeholder="e.g., Bank Transfer, Crypto"
                  />
                </div>
                <div>
                  <Label htmlFor="payee">Payee Address</Label>
                  <Input
                    id="payee"
                    value={paymentForm.payee}
                    onChange={(e) => setPaymentForm({...paymentForm, payee: e.target.value})}
                    placeholder="0x..."
                  />
                </div>
              </div>

              <Button 
                onClick={handleProcessPayment} 
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Process Encrypted Payment'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
