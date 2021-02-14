import React from 'react'
import {Link} from 'react-router-dom'
import './header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useStateValue} from './StateProvider'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {auth} from './firebase'
function Header() {
    const [{basket,user} , dispatch] = useStateValue()
    // console.log("Thso is User Obj",user.email)
    const handleAuthentication =()=>{
        if (user){
            auth.signOut();
        }
    }
    return (
        <div className = 'header'>
            <Link to="/">
                <img 
                    className = 'header_logo'
                    src = "http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt = ""/>
            </Link>
            <div className = 'header_Location'>
                <LocationOnIcon className = 'deliver-icon'/>
                <div className = 'header_option'>
                    <span className = 'header-option-lineone'>
                            Deliver To
                        </span>
                        <span className = 'header-option-linetwo'>
                            Jaipur
                        </span>
                </div>
            </div>
            <div className = 'header_search'>
            <input
                className = 'header_search_input' 
                type = 'text'>
            </input>
            <SearchIcon className = 'header-search-icon'/>
            </div>
            <div className = "header_nav">
                <Link to = {!user && '/login'}>
                    <div onClick={handleAuthentication} className = 'header_option'>
                        <span className = 'header-option-lineone'>
                            Hello {user?(user.displayName?user.displayName:user.email):'Guest'}
                        </span>
                        <span className = 'header-option-linetwo'>
                            {user?'Sign Out':'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className = 'header_option'>
                    <span className = 'header-option-lineone'>
                            Returns
                        </span>
                        <span className = 'header-option-linetwo'>
                            & Orders
                        </span>
                    </div>
                </Link>
                <div className = 'header_option'>
                <span className = 'header-option-lineone'>
                        Your
                    </span>
                    <span className = 'header-option-linetwo'>
                        Prime
                    </span>
                </div>
                <Link to = "/checkout">
                    <div className = 'header_option_basket'>
                        <ShoppingCartIcon/>
                        <span className = 'header_option_basket_count'>{basket.length}</span>
                    </div>
                </Link>
                
            </div>

        </div>
    )
}

export default Header
