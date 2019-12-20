import React,{Component} from 'react';
import Title from '../Title/Title';
import Center from 'react-center';
import {
    Container,
    Row,
    Col,

} from 'react-bootstrap';

import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import Moment from 'react-moment';
import JwPagination from 'jw-react-pagination';
import { ImpulseSpinner } from "react-spinners-kit";
import {Link} from 'react-router-dom';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');

export default class EinToEinRecieved extends Component {

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

    }
  }

  async loadSnowflake(){

  if (this._isMounted){  
  this.setState({check_network:this.props.mainnet})
  this.setState({loading:true})}
  
  if(this.state.check_network == true){
  const snowSolidity =  new web3.eth.Contract(main1484_ABI, main1484_Address);

  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({ein_transfer_in:[]});}

  snowSolidity.getPastEvents("SnowflakeTransfer",{filter:{einTo:this.props.number},fromBlock:0, toBlock:'latest'})
  .then(events=>{
    
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({ein_transfer_in:newsort});
  this.setState({loading:false});}

  if( this.state.ein_transfer_in !== 'undefined' && this.state.ein_transfer_in.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 
 
  })
  .catch((err)=>console.error(err))


  snowSolidity.events.SnowflakeTransfer({filter:{einTo:this.props.number},fromBlock:'latest', toBlock:'latest'})
  .on('data',(log)=>{
  
  //let { returnValues: { einFrom, einTo, amount }, blockNumber } = log
  //let values = {einFrom,einTo,amount,blockNumber}
  //web3.eth.getBlock(blockNumber, (error, block) => {
  // blockNumber = block.timestamp;

  if (this._isMounted){
  this.setState({ein_transfer_in:[...this.state.ein_transfer_in,log]})}   
  
  var newest = this.state.ein_transfer_in;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({ein_transfer_in:newsort});
  this.setState({loading:false});}

  if( this.state.ein_transfer_out !== 'undefined' && this.state.ein_transfer_out.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 
    
   });   
   
 }

else{

  //PAST DATA
  const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({ein_transfer_in:[]});}

  snowSolidity.getPastEvents("SnowflakeTransfer",{filter:{einTo:this.props.number},fromBlock:0, toBlock:'latest'})
  .then(events=>{
    
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({ein_transfer_in:newsort});
  this.setState({loading:false});}

  if( this.state.ein_transfer_in !== 'undefined' && this.state.ein_transfer_in.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 

  })
  .catch((err)=>console.error(err))

  //WEBSOCKET
  snowSolidity.events.SnowflakeTransfer({filter:{einTo:this.props.number},fromBlock:'latest', toBlock:'latest'})
  .on('data',(log)=>{
     
  //let { returnValues: { einFrom, einTo, amount }, blockNumber } = log
  //web3.eth.getBlock(blockNumber, (error, block) => {
  //blockNumber = block.timestamp;
  //let values = {einFrom,einTo,amount,blockNumber}
  
  if (this._isMounted){
  this.setState({ein_transfer_in:[...this.state.ein_transfer_in,log]})}   
  
  var newest = this.state.ein_transfer_in;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({ein_transfer_in:newsort});
  this.setState({loading:false});}

  if(this.state.ein_transfer_in !== 'undefined' && this.state.ein_transfer_in.length > 0){
  this.setState({check_tx:true},()=>(console.log()))}  
  else{
  this.setState({check_tx:false},()=>(console.log()))} 
    
   });   
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
        pageOfItems: [],
        search:'',
        ein_transfer_in:[],
        contract:'',
        contractaccount:'',
        number:'',
        mainnet:'',
        EIN:'',
        check_tx:false,
        
    }
    this.onChangePage = this.onChangePage.bind(this);
}

onChangePage(pageOfItems) {
  // update local state with new page of items
  this.setState({ pageOfItems });
}

reload(){
  window.location.reload()
}

/*<Col className= "col_border" md={2}>   
<h6 className="time"><Moment unix format="LLLL">{recieved.blockNumber}</Moment></h6>
</Col>*/

  render(){

    const {loading}=this.state

  return (
   <div>
      <Container>
      <Row className ="row_underline_header">
      <Col><Title name="Recieved" title="From EIN"/>
      <Center>
      <ImpulseSpinner
      size={50}
      frontColor= {!this.props.mainnet? "rgb(226, 188, 62)":"#00ff89"}
      loading={loading}/>
      </Center>  
      </Col></Row>
      
      <Row className ="row_underline2">
      <Col className= "col_border" md={2}><h3>Amount</h3></Col>
      <Col className= "col_border" md={2}><h3>Block</h3></Col>
      <Col className= "col_border" md={6}><h3>Recieved By</h3></Col>
      <Col className="col_no_border" md={2}><h3>From</h3></Col>
      </Row>

      {this.state.pageOfItems.map((recieved,index)=>(
      <Row className ="row_underline" key={index}>

      <Col className= "col_border" md={2}>   
      <h5 className="banana"> {numeral(recieved.returnValues.amount/1E18).format('0,0.00')}</h5>Hydro ~ $ {numeral(recieved.returnValues.amount/1E18 * this.props.marketUsd).format('0,0.00')}
      </Col>

      <Col className= "col_border" md={2}>   
      <h6 className="time">{numeral(recieved.blockNumber).format('0,0')}</h6>Mined
      </Col>

      <Col className= "col_border" md={6}>   
      <div>
      <h5 className="banana">ID
      <Link to={{pathname:'/Accounts/'+recieved.returnValues.einTo,}} className="accountlink">
      : {recieved.returnValues.einTo}
      </Link>
      </h5>To EIN Account
      </div>
      </Col>

      <Col className="col_no_border"  md={2}>
        
      <h5 className="banana">ID
      <Link to={{pathname:'/Accounts/'+recieved.returnValues.einFrom,}} className="accountlink">
      : {recieved.returnValues.einFrom}
      </Link>
      </h5>From EIN Account
      </Col>
         
     </Row>))}

     {!this.state.check_tx && !this.state.loading && <Row className ="row_underline">
     <Col className="banana">
     <Center>
     <h3>No Transaction History</h3>
     </Center>
     </Col>
     </Row>}

     <Row className ="row_underline_footer"><Col><Center><JwPagination items={this.state.ein_transfer_in} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
   
     </Container>
       
   </div>
  );
}
}