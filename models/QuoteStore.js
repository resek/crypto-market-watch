import {types} from "mobx-state-tree";

const QuoteStore = types
    .model("QuoteStore", {  
        change1h: types.number,
        change24h: types.number,
        change7d: types.number,
        priceEUR: types.number,        
        priceUSD: types.number, 
        priceCNY: types.number,
        priceBTC: types.number,
        volume24hEUR: types.number,
        volume24hUSD: types.number,
        volume24hCNY: types.number,
        marketCapEUR: types.number,
        marketCapUSD: types.number,
        marketCapCNY: types.number,
    });

export default QuoteStore;