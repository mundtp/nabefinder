import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'


const MyPostsView = React.createClass({

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
	 			<h3 id='myReviewsHeader'>My Reviews</h3>
	 			<NabeContainer nabeColl={this.props.coll}/>
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
	_removeNabe: function() {
		this.props.nabeModel.destroy({
			url: `/api/neighborhoods/${this.props.nabeModel.id}`		
		})
	},
	render: function() {
		return (
			<div className="nabe">
				<img src={this.props.nabeModel.get('imageUrl')} />
				<p>Neighborhood: {this.props.nabeModel.get('title')}</p>
				<p>Zip Code: {this.props.nabeModel.get('zipcode')}</p>
				<p>Overall Comments: {this.props.nabeModel.get('overallComments')}</p>
				<p>Amentities Rating: {this.props.nabeModel.get('amentitiesRating')}</p>
				<p>Amentities Comments: {this.props.nabeModel.get('amentitiesComments')}</p>
				<p>Schools Rating: {this.props.nabeModel.get('schoolsRating')}</p>
				<p>Schools Comments: {this.props.nabeModel.get('schoolsComments')}</p>
				<p>Neighborhood Tag: {this.props.nabeModel.get('tags')}</p>
				<p>Likes: {this.props.nabeModel.get('likes').length}</p>
				<button onClick={this._removeNabe}>Delete Post</button>
			</div>
			)
	}
})

export default MyPostsView


