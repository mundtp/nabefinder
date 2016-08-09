import React from 'react'
import ACTIONS from '../actions'

const HeaderBar = React.createClass({
    render: function() {
        return (
            <div id="header">
                <h1>NabeFinder</h1>
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
                <a href="#userReviews">User Reviews</a>
                <a href="#homeValueCalculator">Home Value Calculator</a>
                <a href="#neighborhood/myPostings">My Postings</a>
                <a href="#neighborhood/createReview">Create Review</a>
                <a href="#" onClick={ACTIONS.logUserOut}>Log Out</a>
            </div>
            )
    }
})

export default HeaderBar