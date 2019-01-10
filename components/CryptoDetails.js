import { inject, observer } from 'mobx-react';
import { withRouter } from 'next/router';
import { Fragment, Component } from "react";

class CryptoDetails extends Component {

    render() {

        const id = this.props.router.query.id;
        const selectedCurrency = this.props.store.currency;
        const selectedSymbol = this.props.store.currencySymbol(selectedCurrency);
        const store = this.props.store;

        return (
            <Fragment>
                {store.apiData.map(currency => {
                    if (id == currency.id) {
                        return(
                            <div key={currency.id}>
                                
                                <div>
                                    <a href={`/currency/${currency.id}`}><button>Refresh data</button></a>
                                </div>                            
                                
                                <ul>
                                    <li><b>Rank:</b> {currency.rank}</li>
                                    <li><b>Name:</b> {currency.name}</li>
                                    <li><b>Symbol:</b> {currency.symbol}</li>
    
                                    <li><b>Price:</b> {selectedSymbol}{store.priceDecimal(eval(`currency.quote.price${selectedCurrency}`)).toLocaleString()}</li>
    
                                    <li><b>Volume 24h:</b> {selectedSymbol}{(eval(`currency.quote.volume24h${selectedCurrency}`)).toLocaleString().split('.')[0]}</li>
    
                                    <li><b>Market Cap:</b> {selectedSymbol}{(eval(`currency.quote.marketCap${selectedCurrency}`)).toLocaleString().split('.')[0]}</li>

                                    <li><b>Price in Bitcoin:</b> {(currency.id == 1) ? "1.00000000" : currency.quote.priceBTC.toFixed(8) } BTC</li>

                                    <li><b>Change 1h:</b> {currency.quote.change1h.toFixed(2)}%</li>
                                    <li><b>Change 24h:</b> {currency.quote.change24h.toFixed(2)}%</li>
                                    <li><b>Change 7d:</b> {currency.quote.change7d.toFixed(2)}%</li>

                                    <li><b>Total supply:</b> {currency.totalSupply.toLocaleString().split('.')[0]} {currency.symbol}</li>

                                    <li><b>Circulating supply:</b> {currency.circulatingSupply.toLocaleString().split('.')[0]} {currency.symbol}</li>
                                </ul>
                            </div>
                        )
                    }
                })}
                <style jsx>{`
                    div div {
                        width: 300px;
                        margin: 0 auto;
                        text-align: center;
                    }
                    ul {
                        width: 300px;
                        margin: 20px auto 0 auto;
                        list-style-type: none;
                        padding-left: 0;
                    }
                    li {
                        margin-bottom: 10px;
                    }
                `}</style>
            </Fragment>
        )
    }   
};

export default inject("store")(withRouter(observer(CryptoDetails)));