import { shallow } from 'enzyme';
import React from 'react';

import { initStore } from '../models/CryptoStore';
import Index from '../pages/index';
import { HeaderTest } from "../components/Header";
import { CryptoListTest } from "../components/CryptoList";

describe('index page snapshots', () => {    

    it("check index page snapshot", () => {
        const wrapper = shallow(<Index />);
        expect(wrapper).toMatchSnapshot();
    });

    it("check Header component snapshot", () => {
        const wrapper = shallow(<HeaderTest />);
        expect(wrapper).toMatchSnapshot();
    });

    it("check CryptoList component snapshot", () => {
        const store = initStore(true, null, false);
        const wrapper = shallow(<CryptoListTest store={store} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("check UI", () => {
    
    it("Header has 3 buttons", () => {
        const wrapper = shallow(<HeaderTest />);
        expect(wrapper.find("button")).toHaveLength(3);
    });

    it("CryptoList contains refresh button", () => {
        const store = initStore(true, null, false);
        const wrapper = shallow(<CryptoListTest store={store} />);
        expect(wrapper.text().includes('Refresh data')).toBe(true);
    });
});