var mongoose = require('mongoose');

var libroSchema = new mongoose.Schema({
	titulo: String,
	autor: String,
    paginas: {
        type: Number,
        min: 0,
        max: 5000
    }    
});

mongoose.model('Libro', libroSchema);