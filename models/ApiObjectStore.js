import {types} from "mobx-state-tree";
import QuoteStore from "./QuoteStore";

const ApiObjectStore = types
    .model("ApiObjectStore", {
        id: types.number,
        name: types.string,
        symbol: types.string,
        rank: types.number,
        totalSupply: types.number,
        circulatingSupply: types.number,
        quote: types.frozen(QuoteStore),
    });

export default ApiObjectStore;