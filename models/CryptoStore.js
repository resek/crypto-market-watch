import { types, applySnapshot } from 'mobx-state-tree';
import axios from "axios";
import getConfig from 'next/config';
import ApiObjectStore from "./ApiObjectStore";

const {serverRuntimeConfig} = getConfig()

let store = null;

const CryptoStore = types
    .model("CryptoStore", {
        apiData: types.array(ApiObjectStore),
        exchRateUSD: types.number,
        exchRateCNY: types.number,
        exchRateBTC: types.number,
    })
    .actions(self => ({
        async getExchangeRates () {
            const response = await axios.get("http://data.fixer.io/api/latest?access_key=a89d13826927735c041b40eb3d26a6de&symbols=CNY,USD,BTC&format=1");
            self.saveRates(response.data.rates);
        },
        async getApiData() {
            const response = await axios({
                method: 'GET',
                url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                params: {
                    convert: "EUR",
                },
                headers: {
                    'X-CMC_PRO_API_KEY': serverRuntimeConfig.apiKey,
                },
                json: true,
                gzip: true
            });
            self.saveData(response.data.data);
        },
        saveRates(data) {
            self.exchRateUSD = data.USD;
            self.exchRateCNY = data.CNY;
            self.exchRateBTC = data.BTC;
        },
        saveData(response) {            
            response.map(currency => {
                // console.log(currency.quote);
                const quote = currency.quote.EUR;                             
                const object = {
                    id: currency.id,
                    name: currency.name,
                    symbol: currency.symbol,
                    rank: currency.cmc_rank,
                    totalSupply: currency.total_supply,
                    circulatingSupply: currency.circulating_supply,
                    quote: {
                        priceEUR: quote.price,
                        change1h: quote.percent_change_1h,
                        change24h: quote.percent_change_24h,
                        change7d: quote.percent_change_7d,
                        volume24hEUR: quote.volume_24h,
                        marketCapEUR: quote.market_cap,
                        priceUSD: quote.price * self.exchRateUSD,
                        priceCNY: quote.price * self.exchRateCNY,
                        priceBTC: quote.price * self.exchRateBTC,
                        volume24hUSD: quote.volume_24h * self.exchRateUSD,
                        volume24hCNY: quote.volume_24h * self.exchRateCNY,
                        volume24hBTC: quote.volume_24h * self.exchRateBTC,
                        marketCapUSD: quote.market_cap * self.exchRateUSD,
                        marketCapCNY: quote.market_cap * self.exchRateCNY,
                        marketCapBTC: quote.market_cap * self.exchRateBTC,
                    }
                };                
                self.apiData.push(object);
            })
        }
    }));

export function initStore (isServer, snapshot = null) {
    if (isServer) {
        // console.log("isServer");
        store = CryptoStore.create({ 
            apiData: [],
            exchRateUSD: 0,
            exchRateCNY: 0,
            exchRateBTC: 0,
        });  
    }
    if (store === null) {
        // console.log("null");
        store = CryptoStore.create({ 
            apiData: [],
            exchRateUSD: 0,
            exchRateCNY: 0,
            exchRateBTC: 0,
        });
    }    
    if (snapshot) {
        // console.log("snapshot");       
        applySnapshot(store, snapshot)
    }
    // console.log(store);
    return store
}