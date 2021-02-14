import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format";
import {useStateValue} from './StateProvider'
import {getBasketTotal} from './reducer'
import {useHistory} from 'react-router-dom'

function Subtotal() {
    const [{basket,user} , dispatch] = useStateValue()
    const history = useHistory()
    const reducer = (accumulator , currentval) => {
        return currentval + accumulator
    }
    const handleCheckout = (e)=>{
        if (getBasketTotal(basket) === 0){
            alert("Cart is empty")
            return 
        }
        if (!user){
            alert("Please Login First")
            return 
        }
        console.log(user)
        history.push('/payment')

    }
    return (
        <div className = 'subtotal'>
             <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        {/* Part of the homework */}
                        Subtotal ({basket.length} items) : <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)} // Part of the homework
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rs. "}
                />

            <button onClick = {handleCheckout}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
