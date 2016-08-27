import {User, NabeModel} from './models/models'
import NABE_STORE from './store'
import toastr from 'toastr'

toastr.success.background = 'black'



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
                toastr.success(`User ${email} logged in`)
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
                if(responseData.name){
                    toastr.error('Validation Error, dish was not saved')
                }
                else{
                toastr.success('Review has been saved')
              console.log(responseData)
              location.hash='home'}
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
          // for default sorting by most recent:
        //   .then(function(){
        // let coll = NABE_STORE.data.collection
        // let sortedColl = coll.sortBy(function(mod) {
        //         return parseInt(mod.cid.slice(1))
        //     })
        // coll.set(sortedColl.reverse())
        // })
    },
    likeNabe: function(nabe,userObj){
        if(nabe.get('likes').includes(userObj._id)){
            toastr.error('User has already liked this post')
            return
        }
        
        nabe.set({
            likes: nabe.get('likes').concat(userObj._id)
        })
        nabe.save()
        NABE_STORE.data.collection.fetch()
    },
    sortBy: function(sortType) {
        let coll = NABE_STORE.data.collection
        if (sortType === 'overall') {
            let sortedColl = coll.sortBy(function(mod) {
                return mod.get('overallRating')
            })
            coll.set(sortedColl.reverse())
        }
        if (sortType === 'amenities') {
            let sortedColl = coll.sortBy(function(mod) {
                return mod.get('amenitiesRating')
            })
            coll.set(sortedColl.reverse())
        }
        if (sortType === 'schools') {
            let sortedColl = coll.sortBy(function(mod) {
                return mod.get('schoolsRating')
            })
            coll.set(sortedColl.reverse())
        }
        if (sortType === 'recent') {
            let sortedColl = coll.sortBy(function(mod) {
                return parseInt(mod.cid.slice(1))
            })
            coll.set(sortedColl.reverse())
        }
        if (sortType === 'oldest') {
            let sortedColl = coll.sortBy(function(mod) {
                return parseInt(mod.cid.slice(1))
            })
            coll.set(sortedColl)
        }
    }
}

export default ACTIONS
