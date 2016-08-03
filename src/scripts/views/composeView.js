import React from 'react'
import HeaderBar from './headerBar'
import ACTIONS from '../actions'
import NABE_STORE from '../store'
import {User, NabeModel} from '../models/models'
import ReactFilepicker from 'react-filepicker'
import $ from 'jquery'

var neighborhood = "Please complete a search above."
var zipcode = "N/A"
var key_codes = {"65":"a","66":"b","67":"c","68":"d","69":"e","70":"f","71":"g","72":"h","73":"i","74":"j","75":"k","76":"l","77":"m","78":"n","79":"o","80":"p","81":"q","82":"r","83":"s","84":"t","85":"u","86":"v","87":"w","88":"x","89":"y","90":"z"}
var googleApi = 'AIzaSyC8WtzWw9giW8mJYOT6-xuSPOYmSrYr-FM' 
var suggestion = ""

const ComposeView = React.createClass({
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
	        e.target.value = ''
		}
	},
	_auto: function (dataObj){
		if(dataObj.results.length !== 0){
			suggestion = dataObj.results[0].formatted_address
			ACTIONS.fetchReviews()
		}
	},
	_handleSuggestion: function (e){
		var inputNode = document.querySelector("input.searchBar")
		inputNode.value = e.target.innerHTML
		inputNode.focus()
	},
	_run: function(dataObj){

		var address_components = dataObj.results[0].address_components
		
		address_components.forEach(function(obj){
			if(obj.types[0] === "neighborhood"){
				neighborhood = obj.long_name 
			}
			if(obj.types[0] === "postal_code"){
				zipcode = obj.long_name 
			}
		})
		ACTIONS.fetchReviews()
	},
	_displayNeighborhood: function(){
		if(neighborhood !== "Please complete a search above."){
			
			return <h3>This review will be posted for {neighborhood} in zipcode {zipcode}.</h3>
		}

	},
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<HeaderBar />
	 			<h3 id="createReview">Post a Review</h3>
	 			<div>
		 			<input className='searchBar' onKeyDown={this._handleTagSearch} type='text' placeholder='First, search an address or neighborhood...' />
		 			<p className='suggestions' onClick={this._handleSuggestion}>{suggestion}</p>
		 		</div>
	 			{this._displayNeighborhood()}
	 			<NabePostingForm />
	 		</div>
	 	)
 	}
})

const NabePostingForm = React.createClass({
	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveNabe({
			title: neighborhood,
			zipcode: zipcode,
			overallComments: e.currentTarget.overallComments.value,
			amentitiesRating: e.currentTarget.amentitiesRating.value,
			amentitiesComments: e.currentTarget.amentitiesComments.value,
			schoolsRating: e.currentTarget.schoolsRating.value,
			schoolsComments: e.currentTarget.schoolsComments.value,
			tags: neighborhood + "_" + zipcode,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/default-pic.jpg',
			
		})
	},

	_handleImage: function(result){
		this.url = result.url
	},

	render: function() {
		return (
			<div className="nabePostingForm">
				<form onSubmit={this._handleCompose}>
					<div><a>{neighborhood}</a></div>
					<div><a>Zip Code: {zipcode}</a></div>
					<textarea name="overallComments" placeholder="Overall comments..."></textarea>
					<div>
						<a>Schools Rating: </a>
						<select name="schoolsRating" placeholder="Select a rating">
						<option value="5">5 (Highest)</option>
						<option value="4">4</option>
						<option value="3">3</option>
						<option value="2">2</option>
						<option value="1">1 (Lowest)</option>
						</select>
					</div>
					<textarea name="schoolsComments" placeholder="Comments about schools..."></textarea>
					<div>
						<a>Amentities Rating: </a>
						<select name="amentitiesRating" placeholder="Select a rating">
						<option value="5">5 (Highest)</option>
						<option value="4">4</option>
						<option value="3">3</option>
						<option value="2">2</option>
						<option value="1">1 (Lowest)</option>
						</select>
					</div>
					<textarea name="amentitiesComments" placeholder="Comments about amentities..."></textarea>
					<div>Upload an image: <ReactFilepicker apikey='AvwF4EpzcTGC43TQkmd4xz' onSuccess={this._handleImage}/></div>
					<button type='submit'>SUBMIT</button>
					
				</form>
			</div>
			)
	}
})

export default ComposeView
