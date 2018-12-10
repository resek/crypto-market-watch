import Layout from "../components/Layout";
import axios from "axios";
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig()

export default class extends React.Component {

    state = {
        apiData: null,
    }

    static async getInitialProps({req}) {
        if(req) {
            const response = await axios({
                method: 'GET',
                url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                headers: {
                    'X-CMC_PRO_API_KEY': serverRuntimeConfig.apiKey,
                },
                json: true,
                gzip: true
            })
            return {ssrData: response.data}
        } else {
            return {}
        }
    }

    componentDidMount () {
        this.setState({apiData: this.props.ssrData})
    }
    
    render() {

        console.log(this.state.apiData)

        let workingData;

        if (this.state.apiData == null) {
            workingData = this.props.ssrData;
        } else {
            workingData = this.state.apiData;
        }

        return (
            <Layout>
                <div>
                    {workingData.data.map((currency, i) => (
                       <p key={i}>{currency.name}</p>
                   ))}
                </div>
            </Layout>
        )
    }
} 