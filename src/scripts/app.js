import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginPage from './views/loginPage'
import UserReviews from './views/userReviews'
import MyReviews from './views/myReviews'
import ComposeView from './views/composeView'
import {User, NabeModel, MyNabeCollection} from './models/models'

//STEP 5 (build your client side api routes)
const app = function() {
  const AppRouter = Backbone.Router.extend({
    routes: {
      "home": "handleHome",
      "neighborhood/createReview": "handleCreateReview",
      "neighborhood/myReviews": "handleMyReviews",
      "login": "handleLogin",
      "*catchall": "handleRedirect"
    },
    handleHome: function(){
      ReactDOM.render(<Dashboard />, document.querySelector('.container'))
    },
    handleCreateReview: function(){
      ReactDOM.render(<ComposeView />, document.querySelector('.container'))
    },
    handleMyReviews: function(){
      var coll = new MyNabeCollection()
      coll.fetch().fail(function(err){
        console.log(err)
      })
      ReactDOM.render(<MyReviews coll={coll} />, document.querySelector('.container'))
    },
    handleLogin: function(){
      ReactDOM.render(<LoginPage />, document.querySelector('.container'))
    },
    handleRedirect: function(){
      location.hash = "home"
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
