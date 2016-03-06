// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  
    var numberOfGuests = 2;
    var menu = {};
    var confirmedMenu = [];

  	// Resource to get the last 25 results of a search query from
	// BigOvenApi
	this.DishSearch = $resource(
		'http://api.bigoven.com/recipes',
		{pg:1,rpp:25,api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'}
	);

	// Resource to get the dish with the specific RecipeID.
	this.Dish = $resource(
		'http://api.bigoven.com/recipe/:id',
		{api_key:'r02x0R09O76JMCMc4nuM0PJXawUHpBUL'}
	);

	// When launching the application, check the cookie to see
	// If there is any stored data from previous sessions.
	// Check the number of guests and the confirmed menu.
	if($cookieStore.get('numberOfGuests')!=undefined) {
		numberOfGuests = $cookieStore.get('numberOfGuests'); 
	}
	if($cookieStore.get('confirmedMenu')!=undefined) {
		confirmedMenu = $cookieStore.get('confirmedMenu'); 
		_.each(confirmedMenu, function (RecipeID) {
			var dish = this.Dish.get({id:RecipeID}, function () {
				menu[dish.Category] = dish;
			}, this);
		}, this);
	}

	// Sets the number of guests
	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		$cookieStore.put('numberOfGuests',num);
	}

	// Returns the number of guests
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}
	
	// Returns the full menu with all the dishes.
	this.getFullMenu = function () {
		confirmedMenu = [];
		_.each(menu, function (dish) {
			confirmedMenu.push(dish.RecipeID);
		}, this);
		$cookieStore.put('confirmedMenu',confirmedMenu);
		return menu;
	};

	// Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function () {
		ingredients = [];
		_.each(menu, function (dish) {
			_.each(dish.Ingredients, function (ingredient) {
				ingredients.push(ingredient);
			});
		});
		return _.uniq(ingredients);
	};

	// Returns the price of a specific dish (all the 
	// ingredients multiplied by number of guests).
	this.getPriceOfDish = function (dish) {
		var unitCost = 0;
		_.each(dish.Ingredients, function (ingredient) {
			unitCost += ingredient.Quantity;
		}, this);
		return unitCost * numberOfGuests;
	};

	// Returns the total price of the menu (all the 
	// ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function () {
		var cost = 0;
		_.each(menu, function (dish) {
			cost += this.getPriceOfDish(dish);
		}, this);
		return cost;
	};

	// Adds the passed dish to the menu. If the dish of that 
	// category already exists on the menu it is removed from 
	// the menu and the new one added.
	this.addDishToMenu = function (dish) {
		menu[dish.Category] = dish;
	}

	// Removes the passed dish from the menu if it is already
	// added to the menu.
	this.removeDishFromMenu = function (dish) {
		if (menu.hasOwnProperty(dish.Category)) {
			if (menu[dish.Category].RecipeID==dish.RecipeID) {
				delete menu[dish.Category];
			}
		}
	}

	// Checks if a specific dish is already added to the menu
	this.isAddedToMenu = function (dish) {
		if (menu.hasOwnProperty(dish.Category)) {
			if (menu[dish.Category].RecipeID==dish.RecipeID) {
				return true;
			}
		}
		return false;
	}
  return this;

});