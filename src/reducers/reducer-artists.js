import {SEARCH_ARTIST,ERROR_SEARCH_ARTIST} from "../actions/index"
export default function (state=null,action){
    switch(action.type){
        case SEARCH_ARTIST:
            return action.payload
        case ERROR_SEARCH_ARTIST :
            return action.errors
    }
    return state
}