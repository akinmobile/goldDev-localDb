import React, { Component } from 'react'
import { login } from '../helpers/auth'

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
  }
  render () {
    return (<div className="container">
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit" className="btn btn-default pull-right">Login</button>
        </form>
      </div>
            
            <div className="col-sm-6 col-sm-offset-3">
            
            <label/><hr/>
            <p>Don't have an account?</p>
            <a className="btn btn-block btn-success" type="submit" href="./register">Register</a>
            </div>
            </div>
            
    )
  }
}
