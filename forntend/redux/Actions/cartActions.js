import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART

} from '../Reducers/constant'

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

// we don't need payload here as we will clear the entire state
export const clearCart = (payload) => {
    return {
        type: CLEAR_CART,
       
    }
}