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
        currency: types.string,
    })
    .actions(self => ({
        async getExchangeRates () {
            // const response = await axios.get("http://data.fixer.io/api/latest?access_key=a89d13826927735c041b40eb3d26a6de&symbols=CNY,USD,BTC&format=1");
            const fakeData = { CNY: 7.82668, USD: 1.153476, BTC: 0.000303 };
            self.saveRates(fakeData); //response.data.rates
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
                const quote = currency.quote.EUR;                             
                const object = {
                    id: currency.id,
                    name: currency.name,
                    symbol: currency.symbol,
                    rank: currency.cmc_rank,
                    totalSupply: currency.total_supply,
                    circulatingSupply: currency.circulating_supply,
                    quote: {                        
                        change1h: quote.percent_change_1h,
                        change24h: quote.percent_change_24h,
                        change7d: quote.percent_change_7d,                      
                        priceEUR: quote.price,
                        priceUSD: quote.price * self.exchRateUSD,
                        priceCNY: quote.price * self.exchRateCNY,
                        priceBTC: quote.price * self.exchRateBTC,
                        volume24hEUR: quote.volume_24h,
                        volume24hUSD: quote.volume_24h * self.exchRateUSD,
                        volume24hCNY: quote.volume_24h * self.exchRateCNY,
                        marketCapEUR: quote.market_cap,
                        marketCapUSD: quote.market_cap * self.exchRateUSD,
                        marketCapCNY: quote.market_cap * self.exchRateCNY,
                    }
                };                
                self.apiData.push(object);
            })
        },
        changeCurrency(currency) {
            self.currency = currency;
        }
    }))
    .views(self => ({
        priceDecimal(price) {
            if (price >= 1) {
                return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                return price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
            }
        },
        currencySymbol(currency) {
            if (currency === "USD") {
                return "$";
            } if (currency === "EUR") {
                return "€"
            } else {
                return "¥";
            }
        }
    }));

export function initStore (isServer, snapshot = null) {

    let selectedCurrency = "USD";
         
    if (isServer) {
        store = CryptoStore.create({ 
            apiData: [],
            exchRateUSD: 0,
            exchRateCNY: 0,
            exchRateBTC: 0,
            currency: selectedCurrency,
        });  
    }
    if (store === null) {
        store = CryptoStore.create({ 
            apiData: [],
            exchRateUSD: 0,
            exchRateCNY: 0,
            exchRateBTC: 0,
            currency: selectedCurrency,
        });
    }    
    if (snapshot) {       
        applySnapshot(store, snapshot)
    }
    return store
}