const express = require('express');
const bodyParser = require('body-parser');
const mongoIO = require('./io.js');

const collectionName = 'pokemons';
const app = express();
//const port = process.env.PORT || 3000;

var staticPath = 'static';	
app.use(
	express.static(staticPath)
);

app.use(bodyParser.urlencoded({ extended: false }));  // <-- make request body data available
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.redirect('/index.html') 
})


function writeData(req, res, next) {
	try {
		 console.log(req.body)
		 mongoIO.writeItems(req.body, collectionName);
		 res.send(req.body);	 
	} catch (err) {
		 next(err);
	}
}

app.post('/api/pokemons', writeData)


function readData(req, res, next) {
	function sendDataCallback(err, data) {
		if (data) {
            res.json(data);
        } else {
            console.log('ouch');
            console.log(err);
            next(err)  
        }
	}

	mongoIO.readItem(sendDataCallback, collectionName);	
}

app.get('/api/pokemons', readData);

//app.listen(port, function() {console.log(`Final exam app listening on port ${port}!`)})


var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});