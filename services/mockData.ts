// Dados Mockados (gerados por IA para demonstração)

import { Vehicle, Lead, DealerMetrics } from '../types';

export const MOCK_VEHICLES: Vehicle[] = [
  { id:'v1', vin:'1FTFW1ET5DFC10312', model:'Ford Ranger', year:2022, plate:'BRA-2E19',
    owner:'Carlos Silva', ownerPhone:'(11) 99234-5678',
    lastService:'2024-08-15', nextServiceDue:'2025-06-15',
    mileage:42300, warrantyStatus:'active', inFordNetwork:true, riskScore:22,
    serviceHistory:[
      {id:'s1',date:'2024-08-15',type:'Revisão 40.000 km',description:'Troca de óleo, filtros e revisão geral',cost:890,atFordDealer:true},
      {id:'s2',date:'2024-01-10',type:'Revisão 30.000 km',description:'Troca de óleo e filtros',cost:650,atFordDealer:true},
    ],
    recalls:[{id:'r1',component:'Airbag',description:'Possível falha no inflador',status:'completed'}] },

  { id:'v2', vin:'3FADP4EJ8DM123456', model:'Ford Territory', year:2021, plate:'RJO-5K33',
    owner:'Ana Beatriz Santos', ownerPhone:'(21) 98765-4321',
    lastService:'2023-11-20', nextServiceDue:'2024-05-20',
    mileage:67800, warrantyStatus:'expiring_soon', inFordNetwork:false, riskScore:78,
    serviceHistory:[
      {id:'s3',date:'2023-11-20',type:'Revisão 60.000 km',description:'Revisão completa',cost:1200,atFordDealer:false},
    ],
    recalls:[] },

  { id:'v3', vin:'1FMCU0F73EUE12345', model:'Ford Bronco Sport', year:2023, plate:'MGB-3H77',
    owner:'Roberto Lima', ownerPhone:'(31) 97654-3210',
    lastService:'2025-01-05', nextServiceDue:'2025-07-05',
    mileage:18500, warrantyStatus:'active', inFordNetwork:true, riskScore:15,
    serviceHistory:[
      {id:'s4',date:'2025-01-05',type:'Revisão 15.000 km',description:'Troca de óleo e inspeção geral',cost:580,atFordDealer:true},
    ],
    recalls:[] },

  { id:'v4', vin:'1FTEW1C51KFA00001', model:'Ford Maverick', year:2020, plate:'CWB-9P01',
    owner:'Fernanda Oliveira', ownerPhone:'(41) 96543-2109',
    lastService:'2023-06-10', nextServiceDue:'2023-12-10',
    mileage:95200, warrantyStatus:'expired', inFordNetwork:false, riskScore:91,
    serviceHistory:[
      {id:'s5',date:'2023-06-10',type:'Revisão 80.000 km',description:'Troca de óleo e filtros',cost:720,atFordDealer:false},
    ],
    recalls:[{id:'r2',component:'Freios',description:'Desgaste prematuro das pastilhas',status:'open'}] },

  { id:'v5', vin:'2FMDK3GC8DBA00002', model:'Ford Edge', year:2022, plate:'POA-4L55',
    owner:'Marcos Pereira', ownerPhone:'(51) 95432-1098',
    lastService:'2024-10-22', nextServiceDue:'2025-04-22',
    mileage:31000, warrantyStatus:'active', inFordNetwork:true, riskScore:35,
    serviceHistory:[
      {id:'s6',date:'2024-10-22',type:'Revisão 30.000 km',description:'Troca de óleo, filtros e alinhamento',cost:980,atFordDealer:true},
    ],
    recalls:[] },
];

export const MOCK_LEADS: Lead[] = [
  { id:'l1', vehicleId:'v4', vehicleModel:'Ford Maverick 2020',
    ownerName:'Fernanda Oliveira', ownerPhone:'(41) 96543-2109',
    reason:'Revisão vencida há 5 meses + Recall em aberto',
    priority:'high', estimatedRevenue:1400,
    suggestedAction:'Ligar hoje — oferecer revisão + correção de recall com desconto especial',
    dueDate:'2025-01-20', contacted:false },

  { id:'l2', vehicleId:'v2', vehicleModel:'Ford Territory 2021',
    ownerName:'Ana Beatriz Santos', ownerPhone:'(21) 98765-4321',
    reason:'Garantia expirando em 30 dias — alto risco de migrar para concorrência',
    priority:'high', estimatedRevenue:2200,
    suggestedAction:'Enviar oferta de revisão pré-vencimento com 20% de desconto via WhatsApp',
    dueDate:'2025-01-25', contacted:false },

  { id:'l3', vehicleId:'v5', vehicleModel:'Ford Edge 2022',
    ownerName:'Marcos Pereira', ownerPhone:'(51) 95432-1098',
    reason:'Revisão dos 30.000 km vence em 60 dias',
    priority:'medium', estimatedRevenue:980,
    suggestedAction:'Enviar SMS com link de agendamento online',
    dueDate:'2025-02-28', contacted:true },

  { id:'l4', vehicleId:'v1', vehicleModel:'Ford Ranger 2022',
    ownerName:'Carlos Silva', ownerPhone:'(11) 99234-5678',
    reason:'Kilometragem próxima da revisão dos 50.000 km',
    priority:'low', estimatedRevenue:890,
    suggestedAction:'Enviar push notification com oferta de pré-agendamento',
    dueDate:'2025-03-15', contacted:false },
];

export const MOCK_METRICS: DealerMetrics = {
  vinShare: 64.3,
  vinShareTrend: [58, 59, 61, 60, 63, 64.3],
  totalVehicles: 1248,
  activeVehicles: 802,
  atRiskVehicles: 187,
  monthlyRevenue: 284500,
  monthlyRevenueTrend: [210000, 225000, 240000, 235000, 270000, 284500],
  openLeads: 47,
  conversionRate: 68,
};

export const MONTHS_SHORT = ['Ago','Set','Out','Nov','Dez','Jan'];
