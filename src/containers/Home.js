// @flow
import React, { Component  } from 'react';
import axios from 'axios';
import { spotifySearchURL, spotifyArtistURL } from '../constants/';
import Card from '../components/Card';

type Props = {|
    history: Object,
    location: {
    hash: string,
        key: string,
        pathname: string,
        search: string,
        state: {
        auth:{
            authToken: string
        },
        current_user: {
            user: {
                display_name : string
            }
        }
    }
},
match : {
    isExact: Boolean,
        params: Object,
        path: string,
        url: string
}
|}

type State = {|
    current_user: Object,
    query: string,
    artists: Object,
    albums: Array<mixed>,
    error: string
|}

class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            current_user: Object,
            query: '',
            artists: Object,
            albums: [],
            error: ''
        }
    }

    captureSearch = (searchTerm: string): void => {
        this.setState({ query: searchTerm })
    };

    componentDidMount = ():void => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    searchSpotifyArtists = (event: Object):void => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        let artists;
        axios.get(`${spotifySearchURL}${this.state.query}&type=artist&access_token=${authToken}`)
            .then(response => {
                artists = response.data.artists;
                this.setState({artists});
            })
            .catch(error => {
                this.setState({
                    error: 'Sorry your search didn\'t return any results...'
                })
            })

    }

    showArtistResults = (artists: Array<Object>):Array<Object> | null => {
        if(artists != undefined){
            let results = [];
            artists.map((artist, index) => {
                if(artist.images[0] != undefined) {
                    let hasImage = artist.images[0];
                    results.push(
                        <div className="col-md-3">
                            <Card
                                name={artist.name}
                                id={artist.id}
                                key={index}
                                imageURL={hasImage.url}
                                onClickHandler={(event) => this.searchAlbums(event,artist.id, artist.name)}
                                text="Show Albums"
                            />
                        </div>
                    )
                }
            });
            return results;
        }else{
            return null
        }
    }

    searchAlbums = (event: Object, artistId: string, name: string):void => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        let albums;
        let cleanName = name.replace(/[ ]/g,"-").replace(/[()]/g,"").trim();
        axios.get(`${spotifyArtistURL}${artistId}/albums?album_type=album&access_token=${authToken}`)
            .then(response => {
                this.setState({ albums: response.data.items });
                albums = response.data.items;
            })
            .then(()=> this.props.history.push(
                `/artist-albums/${artistId}/${cleanName}`,
                {
                    data: { albums },
                    current_user: { user: this.state.current_user.user },
                    auth: { authToken }
                }
            ))
            .catch(error => console.log(error));
    }


    render() {
        return(
            <div>
                <div className="row mt-5">
                    <div className="col-lg">
                        <p className="lead text-center">Search Artists</p>
                    </div>
                </div>
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-6">
                    <form onSubmit={this.searchSpotifyArtists} className="text-center">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control text-center"
                                placeholder="enter artist name"
                                onChange={
                                    event => {
                                        this.captureSearch(event.target.value)
                                        this.setState({ error: ''})
                                    }
                                }
                                value={this.state.query}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="form-group">
                            <p style={{color: '#e74c3c'}}>
                                {this.state.error}
                            </p>
                        </div>
                    </form>
                </div>
                </div>
                <div className="row">
                    {this.showArtistResults(this.state.artists.items)}
                </div>
        </div>
        );
    }
};
export default Home;