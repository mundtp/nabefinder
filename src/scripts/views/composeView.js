import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User, DishModel} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>Post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({
	_handleCompose: function(e){
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: e.currentTarget.rating.value,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/empty-plate.jpg',
			tags: e.currentTarget.tags.value.split(",")
		})
	},

	_handleImage: function(result){
		this.url = result.url
	},

	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleCompose}>
					<input type="text" name="title" placeholder="Dish Title"/>
					<textarea name="description" placeholder="Description"></textarea>
					<input type="text" name="location" placeholder="Location"/>
					<a>Rating: </a><select name="rating" placeholder="Select a rating">
						<option value="5">5 (Highest)</option>
						<option value="4">4</option>
						<option value="3">3</option>
						<option value="2">2</option>
						<option value="1">1 (Lowest)</option>
					</select>
					<input type="text" name="tags" placeholder="Enter tags separated by commas"/>
					<ReactFilepicker apikey='AvwF4EpzcTGC43TQkmd4xz' onSuccess={this._handleImage}/>

					<button type='submit'>SUBMIT</button>
					
				</form>
			</div>
			)
	}
})

export default ComposeView
