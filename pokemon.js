const express = require('express');
const bodyParser = require('body-parser');
const mongoIO = require('./io.js');
const mongoDB = require('mongodb');

const collectionName = 'pokemons';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));  // <-- make request body data available
app.use(bodyParser.json())

var staticPath = 'static';	
app.use(
	express.static(staticPath)
);

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

function writeData(req, res, next) {
	try {
	//	console.log(req.body)
		mongoIO.writeItems(req.body, collectionName);
	//	res.send(req.body);	
	} catch (err) {
		//WOM console.log('Err: writeData ');
		next(err);
	}
	res.redirect('/pokemon.html')
}

// WOM change api NAME
app.post('/api/pokemons', writeData)


/*app.get('/', function(req, res) {
    res.redirect('/pokemon.html')
}) */


function readData(req, res, next) {
	function sendDataCallback(err, data) {
		if (err) {
            console.log('ouch');
            console.log(err);
		}  else  {
		res.json(data);
		}
	}

	mongoIO.readItem(sendDataCallback, collectionName);	
}

app.get('/api/pokemons', readData)

function deleteData(req, res, next) { 
    try {
      var title = req.body.title;
      console.log(`Trying to Delete: ${title}`);
      mongoIO.deleteItem({title: req.body.title});
        //res.send({ _id: mongoDB.ObjectID(req.body._id) });
       req.body.status = 'deleted';
       console.log(`Deleted ${title}`);
       res.send(req.body);   
    } catch (e) {
        next(`Ops! ${e}`);
    }
    
}
 
app.delete('/api/pokemons', deleteData);
 
//console.log("Listening ");
app.listen(port, function() {console.log(`Final exam app listening on port ${port}!`)})