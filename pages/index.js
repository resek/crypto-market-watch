import Layout from "../components/Layout";
import axios from "axios";

export default class extends React.Component {

    state = {
        apiData: null,
    }

    static async getInitialProps({req}) {
        if(req) {
            const response = await axios({
                method: 'GET',
                url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
                qs: {
                    start: 1,
                    limit: 500,
                    convert: 'USD'
                },
                headers: {
                    'X-CMC_PRO_API_KEY': 'e90e44fb-0f9c-43f2-8aa2-04b0b1435971'
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