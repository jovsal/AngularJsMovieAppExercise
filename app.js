
var app = angular.module('myApp', []);

app.controller('customersCtrl', function($scope, $http) {

	$scope.todos= [];
	$scope.showEditToDoForm= false;
	$scope.toDoEdited= null;

	$scope.activateEditToDoForm=function (t) {
		$scope.toDoEdited = t;
		$scope.showEditToDoForm= true;
	}

	$scope.editToDoDescription=function () {
		var toDoForUpdate= {
			id:$scope.toDoEdited.id,
			description:$scope.toDoEdited.description,
			done:$scope.toDoEdited.done
		};

		$http({
			url: 'http://localhost:8080/todo/update',
			method: "POST",
			data:toDoForUpdate
		})
			.then(function(response) {
					$scope.listAllToDos();
				},
				function(response) {
					// optional
				});
		$scope.showEditToDoForm= false;
	}

	$scope.removeToDo= function (t) {
		$http.get("http://localhost:8080/todo/delete/" + t.id).then(function (response) {
			$scope.listAllToDos();
		});
	}

	$scope.makeChecked=function (t) {
		var newChecked = !t.done;

		var toDoForUpdate= {
			id:t.id ,
			description:t.description,
			done:newChecked
		};

		$http({
			url: 'http://localhost:8080/todo/update',
			method: "POST",
			data:toDoForUpdate
		})
			.then(function(response) {
					$scope.listAllToDos();
				},
				function(response) {
					// optional
				});
		$scope.showEditToDoForm= false;

	}

	$scope.listAllToDos=function(){

		$http.get("http://localhost:8080/todo/all").then(function (response) {
			var tmpToDo= {
				id:-1 ,
				description:"tmpDesc",
				done:false
			};

			$scope.todos = response.data.sort(function(a, b) {
				return a.id - b.id ;
			});

			$scope.todos.forEach(function(toDo) {
				console.log(toDo);
			});

		});
	}

	$scope.addToDo=function(){

		$http({
			url: 'http://localhost:8080/todo/add',
			method: "POST",
			data: {  'description':$scope.toDoDescription , 'done':false }
		})
			.then(function(response) {
					$scope.listAllToDos();
				},
				function(response) { // optional
				});
	}

	$scope.listAllToDos();

	$scope.printDone=function (t) {
		if(t.done==false)
			return "Done";
		else
			return "Undone";
	}

});  


