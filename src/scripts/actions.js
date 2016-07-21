import {User} from './models/models'

const ACTIONS = {
  registerUser: function(userObj){
    User.register(userObj).then(()=>this.logUserIn(userObj.email,userObj.password),
    	(err)=>{
    		alert('FAILURE to register')
    		console.log(err)
    	}

    	)
  },
  logUserIn: function(email, password){
  	User.login(email, password).then(
  		()=> {
  			alert(`user ${email} logged in!`)
  			console.log(resp)
  		},
  		(err)=>{
  			alert('FAILURE to log in')
  			console.log(err)
  		})
  },
  logUserOut: function(){
  	User.logout().then(
  		()=> location.hash = "login"
  	)
 
  }
}

export default ACTIONS
