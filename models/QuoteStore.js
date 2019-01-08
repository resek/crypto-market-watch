import {types} from "mobx-state-tree";

const QuoteStore = types
    .model("QuoteStore", {
        priceEUR: types.number,
        volume24hEUR: types.number,
        change1h: types.number,
        change24h: types.number,
        change7d: types.number,
        marketCapEUR: types.number,
        priceUSD: types.number, 
        priceCNY: types.number,
        priceBTC: types.number,
        volume24hUSD: types.number,
        volume24hCNY: types.number,
        volume24hBTC: types.number,
        marketCapUSD: types.number,
        marketCapCNY: types.number,
        marketCapBTC: types.number,
    });

export default QuoteStore;