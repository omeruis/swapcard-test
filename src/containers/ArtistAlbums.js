import React, { Component } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { spotifyAlbumURL } from '../constants';

export default class ArtistAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            tracks: []
        };
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    showAlbums = (albums) => {
        if(albums != undefined){
            let results = [];
            albums.map((album, index) => {
                if(album.images[0] != undefined){
                    let hasImage = album.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card
                                name={album.name}
                                id={album.id}
                                key={album.id}
                                imageURL={hasImage.url}
                                onClickHandler={event => this.getAlbumTracks(event, album.id, album.name)}
                                text="Show Album"
                            />
                        </div>
                    )
                }             
            })
            return results
        }else{
            return <p></p>
        }
    }

    getAlbumTracks = (event, albumId, name) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        let tracks;
        axios.get(`${spotifyAlbumURL}${albumId}/tracks?access_token=${authToken}`).then(response => {
            this.setState({ tracks: response.data.items });
            tracks = response.data.items;
            console.log('',tracks);
        })
        .catch(error => console.log(error));
    }

    render() {
        const {
            data: { 
                albums 
            }, 
            current_user: { 
                user: { 
                    images, 
                    display_name 
                } 
            } 
        } = this.props.location.state;

        return (
            <div>
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Album Results for { albums[0].artists[0].name}
                    </p>
                </div>
                <div className="row">
                    {this.showAlbums(albums)}
                </div>
            </div>
        )
    }
}
