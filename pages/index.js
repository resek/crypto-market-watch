import Layout from "../components/Layout";
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initStore } from '../models/CryptoStore';
import CryptoList from "../components/CryptoList";

export default class extends React.Component {

    static async getInitialProps({req}) { 
        const isServer = !!req;
        const store = initStore(isServer);
        if(req) {
             await store.getApiData();
        }  
        return { initialState: getSnapshot(store), isServer }
    }
    
    constructor (props) {
        super(props)
        this.store = initStore(props.isServer, props.initialState)
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