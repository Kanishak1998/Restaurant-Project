export const initialState  = {
    basket : [],
    user : null
};

export const getBasketTotal = (basket) =>{
    console.log(basket)
    return basket?.reduce((amount , item) => item.price +amount ,0 );
}
const reducer = (state , action ) =>{
    // console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket : [...state.basket , action.item],
            };
        case 'REMOVE_FROM_BASKET':
            // console.log(basketItem.id)
            // console.log(state.basket)
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            // console.log(index)
            let newbasket = [...state.basket];
            if (index>=0){
                newbasket.splice(index,1);
                // console.log(newbasket)
                // console.log(index)
            }
            else{
                console.warn(`Cant remove the Product (id : ${action.id}) as it is not a basket`)
            }
            return {
                ...state,
                basket :newbasket
            };
        case "SET_USER":
            return {
                ...state,
                user:action.user
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket:[]
            }
        default:
            return state
    }   
}
export default reducer;