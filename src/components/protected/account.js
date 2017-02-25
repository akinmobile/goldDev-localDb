import React, {Component} from 'react'
import {auth} from '../../helpers/auth'
import {writeUserData} from '../../helpers/db'
import firebase from 'firebase'


function snapshot(cid, ccname, expiry, ccv, name, address, city, state, zip) {
    var data=snapshot.val();
}

export default class account extends Component {
    handleSubmit=(e)=> {
        writeUserData(this.cid.value, this.ccname.value , this.expiry.value, this.ccv.value, this.name.value, this.address.value, this.city.value, this.state.value, this.zip.value)
    }
    constructor() {
        super();
        this.state={
        cid: 'Card number',
        ccname: 'Name on Card',
        expiry: 'Expiration',
        ccv: 'CCV',
        name: 'Account name',
        address: 'Address',
        city: 'City',
        state: 'State',
        zip: 'Zip Code',
        };
    }
    updateName(event){
        this.setState({name: event.target.value.substr(0,20)})
    }
    
    componentDidMount() {
        var userId=firebase.auth().currentUser.uid;
        return firebase.database().ref().child('users/' + userId).child('cc1')
        .on('value', snap=> {
            const user=snap.val();
            this.setState({
          name: user.name,
         address: user.address,
            city: user.city,
           state: user.state,
             zip: user.zip,
             cid: user.cid,
          ccname: user.ccname,
          expiry: user.expiry,
             ccv: user.ccv});
        });
    }
    
  
    

    
       render() {
      
           return ( <div className="container">
                   
                   <h3> Modify account info </h3>
                   <br/>
                   
                   
                   <form onSubmit={this.handleSubmit}>
                   <table className="table  table-hover table-responsive">
                   <tbody>
                   <tr>
                   <td>
                   <input id="name" className="  noBorder" ref={(name)=>this.name=name} value={this.state.name} onChange={this.updateName.bind(this)}/>
                   </td>
                   </tr></tbody></table>
<table className="table  table-hover table-responsive"><tbody>                   
                   <tr>
                   <td>
                   <input id="address" className="  noBorder" ref={(address)=>this.address=address} value={this.state.address}/>
                   </td>
                
                   <td>
                   <input type="text"  className="  noBorder" id="city" ref={(city)=>this.city=city} value={this.state.city}></input>
                   </td>
                   </tr>
                   
                   <tr>
                   <td>
                   <input type="text"  className="  noBorder" id="state" ref={(state)=>this.state=state} value={this.state.state}></input>
                   </td>
                 
                   <td>
                   <input type="text"  className="  noBorder" id="zip" ref={(zip)=>this.zip=zip} value={this.state.zip}></input>
                   </td>
                   </tr></tbody></table> 
                   <table className="table  table-hover table-responsive"><tbody>
                   <tr>
                   <td>
                   <input type="text" className="  noBorder" id="ccname" ref={(ccname)=>this.ccname=ccname} value={this.state.ccname}></input>
                   </td>
                 
                   <td>
                   <input className="  noBorder" id="cid" ref={(cid)=>this.cid=cid} value={this.state.cid}/>
                   </td>
                   </tr>
                   
                   <tr>
                   <td>
                   <input type="text" className="  noBorder" id="expiry" ref={(expiry)=>this.expiry=expiry} value={this.state.expiry}></input>
                   </td>
                 
                   <td>
                   <input type="text" className="  noBorder" id="ccv" ref={(ccv)=>this.ccv=ccv} value={this.state.ccv}></input>
                   </td>
                   </tr>
                                      </tbody></table> <hr />
                   <button className="btn btn-block btn-lg btn-success" type="submit">Save changes</button>
                   </form>
                   <article className="col-xs-12">
                   

                </article>
                
               
            
                
                </div>)
    }
};

