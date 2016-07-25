import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'


const DishesView = React.createClass({

	getInitialState: function() {
		return {
			coll: this.props.coll
		}
	},
	componentWillMount: function(){
		this.state.coll.on('sync update',()=>{
			this.setState({
				coll: this.state.coll
			})
		})
	},

	render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<h3>Dishes You've Posted:</h3>
	 			<DishContainer dishColl={this.props.coll}/>
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
	_removeDish: function() {
		this.props.dishModel.destroy({
			url: `/api/dishes/${this.props.dishModel.id}`		
		})
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
				<button onClick={this._removeDish}>Delete Post</button>
			</div>
			)
	}
})

export default DishesView


