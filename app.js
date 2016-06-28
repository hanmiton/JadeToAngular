var express = require('express');
//dependencias proyecto principal
var path = require('path');
var logger = require('morgan');
var ingenieros = require('./bower_components/ingenieros.json');
var convenios = require('./bower_components/convenios.json');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var method_override = require("method-override");
var sizeOf    =   require( 'image-size' );
var exphbs    =   require( 'express-handlebars' );
require( 'string.prototype.startswith' );

var app_password = "1"
var Schema = mongoose.Schema;

mongoose.connect('mongodb://node:node@ds023644.mlab.com:23644/hanmilton');

var cloudinary = require("cloudinary");

cloudinary.config( {
	cloud_name: "dot6c5g5b",
	api_key: "113749932721945",
	api_secret:"bHFddfhntRfgbf0wm8Sfkr9uwzg"
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(method_override("_method"));
//app.use(method_override);//app.use(multer({dest: "./uploads"}));

var productSchemaJSON = {
	title: String,
	description: String,
	imageUrl: String,
	pricing: Number
};

var productSchema = new Schema(productSchemaJSON);

productSchema.virtual("image.url").get(function(){
	if(this.imageUrl === "" || this.imageUrl === "data.png"){
		return "default.jpg";
	}

	return this.imageUrl;
});

var Product = mongoose.model("Product", productSchema);

//app.set("view engine","jade");
app.use( express.static( __dirname + '/bower_components' ) );
//app.use(express.static("public"));
/*
app.get("/",function(req,res){
	res.render("index");
});

app.get("/menu",function(req,res){
	
	Product.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("menu/index",{ products: documento })
	});
});

app.put("/menu/:id", upload.single( 'image_avatar' ), function( req, res, next ){
	if(req.body.password == app_password){
		console.log(req.body);
		var data = {
			title: req.body.title,
			description: req.body.description,
			pricing: req.body.pricing
		};

		if(req.file.hasOwnProperty("path")){
		cloudinary.uploader.upload(req.file.path, 
			function(result){
				data.imageUrl = result.url;
				Product.update({"_id": req.params.id},data,function(product){
					res.redirect("/menu");
				});	
			}
			);
		}else{
			Product.update({"_id": req.params.id},data,function(product){
			res.redirect("/menu");
			});				
		}
		
		}else{
		res.redirect("/");
	}
});

app.get("/menu/edit/:id",function(req,res){
	var id_producto = req.params.id;

	Product.findOne({_id: id_producto},function(error,producto){
		res.render("menu/edit",{product: producto});
	});

});

app.post("/admin",function(req,res){
	if(req.body.password== app_password){
		Product.find(function(error,documento){
		if(error){ console.log(error); }
		res.render("admin/index",{ products: documento })
	});
	}else{
		res.redirect("/");
	}
});

app.get("/admin",function(req,res){
	res.render("admin/form")
});

app.post( '/menu', upload.single( 'image_avatar' ), function( req, res, next ) {
  if(req.body.password == app_password){
  	var data = {
  		title: req.body.title,
  		description: req.body.description,
  		pricing: req.body.pricing
  	}

  	var product = new Product(data);
	//console.log(req.file);
	//res.render("index");
	if(req.file.hasOwnProperty("path")){
		cloudinary.uploader.upload(req.file.path, 
			function(result){
				product.imageUrl = result.url;
				product.save(function(err){
		 			res.redirect("/menu");
		 		});
			}
			);
		}else{
			product.save(function(err){
				console.log(product);
				res.redirect("/menu");
			});
		}
		
	}else{
		res.render("menu/new");
	}

});

app.get("/menu/new", function(req,res){
	res.render("menu/new");
});


app.get("/menu/delete/:id",function(req, res){
	var id = req.params.id;

	Product.findOne({"_id": id},function(err,producto){
		res.render("menu/delete",{producto: producto});
	});
});

app.delete("/menu/:id",function(req,res){
	var id = req.params.id;
	if(req.body.password == app_password){
		Product.remove({"_id" : id},function(err){
			if(err){ console.log(err);}
			res.redirect("/menu");
		});
	}else{
		res.redirect("/menu");
	}

});*/
//get proyecto Principal

app.get('/api/ingenieros', function (req, res) {
  var type = req.query.type;

  if (type) {
    var results = ingenieros.filter(function (ingeniero) {
      return ingeniero.type.some(function (t) {
        return t.toLowerCase() === type;
      });
    });

    res.send(results);
  } else {
    res.send(ingenieros);
  }
});

app.get('/api/convenios', function (req, res) {
  var type = req.query.type;

  if (type) {
    var results = convenios.filter(function (convenio) {
      return convenio.type.some(function (t) {
        return t.toLowerCase() === type;
      });
    });

    res.send(results);
  } else {
    res.send(convenios);
  }
});

app.get('/api/convenios/:name', function (req, res) {
  var name = req.params.name;
  var results = convenios.filter(function (convenio) {
    return convenio.name.toLowerCase() === name;
  });

  if (results.length > 0) {
    res.send(results[0]);
  } else {
    res.status(404).end();
  }
});

app.get('/api/ingenieros/:name', function (req, res) {
  var name = req.params.name;
  var results = ingenieros.filter(function (ingeniero) {
    return ingeniero.name.toLowerCase() === name;
  });

  if (results.length > 0) {
    res.send(results[0]);
  } else {
    res.status(404).end();
  }
});

app.get( '/', function( req, res, next ){
  return res.render( 'index' );
});

app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {
  console.log(req.file.mimetype);
  if ( !req.file.mimetype.startsWith( 'image/' ) && !req.file.mimetype.startsWith( 'application/' )){
    return res.status( 422 ).json( {
      error : 'The uploaded file must be an image'
    } );
  }

 // var dimensions = sizeOf( req.file.path );

  /*if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
    return res.status( 422 ).json( {
      error : 'The image must be at least 640 x 480px'
    } );
  }*/

  return res.status( 200 ).send( req.file );
});
app.get( '/', function( req, res, next ){
  return res.render( 'index' );
});

app.listen(8080);	