import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initStore } from '../models/CryptoStore';
import Layout from "../components/Layout";
import CryptoDetails from "../components/CryptoDetails";

export default class extends React.Component {

    static async getInitialProps({req}) {
        if (req) {
        const store = initStore(true);
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
                    <CryptoDetails />
                </Layout>
            </Provider>
        )
    }
} 