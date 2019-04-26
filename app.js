

const express = require('express'); 

const multer = require('multer');

const ejs =require('ejs');

const connection = require('express')


const path =require('path');

// init app
const myapp =express();
//ejs


//storage

const uploads = multer.diskStorage({
	destination: './resources/upload/',
	filename: function(req,file,cb) {
		cb(null,file.fieldname + '_' + Date.now() 
			+path.extname(file.originalname));
	}

});

//init upload
const upload = multer ({
	storage: uploads,
	fileFilter: function(req,file, cb){

		fileTypeCheck(file,cb);

	}
}).single('myimage');

function fileTypeCheck(file,cb){
			const filetypes = /jpeg|jpg|png/;
			const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

			const mimetype = filetypes.test(file.mimetype);

			if(mimetype && extname)	{
				return cb(null,true);
			}	else{
				cb('Error: Images only');
			}

		}



// folder where view files are kept

myapp.use(connection.static( path.join(__dirname,'resources')));
myapp.set ('views',__dirname+ '/views')

myapp.set('view engine', 'ejs');


	
myapp.get('/',(req,res) => res.render('index'));

myapp.post('/upload',(req,res) => {

	upload(req,res ,(err) => {

		if(err){
			res.render('index',{
				msg: 'Error: No file Selected'
			});

		}else {
			console.log(req.file);
			res.send(' Image Uploaded');
		}

	})

});

const port = process.env.PORT || 7000

myapp.listen(port,()=> {
  console.log('Server has started')
});
