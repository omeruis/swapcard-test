import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../src/containers/Login'
import Home from '../src/containers/Home'
import chai, { expect } from 'chai';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Login Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<Login />).exists(<div className="container mt-5"></div>)).toBe(true)
    });

    it('should render without throwing an error Home', () => {
        expect(shallow(<Home />).exists(<p className="lead text-center">Search Artists</p>)).toBe(true)
    })
})