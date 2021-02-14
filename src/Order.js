import React from 'react'
import './Order.css'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from "react-currency-format";
function Order({order}) {
    return (
        <div className = 'order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMM Do YYYY, h:mma')}</p>
            <p className = 'order_id'>
                <small>{order.id}</small>
            </p>
            {
                order.data.basket?.map(item => {
                    const {id,title,image,price,rating} = item
                    return (
                        <CheckoutProduct 
                            id = {id}
                            title= {title}
                            image = {image}
                            price = {price}
                            rating = {rating}
                            hideButton/>
                    )
                })
            }
            <CurrencyFormat
                renderText={(value) => (
                <h3 className = 'order_total'>Order Total : {value}</h3>
                )}
                decimalScale={2}
                value={order.data.ammount/100} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
            />
        </div>
    )
}

export default Order
