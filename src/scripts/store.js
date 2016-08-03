import Backbone from 'backbone'
import _ from 'underscore'
import {NabeCollection} from './models/models'

const NABE_STORE = _.extend(Backbone.Events, {

	data: {
		collection: new NabeCollection(),
	},

	_emitChange: function(){
		this.trigger('updateContent')

	},

	_getData: function() {
		return _.clone(this.data)
	},

	_initialize: function(){
		this.data.collection.on('sync update', this._emitChange.bind(this))
	}
})

NABE_STORE._initialize()

export default NABE_STORE