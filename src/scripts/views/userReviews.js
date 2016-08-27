import React from 'react'
import HeaderBar from './headerBar'
import NABE_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'
import $ from 'jquery'

var key_codes = {"65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z"}
var googleApi = 'AIzaSyC8WtzWw9giW8mJYOT6-xuSPOYmSrYr-FM' 
var searchedVal = ""
var neighborhood = "N/A"
var zipcode = "N/A"
var distance = ""
var duration = ""
var suggestion



const UserReviews = React.createClass({

	getInitialState: function() {
		return NABE_STORE._getData()
	},

	componentWillMount: function (){
		ACTIONS.fetchReviews()
		NABE_STORE.on('updateContent', ()=>{
			this.setState(NABE_STORE._getData())
		})
    },

	componentWillUnmount: function(){
		NABE_STORE.off('updateContent')
	},
	_handleTagSearch: function (e){
		var pNode = document.querySelector('.suggestions')
		var input = e.target.value + key_codes[e.keyCode]
		var prom = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=' + googleApi)
		prom.then(this._auto)


		if (e.target.value.length > 0)
			{pNode.style.visibility = 'visible'}
		if(e.target.value.length < 1){
				pNode.style.visibility = 'hidden'
			}


		if(e.keyCode === 13){			      
	        var inputValue = e.target.value
	        var pNode = document.querySelector('.suggestions')
	        pNode.style.visibility = 'hidden'

	        var promiseGeoLookup = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputValue + '&key=' + googleApi)
	        promiseGeoLookup.then(this._run)
	        searchedVal = e.target.value

	        e.target.value = ''
	        distance = ""
		}
	},
	_auto: function (dataObj){
		if(dataObj.results.length !== 0){
			suggestion = dataObj.results[0].formatted_address
			ACTIONS.fetchReviews()
		}
	},
	_handleSortBy: function(e) {
		ACTIONS.sortBy(e.target.value)
	},
	_handleSuggestion: function (e){
		var inputNode = document.querySelector("input.searchBar")
		inputNode.value = e.target.innerHTML
		inputNode.focus()
	},

	_run: function(dataObj){
		var address_components = dataObj.results[0].address_components
		neighborhood = "N/A"

		address_components.forEach(function(obj){
			if(obj.types[0] === "neighborhood"){
				neighborhood = obj.long_name 
			}
			if(obj.types[0] === "postal_code"){
				zipcode = obj.long_name 
			}

		})
		
		ACTIONS.fetchReviews(neighborhood + "_" + zipcode)

		
	},
	_handleDistCalc: function(e){

		if(e.keyCode === 13){

			var promise = $.getJSON({
		        url: '/api/distance',
		        data: {
		           origins: neighborhood + zipcode,
		          destinations: e.target.value,
		        }
     		 })
			promise.then(function(data) {
    		  distance = data.rows[0].elements[0].distance.text
    		  duration = data.rows[0].elements[0].duration.text

    		  ACTIONS.fetchReviews(neighborhood + "_" + zipcode)

    		})
    		e.target.value = ""
		}
	},
	_displayNeighborhood: function(){
		if(neighborhood !== "N/A"){
			return (
				<div>
					<h3>Searched: {searchedVal}</h3>
					<h3>Displaying reviews for {neighborhood} in zipcode {zipcode}.</h3>
				</div>
			)
		}
	},
	_displayDistanceSearch: function(){
		if(neighborhood !== "N/A"){
			return <input onKeyDown={this._handleDistCalc} type='text' placeholder='Enter your workplace or another location to estimate the drive time...'/>
		}
	},
	_displayDistance: function(){
		if(distance.length > 1){
			return <h2>The calculated distance is {distance} with an estimated drive time of {duration}.</h2>
		}
	},

	render: function() {
		// for a default option: <option value="" disabled selected hidden>Displaying All</option>

	 	return (
	 		<div className='dashboard' >
	 			<HeaderBar />
	 			<h3 id='userReviews'>User Reviews</h3>
	 			<div >
	 				<input className='searchBar' onKeyDown={this._handleTagSearch} type='text' placeholder='Search a home address or neighborhood...'/>
	 				<p className='suggestions' onClick={this._handleSuggestion}>{suggestion}</p>
	 			</div>
	 			{this._displayNeighborhood()}
	 			{this._displayDistanceSearch()}
	 			{this._displayDistance()}
	 			<div id="sort"><form><a>Sort By: </a>
						<select onChange={this._handleSortBy} className="sort">
							<option value='recent'>Most Recent</option>
							<option value='overall'>Best Overall Rating</option>
							<option value='amenities'>Best Amenities Rating</option>
							<option value='schools'>Best Schools Rating</option>
						</select></form>
				</div>
	 			<NabeContainer nabeColl={this.state.collection}/>

	 		</div>
	 	)
 	}
})

const NabeContainer = React.createClass({
	render: function() {
		return (
			<div className="nabeContainer">
				{this.props.nabeColl.map(
					(model) => <Nabe key={model.id} nabeModel={model}/>
				)}
			</div>
			)
	}
})

const Nabe = React.createClass({
	_handlesLikes: function(){
		ACTIONS.likeNabe(this.props.nabeModel,User.getCurrentUser())
		ACTIONS.fetchReviews()
	},
	_handlesRating: function(num){
		if (num === 5){
			return <a><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></a>
		}
		if (num === 4){
			return <a><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></a>
		}
		if (num === 3){
			return <a><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></a>
		}
		if (num === 2){
			return <a><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></a>
		}
		if (num === 1){
			return <a><i className="fa fa-star" aria-hidden="true"></i></a>
		}
	},
	render: function() {
		return (
			<div className="nabe">
				<h3>{this.props.nabeModel.get('title')}</h3>
				<div id='img'><img src={this.props.nabeModel.get('imageUrl')} /></div>
				<p>Overall Rating: {this.props.nabeModel.get('overallRating')} {this._handlesRating(this.props.nabeModel.get('overallRating'))}</p>
				<p>Amenities Rating: {this.props.nabeModel.get('amenitiesRating')} {this._handlesRating(this.props.nabeModel.get('amenitiesRating'))}</p>
				<p>Schools Rating: {this.props.nabeModel.get('schoolsRating')} {this._handlesRating(this.props.nabeModel.get('schoolsRating'))}</p>
				<p>Overall Comments: {this.props.nabeModel.get('overallComments')}</p>
				<p>Amenities Comments: {this.props.nabeModel.get('amenitiesComments')}</p>
				<p>Schools Comments: {this.props.nabeModel .get('schoolsComments')}</p>
				<p>{this.props.nabeModel.get('likes').length} Likes</p>
				<button onClick={this._handlesLikes}>Like</button>
			</div>
			)
	}
})




export default UserReviews
