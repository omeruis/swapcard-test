import React,{Component} from 'react'
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'
import {searchSpotifyArtists} from "../actions/index"

class SearchBar extends Component{

   constructor(props){
       super(props);

       this.state = {
           query:"",
           //country:this.props.defaultCountry,
           placeHolder:"Enter artist name",
           intervalBeforerequest:3000,
           lockRequest:false,
           error:''
        }
   }

    captureSearch = (searchTerm) => {
        this.setState({ query: searchTerm })
    }

    render(){
       console.log(this.props);
        return (
            <div className="row mt-5 justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={() => searchSpotifyArtists(this.props.authToken, this.state.query)} className="text-center">
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
        )
    }


   componentWillMount () {

   }

}

const mapStateToProps = (state) => {
    return {
        artists: state.artists
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({searchSpotifyArtists:searchSpotifyArtists},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)