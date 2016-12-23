var request = require('request');
var apiOptions = {                      
		  server : "http://localhost:3000"      
		};   
/* GET 'home' page */
/* GET 'Add review' page */
var renderLibros = function(req, res, responseBody) {
    res.render('libro-crud-read', {
        title: 'Ejemplo CRUD libro read',
        pageHeader: {
            title: 'CRUD Read libro',
            strapline: 'Listado de libros'
        },
        libros:responseBody
    });
};

module.exports.libroCrudRead = function(req, res) {
	var requestOptions, path;
	  path = '/api/libros';      
	  requestOptions = {                   
	    url : apiOptions.server + path,    
	    method : "GET",                    
	    json : {},                         
	  };                                   
	  request(                                
	    requestOptions,                       
	    function(err, response, body) {             
	      renderLibros(req, res, body);                 
	    }                                           
	  );
};

module.exports.libroCrudCreateMostrar = function(req, res) {
    res.render('libro-crud-create', {
        title: 'Ejemplo CRUD libro create',
        pageHeader: {
            title: 'CRUD Create libro',
            strapline: 'Creacion de libro'
        },
        sidebar: "Un ejemplo de listado de libros"
    });
};

module.exports.libroCrudCreateRegistrar = function(req, res) {
	  var requestOptions, path, locationid, postdata;
	  locationid = req.params.locationid;                  
	  path = "/api/libros/create";  
	  postdata = {                                 
	    titulo: req.body.titulo,   
	    autor: req.body.autor,
	    paginas: parseInt(req.body.paginas, 10)       
	  };  
	  requestOptions = {
		    url : apiOptions.server + path,   
		    method : "POST",                  
		    json : postdata                   
		  };
		  request(      
		    requestOptions,
		    function(err, response, body) {
		      if (response.statusCode === 201) {               
		    	  res.render('generic-text', {
		  	        title: 'Operación realizada',
		  	        content: 'La operacion de creacion del libro ha sido registrada.'
		  	      });       
		      } else {                                         
		        _showError(req, res, response.statusCode);     
		      }
		    }
		  );
};

// UPDATE
module.exports.libroCrudUpdateMostrar = function(req, res) {
    res.render('libro-crud-update', {
        title: 'Ejemplo CRUD libro update',
        pageHeader: {
            title: 'CRUD Update libro',
            strapline: 'Actualizacion de libro'
        },
        sidebar: "Un ejemplo de actualizacion de libro"
    });
};

module.exports.libroCrudUpdateRegistrar = function(req, res) {
	  var requestOptions, path, postdata;
	  path = "/api/libros/update";  
	  postdata = {
	    libroid: req.body.libroid,
	    titulo: req.body.titulo,   
	    autor: req.body.autor,
	    paginas: parseInt(req.body.paginas, 10)       
	  };  
	  requestOptions = {
			    url : apiOptions.server + path,   
			    method : "PUT",                  
			    json : postdata                   
			  };
			  request(      
			    requestOptions,
			    function(err, response, body) {
			      if (response.statusCode === 200) {               
			    	  res.render('generic-text', {
			  	        title: 'Operación realizada',
			  	        content: 'La operacion de actualizacion del libro ha sido registrada.'
			  	      });       
			      } else {                                         
			        _showError(req, res, response.statusCode);     
			      }
			    }
			  );
};

// DELETE
module.exports.libroCrudDeleteMostrar = function(req, res) {
    res.render('libro-crud-delete', {
        title: 'Ejemplo CRUD libro delete',
        pageHeader: {
            title: 'CRUD Delete libro',
            strapline: 'Eliminacion de libro'
        },
        sidebar: "Un ejemplo de eliminacion de libro"
    });
};

module.exports.libroCrudDeleteRegistrar = function(req, res) {
	  var requestOptions, path, postdata;
	  path = "/api/libros/delete";  
	  postdata = {
	    libroid: req.body.libroid
	  };  
	  requestOptions = {
			    url : apiOptions.server + path,   
			    method : "DELETE",                  
			    json : postdata                   
			  };
			  request(      
			    requestOptions,
			    function(err, response, body) {
			      if (response.statusCode === 204) {               
			    	  res.render('generic-text', {
			  	        title: 'Operación realizada',
			  	        content: 'La operacion de eliminacion del libro ha sido registrada.'
			  	      });       
			      } else {                                         
			        _showError(req, res, response.statusCode);     
			      }
			    }
			  );

};

module.exports.uploadMostrar = function(req, res) {
    res.render('upload', {
        title: 'Ejemplo de upload de archivo',
        pageHeader: {
            title: 'Upload archivo'
        },
        sidebar: "Un ejemplo de upload de archivo"
    });
};

module.exports.uploadEnviar = function(req, res) {
	console.log("uploadEnviar");
	console.log("nombre de archivo enviado="+req.file.originalname);
	console.log("ruta de archivo subido="+req.file.path);
	
	res.render('generic-text', {
        title: 'Operación realizada',
        content: 'La operacion de upload del archivo ha sido registrada.'
    });
};

module.exports.locationAngular = function(req, res) {
	renderLocationAngular(req, res);
}

var renderLocationAngular = function(req, res) {
    res.render('locations-list-angular', {
        title: 'Loc8r - find a place to work with Angular',
        pageHeader: {
            title: 'Angular Page',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    });
};

module.exports.grafica = function(req, res) {
	renderGrafica(req, res);
}

var renderGrafica = function(req, res) {
    res.render('angular-grafica', {
        title: 'Angular - Grafica',
        pageHeader: {
            title: 'Ejemplo de Grafica',
        },
    });
};
