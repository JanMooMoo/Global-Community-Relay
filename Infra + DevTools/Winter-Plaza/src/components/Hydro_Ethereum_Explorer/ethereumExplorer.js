import React,{Component} from 'react';
import Title from '../Title/Title';
import ReactGA from 'react-ga';
import Center from 'react-center';
import {
    Nav,
    Container,
    Row,
    Col,
    Image,
} from 'react-bootstrap';

import Web3 from 'web3';
import {HydroToken_ABI, HydroToken_Address} from '../blockchain-data/hydrocontract';
import {Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address} from '../blockchain-data/hydrocontract_testnet';
import Moment from 'react-moment';
import JwPagination from 'jw-react-pagination';
import { RotateSpinner,ImpulseSpinner } from "react-spinners-kit";
import {HydroTestFaucet} from './HydroTestFaucet'
import  './FaucetModal.css';



//let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
//let web2 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));

let numeral = require('numeral');
let polltry = [];

export default class ethereumExplorer extends Component {

  _isMounted = false;
  abortController = new AbortController()
  

  componentDidMount(){
      this._isMounted = true;
      this.loadSnowflake();
      this.loadmarket();
      this.loadGA();
      //this.loadetherscan();

     }
     

  async loadSnowflake(){
  const{mainnet} = this.state

  if(mainnet == true){
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(HydroToken_ABI, HydroToken_Address);
  
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({hydroTransfer:[]});}

  const blockNumber = await web3.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber - 50000});
  this.setState({latestblocks:blockNumber});
  this.setState({hydroTransfer:[]});}

  snowSolidity.getPastEvents("Transfer",{fromBlock: this.state.blocks, toBlock:'latest'})
  .then(events=>{
 
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroTransfer:newsort});
  this.setState({loading:false});}
   
  }).catch((err)=>console.error(err))

  snowSolidity.events.Transfer({fromBlock: this.state.latestblocks, toBlock:'latest'})
  .on('data', (log) => {
    
    if (this._isMounted){
    this.setState({incoming:true});
    this.setState({loading:true});}

    if (this._isMounted && this.state.mainnet == true)setTimeout(()=>{
    this.setState({hydroTransfer:[...this.state.hydroTransfer,log]})   
    var newest = this.state.hydroTransfer;
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
    if (this._isMounted){
    this.setState({hydroTransfer:newsort});
    this.setState({loading:false});
    this.setState({incoming:false});}
    },1000) 
  })
}

else{

  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
  const snowSolidity =  new web3.eth.Contract(Hydro_Testnet_Token_ABI, Hydro_Testnet_Token_Address);
  
  if (this._isMounted){
  this.setState({snowSolidity});
  this.setState({hydroTransfer:[]});}

  const blockNumber = await web3.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber - 50000});
  this.setState({hydroTransfer:[]});}

  snowSolidity.getPastEvents("Transfer",{fromBlock: this.state.blocks, toBlock:'latest'})
  .then(events=>{
    
  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroTransfer:newsort});
  this.setState({loading:false});}
 
  }).catch((err)=>console.error(err))
  
  //snowSolidity.events.Transfer({fromBlock: 8823000, toBlock:'latest'})
  snowSolidity.events.Transfer({fromBlock: this.state.latestblocks, toBlock:'latest'})
  .on('data', (log) => {

  if (this._isMounted){
  this.setState({incoming:true});
  this.setState({loading:true});}
    //let { returnValues: { _from, _to, _amount }, blockNumber } = log
    //let values = {_from,_to,_amount,blockNumber}
  
  if (this._isMounted && this.state.mainnet !== true )setTimeout(()=>{
  this.setState({hydroTransfer:[...this.state.hydroTransfer,log]})
  var newest = this.state.hydroTransfer;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({hydroTransfer:newsort});
  this.setState({loading:false});
  this.setState({incoming:false});}
     },1000)
  })
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

 loadetherscan(){
  fetch ('https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=379224&toBlock=latest&address=0xebbdf302c940c6bfd49c6b165f457fdb324649bc&topic0=5472616e73666572a&apikey=ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE')
.then(res => res.json())
.then((check)=>{
  if(this._isMounted){
this.setState({checktx:check})

  }
})

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
        hydroTransfer:[],
        contract:'',
        contractaccount:'',
        number:'',
        EIN:'',
        mainnet:true,
        marketcap:[],
        summaryModalShow: false,
        checktx:[],
        x:[],
        blocks:'',
        latestblocks:'',
        incoming:false,
    }
        this.onChangePage = this.onChangePage.bind(this);
  }
  
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
    this.GA_ChangePage()
  }

  toggleChange = () => {
    this.setState({mainnet: !this.state.mainnet},() => { 
    this.loadSnowflake()
    this.setState({loading:true})
    this.GA_ChangeNetwork()
    });
  }

  loadGA() {
    ReactGA.initialize('UA-151322976-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  GA_ChangePage(){
    ReactGA.event({
    category: "Ethereum Explorer Ein Transactions Change Page",
    action: "Ethereum Explorer Change Page"
    });
  }

  GA_ChangeNetwork(){
    ReactGA.event({
    category: "Ethereum Change Network",
    action: "Change Network"
    });
  }

  GA_ModalFaucet(){
    ReactGA.event({
    category: "Open Modal Faucet",
    action: "Open Modal Faucet"
    });
  }

  render(){
  
  const{loading}=this.state
  const{incoming}=this.state
  let summaryModalClose =() =>this.setState({summaryModalShow:false});

  return (
   <div>
     <a id="moon"></a>
      <Container>
     
      <Row><Col><h1> </h1></Col></Row>
      <Row><Col><h1> </h1></Col></Row>
         
      
       <Title name="Ethereum" title={!this.state.mainnet?'Rinkeby Network':'Main Network'}/>
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       
        <Row><Col></Col>
        <Col>
        <Center>
        {!this.state.incoming&&<RotateSpinner
        size={60}
        color={!this.state.mainnet? "rgb(226, 188, 62)":"rgb(241, 241, 241)"}
        loading={loading}/>}
        </Center>  
        </Col><Col></Col>
        </Row>

        <Row><Col></Col>
        <Col>
        <Center>
        {this.state.incoming&&<ImpulseSpinner
      
        frontColor= {!this.state.mainnet? "rgb(226, 188, 62)":"#00ff89"}
        size={60}
        loading={loading}/>}
        </Center>  
        </Col><Col></Col>
        </Row>

      <Row>
        <Col md={10}><input type="checkbox" checked={this.state.mainnet} onChange={this.toggleChange}></input></Col>
        <Col md={2} sm={12} xs={12} lg={2}>
        <button className="faucetbutton" onClick={() => this.setState({summaryModalShow:true},()=>this.GA_ModalFaucet())}><h6 className="faucet">Faucet</h6></button> 
          {this.state.summaryModalShow && <HydroTestFaucet
          show={this.state.summaryModalShow}
          onHide={summaryModalClose}
        />}
        </Col>
      </Row>
       
      <Row><Col><h1> </h1></Col></Row>

      <Row className ="row_underline2">
      <Col className= "col_border2" md={2}><h3>Amount</h3></Col>
      <Col className= "col_border2" md={2}><h3>Block</h3></Col>
      <Col className= "col_border2" md={4}><h3>To</h3></Col>
      <Col className="col_border2" md={4}><h3>From</h3></Col>
      
      
        </Row>
        {this.state.pageOfItems.map((transfer,index)=>(
        <Row className ="row_underline" key={index}>
        <Col className= "col_border2" md={2}>
        <h5 className="banana">{numeral(transfer.returnValues._amount/1E18).format('0,0.00')} </h5><Row><Col className="dollarvalue">Hydro ~ ${numeral(transfer.returnValues._amount/1E18 * this.state.marketcap.usd).format('0,0.00')}</Col></Row>
        </Col>

        <Col className= "col_border2" md={2}>
        <h6 className="time">
        {numeral(transfer.blockNumber).format('0,0')}</h6>Mined
       
        </Col>

        <Col className= "col_border2" md={4}>   
        <div>
        <h6 className="ethereumaccount">{transfer.returnValues._to}
        </h6>To Ethereum Account
        </div>
        </Col>

        <Col className="col_border2" md={4}>
        <h6 className="ethereumaccount">{transfer.returnValues._from}</h6>From Ethereum Account
        </Col>
         
        </Row>))}
       
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><Center><JwPagination items={this.state.hydroTransfer} onChangePage={this.onChangePage} maxPages={10} pageSize={5}/></Center></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col><h1> </h1></Col></Row>
       <Row><Col className="market"><Center><h6 className="banana">If you find this Application Helpful and Wish to Support our Coffee in the Morning, You can do so by Tipping us on this Address 0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c ,If you found unpleasant bugs or have a suggestion, You can contact us at MyHydroFrost@gmail.com. Thank you! & Happy BUIDLING! </h6></Center></Col></Row>

     </Container>
     <a href= "/Ethereum#moon" className="accountlink"> <button className="topButton">Top</button></a>
   </div>
  );
}
}