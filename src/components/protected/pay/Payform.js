import React, {Component} from 'react'
import {auth} from '../../../helpers/auth'
import {writeUserData} from '../../../helpers/db'
import firebase from 'firebase'
import account from '../account'
import Home from './../../Home'
export default class Dashboard extends Component {
handleSubmit = (e) => {
        writeUserData(this.cid.value, this.ccname.value , this.expiry.value, this.ccv.value)
    }
    
    constructor() {
        super();
        this.state = {
        autoPay: 'toggle btn btn-default off',
        cid: 'Loading'
        };
    }
    
    componentDidMount() {
        var userId = firebase.auth().currentUser.uid;
        const rootRef = firebase.database().ref().child('users/' + userId).child('cc1').child('cid');
        rootRef.on('value', snap => {
                  this.setState({
                   cid: snap.val()
                   });
                  });
    }
    
   
    
    _toggle(){
        if (this.state.autoPay === 'toggle btn btn-default on'){
            this.setState({autoPay: 'toggle btn btn-default off'});
        } else {
            this.setState({autoPay: 'toggle btn btn-default on'});
        } };
    

    render() {
        return ( <div className = "page">
                <div className="btn-group btn-group-justified" role="group" aria-label="Justified">
                <div className="btn-group" role="group">
                <button type="button" data-toggle="modal" data-target="#payModal" className="btn btn-success">Pay</button>
                </div>
                <div className="btn-group" role="group">
                <button type="button" className="btn btn-default">Reload</button>
                </div>
                <div className="btn-group" role="group">
                <button type="button" data-toggle="modal" data-target="#manageModal" className="btn btn-default">Manage</button>
                </div>
                </div>
                
               
                <h3>Stacked checkboxes</h3>
                <p>Refer to Bootstrap <a href="http://getbootstrap.com/css/#forms-controls" target="_blank">Form Controls</a> documentation to create stacked checkboxes. Simply add <code>data-toggle="toggle"</code> to convert checkboxes into toggles.</p>
                
               
                
               <hr/><div className="row">
                <div>Account balance</div>
                <div>
                <h3> $22.94</h3>
                <div>Account balance</div>
                <div>
                <h3> $22.94</h3>
                </div>
                </div>
                </div>
             
               
                <div className="block block-gallery">
                <div className="artwork center-block">
                
                <a  href="Home">
                <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/V_Pay_logo.svg/2000px-V_Pay_logo.svg.png" alt="Yuri shwedoff sale 50"></img>
                
                <div className="album-grid-item-overlay">
                <div className="album-grid-item-overlay-inner">
                <div className="album-grid-item-name">Scan electronic payment method</div></div></div>
                
                </a> </div></div>
                
                <div className="modal fade" id="manageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <label className="modal-title" id="exampleModalLabel">Manage</label>

                </div>
                <div className="modal-body">
                
                
                <table className="table">
                <tr>
                    <th> <h3><span className="glyphicon glyphicon-ok-circle"></span> Auto pay</h3></th>
                    <td><form><label className="checkbox text-right">
                    <div className={this.state.autoPay} onClick={this._toggle.bind(this)} data-toggle="toggle">
                    <div className="toggle-group">
                    <button className="btn btn-success toggle-on">On</button>
                    <button className="btn btn-default active toggle-off">Off</button>
                    <span className="toggle-handle btn btn-default"></span>
                    </div></div></label></form></td>
                </tr>
         
                <tr><a href="account">
                 <h3><span className="glyphicon glyphicon-pencil"></span> Edit payment method</h3></a>
                </tr>
                </table>
                
                
                
                
                <h2 className="modal-title">{this.state.cid}</h2>
                
                
              
                
                
                </div>
              
                
               
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button></div>
              </div>
                </div>
                </div> <div className="modal fade" id="payModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button><h5 className="modal-title" id="exampleModalLabel">Pay</h5>
                </div>
                <div className="modal-body">
                ...
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
                </div>
                </div>
                </div>
                
                
                
             
                
                )
    }
};

