import { Fragment, Component } from "react";
import { inject } from 'mobx-react';

class CryptoList extends Component {    

    render () {    
        return (
            <Fragment>
                {this.props.store.apiData.map((currency, i) => (
                    <div key={i}>
                        <p>{currency.name} - {currency.id}</p>
                    </div>
                ))}
            </Fragment>
        )
    }    
}

export default inject("store")(CryptoList);