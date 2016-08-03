const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x

   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

//STEP ONE

const nabeSchema = new Schema ({ // establish the properties that we will use for the data
    title: {type: String, required: true},
    zipcode: {type: String, required: true},
    overallComments: {type: String},
    amentitiesRating: {type: Number, required: true},
    amentitiesComments: {type: String},
    schoolsRating: {type: Number, required: true},
    schoolsComments: {type: String},
    likes: {type: [String], default: []},
    tags: {type: [String], default: []},
    imageUrl: {type: String, required: true},
    authorEmail: {type: String, required: true},
    authorId: {type: String, required: true},
})

module.exports = {
  User: createModel('User', usersSchema),
  Nabe: createModel('Nabe', nabeSchema) //STEP TWO (export model)
}
