VendorMine.factory('safeApply', 
	[
		'$rootScope',
		function($rootScope) {
		    return function($scope, fn) {
		        var phase = $scope.$rootScope.$$phase;
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
			return {
				getVenues: function venueFactory( id, callback ){
					$http.get( "http://demo-otter.herokuapp.com/vendormines/get/venue/details/" + id )
						.success( function onSuccess( result ){
							callback( null, result );
						} )
						.error( function onError( error ){
							callback( error );
						} );

				} 
			}
			
		}
	]);
VendorMine.factory('getSecondExperience', 
	[
		'$http',
		function factory( $http ){

			return {
				getSecondExperience: function ( callback ){
					var promise = $http.get("http://demo-otter.herokuapp.com/vendormines/get_experience")
									.success(function( data ){
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
VendorMine.factory('getLocation', 
	[
		'$http',
		function factory( $http ){

			return {
				locations: function ( callback ){
					var promise = $http.post("http://demo-otter.herokuapp.com/vendormines/get_cities")
									.success(function( data ){
										var location = data;
								        //console.log(data)
										return location;
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
					var promise = $http.get("http://demo-otter.herokuapp.com/vendormines/get_amenities")
									.success(function( data ){
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
		'spinnerService',
		function service( $http , spinnerService ){

			return {
				getPostFilter: function( dataFirst, callback ){
					if(dataFirst){
							spinnerService.show( 'landPageSpinner' );
						var promise = $.post( "http://demo-otter.herokuapp.com/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest" : dataFirst.est_guest
							}
						)
						.success( function(data){
							callback(null, data)
							spinnerService.hide( 'landPageSpinner' );
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
						var promise = $.post( "http://demo-otter.herokuapp.com/vendormines/venues",
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
						
						var promise = $.post( "http://demo-otter.herokuapp.com/vendormines/show",
							{
								"id": id
							})
							.success( function(data){
								callback( null, data );
							} );
						return promise;
					}	
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
						url: "http://demo-otter.herokuapp.com/vendormines/book/check/",
						data: {
							date: dataVendor.original_date,
							room_id: dataVendor.rooms
						}
					})
					.success( function(data){
						console.log( data );
						if( data.status==true ){
							
							$.ajax( {
								type: "POST",
								url: "http://demo-otter.herokuapp.com/vendormines/",
								data: dataVendor
								})
							.success( function(data){
								console.log(data);
								var amenityAndFeatures = data;
								return amenityAndFeatures;
							} )
							.error( function(error){
								return error;
							} );
							
						}else{
							alert( "The rooms are unfortunately unavailable. Please change your booking" );
						}
					} )
					.error( function(error){
						alert( "Oops! Something went wrong. Check you connection" )
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