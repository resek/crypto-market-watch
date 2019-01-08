import { inject } from 'mobx-react';
import { withRouter } from 'next/router';

const CryptoDetails = withRouter((props) => {

    const id = props.router.query.id;

    return (
        <div>
            {props.store.apiData.map(currency => {
                if (id == currency.id) {
                    return(
                        <ul key={currency.id}>
                            <li>Rank: {currency.rank}</li>
                            <li>Name: {currency.name}</li>
                            <li>Symbol: {currency.symbol}</li>
                            <li>Price: {currency.quote.priceEUR.toFixed(2)}€</li>
                        </ul>
                    )
                }
            })}
        </div>
    )
});

export default inject("store")(CryptoDetails);