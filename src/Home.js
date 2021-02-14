import React,{useState,useEffect} from 'react'
import './Home.css'
import Product from './Product'
import products from './data'
import TempCart from './TempCart'
import Footer from './Footer'
// const imageList = ["https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg","https://cdn.wallpapersafari.com/63/91/EGjUcK.jpg","https://cdn.wallpapersafari.com/56/74/kiu6cV.jpg","https://cdn.wallpapersafari.com/56/74/kiu6cV.jpg"];
const imageList =["https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg",
                   "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg",]
function Home() {
    const [index,setIndex] = useState(0)

    useEffect ( () =>{
        if (index>imageList.length-1){
            setIndex(0)
        }
    },[index]

    )
    useEffect( ()=>{
        let slider = setInterval(()=>{
            setIndex(index+1)
        },3000)
        return ()=> clearInterval(slider)
    },[index])
    return (
        <div className = 'home'>
            <TempCart/>
            <div className = 'home_container'>
                {                
                    imageList.map((image,imgindex) =>{
                        let position = 'nextSlide';
                        if (imgindex === index){
                            position = 'activeSlide'
                        }
                        if (imgindex === index-1 || (index === 0 && imgindex===imageList.length-1) ){
                            position = 'lastSlide'
                        }
                        return (
                            <article className = {position} key = {imgindex}>
                                <img src = {image} className = 'slider'></img>
                            </article>
                        )
                    })
                }
            </div>
            <div className="home_row">
                {
                    products.map((item,index) => {
                        const {id,title,price,rating,image} = item
                        return (
                            <Product
                                id={id}
                                title={title}
                                price={price}
                                rating={rating}
                                image={image}
                            />
                        )

                    })
                }  
            </div>
            <Footer/>
        </div>
    )
}

export default Home
