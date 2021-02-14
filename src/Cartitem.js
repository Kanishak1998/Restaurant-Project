import React,{useEffect,useState} from 'react'
import './Cartitem.css'
function Cartitem({id , title,image,price,rating}) {
    const [calssname, setcalssname] = useState('temp-cart-item')
    useEffect(() => {
        setcalssname('temp-cart-item-visible')
        const timer = setTimeout(() => {
            setcalssname('temp-cart-item')
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={calssname}>
                        <img className='temp_cart_img' src= {image} alt=""></img> 
                        <div className = 'sub-item_cart'>
                            <h5>{title}</h5>
                            <h5>Rs. {price}</h5>
                            <div className = 'checkoutProduct_rating'>
                                {Array(rating).fill().map((_,i) =>(
                                    <p>🌟</p>
                                ))}
                            </div>
                        </div>
        </div>
    )
}

export default Cartitem
