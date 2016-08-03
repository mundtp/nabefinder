import React from 'react'
import ACTIONS from '../actions'
import HeaderBar from './headerBar'

const LoginPage = React.createClass({
    render: function() {
        return (
            <div className="loginView">
                <HeaderBar />
                <RegisterBox />
                <LoginBox />
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
            <div className="loginBox register">
                <form onSubmit={this._handleRegister} >
                    <h3>Register</h3>
                    <input name = 'userName' placeholder = 'please enter your name' /> {/* ADDED ONE INPUT*/}
                    <input type="email" name="email" placeholder="enter your email" />
                    <input type="password" name="password" placeholder="enter a password" />
                    <button type="submit">Register</button>
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
            <div className="loginBox login">
                <form onSubmit={this._handleLogin} >
                    <h3>Log In</h3>
                    <input type="email" name="email" placeholder="enter your email" />
                    <input type="password" name="password" placeholder="enter a password" />
                    <button type="submit">Log In</button>
                </form>
            </div>
            )
    }
})
export default LoginPage