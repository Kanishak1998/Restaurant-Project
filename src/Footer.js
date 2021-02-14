import React,{useState,useEffect} from 'react'
import './Footer.css'
import LanguageIcon from '@material-ui/icons/Language';
function Footer() {
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
      };
    return(
        <div className = 'footer'>
            <div className = 'back-to-back' onClick={scrollTop}>
                <p>Back To Top</p>
            </div>
            <div className = 'footer-data'>
                <div className = 'footer-links'>
                    <div className ='footer-header'>
                        <strong>Get to Know Us</strong>
                    </div>
                    <ul>
                        <li class="nav_first">Careers</li>
                        <li>Blog</li>
                        <li>About Amazon</li>
                        <li>Investor Relations</li>
                        <li>Amazon Devices</li>
                        <li>Amazon Tours</li>
                    </ul>
                </div>
                <div className = 'footer-links'>
                    <div className ='footer-header'>
                        <strong>Make Money with Us</strong>
                    </div>
                    <ul>
                        <li class="nav_first">Sell products on Amazon</li>
                        <li>Sell apps on Amazon</li>
                        <li>Become an Affiliate</li>
                        <li>Advertise Your Products</li>
                        <li>Self-Publish with Us</li>
                        <li>Host an Amazon Hub</li>
                        <li>›See More Make Money with Us</li>
                    </ul>
                </div>
                <div className = 'footer-links'>
                    <div className ='footer-header'>
                        <strong>Amazon Payment Products</strong>
                    </div>
                    <ul>
                        <li>Amazon Business Card</li>
                        <li>Shop with Points</li>
                        <li>Reload Your Balance</li>
                        <li>Amazon Currency Converter</li>
                    </ul>
                </div>
                <div className = 'footer-links'>
                    <div className ='footer-header'>
                        <strong>Get to Know Us</strong>
                    </div>
                    <ul>
                        <li class="nav_first">Let Us Help You</li>
                        <li>Amazon and COVID-19</li>
                        <li>Your Account</li>
                        <li>Your Orders</li>
                        <li>Shipping Rates & Policies</li>
                        <li>Amazon Assistant</li>
                        <li>Help</li>
                    </ul>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
            <div className ='line'></div>
            <div className = 'footer-bottom'>
                <img 
                        className = 'header_logo'
                        src = "http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt = ""/>
                
                <div className='box'>
                    <LanguageIcon/>English
                </div>
                <div className='box'>
                    Rs. INR
                </div>
                <div className='box'>
                    India
                </div>
            </div>
            </div>
            
        </div>
    )
}
export default Footer
