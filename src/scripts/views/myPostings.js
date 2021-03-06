import React from 'react'
import HeaderBar from './headerBar'
import ACTIONS from '../actions'
import {User} from '../models/models'


const MyPostings = React.createClass({

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
	 			<HeaderBar />
	 			<h3 id='myPostingsHeader'>My Postings</h3>
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
				<button onClick={this._removeNabe}>Delete Post</button>
			</div>
			)
	}
})

export default MyPostings


