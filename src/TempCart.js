import React ,{useEffect, useState} from 'react'
import './TempCart.css'
import Cartitem from './Cartitem'
import {useStateValue} from './StateProvider'
function TempCart() {
    const [tempcart, settempcart] = useState([])
    const [{basket} , dispatch] = useStateValue()
    useEffect(() => {
        if (basket.length>0){
            console.log("Change is basket",basket[basket.length-1])
            const id = basket[basket.length-1]["id"]
            settempcart([...tempcart,basket[basket.length-1]])
            const timer = setTimeout(() => {
                console.log("removing" ,id)
                const index = tempcart.findIndex(
                    (basketItem) => basketItem.id === id
                );
                let newbasket = [...tempcart];
                if (index>=0){
                    newbasket.splice(index,1);
                }
                settempcart([])
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [basket]);
    return (
        <div className = 'temp_cart'>
            {
                tempcart.map((items,index) =>{
                    const {id,title,price,rating,image} = items
                    return (
                        <Cartitem 
                        id = {id}
                        title= {title}
                        image = {image}
                        price = {price}
                        rating = {rating}
                        />
                    )
                })
                
            }
        </div>
    )
}

export default TempCart
