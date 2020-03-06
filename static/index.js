// Frontend
$(document).ready(function (){
	// WOM  - delete console.log
	console.log('Test frontend!');

	function updatePage(pok) {
		var ul = $("#pokemons");
		ul.append(`<li> Name: ${pok.name}</li>`);
		ul.append(`<li> Height: ${pok.height} cm</li>`);
		ul.append(`<li> Weight: ${pok.weight} kg</li>`);
		ul.append(`<li> URL: ${pok.url}</li>`);
	}

	function readData() {
		$.get('/api/pokemons').done(
			function(data) {
				console.log(data);
				var ul = $("#pokemons");
				for (var pok of data) {
					updatePage(pok)
				} 
			}
		)
	}
	readData()

	var button = $("input[type='button']");
	button.on('click', writeData)
	
	function writeData() {
		var nameField = $("input[name='Name']");
		var heightField = $("input[name='Height']");
		var weightField = $("input[name='Weight']");
		var urlField = $("input[name='ImageURL']");
		var data = {
			name: nameField.val(), 
			height: heightField.val(), 
			weight: weightField.val(),
			url: urlField.val(), 
		}

		$.post('/api/pokemons', data).done(
			function (data, status, req) {
// WOM  - delete console.log
 			console.log('Create a new line in DB');
			updatePage(data);
			nameField.val('');
			heightField.val('');
			weightField.val('');
			urlField.val('');			
		}
		).fail(function (req, status, err) {
			alert('Erro - writeData - new line');
		})		
	}

})