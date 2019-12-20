
import React, { Component } from 'react';
import {storeProducts, detailProduct} from './ProductData';
import {Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address} from '../blockchain-data/hydrocontract_testnet';
import Web3 from 'web3';
import UIfx from 'uifx'
import cogoToast from 'cogo-toast';
import toastSound from '../Hydro_Ethereum_Explorer/toastSound.mp3.mp3'
import toasterrorSound from '../Hydro_Ethereum_Explorer/toasterrorSound.mp3'
import toastsuccessSound from '../Hydro_Ethereum_Explorer/toastsuccessSound.mp3'



const ProductContext = React.createContext();

let txhash='';
let txreceipt='';
let txconfirmed='';
let txerror='';

let numeral = require('numeral');

if(typeof ethereum !=='undefined'){
window.ethereum.autoRefreshOnNetworkChange = false;
}

const faucet_notification = new UIfx(
    toastSound,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )
  
const faucet_Error_notification = new UIfx(
    toasterrorSound,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )

  const faucet_success_notification = new UIfx(
    toastsuccessSound,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )


  
class ProductProvider extends Component {

constructor(props){
     super(props)
    this.state={
        products:[],
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalOpen2:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        ShippingFee:0,
        cartTotal:0,

        snowSolidity:'',
        network:'',
        networkmessage:false,
        message:'',
        account:'',
        loading:false,
        marketcap:[],
        blocks:'',
        pay:'',
        Client_Address:'',
        Full_Name:'',
        customer_email_Address:'',
        email: 'myhydrofrost@gmail.com',
        ethereum:true,
        paymentMethod:1,
        

        set_Client_Address:({value})=>this.setState({Client_Address:value},()=>console.log()),
        set_Full_Name:({value})=>this.setState({Full_Name:value},()=>console.log()),
        set_customer_email:({value})=>this.setState({customer_email_Address:value},()=>console.log()),
        setpaymentMethod:({value})=>this.setState({paymentMethod:value},()=>this.handlePaymentMethod(),()=>console.log()),
        
        
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.buyMerchandise = this.buyMerchandise.bind(this);

}
    componentDidMount(){
       
        this.setProducts();
        this.loadmarket();  
        
    }
    


     async loadmarket(){
        if(this.state.ethereum === true){
         fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
         .then(res => res.json())
         .then((data) => {
           
           this.setState({ marketcap: data.ethereum })
           this.setState({pay:this.state.cartTotal/this.state.marketcap.usd},()=>console.log())}
           
           
         )
         .catch(console.log)

        }

       else{
      
       fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
             .then(res => res.json())
             .then((data) => {
               
               this.setState({ marketcap: data.hydro })
               this.setState({pay:this.state.cartTotal/this.state.marketcap.usd},()=>console.log())}
               
               
             )
             .catch(console.log)
     }
   }


   async buyMerchandise(){

    if(this.state.customer_email_Address === '' ){
      this.toastrequired();
    }

    else if (this.state.Client_Address === '' ){
      this.toastrequired();
    }

    else if (this.state.Full_Name === '' ){
      this.toastrequired();
    } 

    else{

    let ethereum= window.ethereum;
    let web3=window.web3;
    

     
    if(typeof ethereum !=='undefined'){
            
    await ethereum.enable();
    web3 = new Web3(ethereum);
   

    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    
    const network = await web3.eth.net.getNetworkType();
    this.setState({network:network});
   

    if(this.state.network == "rinkeby"){
    this.setState({networkmessage:true})
    } 
    else{
    this.setState({networkmessage:false},()=>this.toastNetwork())  
    }
    
    window.ethereum.on('accountsChanged', ()=>this.changeaccount())  
   // window.ethereum.on('networkChanged', ()=>this.closeModal2(),()=>this.openModal2())
  }
    
    else if (typeof web3 !== 'undefined'  ){     
    window.web3 = new Web3(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]}); 
  
    window.ethereum.autoRefreshOnNetworkChange = false;
    window.ethereum.on('accountsChanged', ()=>this.changeaccount())  
    
  }
        
    else{
    this.toastMetamask()}
    
    //window.ethereum.on('networkChanged', function (netId) {
    //window.location.reload();})

    if(typeof web3 !== 'undefined' && this.state.networkmessage !== false){

    const base = '0x1cAc85F2aA2F4C646c2dD34e2c245BA9B4f46737'
    const snowSolidity =  new web3.eth.Contract(Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address);

    this.setState({snowSolidity:snowSolidity});

    this.setState({message:"Waiting For Your Confirmation..."});

    if(this.state.ethereum == true){
    await web3.eth.sendTransaction({ from: this.state.account, to:base, value:web3.utils.toWei(this.state.pay.toString()), gas: 400000})
    .on('receipt', function(receipt){
    }) 

    .on('transactionHash', (hash)=>{
    if(hash !== null){
    txhash = hash
    this.setState({message:<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash is {txhash}</a>},()=>this.toastinfo()
        )
      }
    })

    .on('confirmation',(confirmationNumber, receipt)=>{
      if(confirmationNumber !== null){
       txreceipt = receipt.blockNumber
       txconfirmed = confirmationNumber
       if (txconfirmed == 1){this.setState({message:<a className="white"  href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Has Been Confirmed On Block: {txreceipt}</a>},()=> this.handleSubmitMail() 
        )}
       }       
    })

    .on('error',(error)=>{
    if(error !== null){
    txerror = error
    this.setState({message:"Your Transaction Has Failed "},()=> this.toastError()
          )}
         
      })
    }

    else{
    await this.state.snowSolidity.methods.transfer(base, web3.utils.toWei(this.state.pay.toString())).send({ from: this.state.account,  gas: 400000})
    .on('receipt', function(receipt){
    }) 
    .on('transactionHash', (hash)=>{
    if(hash !== null){
    txhash = hash
    this.setState({message:<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash is {txhash}</a>},()=>this.handleSubmitMail()
        ) 
      }
    })

    .on('confirmation',(confirmationNumber, receipt)=>{
      if(confirmationNumber !== null){
       txreceipt = receipt.blockNumber
       txconfirmed = confirmationNumber
       if (this._isMounted && txconfirmed == 1){this.setState({message:<a className="white"  href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Has Been Confirmed On Block: {txreceipt}</a>},()=> this.toast2() 
        )}
       }       
    })

    .on('error',(error)=>{
    if(error !== null){
    txerror = error
     this.setState({message:"Your Transaction Has Failed "},()=>this.toastError()
          )
         } 
       })
     }
    }else{
      this.closeModal2()
    }

  }
  }

  async changeaccount(event){
    let ethereum= window.ethereum;
    let web3=window.web3;

            
    await ethereum.enable();
    web3 = new Web3(ethereum);
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
  }

  handleSubmit(event) {
    this.buyMerchandise();
    //this.loadMarketplace();
   
  }

  handleChange(event) {
    this.setState({Client_Address: event.target.value},()=>
    console.log())
    
  }

  handleChangeName(event) {
    this.setState({Full_Name: event.target.value},()=>
    console.log())
    
  }

  handleChangeMail(event) {
    this.setState({customer_email_Address: event.target.value},()=>
    console.log())
    
  }


  /*handlePaymentMethod= (event) => {
        
    this.setState({paymentMethod: event.target.value},()=>
    {
        if(this.state.paymentMethod == 1){
            this.setState({ethereum:true},()=>this.loadmarket(),()=>console.log("check",this.state.ethereum))}
        else {
          this.setState({ethereum:false},()=>this.loadmarket(),()=>console.log("check",this.state.ethereum))}
        })
} */

handlePaymentMethod= (event) => {
        
    
        if(this.state.paymentMethod == 1){
            this.setState({ethereum:true},()=>this.loadmarket(),()=>console.log())}
        else {
          this.setState({ethereum:false},()=>this.loadmarket(),()=>console.log())}
    
} 


    toastrequired = () =>{ const{hide}= cogoToast.warn(<p className="banana3">Name, Shipping Address &, E-mail are needed.</p>, { onClick:()=>{
    hide();},
    position: 'bottom-center', 
    heading: 'Input fields cannot be empty' ,
    hideAfter:2,
    });
  
    };

    toastMetamask= () =>{ const{hide}= cogoToast.warn(<a className="white" href="https://metamask.io/" target="blank" >No Web-3 Found, Please Install Metamask</a>, { onClick:()=>{
    hide();},
    position: 'bottom-center', 
    heading: 'Metamask Is Required' ,
    hideAfter:2,
    });
    faucet_Error_notification.play()
    };

    toastNetwork = () =>{ const{hide}= cogoToast.warn(<p className="banana3">Wrong Network Please Change To "RINKEBY" Network</p>, { onClick:()=>{
    hide();},
    position: 'bottom-center', 
    heading: 'Wrong Network' ,
    hideAfter:0,
    });
    faucet_Error_notification.play()
    };
    

    toastinfo = () =>{ const{hide}= cogoToast.warn(<a className="white" href={`https://rinkeby.etherscan.io/tx/${txhash}`} target="_blank" >Your Transaction Hash i here</a>, { onClick:()=>{
    hide();},
    position: 'bottom-left', 
    heading: 'Transaction Check Out' ,
    hideAfter:0,
    });
    faucet_notification.play()
    };

    toast2 = () =>{ const{hide}=cogoToast.warn(<a className="white" href={`https://rinkeby.etherscan.io/block/${txreceipt}`} target="_blank" >Your Payment has been Confirmed at Block: {txreceipt}</a>, { onClick:()=>{
      hide();},
    position: 'bottom-left', 
    heading: 'Payment Successful',
    hideAfter:0,
    });
    faucet_success_notification.play()
    };
  
    
    toastMailSuccess = () =>{ const{hide}= cogoToast.warn(<a className="white" >Please Check Your E-mail For More Details.</a>, { onClick:()=>{
    hide();},
    position: 'bottom-left', 
    heading: 'Transaction Successful' ,
    hideAfter:0,
    });
    faucet_success_notification.play()
    
    };
  
    toastError = () =>{ const{hide}= cogoToast.warn(<a className="white" >We Encountered an Error, Please Try Again.</a>, { onClick:()=>{
    hide();},
    position: 'bottom-left', 
    heading: 'Transacation Error' ,
    hideAfter:0,
    });
    faucet_Error_notification.play()
    };



    handleSubmitMail(event) {
    const templateId = 'template_sIzRwPbw';
    const EmailMessage = {
    "message": "Thank you for shopping on Winter Plaza,Your Order has been recieved and your payment of "+" "+"$"+this.state.cartTotal+" "  +"has been confirmed on block "+ " " +txreceipt+" "+"You can find the details of your transaction here https://rinkeby.etherscan.io/tx/"+txhash+".",
    "email": this.state.email, 
    "user":this.state.customer_email_Address
      
     }
    this.setState({loading:true})
    this.sendFeedback(templateId, EmailMessage)
    }
  
  
    sendFeedback (templateId,EmailMessage) {
    window.emailjs.send(
    'gmail', templateId,EmailMessage
        ).then(res => {this.setState({loading:false},()=>
          this.toastMailSuccess())
        })
        // Handle errors here , or use a React error boundary
        .catch(err => this.setState({loading:false},()=>this.toastError()))
       
      }


    setProducts = ()=>{
    let tempProducts = [];
    storeProducts.forEach(item=>{
    const singleItem = {...item};
    tempProducts = [...tempProducts,singleItem];
    })
    this.setState(()=>{
    return {products:tempProducts}
    })
    }

    getItem = id =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetails = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
        return {detailProduct:product}
        })
    };

    addToCart = id =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(()=>{
        return {product: tempProducts, 
               cart:[...this.state.cart,product]};
        },()=>{this.addTotal();
      });
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=>{
        return {modalProduct:product, modalOpen:true}
        })
    }

    closeModal = id => {
    this.setState(()=>{
    return {modalOpen:false}
    });

    }

    openModal2 = () =>{
        this.setState(()=>{
            return{modalOpen2:true}
        });
    }

    closeModal2 = () =>{this.setState(()=>{
            return{modalOpen2:false}
        });
    }


    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{return{cart:[...tempCart]}},()=>{this.addTotal()})
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id)
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id)
        }
        else{
            product.total = product.count * product.price;
            this.setState(()=>{return{cart:[...tempCart]}},()=>{this.addTotal()})
        }
    }

    removeItem = (id) =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !==id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return{
                cart:[...tempCart],
                products:[...tempProducts],
            }
        
        },()=>{
            this.addTotal();
        })
    }

    clearCart = () => {
       this.setState(()=>{
           return { cart:[] };
       },()=>{
           this.setProducts();
           this.addTotal();
       });
    }

    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const shipping = 4;
        const total = subTotal + shipping
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                ShippingFee:shipping,
                cartTotal:total,
            }
        },()=>this.loadmarket())
    }

    render() {
        return (
            <ProductContext.Provider 
            value = {{...this.state,
            handleDetails:this.handleDetails,
            addToCart:this.addToCart,
            openModal:this.openModal,
            closeModal:this.closeModal,
            openModal2:this.openModal2,
            closeModal2:this.closeModal2,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart,

            handleSubmit:this.handleSubmit,
            handleChange:this.handleChange,
            handleChangeName:this.handleChangeName,
            handleChangeMail:this.handleChangeMail,
            handlePaymentMethod:this.handlePaymentMethod,
            handleSubmitMail:this.handleSubmitMail,  
            buyMerchandise:this.buyMerchandise,
            loadmarket:this.loadmarket,
            changeaccount:this.changeaccount
            }}>
                
            {this.props.children}
            </ProductContext.Provider>
        ); 
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };