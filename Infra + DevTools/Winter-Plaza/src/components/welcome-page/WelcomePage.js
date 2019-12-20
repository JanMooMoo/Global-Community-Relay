import React,{Component} from 'react';
import Title from '../Title/Title';
import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import {status_rinkeby_ABI,status_rinkeby_Address} from '../blockchain-data/Status';
import ReactGA from 'react-ga';
import { RotateSpinner } from "react-spinners-kit";
import Center from 'react-center';
import {Link} from 'react-router-dom';
import {Statusfeed} from './Statusfeed_modal'
import './togglebutton.css';
import './backtotop.css';
import {Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  } from 'react-bootstrap';

import {logo} from '../../logo.svg';
import {Hydrosmall} from '../../Images/Hydrosmall.png';
import EthereumToEin from './EthereumToEin';
import EinToEthereum from './EinToEthereum';
import EinToEinSent from './EinToEinSent';
import EinToEinRecieved from './EinToEinRecieved';
import ResolversAdded from './ResolversAdded';
import Status from './Status';



let polltry = [];
let einTo = [];
let einFrom = [];
let numeral = require('numeral');


export default class WelcomePage extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
      this.loadBlockchain();
      this.loadmarket();
      this.loadStatus();
      this.initializeReactGA()
      //this.loadmarket();

     }
     
     
  async loadBlockchain() { 

  
  const{mainnet} = this.state

  if(this.state.mainnet == true){
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(main1484_ABI, main1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({number:this.state.value})}

  
  const get_ein = await snowSolidity.methods.deposits(this.state.value).call();
  if (this._isMounted){
  this.setState({EIN_balance:(get_ein)/1E18})
  this.setState({loading:false})
  }
}
else 
{
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({number:this.state.value})}
  
  const get_ein = await snowSolidity.methods.deposits(this.state.value).call();
  if (this._isMounted){
  this.setState({EIN_balance:(get_ein)/1E18})
  this.setState({loading:false})
  }
}


  /*const network = await web3.eth.net.getNetworkType();
  if (this._isMounted){
  this.setState({net:network});}
  if(this.state.net == "rinkeby" && this._isMounted){
    this.setState({networkmessage:true})
  
  }*/
  
}

async loadStatus(){

  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const statusContract =  new web3.eth.Contract(status_rinkeby_ABI, status_rinkeby_Address);
  if (this._isMounted){
  this.setState({statusContract});}

  const blockNumber = await web3.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber});}
  
  const get_status = await statusContract.methods.getStatus(this.state.value).call();
  if (this._isMounted){
  
  this.setState({current_status:(get_status)})
 
  statusContract.getPastEvents("StatusUpdated",{filter:{ein:970},fromBlock:0, toBlock:'latest'})
  .then(events=>{
        
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({status_feed:newsort});}
  //console.log("check",this.state.status_feed)

  if(this.state.status_feed.length > 0){
    this.setState({status_update:true})
   // console.log("checkupdate",this.state.status_feed.length)
   // console.log("checkupdate",this.state.status_update)
  }

  })
  
  .catch((err)=>console.error(err))
  
  statusContract.events.StatusUpdated({filter:{ein:this.state.value},fromBlock:'latest', toBlock:'latest'})
  .on('data',(log)=>{
  
  if (this._isMounted){
  this.setState({status_feed:[...this.state.status_feed,log]})}
  
  var newest = this.state.status_feed;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({status_feed:newsort});
  }
      
    });   
  } 
  
}

async loadmarket(){

  fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
        .then(res => res.json())
        .then((data) => {
          if (this._isMounted){
          this.setState({ marketcap: data.hydro })}
          
        })
        .catch(console.log)
}

 initializeReactGA() {
  ReactGA.initialize('UA-151322976-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;}

  constructor(props){
    super(props)
    var exampleItems = Array.from(Array(150).keys()).map(i => ({ id: (i+1), name: 'item ' + (i+1) }));
    this.state = {
        snowSolidity:[],
        summaryModalShow: false,
        loading:true,
        exampleItems: exampleItems,
        pageOfItems: [],
        eth_deposit:[],
        eth_withdraw:[],
        ein_transfer:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN_balance:'',
        value:1,
        marketcap:[],
        mainnet:true,
        current_status:'',
        status_update:false,
        status_feed:'',
        blocks:'',
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const val = event.target.value;
    if(event.target.validity.valid){
    
    this.setState({value: event.target.value},() => {
    console.log()});}

    else if(val === ''|| val === '-') this.setState({message:val},()=>{
    console.log()
    })
  }

  handleSubmit(event) {
    this.setState({loading:true})
    this.loadBlockchain();
    this.loadStatus();
    this.GA_Submit();
    event.preventDefault();
  }

  toggleChange = () => {
    this.setState({mainnet: !this.state.mainnet},() => { this.loadBlockchain()
    this.setState({loading:true})
    this.GA_ChangeNetwork();
    });

  }

  GA_Submit(){
    ReactGA.event({
    category: "Search Ein",
    action: "Search Ein"
    });
  }

  GA_ChangeNetwork(){
    ReactGA.event({
    category: "Frost Change Network",
    action: "Change Network"
    });
  }


  render(){

  const {loading} = this.state
  let summaryModalClose =() =>this.setState({summaryModalShow:false});
  
  return (
   <div>
    
      <Container>
      <a id="moon"></a>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
       
       <Title name={ !this.state.mainnet ? "Rinkeby":"Main"} title="Network"/>
       
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
       <Row><Col><h4>
        <Center><RotateSpinner
                size={60}
                color={!this.state.mainnet? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
                loading={loading}/>
        </Center>  
      </h4></Col></Row>

      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      <Row className={ !this.state.loading? 'row':'hidden'}><Col><h1> </h1></Col></Row>
      
      
     

       <Row>
       <Col md={8}></Col>
       <Col><label className="searchlabel">Search for EIN</label>
       </Col>
       </Row>
      
      <Row>
      <Col md={3} sm={10} lg={2} ><input type="checkbox" checked={this.state.mainnet} onChange={this.toggleChange}></input> </Col>    
      

      <Col md={5} sm={6} xs={6} lg={3}>
      <a href= "https://rinkeby.hydrostore.io/" className="accountlink" target="_blank">
      <button className="dappbutton" >
      <p className="faucet">Dapp Store</p>
      </button>
      </a>
      </Col>

      <Col md={4} sm={6} xs={6} lg={3}><button className="statusbutton" onClick={() => this.setState({summaryModalShow:true})}><p className="faucet">Status Feed</p></button>
      
      {this.state.summaryModalShow && <Statusfeed
      show={this.state.summaryModalShow}
      onHide={summaryModalClose}
      />}</Col>

      
      <Col md={3} sm={12} xs={12} lg={4}><form onSubmit={this.handleSubmit}>
      <input  type="tel" value={this.state.value} onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$" className="searchbar" /> 
      <input  type="submit" value="Submit" className="submit-button"/>
      </form>
      </Col>
      </Row>
      
          

      <Row>
    
         <Col className="account_box">
      
         
           <h5 className="banana3">
             EIN: {this.state.number} 
           </h5>
           <h5 className="banana3">
             Balance: {numeral(this.state.EIN_balance).format('0,0.00')} Hydro
           </h5>
           <h5 className="grass3">
            $ {numeral(this.state.EIN_balance * this.state.marketcap.usd).format('0,0.00000')}
           </h5>
           <h6 className="grass2">
           Status: {this.state.current_status}
           </h6>
           
 
         </Col>
       
         <Col md={4} lg={4}className="market"><img src={require('../../Images/Hydrosmall.png')} alt="snow" height={40} width={40} className="hydroimage"/>
         <h6 className="grass2">Hyrdo Marketcap</h6>
         <h6 className="grass3"> $ {numeral(this.state.marketcap.usd_market_cap).format('0,0.00')}</h6>
         <h6 className="grass2"> Hyrdo Price:</h6> 
         <h6 className="grass3">$ {numeral(this.state.marketcap.usd).format('0,0.0000000000')} </h6>
         </Col>
       </Row>
       
       

       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
  <Tabs defaultActiveKey="my_status" transition={false} id="noanim-tab-example" mountOnEnter unmountOnExit>

    
  
  <Tab eventKey="resolver_added" title="Resolvers Added" className="tab">
   <ResolversAdded
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>
  

  <Tab eventKey="ethereum_deposit" title="Ethereum Deposits to EIN" className="tab" >
   <EthereumToEin
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ethereum_withdraw" title="EIN withdraw to Ethereum" className="tab">
   <EinToEthereum
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ein_recieved" title="Recieved" className="tab">
   <EinToEinRecieved
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="ein_sent" title="Sent" className="tab">
   <EinToEinSent
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="my_status" title="My Status" className="tab">
   <Status
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  
  
</Tabs>
<Row><Col><h1> </h1></Col></Row>
<Row><Col><h1> </h1></Col></Row>
<Row><Col><h1> </h1></Col></Row>

<Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Morning, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c ,If you found unpleasant bugs or have a suggestion, You can contact us at MyHydroFrost@gmail.com. Thank you! & Happy BUIDLING! </h6></Center></Col></Row>
</Container>
<a href= "#moon" className="accountlink"> <button className="topButton">Top</button></a>

     
   </div>
  );
}
}