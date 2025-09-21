import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseEther, encodeFunctionData } from 'viem';

// Contract ABI for SecureCargoLedger
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_origin", "type": "string"},
      {"name": "_destination", "type": "string"},
      {"name": "_cargoType", "type": "string"},
      {"name": "_carrier", "type": "address"},
      {"name": "_consignee", "type": "address"},
      {"name": "_departureTime", "type": "uint256"},
      {"name": "_arrivalTime", "type": "uint256"}
    ],
    "name": "createShipment",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "shipmentId", "type": "uint256"},
      {"name": "cargoValue", "type": "bytes"},
      {"name": "weight", "type": "bytes"},
      {"name": "volume", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "updateShipmentDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "shipmentId", "type": "uint256"},
      {"name": "latitude", "type": "bytes"},
      {"name": "longitude", "type": "bytes"},
      {"name": "eventType", "type": "string"},
      {"name": "description", "type": "string"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "addTrackingEvent",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "shipmentId", "type": "uint256"},
      {"name": "amount", "type": "bytes"},
      {"name": "paymentMethod", "type": "string"},
      {"name": "payee", "type": "address"},
      {"name": "dueDate", "type": "uint256"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "processPayment",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "shipmentId", "type": "uint256"}],
    "name": "getShipmentInfo",
    "outputs": [
      {"name": "origin", "type": "string"},
      {"name": "destination", "type": "string"},
      {"name": "cargoType", "type": "string"},
      {"name": "shipper", "type": "address"},
      {"name": "carrier", "type": "address"},
      {"name": "consignee", "type": "address"},
      {"name": "isVerified", "type": "bool"},
      {"name": "isInsured", "type": "bool"},
      {"name": "isDelivered", "type": "bool"},
      {"name": "departureTime", "type": "uint256"},
      {"name": "arrivalTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address (replace with actual deployed contract address)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as const;

export function useContract() {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  // Create shipment
  const createShipment = async (shipmentData: {
    origin: string;
    destination: string;
    cargoType: string;
    carrier: string;
    consignee: string;
    departureTime: number;
    arrivalTime: number;
  }) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createShipment',
        args: [
          shipmentData.origin,
          shipmentData.destination,
          shipmentData.cargoType,
          shipmentData.carrier as `0x${string}`,
          shipmentData.consignee as `0x${string}`,
          BigInt(shipmentData.departureTime),
          BigInt(shipmentData.arrivalTime)
        ]
      });
      return hash;
    } catch (err) {
      console.error('Error creating shipment:', err);
      throw err;
    }
  };

  // Update shipment details with FHE encryption
  const updateShipmentDetails = async (shipmentId: number, encryptedData: {
    cargoValue: string;
    weight: string;
    volume: string;
    proof: string;
  }) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'updateShipmentDetails',
        args: [
          BigInt(shipmentId),
          encryptedData.cargoValue as `0x${string}`,
          encryptedData.weight as `0x${string}`,
          encryptedData.volume as `0x${string}`,
          encryptedData.proof as `0x${string}`
        ]
      });
      return hash;
    } catch (err) {
      console.error('Error updating shipment details:', err);
      throw err;
    }
  };

  // Add tracking event with encrypted coordinates
  const addTrackingEvent = async (shipmentId: number, trackingData: {
    latitude: string;
    longitude: string;
    eventType: string;
    description: string;
    proof: string;
  }) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addTrackingEvent',
        args: [
          BigInt(shipmentId),
          trackingData.latitude as `0x${string}`,
          trackingData.longitude as `0x${string}`,
          trackingData.eventType,
          trackingData.description,
          trackingData.proof as `0x${string}`
        ]
      });
      return hash;
    } catch (err) {
      console.error('Error adding tracking event:', err);
      throw err;
    }
  };

  // Process payment with encrypted amount
  const processPayment = async (shipmentId: number, paymentData: {
    amount: string;
    paymentMethod: string;
    payee: string;
    dueDate: number;
    proof: string;
  }) => {
    try {
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'processPayment',
        args: [
          BigInt(shipmentId),
          paymentData.amount as `0x${string}`,
          paymentData.paymentMethod,
          paymentData.payee as `0x${string}`,
          BigInt(paymentData.dueDate),
          paymentData.proof as `0x${string}`
        ]
      });
      return hash;
    } catch (err) {
      console.error('Error processing payment:', err);
      throw err;
    }
  };

  return {
    createShipment,
    updateShipmentDetails,
    addTrackingEvent,
    processPayment,
    isPending,
    error,
    address
  };
}
