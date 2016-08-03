import {User, NabeModel} from './models/models'
import NABE_STORE from './store'



const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )
    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                alert(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                alert('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },
    saveNabe: function(nabeObj){
        var nabe = new NabeModel(nabeObj)
        nabe.save().then(
            (responseData) => {
              alert('neighborhood is saved')
              console.log(responseData)
              location.hash='home'
            },
            (err) => {
              alert('Failure')
              console.log(err)
            }
        )
    },
    fetchReviews: function(tags){
          NABE_STORE.data.collection.fetch({
                data: {
                    tags: tags
                }
          })
    },
    likeNabe: function(nabe,userObj){
        if(nabe.get('likes').includes(userObj._id)){
            console.log('User has already liked this post')
            return
        }
        
        nabe.set({
            likes: nabe.get('likes').concat(userObj._id)
        })
        nabe.save()
        NABE_STORE.data.collection.fetch()
    }
}

export default ACTIONS