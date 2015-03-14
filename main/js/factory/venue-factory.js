'use strict';

VendorMine.factory('RouteFilter', function Routefilter($location) {
    var filters = [];

    var getFilter = function(route)
    {
        //console.log(filters);
        //console.log(route);
        for (var i = filters.length - 1; i >= 0; i--) {
            for (var j = filters[i].routes.length - 1; j >= 0; j--) {

                if(matchRoute(filters[i].routes[j], route))
                {
                    return filters[i];
                }
            };
        };
    }

    var matchRoute = function(filterRoute, route)
    {
        if(route instanceof RegExp)
        {
            return route.test(filterRoute);
        }

        else
        {
            return route === filterRoute;
        }
    }

    return {
        canAccess: function(route)
        {
            //console.log("routeFilter.canAccess");
            var filter = getFilter(route);

            return filter.callback();
        },
        
        register: function(name, routes, callback, redirectUrl)
        {
            //console.log("routeFilter.register");
            redirectUrl = typeof redirectUrl !== "undefined" ? redirectUrl : null;

            filters.push({
                name: name,
                routes:routes,
                callback: callback,
                redirectUrl: redirectUrl
            });
        },

        run: function(route)
        {
            //console.log("routeFilter.run");
            //console.log(route);
            var filter = getFilter(route);

            if(filter != null && filter.redirectUrl != null)
            {
                // User can access this page
                if(! filter.callback())
                {
                    $location.path(filter.redirectUrl);
                }
            }
        }
    }
  });

VendorMine.factory('Authentication', function Authentication($q, $http, $timeout, store, $state) {
	
    var authenticatedUser = store.get('beta');
    var memberUser = store.get('member');
    var setView = null;

    return  {
    	setView: function(){
    		//console.log("set");
    		setView = true;
    	},
    	viewExists: function(){
    		return setView != null;
    	},
        requestUser: function( credentials )
        {
            //console.log("authentication.requestUser");
            var deferred = $q.defer();

            $.get( 
		      "http://demo1290827.mockable.io/venue/get/data", 
		      credentials
		    )
		    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		      //console.log(response.data);

		      authenticatedUser = response.data;
		      
		      store.set('beta', response.data);
		      $state.go('index');
		    })
		    .error( function( error ) {
		      alert( error.data );
		    });

            return deferred.promise;
        },

        requestMember: function( credentials )
        {
            var deferred = $q.defer();

            $.get( 
		      "http://demo1290827.mockable.io/venue/get/data", 
		      credentials
		    )
		    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		      //console.log(response.data);

		      memberUser = response.data;
		      store.set('member', response.data);
		      $state.go('index');
		    })
		    .error( function( error ) {
		      alert( error.data );
		    });

            return deferred.promise;
        },

        getUser: function()
        {
            //console.log("authentication.getUser");
            return authenticatedUser;
        },

        getMember: function()
        {
            //console.log("authentication.getUser");
            return memberUser;
        },

        memberExists: function()
        {
            //console.log("authentication.exists");
            
            return memberUser != null;
        },
        exists: function()
        {
            //console.log("authentication.exists");
            return authenticatedUser != null;
        },

        login: function(credentials)
        {
            var deferred = $q.defer();

            $http.post('/auth/login', credentials).success(function(user)
            {
                if(user)
                {
                    authenticatedUser = user;
                    deferred.resolve(user);
                }
                else
                {
                    deferred.reject('Given credentials are incorrect');
                }

            }).error(function(error)
            {
                deferred.reject(error);
            });

            return deferred.promise;
        },


        logout: function()
        {
            authenticatedUser = null;
        },

        isDeveloper: function()
        {
            return this.exists() && authenticatedUser.type == 'developer';
        }
    }
  });

VendorMine.factory('safeApply', 
	[
		'$rootScope',
		function($rootScope) {
		    return function($scope, fn) {
		        var phase = $scope.$root.$$phase;
		        if(phase == '$apply' || phase == '$digest') {
		            if (fn) {
		                $scope.$eval(fn);
		            }
		        } else {
		            if (fn) {
		                $scope.$apply(fn);
		            } else {
		                $scope.$apply();
		            }
		    }
    }
}]);
VendorMine.factory('venueFactory', 
	[
		'$http',
		function service( $http ){
			var url = "http://demo1290827.mockable.io/venue/get/data";

			return function venueFactory( callback ){
				$http.get( url )
					.success( function onSuccess( result ){
						callback( null, result );
					} )
					.error( function onError( error ){
						callback( error );
					} );

			} 
			
		}
	]);
VendorMine.factory('getExperience', 
	[
		'$http',
		function factory( $http ){

			return function getExperience( callback ){
				$.get( "https://demo-otter.herokuapp.com/vendormines/get_experience",
					function(data){
						callback(data);
					} );

			} 
			
		}
	]);
VendorMine.factory('getSecondExperience', 
	[
		'$http',
		function factory( $http ){

			return {
				getSecondExperience: function ( callback ){
					var promise = $.get("https://demo-otter.herokuapp.com/vendormines/get_experience", 
							function( data ){
								var experience = data.map(function (w) {
						            return w.name;
						        });
								return experience;
							});
					return promise;
				} 
			}
			
		}
	]);
VendorMine.factory('getAmenities', 
	[
		'$http',
		function factory( $http ){

			return {
				getAmenities: function ( callback ){
					var promise = $.get("https://demo-otter.herokuapp.com/vendormines/get_amenities", 
							function( data ){
								var amenities = data.map(function (w) {
							        	return {name: w.name, selected: false};
							    	});
								return amenities;
							});
					return promise;
				} 
			}
			
		}
	]);

VendorMine.service('postFilter', 
	[
		'$http',
		function service( $http ){

			return {
				getPostFilter: function( dataFirst, callback ){
					if(dataFirst){
						var promise = $.post( "https://demo-otter.herokuapp.com/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest" : dataFirst.est_guest
							}
						)
						.success( function(data){
							callback(null, data)
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);
VendorMine.service('postFilterAmenities', 
	[
		'$http',
		function service( $http ){

			return {
				getPostFilterAmenities: function( dataFirst, callback ){
					if(dataFirst){
						var promise = $.post( "https://demo-otter.herokuapp.com/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest"	: dataFirst.est_guest,
								"amenities" : dataFirst.amenities
							}
						)
						.success( function(data){
							callback(null, data)
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);

VendorMine.service('amenityAndFeatures', 
	[
		'$http',
		function service( $http ){
			return {
				getAmenityAndFeatures: function( id, callback ){
					if(id){
						var promise = $.ajax( {
										url: "https://demo-otter.herokuapp.com/vendormines/show",
										type: "POST",
										data: {
											id: id
										}
										})
						.success( function(data){
							callback(null, data);
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);
VendorMine.service('bookVendorVenues', 
	[
		'$http',
		function service( $http ){
			return function bookVendorVenues( dataVendor ){
					$.ajax( {
						type: "POST",
						url: "https://demo-otter.herokuapp.com/vendormines/",
						data: dataVendor
						})
					.success( function(data){
						alert(data.confirmation);
						var amenityAndFeatures = data;
						return amenityAndFeatures;
					} )
					.error( function(error){
						return error;
					} );
				}
				
			
		}
	]);
VendorMine.service('staticVenue', 
	[
		'$http',
		function service( $http ){
			var staticData = [{
				$$hashKey: "00B",
				address: "Divisoria",
				city_address: "Cagayan de Oro",
				contact: "09263593778",
				created_at: "2015-01-19T13:36:22.833Z",
				email: "eebasadre20@gmail.com",
				id: 4,
				max_guest: 50,
				min_guest: 20,
				name: "Dynasty Hotel",
				updated_at: "2015-01-19T13:36:22.833Z",
				venue_code: null
			},{
				$$hashKey: "00A",
				address: "Divisoria",
				city_address: "Cagayan de Oro",
				contact: "09263593778",
				created_at: "2015-01-19T13:36:22.833Z",
				email: "eebasadre20@gmail.com",
				id: 4,
				max_guest: 50,
				min_guest: 20,
				name: "VIP Hotel",
				updated_at: "2015-01-19T13:36:22.833Z",
				venue_code: null
			}];
			return {
					getStaticData: function getStaticData(){
						return staticData;
					}
				}
				
			
		}
	]);