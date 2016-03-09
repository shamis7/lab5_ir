// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,$routeParams,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.dish = Dinner.Dish.get({id:$routeParams.dishId});

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
  $scope.addDishToMenu = function () {
    Dinner.addDishToMenu($scope.dish);
    }

  $scope.removeDishFromMenu = function () {
    Dinner.removeDishFromMenu($scope.dish);
    }

   $scope.getFullMenu = function () {
     return Dinner.getFullMenu();
    }
    
   $scope.getTotalMenuPrice = function () {
     return Dinner.getTotalMenuPrice();
    }

  $scope.isAddedToMenu = function () {
     return Dinner.isAddedToMenu($scope.dish);
    }

  $scope.getDishPrice = function (dish) {
     return Dinner.getPriceOfDish(dish).toFixed(2);
    }

  $scope.getIngredientQuantity = function (quantity) {
     return (quantity * $scope.getNumberOfGuests());
    }

  $scope.getIngredientPrice = function (quantity) {
     return (quantity * $scope.getNumberOfGuests()).toFixed(2);
    }
});