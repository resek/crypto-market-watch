import { Component } from "react";
import {observer, inject} from "mobx-react";
import Link from 'next/link';

class CryptoListComp extends Component {
    
    render () {
        
        const selectedCurrency = this.props.store.currency;
        const store = this.props.store;  
    
        return (
            <div>
                <a href="/"><button>Refresh data</button></a>                
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Change 24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.apiData.map((currency) => {
                            return (
                                <tr key={currency.id}>
                                    <td>{currency.rank}</td>

                                    <td><Link as={`/currency/${currency.id}`} href={`/currency?id=${currency.id}`}><a>{currency.symbol}</a></Link></td>

                                    <td>{store.currencySymbol(selectedCurrency)}{store.priceDecimal((eval(`currency.quote.price${selectedCurrency}`)))}</td>

                                    <td>{currency.quote.change24h.toFixed(2)}%</td>
                                </tr>
                            )} 
                        )}                           
                    </tbody>                        
                </table>                
                <style jsx>{`
                    div {
                        text-align: center;
                    }                  
                    table {
                        margin: 20px auto 0 auto;
                    }
                    td {
                        width: 90px;
                        text-align: center;
                        height: 30px;
                    }
                `}</style>
            </div>
        )
    }    
}

export const CryptoList = inject("store")(observer(CryptoListComp));
export const CryptoListTest = CryptoListComp;