import React,{useState,useEffect} from 'react';
import './Payment.css';
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link,useHistory} from 'react-router-dom';
import {CardElements ,useStripe , useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import axios from './axios';
import {db} from './firebase'
import moment from 'moment'
import { FlashOnRounded } from '@material-ui/icons';
function Payment() {
    const [{basket,user} , dispatch] = useStateValue()
    const stripe = useStripe();
    const elements = useElements()
    const [error ,setError] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [succeeded, setsucceeded] = useState(false)
    const [processing, setprocessing] = useState("")
    const [clientSecret, setclientSecret] = useState(true)
    const history = useHistory()
    const [paymentmode, setpaymentmode] = useState("COD")
    useEffect(() => {
        // console.log('api')
        const getClientSecret = async ()=>{
            console.log(getBasketTotal(basket)*100)
            const response = await axios({
                method : 'post',
                url : `/payments/create?total=${getBasketTotal(basket)*100}`
            });
            console.log(response.data)
            setclientSecret(response.data.clientSecret) 
        }
        console.log(paymentmode)
        if (paymentmode === "CARD"){
            getClientSecret();
        }
        else{
            
            setError(null)
            setprocessing(false)
        }
    }, [basket,paymentmode])
    console.log('the Secrret is ==> ',clientSecret)
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log('the Secrret is dt ==> ',clientSecret)
        setprocessing(true);
        if (paymentmode === "CARD")
        {
            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            }).then(({paymentIntent})=>{
                setsucceeded(true)
                setError(null)
                setprocessing(false)

                db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
                        basket : basket,
                        ammount : paymentIntent.amount,
                        created : paymentIntent.created
                    })
                dispatch({
                    type:'EMPTY_BASKET'
                })
                history.replace('/orders')
            })
        }
        else if (paymentmode === "COD"){
            setsucceeded(true)
            setError(null)
            setprocessing(false)
            console.log("Payment Mode : ",paymentmode)
            db.collection("users").doc(user?.uid).collection("orders").doc("COD").set({
                basket : basket,
                ammount : getBasketTotal(basket)*100,
                created : moment().unix()
            })
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        }
    }
    const handleChange = e=>{
        setDisabled(e.empty);
        setError(e.error ? e.error.message:"");
    }
    const handlePaymentMode = e=>{
        if(document.getElementById("payment_mode1").checked){
            setDisabled(false)
            setpaymentmode("COD")
        }
        else if(document.getElementById("payment_mode2").checked){
            setpaymentmode("CARD")
            setDisabled(true)
        }
        console.log(paymentmode === "CARD")
    }
    return (
        <div className = 'payment'>
            
            <div className = 'payment_container'>
            <h1>
                Checkout (<Link to ='/checkout'>{basket?.length} items</Link>)
            </h1>
                <div className='payment_section'>
                    <div className = 'payment_title'>
                        <h3 >Delivery Address</h3>
                    </div>
                    <div className ='payment_address'>
                        <p>{user?.email}</p>
                        <p>221B Baker Street</p>
                        <p>London</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className = 'payment_title'>
                        <h3 >Review Items and Delivery</h3>
                    </div>
                    <div className = 'payment_items'>
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
                <div className='payment_section'>
                    <div className = 'payment_title'>
                        <h3 >Payment Method</h3>
                    </div>
                    <div className = 'payment_details'>
                        <form onSubmit = {handleSubmit}>
                            <input type = "radio" id = "payment_mode1" name="payment_mode" value = "COD" defaultChecked = "checked" onClick={handlePaymentMode}/>
                            <label for='COD'>COD</label>
                            <input type = "radio" id = "payment_mode2" name="payment_mode" value = "CARD" onClick={handlePaymentMode}/>
                            <label for='CARD'>CARD</label>
                            {paymentmode ==="CARD"? 
                            <CardElement onChange ={handleChange}/>:<div></div>
                            }
                            <div className = 'payment_priceContainer'>
                                <CurrencyFormat
                                        renderText={(value) => (
                                        <h3>Order Total : {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)} // Part of the homework
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"Rs. "}
                                    />
                                <button disabled ={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Payment
