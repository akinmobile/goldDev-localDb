import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Payform from './protected/pay/Payform'
import account from './protected/account'
import Order from './protected/order/Order'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'
import {writeUserData} from '../helpers/db'


function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
    return (
            <Match
            {...rest}
            render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to='/account' />}
            />
            )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/Payform' />}
    />
  )
}
function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
    return (
            <Match
            {...rest}
            render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to='/Order' />}
            />
            )
}
export default class App extends Component {
    

  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ?  <img className="img-responsive center-block" src="http://www.vomzi.com/wp-content/uploads/2015/10/teddy-bear-loading-gif-5479.gif" alt="Yuri shwedoff sale 50"></img>
 : (
      <BrowserRouter>
        {({router}) => (
          <div>
        
                        
                        
                        <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container-fluid">

                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Rationetworking</a>
                        </div>
                        

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                                                </ul>
        <div className="container">
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="/payform">Pay</a></li>
                        <li><a href="/order">Order</a></li>
                        <li className="btn-group">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                        <li><a href="/account">Account</a></li>
                        
                        <li role="separator" className="divider"></li>
                        
                        <li>{this.state.authed? 
                            <button
                            style={{border: 'none', background: 'transparent'}}
                            onClick={() => {
                            logout()
                            this.setState({authed: false})
                            router.transitionTo('/') }}
                            ><span className="glyphicon glyphicon-log-out"/> Logout</button>
                        :
                      <a href="/register"> <span className="glyphicon glyphicon-plus"/> Register</a>
                        }
                        </li>
                        </ul>
                        </li>
                        </ul>
                        </div></div>
                        </div>
                        </nav>
                       
                      
<div className="container">
             <div className="row">
                <Match pattern='/' exactly component={Home} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/Payform' component={Payform} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/Order' component={Order} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/account' component={account} />
                <Miss render={() => <h3>No Match</h3>} />
           </div>
                        </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}



