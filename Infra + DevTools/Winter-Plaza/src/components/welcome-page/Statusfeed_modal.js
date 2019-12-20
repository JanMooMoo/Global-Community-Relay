import React,{Component} from 'react';
import {Modal, Row, Col,Container} from 'react-bootstrap';
import Center from 'react-center';
import {status_rinkeby_ABI,status_rinkeby_Address} from '../blockchain-data/Status';
import Web3 from 'web3';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { ImpulseSpinner } from "react-spinners-kit";

let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
export class Statusfeed extends Component{

     _isMounted = false;
    abortController = new AbortController()
    

    componentDidMount(){
        this._isMounted = true;
        this.loadStatusData();
        //this.toastinfo();
        //this.loadBlockchainData();
       
       }
       
async loadStatusData() { 

  const statusContract =  new web3.eth.Contract(status_rinkeby_ABI, status_rinkeby_Address);
  if (this._isMounted){
  this.setState({statusContract});}

  const blockNumber = await web3.eth.getBlockNumber();
  if (this._isMounted){
  this.setState({blocks:blockNumber});}
  
  
  /*statusContract.getPastEvents("StatusUpdated",{filter:{ein:this.state.value},fromBlock:0, toBlock:'latest'})
  .then(events=>{

  var newest = events;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({all_status_feed:newsort});
  this.setState({loading:false});}
  console.log("check",this.state.all_status_feed)
  })
  .catch((err)=>console.error(err))*/
  
   statusContract.events.StatusUpdated({fromBlock:'0', toBlock:'latest'})
  .on('data',async(log)=>{

  
  let { returnValues: { ein,status,}, blockNumber } = log
  web3.eth.getBlock(blockNumber, (error, block) => {
  blockNumber = block.timestamp;
  let values = {ein,status,blockNumber}
  
  if (this._isMounted){
  
  this.setState({all_status_feed:[...this.state.all_status_feed,values]})}
  
  var newest = this.state.all_status_feed;
  var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
  if (this._isMounted){
  this.setState({all_status_feed:newsort})}    
 });
 
}) 
if (this._isMounted){
setTimeout(()=>this.setState({sorted:this.state.all_status_feed},()=> this.setState({loading:false})),4000)
}
}

   

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;
}

constructor(props){
    super(props)
    this.state = {
        blocks:'',
        value: '',
        summaryModalShow: false,
        redirect:false,   
        hide:this.props.onHide,
        HydroRequest: '', 
        email: 'myhydrofrost@gmail.com',
        loading:true,
        all_status_feed:[],
        sorted:[],
    }

  }

  

    render(){
      //template_sIzRwPbw
        const{loading} = this.state
        /*const redirect = this.state.redirect;
        if(redirect === true){console.log('redirecting')
          return <Redirect to="/categories" />
          
        }*/

    return( 
      
      <Modal
        {...this.props}
        size="lg"
        height="200px"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        
      <Modal.Header className="modalpie" closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <Center><div className="banana3">Recent Status Feed</div></Center>
      </Modal.Title>
      </Modal.Header> 
 
      <Modal.Body> 

      <Row className ="statusfeed_underline">
      <Col md={12} className="gethydro"><img src={require('../../Images/statuslogo.png')} alt="snow" height={120} width={110} className="navbar-brand"/><h6></h6>
      <h6 className="grass2">Most Recent Status Update</h6>
      <Center><ImpulseSpinner
      frontColor= "#00ff89"
      size={60}
      loading={loading}/></Center></Col>
      </Row>

      {this.state.sorted.map((status_update,index)=>(
      <Row className ="statusfeed_underline" key={index}>
      <Col md={5}><p className="statusblock">
      <Link to={{pathname:'/Accounts/'+status_update.ein}} className="accountlink">EIN: {status_update.ein}</Link> Updated Their Status To:</p>
      <h4 className="banana3"> {status_update.status}</h4></Col>
      <Col md={5}></Col><Col md={2}><p className="statustime"><Moment unix fromNow>{status_update.blockNumber}</Moment></p></Col></Row>))}
      
      <Row className="statusfeed_button"><Col md={4}></Col><Col md={4}><input type ="submit" value="Close" className="modalsubmit" onClick={this.props.onHide}/></Col><Col md={4}></Col></Row>
      
      </Modal.Body>
            
      

      </Modal>
      )
    }

}