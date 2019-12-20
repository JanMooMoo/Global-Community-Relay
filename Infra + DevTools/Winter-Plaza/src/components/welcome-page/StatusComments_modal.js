import React,{Component} from 'react';
import {Modal, Row, Col,Container} from 'react-bootstrap';
import Center from 'react-center';
import {status_rinkeby_ABI,status_rinkeby_Address} from '../blockchain-data/Status';
import Web3 from 'web3';
import ThreeBoxComments from '3box-comments-react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import './3boxcomments.css';


import { ImpulseSpinner } from "react-spinners-kit";

let web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
export class StatusComments extends Component{

     _isMounted = false;
    abortController = new AbortController()
    

    componentDidMount(){
        this._isMounted = true;
        this.load3box();
        //this.LogIn();
        //this.toastinfo();
        //this.loadBlockchainData();
       
       }
       
async load3box() { 
  
// const profile = await Box.getProfile(this.state.account,window.web3)
//console.log(profile)
// if (this._isMounted){
//this.setState({image:profile.image[0].contentUrl})}
//console.log("account",this.state.image["/"])
//const spaceList = await Box.listSpaces('0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c')
//console.log("spacelist", spaceList)
//const spaceData = await Box.getSpace('0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c','StatusComments')
//console.log("spacedata",spaceData)

  
  //const box = await Box.openBox(this.state.account,window.ethereum)
  //if (this._isMounted){
  //this.setState({box:box})}


//const posts = await Box.getThread('StatusComments',this.props.status_info.ein + this.props.status_info.blockNumber + this.props.status_info.transactionHash)
//console.log("posts",posts)
if (this._isMounted){
setTimeout(()=>this.setState({loading:false}),7000)}
}

async LogIn(){

  let ethereum= window.ethereum;
  let web3=window.web3;
           
  if(typeof ethereum !=='undefined'){
  // console.log("metamask")
  await ethereum.enable();
  web3 = new Web3(ethereum);
           
  }
        
  else if (typeof web3 !== 'undefined'){
  console.log('Web3 Detected!')
  window.web3 = new Web3(web3.currentProvider);
   }
            
  else{console.log('No Web3 Detected')
  window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/72e114745bbf4822b987489c119f858b'));
       
  }

  window.ethereum.on('accountsChanged', function (accounts) {
  window.location.reload();
  })
      
  //window.ethereum.on('networkChanged', function (netId) {
  //window.location.reload();
  //}) 
     
  const accounts = await web3.eth.getAccounts();
  if (this._isMounted){
  this.setState({account: accounts[0]})};

  const Box = require('3box')

}
   

componentWillUnmount(){
  this.abortController.abort()
  this._isMounted = false;
}

constructor(props){
    super(props)
    this.state = {
        blocks:'',
        summaryModalShow: false,
        redirect:false,   
        hide:this.props.onHide,
        loading:true,
        sorted:[],
        account:'',
        space:'',
        address:'',
        box:'',
        thread:'',
        spacename:'',
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
      <Center><div className="banana3">Status</div></Center>
      </Modal.Title>
      </Modal.Header> 
 
      <Modal.Body> 


      <Row className="modalrow_button"><Col><Center><h6 className="grass2">EIN {this.props.status_info.ein} Updated Status To</h6></Center> <Center>
      <ImpulseSpinner
      frontColor= "#00ff89"
      size={60}
      loading={loading}/>
      </Center></Col></Row>
  
      <Row ><Col>
     
      </Col></Row>
     
      <Row><Col md={2}></Col><Col><Center><h3 className="banana3">{this.props.status_info.status}</h3></Center></Col><Col md={2}></Col></Row>
      <Row><Col md={10}></Col><Col><p className="statustime"><Moment unix fromNow>{this.props.status_info.blockNumber}</Moment></p></Col></Row>
      <Row><Col><h1> </h1></Col></Row>

      <Row className = "nothing">
      <Col xs={12}>
      <h6><Center> <ThreeBoxComments 
        // required
              
        spaceName='StatusComments'
        threadName={this.props.status_info.ein + this.props.status_info.blockNumber + this.props.status_info.transactionHash}
        adminEthAddr='0x20F857b13D6C546eC77aFE47317EA3c5a75c1c6c'
        
        // Required props for context A) & B)
        
        currentUserAddr= {this.state.account}
      
        // optional
        members={false}
        showCommentCount={3}
        useHovers={false}
        /></Center>
      </h6></Col>
      </Row> 

      <Row className="modalrow_button"><Col md={4}></Col><Col md={4}><input type ="submit" value="Connect" className="modalsubmit" onClick={() => this.LogIn()}/></Col><Col md={4}></Col></Row>
      <Row className="modalrow_button"><Col md={4}></Col><Col md={4}><input type ="submit" value="Close" className="modalsubmit" onClick={this.props.onHide}/></Col><Col md={4}></Col></Row>
     
     
      
      </Modal.Body>
            
      

      </Modal>
      )
    }

}