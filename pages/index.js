import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import Cookies from 'universal-cookie';
import { initStore } from '../models/CryptoStore';
import Layout from "../components/Layout";
import CryptoList from "../components/CryptoList";

export default class extends React.Component {

    static async getInitialProps({req}) {
        if (req) {
            const cookies = new Cookies(req.headers.cookie);
            cookies.get("currency");
            const currency = cookies.cookies.currency;
            const store = initStore(true, null, currency);
            await store.getExchangeRates();
            await store.getApiData();
            return { initialState: getSnapshot(store) }
        } else {
            return {}
        }
    }

    constructor (props) {
        super(props)
        this.store = initStore(false, props.initialState)
    }  
    
    render() {

        return (
            <Provider store={this.store}>
                <Layout>
                    <CryptoList />
                </Layout>
            </Provider>
        )
    }
} 