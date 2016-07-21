import React from 'react'
import Header from './header'

const Dashboard = React.createClass({
	 render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<h3>dashboard</h3>
	 			<DishContainer />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">
			</div>
			)
	}
})

const Dish = React.createClass({
	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
			</div>
			)
	}
})

export default Dashboard
