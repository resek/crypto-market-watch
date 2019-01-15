import Link from 'next/link';
import { inject } from 'mobx-react';

const HeaderComp = (props) => (
    <div>
        <Link href="/"><a>Home</a></Link>
        <button onClick={() => props.store.changeCurrency("USD")}>USD</button>
        <button onClick={() => props.store.changeCurrency("EUR")}>EUR</button>
        <button onClick={() => props.store.changeCurrency("CNY")}>CNY</button>
        <style jsx>{`
            div {
                margin-bottom: 25px;
                text-align: center;
            }
            button {
                margin-left: 10px;
            }
        `}</style>
    </div>
)

export const Header = inject("store")(HeaderComp);
export const HeaderTest = HeaderComp;