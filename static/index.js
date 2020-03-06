// Frontend
$(document).ready(function (){
	// WOM  - delete console.log
	console.log('Test frontend!');
	var pokemon_list = ("#pokemons");

	function updatePage(pok) {
		var _id = pok._id;
		var ul = $("#pokemons");
		ul.append(`<li> Name: ${pok.name}</li>`);
		ul.append(`<li> Height: ${pok.height} cm</li>`);
		ul.append(`<li> Weight: ${pok.weight} kg</li>`);
		ul.append(`<li> <img src="${pok.url}" alt="${pok.name}"></li>`);
		ul.append('......................................');
        
		var button = document.createElement('button');
		    button.id = _id;
		    button.name = `${pok.name}`;
		    button.value = `${pok.name}`;
		    button.addEventListener('click', deleteData);
		    button.innerText = 'O';

		    $(`#li-${_id}`).append(button);
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
		console.log("Test write");
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

	function deleteData(e) {
        let id = e.target.id;
        $.ajax({
            url: '/api/pokemons',
            type: 'DELETE',
            data: {_id: id},
        }).done(function (data, status, req) {
            $(`ul#${id}`).remove();
        }).fail(function (req, status, err) {
            console.log(`Error Delete - status: ${status} error: ${err}`);
        })         
    }
})