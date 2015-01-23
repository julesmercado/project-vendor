VendorMine.controller( 'myController', 
	[
		'$scope',
		function headerController( $scope ){
			
		}
	] );
VendorMine.controller( 'headerController', 
	[
		'$scope',
		'tabService',
		'venueFactory',
		function headerController( $scope, tabService, venueFactory ){
			$scope.log = 1;
			$scope.tab = tabService.getTab();

			$scope.getVenueSuppliers = function getVenueSuppliers(){
				venueFactory( function onData( error, data ){
					if( error ){
						console.log( error );
						return data = "null";
					}else{
						var dataVenue = data;
						$scope.venueSuppliers = dataVenue;	
					}
				} );

			};
			$scope.setSupplierBookButton = function setSupplierBookButton(){
				$scope.supplierBookButton = true;
			};

			$scope.setTab = function setTab( tab ){

				tabService.setTab(tab);
				$scope.tab = tabService.getTab();
				$scope.getVenueSuppliers();	
			};
		}
	] );

VendorMine.controller('landPageController', 
	[
		'$scope',
		'$http',
		'postFilter',
		'$rootScope',
		'$location',
		'getExperience',
		function landPageController( $scope, http, postFilter, $rootScope, $location, getExperience ) {
			$scope.initialize = {
					tab: 1,
					experience: ""
			};
			if($scope.bookingFormFirstPage==undefined){
				getExperience( function(data){
					$scope.initialize.experience = data.map(function (w) {
					    return w.name;
					});
				} )
			}
			
			$scope.firstPageSelection = {
					"exp": "", 
					"city_address" : "", 
					"est_guest" : ""
			};
			
			$scope.change = function change( id, selected ){
			};
			
			$scope.setFirst= function( obj ){
				$location.path( "filter/" + obj.exp + "/location/" + obj.location + "/guest/" + obj.guest );
			};
		}
		    
	]);

VendorMine.controller( 'venueController', 
	[
		'$scope',
		function venueController( $scope ){

		}
	] );

VendorMine.controller( 'filterFormController', 
	[
		'$scope',
		'$route',
		'getExperience',
		'getAmenities',
		'postFilter',
		'postFilterResolver',
		'getAmenitiesResolver',
		'getSecondExperienceResolver',
		function filterFormController( $scope, $route, getExperience, getAmenities, postFilter, postFilterResolver, getAmenitiesResolver, getSecondExperienceResolver ){
			$scope.initialize = {
					experience: getSecondExperienceResolver.map(function (w) {
			            return w.name;
			        }),
					amenities: getAmenitiesResolver.map(function (w) {
			            return {name: w.name, selected: w.selected};
			        })
			};

			$scope.filters = {
				"exp": $route.current.params.exp,
				"city_address": $route.current.params.location,
				"est_guest": $route.current.params.guest
			};	
			
			postFilter.getPostFilter( $scope.filters, function(error, data){
				if(error){
					console.log(error);
				}else{
					var venues = data;
					$scope.venues = venues;
					console.log(data);
					$scope.$apply();
				}
				return venues;
			} );

			$scope.change = function change( id, selected ){
			};

			$scope.members = "Hello MAgs";
			
		}
	] );