import React from 'react'
import Header from './header'


const DishesView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="dishesView" >
	 			<Header />
	 			<h3>my dishes</h3>
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

export default DishesView
