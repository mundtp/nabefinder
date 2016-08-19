import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginPage from './views/loginPage'
import UserReviews from './views/userReviews'
import HomeValueCalc from './views/homeValueCalc'
import MyPostings from './views/myPostings'
import ComposeView from './views/composeView'
import AdminPage from './views/adminPage'
import {User, NabeModel, MyNabeCollection} from './models/models'
import toastr from 'toastr'

const app = function() {
  const AppRouter = Backbone.Router.extend({
    routes: {
      "userReviews": "handleUserReviews",
      "homeValueCalculator": "handleHomeValueCalc",
      "neighborhood/createReview": "handleCreateReview",
      "neighborhood/myPostings": "handleMyPostings",
      "login": "handleLogin",
      "administrator": "handleAdministrator",
      "*catchall": "handleRedirect"
    },
    handleUserReviews: function(){
      ReactDOM.render(<UserReviews />, document.querySelector('.container'))
    },
    handleHomeValueCalc: function(){
      ReactDOM.render(<HomeValueCalc />, document.querySelector('.container'))
    },
    handleCreateReview: function(){
      ReactDOM.render(<ComposeView />, document.querySelector('.container'))
    },
    handleMyPostings: function(){
      var coll = new MyNabeCollection()
      coll.fetch().fail(function(err){
        console.log(err)
      })
      ReactDOM.render(<MyPostings coll={coll} />, document.querySelector('.container'))
    },
    handleLogin: function(){
      ReactDOM.render(<LoginPage />, document.querySelector('.container'))
    },
    handleAdministrator: function(){
      ReactDOM.render(<AdminPage />, document.querySelector('.container'))
    },
    handleRedirect: function(){
      location.hash = "userReviews"
    },
    initialize: function(){
        Backbone.history.start()
        this.on('route', function(handlerName){
            if(!User.getCurrentUser()){
              location.hash = "login"
            }
        })
    }

  })
  new AppRouter()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE.
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
