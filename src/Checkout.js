import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import FlipMove from 'react-flip-move'
function Checkout() {
    const [{basket,user} , dispatch] = useStateValue()
    return (
        <div className = "checkout">
            <div className = 'check_out_left'>
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className = 'checkout_title'>
                        Your Shopping Basket
                    </h2>
                </div>
                <div>
                    
                    {
                        basket.map((item,index) => {
                            const {id,title,image,price,rating} = item
                            return(
                                <CheckoutProduct 
                                id = {id}
                                title= {title}
                                image = {image}
                                price = {price}
                                rating = {rating}/>
                            )
                        })
                    }
                </div>
            </div>
            <div className = 'checkout_right'>
                <Subtotal/>
            </div>
            
        </div>
    )
}

export default Checkout
