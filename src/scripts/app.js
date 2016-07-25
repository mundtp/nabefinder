import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginView'
import Dashboard from './views/dashboard'
import DishesView from './views/dishesView'
import ComposeView from './views/composeView'
import {User, DishModel, MyDishCollection} from './models/models'

//STEP 5 (build your client side api routes)
const app = function() {
  const AppRouter = Backbone.Router.extend({
    routes: {
      "home": "handleHome",
      "dish/postDishes": "handlePostDish",
      "dish/myDishes": "handleMyDishes",
      "login": "handleLogin",
      "*catchall": "handleRedirect"
    },
    handleHome: function(){
      ReactDOM.render(<Dashboard />, document.querySelector('.container'))
    },
    handlePostDish: function(){
      ReactDOM.render(<ComposeView />, document.querySelector('.container'))
    },
    handleMyDishes: function(){
      var coll = new MyDishCollection()
      coll.fetch().fail(function(err){
        console.log(err)
      })
      ReactDOM.render(<DishesView coll={coll} />, document.querySelector('.container'))
    },
    handleLogin: function(){
      ReactDOM.render(<LoginView />, document.querySelector('.container'))
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
