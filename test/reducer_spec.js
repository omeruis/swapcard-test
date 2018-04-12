import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducerArtiste from '../src/reducers/reducer-artists';
import reducerAlbum from '../src/reducers/reducer-albums';
import {GET_ALBUM, SEARCH_ARTIST} from "../src/actions";


describe('reducer', () => {

    it('handles SEARCH_ARTIST', () => {
        const initialState = Map();
        const action = {type: 'SEARCH_ARTIST', payload: ['Soprano']};
        const nextState = reducerArtiste(initialState, action);

        expect(nextState).to.contains(fromJS(
            action.payload
        ));
    });

    it('handles GET_ALBUM', () => {
        const initialState = Map();
        const action = {type: 'GET_ALBUM', payload: ['Everest']};
        const nextState = reducerAlbum(initialState, action);

        expect(nextState).to.contains(fromJS(
            action.payload
        ));
    });


});