# 🔧 Torque — Ford VIN Share App
> Projeto Ford + FIAP 2026 | Mobile Development & IoT
> Solução para monitoramento de VIN Share e retenção de clientes no pós-venda

---

## 📱 Funcionalidades

- **Dashboard** — VIN Share em tempo real, receita, frota ativa, leads abertos
- **Frota** — Lista de veículos com busca, filtros e score de risco
- **Leads** — Leads preditivos com ação rápida (ligar / WhatsApp)
- **Alertas** — Notificações de recalls, revisões e riscos
- **Detalhe do Veículo** — Histórico, garantia, recalls via API NHTSA

## 🌐 API Externa Consumida

**NHTSA (National Highway Traffic Safety Administration)**
- `GET /recalls/recallsByVIN?vin={vin}` — recalls por VIN
- `GET /recalls/recallsByVehicle?make=Ford&model=...` — recalls por modelo
- `GET /vehicles/decodevin/{vin}` — decodificação de VIN
- **Docs:** https://api.nhtsa.gov

---

## 🚀 Como Rodar

### Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 18.x ou superior |
| npm | 9.x ou superior |
| Expo CLI | instalado globalmente |
| App Expo Go | iOS ou Android |

### 1. Instalar o Expo CLI (se não tiver)

```bash
npm install -g expo-cli
```

### 2. Clonar / Extrair o projeto

```bash
# Extraia o ZIP e entre na pasta
cd torque
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npx expo start
```

### 5. Abrir no dispositivo

- **Celular físico:** Abra o app **Expo Go** e escaneie o QR Code exibido no terminal
- **Android (emulador):** Pressione `a` no terminal
- **iOS (simulador Mac):** Pressione `i` no terminal
- **Web (browser):** Pressione `w` no terminal

---

## 🗂️ Estrutura do Projeto

```
torque/
├── app/
│   ├── _layout.tsx              # Layout raiz (Stack Navigator)
│   ├── vehicle-detail.tsx       # Tela de detalhe do veículo
│   └── (tabs)/
│       ├── _layout.tsx          # Tab Navigator
│       ├── index.tsx            # Dashboard (VIN Share, métricas)
│       ├── vehicles.tsx         # Frota com busca e filtros
│       ├── leads.tsx            # Leads preditivos
│       └── notifications.tsx    # Central de alertas
├── components/
│   ├── MetricCard.tsx           # Card de métrica
│   ├── MiniBarChart.tsx         # Mini gráfico de barras
│   ├── VehicleCard.tsx          # Card de veículo
│   └── LeadCard.tsx             # Card de lead com ações
├── constants/
│   └── Colors.ts                # Paleta Ford
├── services/
│   ├── api.ts                   # Integração NHTSA API
│   └── mockData.ts              # Dados simulados
├── types/
│   └── index.ts                 # Tipos TypeScript
└── app.json                     # Configuração Expo
```

---

## 🎨 Identidade Visual Ford

| Token | Valor | Uso |
|---|---|---|
| Ford Blue | `#003478` | Header, primário |
| Ford Light Blue | `#1C6BBA` | Acentos |
| Ford Sky Blue | `#00ADEF` | Tab ativo, destaques |
| Tab Bar | `#002B63` | Barra de navegação |

---

## ⚠️ Solução de Problemas

**Erro `Unable to find expo in this project`**
```bash
npm install expo
npx expo start
```

**Erro de metro bundler**
```bash
npx expo start --clear
```

**App não carrega no Expo Go**
- Certifique-se que o celular está na mesma rede Wi-Fi que o computador
- Tente usar `npx expo start --tunnel`

---

## 📚 Tecnologias

- **React Native** + **Expo SDK 52**
- **Expo Router v4** (file-based navigation)
- **TypeScript**
- **@expo/vector-icons** (Ionicons)
- **NHTSA Public API** (recalls e VIN decode)
