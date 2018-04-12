import React, { Component } from 'react';
import axios from 'axios'
import {spotifySearchURL, spotifyArtistURL, spotifyProfileURL, spotifyWebApiURL} from '../constants';

export const SEARCH_ARTIST = "SEARCH_ARTIST";
export const ERROR_SEARCH_ARTIST = "ERROR_SEARCH_ARTIST";

export const GET_ALBUMS = "GET_ALBUMS";
export const ERROR_GET_ALBUMS = "ERROR_GET_ALBUMS";

export const GET_LOGIN = "GET_LOGIN";
export const ERROR_GET_LOGIN = "ERROR_GET_LOGIN";


export function searchSpotifyArtists(authToken, query) {
    return function (dispatch) {
        return axios(`${spotifySearchURL}${query}&type=artist&access_token=${authToken}`).then(function (response) {
            console.log(response.data.artists.items);
            dispatch({type: SEARCH_ARTIST, payload: response.data.artists})
        }).catch(function (error) {
            dispatch({type: ERROR_SEARCH_ARTIST, errors: error.response.data.detail})
        });
    }
}

export function searchAlbums(event, authToken, artistId, name) {
    return function (dispatch) {
        return axios(`${spotifyArtistURL}${artistId}/albums?album_type=album&access_token=${authToken}`).then(function (response) {
            dispatch({type: GET_ALBUMS, payload: response.data.items})
        }).catch(function (error) {
            dispatch({type: ERROR_GET_ALBUMS, errors: error.response.data.detail})
        });
    }
}

export function login(authorized = false, authToken = null) {
    return function (dispatch) {
        if(authorized){
            return axios(spotifyProfileURL + authToken).then(response=>{
                dispatch({type: GET_LOGIN, payload:{
                        authorized: authorized,
                        authToken: authToken,
                        profile: response.data}
                })
            })
        }else{
            window.location.assign(spotifyWebApiURL);
        }
    }
}
