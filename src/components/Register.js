import React, {Component} from 'react'
import {auth}from '../helpers/auth'
import {Promise} from 'bluebird'
import update from 'immutability-helper'
import validator from 'validator'
import {validated} from 'react-custom-validation'

export default class Register extends Component {
    handleSubmit = (e) => {
        //e.preventDefault()
        console.log(this.state)
        auth(this.state.fields.email, this.state.fields.pw)
    }
    state = {
        fields: {
            email: ''
            , pw: ''
            , repw: ''
        }
        , }
    fieldChange = (field, value) => {
        this.setState(update(this.state, {
            fields: {
                [field]: {
                    $set: value
                }
            }
        }))
    }
    render() {
        return ( <Form
                        onSubmit = {
                            this.handleSubmit
                        }
                        fields = {
                            this.state.fields
                        }
                        onChange = {
                            this.fieldChange
                        }

                        onValid = {
                            //() => alert('Form should be submitted at this point. Auto trigger fails.')
                             this.handleSubmit.bind(this)

                            //  this.handleSubmit(this)
                            //this.submitForm
                             //() => alert('Good!')

                        }
                        onInvalid = {
                            () => alert('Error!')
                        }
        />)
    }
}
const isEmail = (email) => validator.isEmail(email) ? null : 'This is not a valid email.'
const isUnique = (email) => Promise.delay(1000).then(() => email.includes('used') ? 'This email is already used.' : null)
const minLength = (pw, length) => pw.length >= length ? null : 'Password is too short.'
const areSame = (pw, repw) => pw === repw ? null : 'Passwords do not match.'

function validationConfig(props) {
    const {
        email, pw, repw
    } = props.fields
    return {
        fields: ['email', 'pw', 'repw']
        , validations: {
            email: [
                [isEmail, email]
                , [isUnique, email]
            ]
            , pw: [[minLength, pw, 6]]
            , repw: {
                rules: [[areSame, pw, repw]]
                , fields: ['pw', 'repw']
            }
        }
        , }
}
class Form extends React.Component {
    render() {
        const {
            fields, onChange, onValid, onInvalid, $field, $validation, onSubmit
        } = this.props
        return ( < form className = "col-sm-6 col-sm-offset-3" > < h1 > Register < /h1> < div className = "form-group" > < label > Email < /label > < input ref = {
            (email) => this.email = email
        }
                                                                                                                                                            className = "form-control"
                                                                                                                                                            type = "text"
                                                                                                                                                            value = {
                                                                                                                                                                fields.email
                                                                                                                                                            } {...$field('email', (e) => onChange('email', e.target.value))
                                                                                                                                                            }
        /> {
            $validation.email.show && < span > {
                $validation.email.error.reason
            } < /span>}</div > < hr / > < div className = "form-group" > < label > Password < /label> < input ref = { (pw) => this.pw = pw
        }
                                                                                                              className = "form-control"
                                                                                                              type = "password"
                                                                                                              value = {
                                                                                                                  fields.pw
                                                                                                              } {...$field('pw', (e) => onChange('pw', e.target.value))
                                                                                                              }
        /> {
            $validation.pw.show && < span > {
                $validation.pw.error.reason
            } < /span>} < /div > < div className = "form-group" > < label > Repeat password < /label> < input className = "form-control"
                                                                                                              type = "password"
                                                                                                              value = {
                                                                                                                  fields.repw
                                                                                                              } {...$field('repw', (e) => onChange('repw', e.target.value))
                                                                                                              }
        /> {
            $validation.repw.show && < span > {
                $validation.repw.error.reason
            } < /span>} < /div > < button className = "btn btn-primary"
                                          onClick = {
                                              (e) => {
                                                  e.preventDefault()
                                                  this.props.$submit(onValid, onInvalid)
                                              }
                                          } > Register < /button> < /form > )
            }
            }
            Form = validated(validationConfig)(Form)