import React from 'react'
import Header from './header'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({
	render: function() {
		return (
			<div className="dishPostingForm">

			</div>
			)
	}
})

export default ComposeView
