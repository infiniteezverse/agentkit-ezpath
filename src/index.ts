import { Tool } from "@coinbase/agentkit";

const API_BASE_URL = "https://ezpath.myezverse.xyz";

export const ezPathQuoteTool: Tool = {
  name: "ezpath_quote",
  description: "Get the best DEX quote on Base by racing 0x, ParaSwap, Aerodrome, and Uniswap V3",
  
  inputSchema: {
    type: "object",
    properties: {
      sellToken: {
        type: "string",
        description: "Token address to sell (Base mainnet)"
      },
      buyToken: {
        type: "string",
        description: "Token address to buy (Base mainnet)"
      },
      sellAmount: {
        type: "string",
        description: "Amount to sell in base decimals"
      },
      tier: {
        type: "string",
        enum: ["basic", "resilient", "institutional"],
        description: "Execution tier: basic ($0.03), resilient ($0.10), institutional ($0.50)"
      }
    },
    required: ["sellToken", "buyToken", "sellAmount"]
  },

  async execute(input: any) {
    const { sellToken, buyToken, sellAmount, tier = "basic" } = input;
    
    const url = `${API_BASE_URL}/api/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}&tier=${tier}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Quote failed: ${data.error || response.statusText}`);
    }
    
    return {
      buyAmount: data.buyAmount,
      price: data.price,
      winner: data.winner,
      executionMode: data.execution_mode,
      settlementTx: data.settlement_tx,
      edgeBps: data.edge_bps,
    };
  }
};

export const ezPathTools = [ezPathQuoteTool];
