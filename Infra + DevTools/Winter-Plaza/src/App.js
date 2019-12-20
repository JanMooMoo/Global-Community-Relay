import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar'
import WelcomePage from './components/welcome-page/WelcomePage'
import ethereumExplorer from './components/Hydro_Ethereum_Explorer/ethereumExplorer'
import SnowflakeExplorerPage from './components/EIN_Explorer/SnowflakeExplorerPage'
import DetailsPage from './components/details-page/DetailsPage'
import DefaultPage from './components/default-page/DefaultPage'
import SideDrawer from './components/navbar/SideDrawer';
import Backdrop from './components/navbar/Backdrop';
import SnowflakeAccount from './components/welcome-page/SnowflakeAccount';
import Market from './components/marketplace/Market';
import ProductDetails from './components/marketplace/ProductDetails';
import ProductList from './components/marketplace/ProductList';
import Cart from './components/marketplace/cart/Cart';
import MarketModal from './components/marketplace/MarketModal';
import Checkout from './components/marketplace/cart/Checkout';
import {ProductConsumer} from './components/marketplace/Context';


class App extends Component {

  //const{cartSubTotal,ShippingFee,cartTotal,clearCart,modalOpen2} = value;

  constructor(props){
    super(props)
    this.state = {
        toggle: false,
        sideDrawerOpen:false,
        isOldestFirst:true,
        loading:true,

     }
} 

state = {
  sideDrawerOpen:false
};

drawerToggleClickHandler =()=>{
  this.setState((prevState)=>{
    return {sideDrawerOpen: !prevState.sideDrawerOpen};
  });
 };
   
 
 
 backdropClickHandler =()=>{
   this.setState({sideDrawerOpen:false});
   
  };


  render(){

    let backdrop;

    if(this.state.sideDrawerOpen){
      
      backdrop=<Backdrop click={this.backdropClickHandler}/>;
    }


  return (
    <React.Fragment>
      
        <Navbar drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
      <Switch>
        
        <Route exact path="/" component ={ProductList}/>
        <Route path="/Builders" component ={DetailsPage}/>
        <Route path="/ProductDetails" component ={ProductDetails}/>
        <Route path="/Cart" component ={Cart}/>
     
        <Route component ={DefaultPage}/>
    
      </Switch>
      
      <MarketModal/>
      <ProductConsumer>
        {(value)=>{
        const{cartTotal,modalOpen2,cart,ethereum,marketcap,pay,networkmessage} = value;
        return(
        modalOpen2 &&
        <Checkout 
        ethereum = {ethereum}
        pay = {pay}
        network = {networkmessage}
        marketcap = {marketcap.usd}
        total = {cartTotal} 
        show={modalOpen2} 
        item={cart}
        /> )}}
        </ProductConsumer>
      
    </React.Fragment>
    
  );
}
}
export default App;
