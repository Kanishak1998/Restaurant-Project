import React,{useState,useEffect} from 'react'
import "./Orders.css"
import {db} from './firebase'
import {useStateValue} from './StateProvider';
import Order from './Order'
function Orders() {
    const [orders, setorders] = useState([])
    const [{basket,user} , dispatch] = useStateValue()
    useEffect(()=>{
        if (user){
            console.log("true")
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created','desc')
                .onSnapshot(snapshot=>{
                    setorders(snapshot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data() 
                    })))
                }
            )
        }
        else{
            setorders([])
        }
        console.log(orders)
    },[user])
    return (
        <div className = 'orders'>
            <h1>Your Orders</h1>
            <div className = 'orders_order'>
                {orders?.map(order => (
                    <Order order = {order}/>
                ))

                }
            </div>
        </div>
    )
}

export default Orders
