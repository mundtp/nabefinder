import React from 'react'
import ACTIONS from '../actions'
import HeaderBar from './headerBar'


const LoginPage = React.createClass({
    render: function() {
        return (
            <div>
                <HeaderBar />
                <h3 id='loginInfo'>Crowd-sourced user reviews of neighborhoods. Calculate your drive time to work, and get a property value as well as average property value of the surrounding area.</h3>
                 <LoginBox />
                <RegisterBox />
               
            </div>
            )
    }
})

const RegisterBox = React.createClass({

    _handleRegister: function(evt) {
        evt.preventDefault()
        ACTIONS.registerUser({
            email: evt.currentTarget.email.value,
            password: evt.currentTarget.password.value,
            name: evt.currentTarget.userName.value
        })
    },

    render: function() {
        return (
            <div className="login">
                <form onSubmit={this._handleRegister} >
                    <h3>New User Register</h3>
                    <input name = 'userName' placeholder = 'Name' />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            )
    }
})

const LoginBox = React.createClass({
    _handleLogin: function(evt) {
        evt.preventDefault()
        ACTIONS.logUserIn(evt.target.email.value,evt.target.password.value)
    },

    render: function() {
        return (
            <div className="login">
                <form id='login' onSubmit={this._handleLogin} >
                    <h3>Log In</h3>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            )
    }
})
export default LoginPage