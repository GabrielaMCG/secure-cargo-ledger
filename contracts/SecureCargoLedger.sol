// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureCargoLedger is SepoliaConfig {
    using FHE for *;
    
    struct CargoShipment {
        euint32 shipmentId;
        euint32 cargoValue;
        euint32 weight;
        euint32 volume;
        bool isVerified;
        bool isInsured;
        bool isDelivered;
        string origin;
        string destination;
        string cargoType;
        address shipper;
        address carrier;
        address consignee;
        uint256 departureTime;
        uint256 arrivalTime;
        uint256 insuranceExpiry;
    }
    
    struct InsurancePolicy {
        euint32 policyId;
        euint32 coverageAmount;
        euint32 premium;
        bool isActive;
        bool isClaimed;
        string policyType;
        address insurer;
        address beneficiary;
        uint256 startDate;
        uint256 endDate;
    }
    
    struct TrackingEvent {
        euint32 eventId;
        euint32 locationLatitude;
        euint32 locationLongitude;
        bool isVerified;
        string eventType;
        string description;
        address reporter;
        uint256 timestamp;
    }
    
    struct PaymentRecord {
        euint32 paymentId;
        euint32 amount;
        bool isPaid;
        bool isVerified;
        string paymentMethod;
        address payer;
        address payee;
        uint256 dueDate;
        uint256 paidDate;
    }
    
    mapping(uint256 => CargoShipment) public shipments;
    mapping(uint256 => InsurancePolicy) public insurancePolicies;
    mapping(uint256 => TrackingEvent) public trackingEvents;
    mapping(uint256 => PaymentRecord) public paymentRecords;
    mapping(address => euint32) public shipperReputation;
    mapping(address => euint32) public carrierReputation;
    mapping(address => euint32) public insurerReputation;
    
    uint256 public shipmentCounter;
    uint256 public insuranceCounter;
    uint256 public trackingCounter;
    uint256 public paymentCounter;
    
    address public owner;
    address public verifier;
    address public insuranceProvider;
    
    event ShipmentCreated(uint256 indexed shipmentId, address indexed shipper, string origin, string destination);
    event InsurancePurchased(uint256 indexed policyId, uint256 indexed shipmentId, address indexed beneficiary);
    event TrackingEventAdded(uint256 indexed eventId, uint256 indexed shipmentId, string eventType);
    event PaymentProcessed(uint256 indexed paymentId, uint256 indexed shipmentId, address indexed payer);
    event ShipmentDelivered(uint256 indexed shipmentId, address indexed carrier);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _insuranceProvider) {
        owner = msg.sender;
        verifier = _verifier;
        insuranceProvider = _insuranceProvider;
    }
    
    function createShipment(
        string memory _origin,
        string memory _destination,
        string memory _cargoType,
        address _carrier,
        address _consignee,
        uint256 _departureTime,
        uint256 _arrivalTime
    ) public returns (uint256) {
        require(bytes(_origin).length > 0, "Origin cannot be empty");
        require(bytes(_destination).length > 0, "Destination cannot be empty");
        require(_carrier != address(0), "Invalid carrier address");
        require(_consignee != address(0), "Invalid consignee address");
        require(_departureTime > block.timestamp, "Departure time must be in the future");
        require(_arrivalTime > _departureTime, "Arrival time must be after departure");
        
        uint256 shipmentId = shipmentCounter++;
        
        shipments[shipmentId] = CargoShipment({
            shipmentId: FHE.asEuint32(0), // Will be set properly later
            cargoValue: FHE.asEuint32(0), // Will be set via FHE operations
            weight: FHE.asEuint32(0), // Will be set via FHE operations
            volume: FHE.asEuint32(0), // Will be set via FHE operations
            isVerified: false,
            isInsured: false,
            isDelivered: false,
            origin: _origin,
            destination: _destination,
            cargoType: _cargoType,
            shipper: msg.sender,
            carrier: _carrier,
            consignee: _consignee,
            departureTime: _departureTime,
            arrivalTime: _arrivalTime,
            insuranceExpiry: 0
        });
        
        emit ShipmentCreated(shipmentId, msg.sender, _origin, _destination);
        return shipmentId;
    }
    
    function updateShipmentDetails(
        uint256 shipmentId,
        externalEuint32 cargoValue,
        externalEuint32 weight,
        externalEuint32 volume,
        bytes calldata inputProof
    ) public {
        require(shipments[shipmentId].shipper == msg.sender, "Only shipper can update details");
        require(!shipments[shipmentId].isDelivered, "Cannot update delivered shipment");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCargoValue = FHE.fromExternal(cargoValue, inputProof);
        euint32 internalWeight = FHE.fromExternal(weight, inputProof);
        euint32 internalVolume = FHE.fromExternal(volume, inputProof);
        
        shipments[shipmentId].cargoValue = internalCargoValue;
        shipments[shipmentId].weight = internalWeight;
        shipments[shipmentId].volume = internalVolume;
    }
    
    function purchaseInsurance(
        uint256 shipmentId,
        externalEuint32 coverageAmount,
        externalEuint32 premium,
        string memory policyType,
        uint256 duration,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(shipments[shipmentId].shipper == msg.sender, "Only shipper can purchase insurance");
        require(!shipments[shipmentId].isInsured, "Shipment already insured");
        require(msg.sender == insuranceProvider, "Only authorized insurance provider");
        
        uint256 policyId = insuranceCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCoverageAmount = FHE.fromExternal(coverageAmount, inputProof);
        euint32 internalPremium = FHE.fromExternal(premium, inputProof);
        
        insurancePolicies[policyId] = InsurancePolicy({
            policyId: FHE.asEuint32(0), // Will be set properly later
            coverageAmount: internalCoverageAmount,
            premium: internalPremium,
            isActive: true,
            isClaimed: false,
            policyType: policyType,
            insurer: insuranceProvider,
            beneficiary: msg.sender,
            startDate: block.timestamp,
            endDate: block.timestamp + duration
        });
        
        shipments[shipmentId].isInsured = true;
        shipments[shipmentId].insuranceExpiry = block.timestamp + duration;
        
        emit InsurancePurchased(policyId, shipmentId, msg.sender);
        return policyId;
    }
    
    function addTrackingEvent(
        uint256 shipmentId,
        externalEuint32 latitude,
        externalEuint32 longitude,
        string memory eventType,
        string memory description,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(shipments[shipmentId].carrier == msg.sender, "Only carrier can add tracking events");
        require(!shipments[shipmentId].isDelivered, "Cannot track delivered shipment");
        
        uint256 eventId = trackingCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalLatitude = FHE.fromExternal(latitude, inputProof);
        euint32 internalLongitude = FHE.fromExternal(longitude, inputProof);
        
        trackingEvents[eventId] = TrackingEvent({
            eventId: FHE.asEuint32(0), // Will be set properly later
            locationLatitude: internalLatitude,
            locationLongitude: internalLongitude,
            isVerified: false,
            eventType: eventType,
            description: description,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit TrackingEventAdded(eventId, shipmentId, eventType);
        return eventId;
    }
    
    function processPayment(
        uint256 shipmentId,
        externalEuint32 amount,
        string memory paymentMethod,
        address payee,
        uint256 dueDate,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(shipments[shipmentId].shipper == msg.sender || shipments[shipmentId].carrier == msg.sender, "Unauthorized payment");
        require(payee != address(0), "Invalid payee address");
        require(dueDate > block.timestamp, "Due date must be in the future");
        
        uint256 paymentId = paymentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        paymentRecords[paymentId] = PaymentRecord({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            isPaid: false,
            isVerified: false,
            paymentMethod: paymentMethod,
            payer: msg.sender,
            payee: payee,
            dueDate: dueDate,
            paidDate: 0
        });
        
        emit PaymentProcessed(paymentId, shipmentId, msg.sender);
        return paymentId;
    }
    
    function markPaymentAsPaid(uint256 paymentId) public {
        require(paymentRecords[paymentId].payer == msg.sender, "Only payer can mark as paid");
        require(!paymentRecords[paymentId].isPaid, "Payment already marked as paid");
        
        paymentRecords[paymentId].isPaid = true;
        paymentRecords[paymentId].paidDate = block.timestamp;
    }
    
    function verifyShipment(uint256 shipmentId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify shipments");
        require(shipments[shipmentId].shipper != address(0), "Shipment does not exist");
        
        shipments[shipmentId].isVerified = isVerified;
    }
    
    function markAsDelivered(uint256 shipmentId) public {
        require(shipments[shipmentId].carrier == msg.sender, "Only carrier can mark as delivered");
        require(shipments[shipmentId].isVerified, "Shipment must be verified first");
        require(!shipments[shipmentId].isDelivered, "Already marked as delivered");
        
        shipments[shipmentId].isDelivered = true;
        emit ShipmentDelivered(shipmentId, msg.sender);
    }
    
    function updateReputation(address user, euint32 reputation, string memory userType) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (keccak256(abi.encodePacked(userType)) == keccak256(abi.encodePacked("shipper"))) {
            shipperReputation[user] = reputation;
        } else if (keccak256(abi.encodePacked(userType)) == keccak256(abi.encodePacked("carrier"))) {
            carrierReputation[user] = reputation;
        } else if (keccak256(abi.encodePacked(userType)) == keccak256(abi.encodePacked("insurer"))) {
            insurerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getShipmentInfo(uint256 shipmentId) public view returns (
        string memory origin,
        string memory destination,
        string memory cargoType,
        address shipper,
        address carrier,
        address consignee,
        bool isVerified,
        bool isInsured,
        bool isDelivered,
        uint256 departureTime,
        uint256 arrivalTime
    ) {
        CargoShipment storage shipment = shipments[shipmentId];
        return (
            shipment.origin,
            shipment.destination,
            shipment.cargoType,
            shipment.shipper,
            shipment.carrier,
            shipment.consignee,
            shipment.isVerified,
            shipment.isInsured,
            shipment.isDelivered,
            shipment.departureTime,
            shipment.arrivalTime
        );
    }
    
    function getInsuranceInfo(uint256 policyId) public view returns (
        string memory policyType,
        address insurer,
        address beneficiary,
        bool isActive,
        bool isClaimed,
        uint256 startDate,
        uint256 endDate
    ) {
        InsurancePolicy storage policy = insurancePolicies[policyId];
        return (
            policy.policyType,
            policy.insurer,
            policy.beneficiary,
            policy.isActive,
            policy.isClaimed,
            policy.startDate,
            policy.endDate
        );
    }
    
    function getTrackingEventInfo(uint256 eventId) public view returns (
        string memory eventType,
        string memory description,
        address reporter,
        bool isVerified,
        uint256 timestamp
    ) {
        TrackingEvent storage event_ = trackingEvents[eventId];
        return (
            event_.eventType,
            event_.description,
            event_.reporter,
            event_.isVerified,
            event_.timestamp
        );
    }
    
    function getPaymentInfo(uint256 paymentId) public view returns (
        string memory paymentMethod,
        address payer,
        address payee,
        bool isPaid,
        bool isVerified,
        uint256 dueDate,
        uint256 paidDate
    ) {
        PaymentRecord storage payment = paymentRecords[paymentId];
        return (
            payment.paymentMethod,
            payment.payer,
            payment.payee,
            payment.isPaid,
            payment.isVerified,
            payment.dueDate,
            payment.paidDate
        );
    }
    
    function getShipperReputation(address shipper) public view returns (uint8) {
        return 0; // FHE.decrypt(shipperReputation[shipper]) - will be decrypted off-chain
    }
    
    function getCarrierReputation(address carrier) public view returns (uint8) {
        return 0; // FHE.decrypt(carrierReputation[carrier]) - will be decrypted off-chain
    }
    
    function getInsurerReputation(address insurer) public view returns (uint8) {
        return 0; // FHE.decrypt(insurerReputation[insurer]) - will be decrypted off-chain
    }
}
