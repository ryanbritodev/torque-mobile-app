export interface Vehicle {
  id: string; vin: string; model: string; year: number;
  plate: string; owner: string; ownerPhone: string;
  lastService: string; nextServiceDue: string; mileage: number;
  warrantyStatus: 'active' | 'expired' | 'expiring_soon';
  inFordNetwork: boolean; riskScore: number;
  serviceHistory: ServiceRecord[]; recalls: Recall[];
}
export interface ServiceRecord {
  id: string; date: string; type: string;
  description: string; cost: number; atFordDealer: boolean;
}
export interface Recall {
  id: string; component: string; description: string; status: 'open' | 'completed';
}
export interface Lead {
  id: string; vehicleId: string; vehicleModel: string;
  ownerName: string; ownerPhone: string; reason: string;
  priority: 'high' | 'medium' | 'low'; estimatedRevenue: number;
  suggestedAction: string; dueDate: string; contacted: boolean;
}
export interface DealerMetrics {
  vinShare: number; vinShareTrend: number[];
  totalVehicles: number; activeVehicles: number; atRiskVehicles: number;
  monthlyRevenue: number; monthlyRevenueTrend: number[];
  openLeads: number; conversionRate: number;
}
export interface NHTSARecall {
  NHTSACampaignNumber: string; Component: string; Summary: string;
}
