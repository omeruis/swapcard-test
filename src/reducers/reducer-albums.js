import {GET_ALBUM,ERROR_GET_ALBUM} from "../actions/index"
export default function (state=null,action){
    switch(action.type){
        case GET_ALBUM:
            return action.payload
        case ERROR_GET_ALBUM :
            return action.errors
    }
    return state
}