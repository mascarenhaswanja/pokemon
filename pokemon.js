const express = require('express');
const bodyParser = require('body-parser');
const mongoIO = require('./io.js');

const collectionName = 'pokemons';
const app = express();
const port = process.env.PORT || 3000;

var staticPath = 'static';	
app.use(
	express.static(staticPath)
);

app.use(bodyParser.urlencoded({ extended: false }));  // <-- make request body data available
app.use(bodyParser.json())

function writeData(req, res, next) {
	try {
		console.log(req.body)
		mongoIO.writeItems(req.body, collectionName);
		res.send(req.body);	
	} catch (err) {
		//WOM console.log('Err: writeData ');
		next(err);
	}
	res.redirect('/pokemon.html')
}

// WOM change api NAME
app.post('/api/pokemons', writeData)


app.get('/', function(req, res) {
    res.redirect('/pokemon.html')
})


function readData(req, res, next) {
	function sendDataCallback(err, data) {
		if (err) {
			next(err)
			// WOM console.log('Err: readData ');
			return
		}
		res.json(data)
	}

	mongoIO.readItem(sendDataCallback, collectionName);	
}

// WOM change api NAME
app.get('/api/pokemons', readData)


function deleteData(req, res, next) { 
    try {
        var title = req.body.title;
        console.log(`Trying to Delete: ${title}`);
        mongoIO.deleteItem({title: req.body.title});
        req.body.status = 'deleted';
        console.log(`Deleted ${title}`);
        res.send(req.body);  
    } catch (e) {
        next(`Ops! ${e}`);
    }
    
}
// WOM change api NAME
app.delete('/api/pokemons', deleteData)
 
console.log("Listening ");
app.listen(port, function() {console.log(`Final exam app listening on port ${port}!`)})