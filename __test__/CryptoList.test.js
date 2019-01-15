import { initStore } from '../models/CryptoStore';

describe('CryptoList model tests', () => {

    it ("can create instance of a CryptoStore", () => {
        const store = initStore(true, null, "EUR");
        expect(store.currency).toBe("EUR");
        expect(store.apiData.length).toBe(0);
    });
    
    it ("store action saveRates", () => {
        const store = initStore(true, null, false);    
        const fakeData = { CNY: 7.82668, USD: 1.153476, BTC: 0.000303 };
        store.saveRates(fakeData);
        expect(store.exchRateUSD).toBe(1.153476);
        expect(store.exchRateCNY).toBe(7.82668);
    });

    it ("store action changeCurrency", () => {
        const store = initStore(true, null, false);
        expect(store.currency).toBe("USD");    
        store.changeCurrency("CNY");
        expect(store.currency).toBe("CNY");
    });
});



