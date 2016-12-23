var mongoose = require('mongoose');
var Loc = mongoose.model('Libro');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of locations */
module.exports.librosReadAll = function(req, res) {
  Loc.find()
  .exec(function(err, libros) {
      if (!libros) {
        sendJSONresponse(res, 404, {
          "message": "No se encontraron libros"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(libros);
      sendJSONresponse(res, 200, libros);
    });
};

/* GET a location by the id */
module.exports.librosReadOne = function(req, res) {
  console.log('Buscando libro', req.params);
  if (req.params && req.params.libroid) {
    Loc
      .findById(req.params.libroid)
      .exec(function(err, libro) {
        if (!libro) {
          sendJSONresponse(res, 404, {
            "message": "libroid no encontrado"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(libro);
        sendJSONresponse(res, 200, libro);
      });
  } else {
    console.log('No se ha especificado libroid ');
    sendJSONresponse(res, 404, {
      "message": "Sin locationid en request"
    });
  }
};

/* POST a new location */
/* /api/locations */
module.exports.librosCreate = function(req, res) {
  console.log("CREATE --");
  console.log(req.body);
  Loc.create({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas,
    }, function(err, location) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(location);
      sendJSONresponse(res, 201, location);
    }
  });
};

module.exports.librosUpdate = function(req, res) {
	console.log("UPDATE --");
	  console.log(req.body);
	  if (!req.body.libroid) {
	    sendJSONresponse(res, 404, {
	      "message": "Not found, locationid is required"
	    });
	    return;
	  }
	  Loc
	    .findById(req.body.libroid)
	    .exec(
	      function(err, libro) {
	        if (!libro) {
	          sendJSONresponse(res, 404, {
	            "message": "libroid no encontrado"
	          });
	          return;
	        } else if (err) {
	          sendJSONresponse(res, 400, err);
	          return;
	        }
	        libro.titulo = req.body.titulo;
	        libro.autor = req.body.autor;
	        libro.paginas = req.body.paginas;
	        libro.save(function(err, libro) {
	          if (err) {
	            sendJSONresponse(res, 404, err);
	          } else {
	            sendJSONresponse(res, 200, libro);
	          }
	        });
	      }
	  );
	};
	
module.exports.librosDelete = function(req, res) {
	console.log("DELETE --");
	  console.log(req.body);
	  var libroid = req.body.libroid;
	  if (libroid) {
	    Loc
	      .findByIdAndRemove(libroid)
	      .exec(
	        function(err, libro) {
	          if (err) {
	            console.log(err);
	            sendJSONresponse(res, 404, err);
	            return;
	          }
	          console.log("Libro con id " + libroid + " ha sido eliminado");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No se encontro libroid"
    });
  }
};

/* PUT /api/locations/:locationid */
module.exports.locationsUpdateOne = function(req, res) {
  if (!req.params.locationid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec(
      function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1,
        }, {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        }];
        location.save(function(err, location) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, location);
          }
        });
      }
  );
};

/* DELETE /api/locations/:locationid */
module.exports.locationsDeleteOne = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findByIdAndRemove(locationid)
      .exec(
        function(err, location) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Location id " + locationid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No locationid"
    });
  }
};
