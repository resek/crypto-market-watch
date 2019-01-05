import {types} from "mobx-state-tree";

const QuoteStore = types
    .model("QuoteStore", {
        priceEUR: types.number,
        volume24hEUR: types.number,
        change1h: types.number,
        change24h: types.number,
        change7d: types.number,
        marketCapEUR: types.number,
    });

export default QuoteStore;