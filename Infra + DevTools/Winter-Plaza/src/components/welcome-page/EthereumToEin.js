import React,{Component} from 'react';
import Title from '../Title/Title';
import Center from 'react-center';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';
 
import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import { ImpulseSpinner } from "react-spinners-kit";
import JwPagination from 'jw-react-pagination';



let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');


export default class EthereumToEin extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentWillMount(){
      this._isMounted = true;
      if (this._isMounted){ this.setState({check_network: this.props.mainnet},()=>this.loadSnowflake());}



     }
     
     
async loadBlockchain() { 
        
let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

const network = await web3.eth.net.getNetworkType();
if (this._isMounted){
this.setState({net:network});}

if(this.state.net == "rinkeby" && this._isMounted){
this.setState({networkmessage:true})
console.log("net",this.state.net)
  }
 
}



async loadSnowflake(){

  this.setState({check_network:this.props.mainnet})
  this.setState({loading:true})

  if(this.state.check_network == true){
  const snowSolidity =  new web3.eth.Contract(main1484_ABI, main1484_Address);

  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({eth_deposit:[]});}

  snowSolidity.getPastEvents("SnowflakeDeposit",{filter:{einTo:this.props.number},fromBlock:7728191, toBlock:'latest'})
  .then(events=>{
      
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({eth_deposit:newsort});
  this.setState({loading:false});}

  if( this.state.eth_deposit !== 'undefined' && this.state.eth_deposit.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 

  })
  .catch((err)=>console.error(err))
    
  //WEBSOCKET
  await snowSolidity.events.SnowflakeDeposit({filter:{einTo:this.props.number},fromBlock:'latest', toBlock:'latest'})
  .on('data',async (log)=>{  
      
  //let { returnValues: { from, einTo, amount }, blockNumber } = log  
  //web3.eth.getBlock(blockNumber, (error, block) => {
  // blockNumber = block.timestamp
  //let values = {from,einTo,amount,blockNumber}
        
  if (this._isMounted){
  this.setState({eth_deposit:[...this.state.eth_deposit,log]})}
         
  var newest = this.state.eth_deposit;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({eth_deposit:newsort});
  this.setState({loading:false});}

  if( this.state.eth_deposit !== 'undefined' && this.state.eth_deposit.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 

  });
//})
}

else{

  const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);

  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({eth_deposit:[]});}

  snowSolidity.getPastEvents("SnowflakeDeposit",{filter:{einTo:this.props.number},fromBlock:0, toBlock:'latest'})
  .then(events=>{
      
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({eth_deposit:newsort});
  this.setState({loading:false});}

  if( this.state.eth_deposit !== 'undefined' && this.state.eth_deposit.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 

  })
  .catch((err)=>console.error(err))

  await snowSolidity.events.SnowflakeDeposit({filter:{einTo:this.props.number},fromBlock:'latest', toBlock:'latest'})
  .on('data',async (log)=>{  
  
  //let { returnValues: { from, einTo, amount }, blockNumber } = log
  //web2.eth.getBlock(blockNumber, (error, block) => {
  //blockNumber = block.timestamp
  //let values = {from,einTo,amount,blockNumber}
    
  if (this._isMounted){
  this.setState({eth_deposit:[...this.state.eth_deposit,log]});}
   
  var newest = this.state.eth_deposit;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({eth_deposit:newsort});
  this.setState({loading:false});} 

  if( this.state.eth_deposit !== 'undefined' && this.state.eth_deposit.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 

   });
 // });
  }
}

componentWillReceiveProps(nextProps){
  if (this._isMounted){
    this.setState({check_network:nextProps.mainnet});
   }
}
  
componentDidUpdate(prevProps){

  if(this.props.number !== prevProps.number){
    this.setState({number:this.props.number})
    this.loadSnowflake()
  }
   if(this.props.mainnet !== prevProps.mainnet){
      this.setState({mainnet:this.props.mainnet})
      this.loadSnowflake()
    } 
}

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;}
  
      
  constructor(props){
    super(props)
    var exampleItems = Array.from(Array(150).keys()).map(i => ({ id: (i+1), name: 'item ' + (i+1) }));
    this.state = {
        snowSolidity:[],
        account:'',
        balance:'',
        details:'',
        loading:true,
        exampleItems: exampleItems,
        search:'',
        eth_deposit:[],
        contract:'',
        contractaccount:'',
        number1:'',
        EIN:'',
        pageOfItems:[],
        get:'',
        check_network:'',
        pass:'',
        blocks:'',
        check_tx:false,
        
    }
        this.onChangePage = this.onChangePage.bind(this);
        
  }
  
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  reload(){
    window.location.reload()
  }

  render(){

    const {loading}=this.state

  return (
   <div>
     
      <Container>
        
      <Row className ="row_underline_header"><Col>
      <Title name="Hydro Ethereum" title="Deposits To EIN"/>
      <Center>
      <ImpulseSpinner
      size={50}
      frontColor= {!this.props.mainnet? "rgb(226, 188, 62)":"#00ff89"}
      loading={loading}/>
      </Center>  
      </Col></Row>
      
      <Row className ="row_underline2">
      <Col className= "col_border" md={2}><h3 >Amount</h3></Col>
      <Col className= "col_border" md={2}><h3 >Block</h3></Col>
      <Col className= "col_border" md={6}><h3>From</h3></Col>
      <Col className="col_no_border" md={2}><h3>To</h3></Col>
      </Row>

      {this.state.pageOfItems.map((deposit,index)=>( 
      <Row className="row_underline" key={index}>
         
      <Col className= "col_border"  md={2}>
      <h5 className="banana">{numeral(deposit.returnValues.amount/1E18).format('0,0.00')}</h5>Hydro ~ $ {numeral(deposit.returnValues.amount/1E18 * this.props.marketUsd).format('0,0.00')}
      </Col>
           
      <Col className= "col_border" md={2}>   
      <h6 className="time">{numeral(deposit.blockNumber).format('0,0')}</h6>Mined
      </Col>

      <Col className="col_border" md={6}>   
      <div>
      <h6 className="ethereumaccount">{deposit.returnValues.from} 
      </h6>From Ethereum Account
      </div>
      </Col>

      <Col className="col_no_border" md={2}>
      <h5 className="banana">ID
      <Link to={{pathname:'/Accounts/'+deposit.returnValues.einTo,}} className="accountlink">
      : {deposit.returnValues.einTo}
      </Link>
      </h5>To EIN Account
      </Col>
         
      </Row>))}

      {!this.state.check_tx && !this.state.loading && <Row className ="row_underline">
      <Col className="banana">
      <Center>
      <h3>No Transaction History</h3>
      </Center>
      </Col>
      </Row>}
      
      <Row className ="row_underline_footer"><Col><Center><JwPagination items={this.state.eth_deposit} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       
      </Container>
       <div></div>
   </div>
  );
}
}