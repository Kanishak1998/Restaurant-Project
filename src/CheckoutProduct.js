import React,{useState} from 'react'
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider'
function CheckoutProduct({id , title,image,price,rating ,hideButton}) {
    const [{basket} , dispatch] = useStateValue()
    const [classname, setclassname] = useState("checkoutProduct")
    const removeItem = () =>{
        setclassname("checkoutProduct-remove")
        // console.log("index")
        const timer = setTimeout(() => {
                dispatch({
                        type: "REMOVE_FROM_BASKET",
                        id:id
                        
                })
                setclassname("checkoutProduct")
        }, 100);
        return () => clearTimeout(timer);
    }
    return (
        <div className = {classname}>
            <img className ='checkoutProduct_image' src = {image}  alt = ""></img>
            
            <div className = 'checkoutProduct_info'>
                <p className = 'checkoutProduct_title'>{title}</p>
                <p className = 'checkoutProduct_price'>
                    <small>Rs.</small>
                    <strong>{price}</strong>
                </p>
                <div className = 'checkoutProduct_rating'>
                    {Array(rating).fill().map((_,i) =>(
                        <p>🌟</p>
                    ))}
                </div>
                {!hideButton && (<button onClick = {removeItem}>Remove From Basket</button>)}
                
            </div>
        </div>
    )
}

export default CheckoutProduct
