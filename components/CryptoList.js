import { Component } from "react";
import { inject } from 'mobx-react';
import Link from 'next/link';

class CryptoList extends Component {
    
    render () {
    
        return (
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Volume 24h</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.store.apiData.map((currency) => (
                        <tr key={currency.id}>
                            <td>{currency.rank}</td>
                            <td><Link as={`/currency/${currency.id}`} href={`/currency?id=${currency.id}`}><a>{currency.symbol}</a></Link></td>
                            <td>{currency.quote.priceUSD.toFixed(2)}$</td>
                            <td>{currency.quote.change24h.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
                <style jsx>{`
                    table {
                        margin: 0 auto;
                    }
                    td {
                        width: 80px;
                        text-align: center;
                        height: 30px;
                    }
                `}</style>    
            </table>
        )
    }    
}

export default inject("store")(CryptoList);