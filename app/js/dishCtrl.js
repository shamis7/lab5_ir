// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.dish = Dinner.Dish.get({id:$routeParams.dishId});

	$scope.getNumberOfGuests = function () {
		return Dinner.getNumberOfGuests();
	}

	$scope.addDishToMenu = function () {
		Dinner.addDishToMenu($scope.dish);
	}

	$scope.removeDishFromMenu = function () {
		Dinner.removeDishFromMenu($scope.dish);
	}

	$scope.isAddedToMenu = function () {
		return Dinner.isAddedToMenu($scope.dish);
	}

	$scope.getDishPrice = function () {
		return Dinner.getPriceOfDish($scope.dish).toFixed(2);
	}

	$scope.getIngredientQuantity = function (quantity) {
		return (quantity * $scope.getNumberOfGuests());
	}

	$scope.getIngredientPrice = function (quantity) {
		return (quantity * $scope.getNumberOfGuests()).toFixed(2);
	}
});