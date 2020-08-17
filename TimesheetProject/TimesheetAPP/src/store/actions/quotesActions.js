import ApiService from "../../service/api.service";
export const GET_RANDOM_QUOTE = 'GET_RANDOM_QUOTE';

export const setQuote = (quote) => {
    return {
        type: GET_RANDOM_QUOTE,
        quote: quote
    };
}

export const onGetQuote = (payload) => {
    return dispatch => {
        ApiService.getQuote(payload).then(
            quote => {
                dispatch(setQuote(quote))
            }
        )
    }
};