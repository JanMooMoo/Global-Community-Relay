import React,{Component} from 'react';
import Title from '../Title/Title';
import ReactGA from 'react-ga';
import Center from 'react-center';
import {Link} from 'react-router-dom';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Web3 from 'web3';
import {rinkeby1484_ABI, rinkeby1484_Address} from '../blockchain-data/config';
import Moment from 'react-moment';
import {main1484_ABI, main1484_Address} from '../blockchain-data/Snowflake_Main';
import { RotateSpinner } from "react-spinners-kit";
import JwPagination from 'jw-react-pagination';


let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');
let polltry = [];

export default class SnowflakeWithdraw extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
    this._isMounted = true;
    if (this._isMounted){ this.setState({check_network:this.props.mainnet},()=>this.loadSnowflake());}
    this.loadGA();
      
  }
     


 async loadSnowflake(){
    
  if (this._isMounted){
  this.setState({check_network:this.props.mainnet})}

  if(this.state.check_network == true){
  const snowSolidity =   new web3.eth.Contract(main1484_ABI, main1484_Address);
  if (this._isMounted){
  this.setState({snowSolidity});}

  const blockNumber = await web3.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber - 1000000});
  this.setState({latestblock:blockNumber});}

  if (this._isMounted){
  this.setState({hydroWithdraw:[]});}

  snowSolidity.getPastEvents("SnowflakeWithdraw",{fromBlock: this.state.blocks, toBlock:'latest'})
  .then(events=>{
  
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroWithdraw:newsort});
  this.setState({loading:false});}
  })
  .catch((err)=>console.error(err))

  snowSolidity.events.SnowflakeWithdraw({fromBlock:this.state.latestblock, toBlock:'latest'})
  .on('data', (log) => {
  
  if (this._isMounted){
  this.setState({hydroWithdraw:[...this.state.hydroWithdraw,log]})}

  var newest = this.state.hydroWithdraw;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroWithdraw:newsort});
  this.setState({loading:false});}
  })
} 

else{

  const snowSolidity =  new web2.eth.Contract(rinkeby1484_ABI, rinkeby1484_Address);

  if (this._isMounted){
  this.setState({snowSolidity});}

  const blockNumber = await web2.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber - 800000});
  this.setState({latestblock:blockNumber});}
    
  if (this._isMounted){
  this.setState({hydroWithdraw:[]});}

  snowSolidity.getPastEvents("SnowflakeWithdraw",{fromBlock: this.state.blocks, toBlock:'latest'})
  .then(events=>{
  
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroWithdraw:newsort});
  this.setState({loading:false});}
  })
  .catch((err)=>console.error(err))

  snowSolidity.events.SnowflakeWithdraw({fromBlock:this.state.latestblock, toBlock:'latest'})
  .on('data', (log) => {
   
  //let { returnValues: { einFrom, to, amount }, blockNumber } = log
  //let values = {einFrom,to, amount,blockNumber}
   
  if (this._isMounted){
  this.setState({hydroWithdraw:[...this.state.hydroWithdraw,log]})}

  var newest = this.state.hydroWithdraw;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroWithdraw:newsort});
  this.setState({loading:false});}
    })
  }
}

  componentWillReceiveProps(nextProps){
    if (this._isMounted){
      this.setState({check_network:nextProps.mainnet});
     }
  }

  componentDidUpdate(prevProps){

    if(this.props.mainnet !== prevProps.mainnet){
      this.setState({mainnet:this.props.mainnet})
      this.setState({loading:true})
      this.loadSnowflake()
    }
  }


  componentWillUnmount(){
    this.abortController.abort()
    this._isMounted = false;}


  constructor(props){
    super(props)
    
    this.state = {
        snowSolidity:[],
        account:'',
        balance:'',
        details:'',
        loading:true,
        pageOfItems: [],
        search:'',
        hydroWithdraw:[],
        contract:'',
        contractaccount:'',
        number:'',
        blocks:'',
        latestblock:'',
        EIN:'',
        check_network:'',
        
        
    }
        this.onChangePage = this.onChangePage.bind(this);
  }
  
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
    this.GA_ChangePage()
  }

  loadGA() {
    ReactGA.initialize('UA-151322976-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  GA_ChangePage(){
    ReactGA.event({
    category: "Snowflake Explorer Ein Withdraw Change Page",
    action: "Ein Withdraw Change Page"
    });
  }

  render(){
    
  const {loading}=this.state
  
  return (
   <div>
      <Container>

        <Row className ="row_underline_header">
        <Col><Title name="EIN" title="Withdraw"/>
        <Center>
        <RotateSpinner
        size={60}
        color={!this.state.check_network? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
        loading={loading}/>
        </Center>  
        </Col>
        </Row>
      
        <Row className ="row_underline2">
        <Col className= "col_border" md={2}><h3>Amount</h3></Col>
        <Col className= "col_border" md={2}><h3>Block</h3></Col>
        <Col className= "col_border" md={6}><h3>To</h3></Col>
        <Col className="col_no_border" md={2}><h3>From</h3></Col>
    
        </Row>
        {this.state.pageOfItems.map((transfer,index)=>(
        <Row className ="row_underline" key={index}>
        <Col className= "col_border" md={2}>
        <h5 className="banana">{numeral(transfer.returnValues.amount/1E18).format('0,0.00')} </h5>Hydro ~ $ {numeral(transfer.returnValues.amount/1E18 * this.props.marketUsd).format('0,0.00')}
        </Col>

        <Col className= "col_border" md={2}>
        <h6 className="time">
        {numeral(transfer.blockNumber).format('0,0')}</h6>Mined
        </Col>

        <Col className= "col_border" md={6}>  
        <h6 className="ethereumaccount">{transfer.returnValues.to}
        </h6>To Ethereum Account
        </Col>

        <Col className="col_no_border" md={2}>
        <h5 className="banana">ID 
        <Link to={{pathname:'/Accounts/'+transfer.returnValues.einFrom}} className="accountlink">
        : {transfer.returnValues.einFrom}
        </Link>
        </h5>From Snowflake Account
        </Col>
         
        </Row>))}
       
       <Row  className ="row_underline_footer"><Col><Center><JwPagination items={this.state.hydroWithdraw} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
      
     </Container>
       
   </div>
  );
}
}