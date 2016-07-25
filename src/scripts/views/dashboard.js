import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({

	getInitialState: function() {
		return DISH_STORE._getData()
	},

	componentWillMount: function (){
		ACTIONS.fetchDishes()
		DISH_STORE.on('updateContent', ()=>{
			this.setState(DISH_STORE._getData())
		})
		
	},
	componentWillUnmount: function(){
		DISH_STORE.off('updateContent')
	},
	_handleTagSearch: function (e){
		if(e.keyCode === 13){
			ACTIONS.fetchDishes(e.target.value)
			e.target.value = ''

		}
	},

	render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<input onKeyDown={this._handleTagSearch} type='text' placeholder='Search for a tag...' />
	 			<h3>All Dishes:</h3>
	 			<DishContainer dishColl={this.state.collection}/>
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">
				{this.props.dishColl.map(
					(model) => <Dish key={model.id} dishModel={model}/>
				)}
			</div>
			)
	}
})

const Dish = React.createClass({
	_handlesLikes: function(){
		ACTIONS.likeDish(this.props.dishModel,User.getCurrentUser())
	},
	render: function() {
		return (
			<div className="dish">
				<img src={this.props.dishModel.get('imageUrl')} />
				<p>Dish Title: {this.props.dishModel.get('title')}</p>
				<p>Description: {this.props.dishModel.get('description')}</p>
				<p>Location: {this.props.dishModel.get('location')}</p>
				<p>Tags: {this.props.dishModel.get('tags')}</p>
				<p>Rating: {this.props.dishModel.get('rating')}</p>
				<p>Likes: {this.props.dishModel.get('likes').length}</p>
				<button onClick={this._handlesLikes}>Like</button>
			</div>
			)
	}
})

export default Dashboard
