//COPIED FROM MONGO MESSAGES

import React from 'react'
import ACTIONS from '../actions'

const Header = React.createClass({
    render: function() {
        return (
            <div id="headerContainer">
                <marquee height="50" direction="up" >Food Mood</marquee>
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    render: function() {
        return (
            <div id="navBar"> {/*made a few edits here so that is makes sense for this app*/}
                <a href="#login">Log In</a>
                <a href="#home">Home</a>
                <a href="#dish/myDishes">My Dishes</a>
                <a href="#dish/postDishes">Post Dish</a>
                <a href="#" onClick={ACTIONS.logUserOut}>Log Out</a>
            </div>
            )
    }
})

export default Header