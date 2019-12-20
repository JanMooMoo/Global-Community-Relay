import React,{Component} from 'react';
import Title from '../Title/Title';
import Web3 from 'web3';
import ReactGA from 'react-ga';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';

import {HydroToken_Address, HydroToken_ABI} from '../blockchain-data/hydrocontract';
import {Hydro_Testnet_Token_Address, Hydro_Testnet_Token_ABI} from '../blockchain-data/hydrocontract_testnet';

import { RotateSpinner } from "react-spinners-kit";
import Center from 'react-center';
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
import EinExplorer from './EinExplorer';
import SnowflakeDeposit from './SnowflakeDeposit';
import SnowflakeWithdraw from './SnowflakeWithdraw';



let polltry = [];
let einTo = [];
let einFrom = [];
let numeral = require('numeral');


export default class SnowflakeExplorerPage extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
      this.loadBlockchain();
      this.loadmarket();
      this.loadPreviousPrice();
      this.loadGA();
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


  const SnowflakewalletAddress = '0x32c927D1d1dF373c3FAe1dc32338570e85F1d4e5';

  
  // Get ERC20 Token contract instance
  let MainHydroContract = new web3.eth.Contract(HydroToken_ABI,HydroToken_Address);
  const getbalance = await MainHydroContract.methods.balanceOf(SnowflakewalletAddress).call();
  if (this._isMounted){
  this.setState({snowflakecontractbalance:(getbalance)/1E18})
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

  const SnowflakewalletAddress = '0xB0D5a36733886a4c5597849a05B315626aF5222E';

  
  // Get ERC20 Token contract instance
  let RinkebyHydroContract = new web3.eth.Contract(Hydro_Testnet_Token_ABI,Hydro_Testnet_Token_Address);
  const getbalance = await RinkebyHydroContract.methods.balanceOf(SnowflakewalletAddress).call();
  if (this._isMounted){
  this.setState({snowflakecontractbalance:(getbalance)/1E18})
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

async loadmarket(){

  fetch('https://api.coingecko.com/api/v3/simple/price?ids=Hydro&vs_currencies=usd&include_market_cap=true&include_24hr_change=ture&include_last_updated_at=ture')
        .then(res => res.json())
        .then((data) => {
          if (this._isMounted){
          this.setState({ marketcap: data.hydro })}
          
        })
        .catch(console.log)
}


async loadPreviousPrice(){

  fetch('https://api.coingecko.com/api/v3/coins/ethereum/contract/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07/market_chart/?vs_currency=USD&days=7')
        .then(res => res.json())
        .then((data) => {
         // console.log(data)
          if (this._isMounted){
          this.setState({ previousPrice: data.hydro })}
          
        })
        .catch(console.log)
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
        previousPrice:[],
        snowflakecontractbalance:'',
          
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadGA() {
    ReactGA.initialize('UA-151322976-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleChange(event) {
    
    this.setState({value: event.target.value},() => {
      console.log()});
  }

  handleSubmit(event) {
    this.setState({loading:true})
    this.loadBlockchain();
    event.preventDefault();
  }

  toggleChange = () => {
    this.setState({mainnet: !this.state.mainnet},() => { this.loadBlockchain()
    this.setState({loading:true})
    this.GA_ChangeNetwork();
    });

  }
  
  GA_ChangeNetwork(){
    ReactGA.event({
    category: "Snowflake Explorer Change Network",
    action: "Change Network"
    });
  }
  render(){

  const {loading} = this.state

  return (
   <div>
      <Container>
      <a id="moon"></a>
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
         
        
     
       <Title name={ !this.state.mainnet ? "Snowflake Rinkeby":"Snowflake Main"} title="Network"/>
       
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
      
      <Row>
      <Col md={10}><input type="checkbox" checked={this.state.mainnet} onChange={this.toggleChange}></input></Col>
      <Col md={2} sm={12} xs={12} lg={2}>
      <a href= "https://rinkeby.hydrostore.io/" className="accountlink" target="_blank">
      <button className="dappbutton" >
      <p className="faucet">Dapp Store</p>
      </button>
      </a>
      </Col>
      <Col md={4}></Col>
      
      </Row>
      

      <Row>
      <Col md={3}className="totalSnowflake_box">
      <img src={require('../../Images/ein2.png')} alt="snow" height={50} width={50} className="hydroimage"/>
        <h6 className="grass2">Snowflake Contract</h6>
        <h6 className ="grass3">Hydro: {numeral(this.state.snowflakecontractbalance).format('0,0')}</h6>
        <h6 className ="grass3">Or $ {numeral(this.state.snowflakecontractbalance * this.state.marketcap.usd ).format('0,0.00')}</h6>
       

</Col>
    
        <Col md={5} className="welcome_box">
        <Center> 
        <h5 className="banana3">
        Welcome to Hydro Frost
        </h5></Center>
        <Center>
        <h6 className="banana3">
        Explorer exclusively made for Snowflake 
        </h6></Center>
           
        </Col>
       
        <Col md={3} className="market"><img src={require('../../Images/Hydrosmall.png')} alt="snow" height={40} width={40} className="hydroimage"/>
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
       
  <Tabs defaultActiveKey="Ein_transactions" transition={false} id="Ein Explorer" mountOnEnter unmountOnExit >
  
  <Tab eventKey="Ein_transactions" title="EIN Transactions"  className="tab" >
   <EinExplorer
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="Ein_Deposits"  title="Snowflake Deposit" className="tab" >
  <SnowflakeDeposit
   number={this.state.number}
   mainnet={this.state.mainnet}
   marketUsd={this.state.marketcap.usd}/>
  </Tab>

  <Tab eventKey="Ein_Withdraw" title="Snowflake Withdraw" className="tab" >
   <SnowflakeWithdraw
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
<a href= "/Snowflake#moon" className="accountlink"> <button className="topButton">Top</button></a>

       
   </div>
  );
}
}