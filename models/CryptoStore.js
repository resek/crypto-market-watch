import { types, applySnapshot } from 'mobx-state-tree';
import axios from "axios";
import getConfig from 'next/config';
import ApiObjectStore from "./ApiObjectStore";

const {serverRuntimeConfig} = getConfig()

let store = null;

const CryptoStore = types
    .model("CryptoStore", {
    	apiData: types.array(ApiObjectStore)
    })
    .actions(self => ({
        async getApiData() {
            const response = await axios({
                method: 'GET',
                url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                headers: {
                    'X-CMC_PRO_API_KEY': serverRuntimeConfig.apiKey,
                },
                json: true,
                gzip: true
            });
            self.saveData(response.data.data);
        },
        saveData(response) {           
            response.map(currency => {
                const object = {id: currency.id, name: currency.name};
                self.apiData.push(object);
            })
        }
    }));

export function initStore (snapshot = null) {
    if (store === null) {
        store = CryptoStore.create({ apiData: [] })
    } 
    if (snapshot) {        
        applySnapshot(store, snapshot)
    }
    return store
}