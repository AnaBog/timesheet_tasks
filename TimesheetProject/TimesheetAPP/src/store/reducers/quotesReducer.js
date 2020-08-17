import * as actionTypes from '../actions/quotesActions';

const initialState = {
    quote: null
};

const quotesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_RANDOM_QUOTE:
            console.log(action.quote)
            return {
                ...state,
                quote: action.quote
            }
        default:
            return state;
    }
}

export default quotesReducer;