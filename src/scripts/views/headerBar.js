import React from 'react'
import ACTIONS from '../actions'

const HeaderBar = React.createClass({
    render: function() {
        return (
            <div id="headerContainer">
                <h2>NabeFinder</h2>
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    render: function() {
        return (
            <div id="navBar">
                <a href="#login">Log In</a>
                <a href="#home">Home</a>
                <a href="#neighborhood/myReviews">My Reviews</a>
                <a href="#neighborhood/createReview">Create Review</a>
                <a href="#" onClick={ACTIONS.logUserOut}>Log Out</a>
            </div>
            )
    }
})

export default HeaderBar