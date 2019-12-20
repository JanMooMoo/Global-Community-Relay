import React from 'react';
import './sidedrawer.css';
import {Link} from 'react-router-dom';


const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses='side-drawer open';
    }
    return(
    <nav className={drawerClasses}>
        <ul>
            <li></li>
            <li><Link to="/" className="nav-link"><p className="grass2">Store</p></Link></li>
            <li><Link to="/Cart" className="nav-link"><p className="grass2">Cart</p></Link></li>
            <li><Link to="/Builders" className="nav-link"><p className="grass2">Builders</p></Link></li> 
            
            
            </ul>
    </nav>
);
    }
export default SideDrawer;