# @coinbase/agentkit-ezpath

Coinbase AgentKit integration for EZ-Path DEX meta-router. Enables agents to get best-in-class swap quotes with native X402 payment support.

## Installation

```bash
npm install @coinbase/agentkit-ezpath
```

## Usage

```typescript
import { Agentkit } from "@coinbase/agentkit";
import { ezPathTools } from "@coinbase/agentkit-ezpath";

const agentkit = new Agentkit({
  tools: [...defaultTools, ...ezPathTools],
});
```

## Tool: ezpath_quote

Get the best swap quote racing 0x, ParaSwap, Aerodrome, and Uniswap V3.

**Parameters:**
- `sellToken` (string): Base token address to sell
- `buyToken` (string): Base token address to buy
- `sellAmount` (string): Amount in base decimals
- `tier` (string, optional): "basic" | "resilient" | "institutional"

**Returns:**
```json
{
  "buyAmount": "500000",
  "price": "0.5",
  "winner": "0x",
  "executionMode": "direct",
  "settlementTx": "0x...",
  "edgeBps": 47
}
```

## Payment

Payments are handled via X402 EIP-3009 USDC transfers. No API keys required.

- Basic: $0.03
- Resilient: $0.10
- Institutional: $0.50

## License

BSD-2-Clause
