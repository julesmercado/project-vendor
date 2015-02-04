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

VendorMine.controller( 'bookController', 
	[
		'$scope',
		'$route',
		'$rootScope',
		'bookVendorVenues',
		'amenityAndFeatures',
		'$timeout',
		function bookController( $scope, $route, $rootScope, bookVendorVenues, amenityAndFeatures, timeout ){  

			$scope.$on( 'Venues', function(event, data){	
				$rootScope.venuesNow = data[$route.current.params.id];
			} );

			$scope.getDetails = function(){
				amenityAndFeatures.getAmenityAndFeatures($rootScope.venuesNow.id, function(error, data){
					if(error){
						console.error(error)
					}else{
						timeout(function() {
							$scope.initialize = {
								amenities: data.amenities,
								rooms: data.rooms
							};
							$rootScope.$broadcast('amenities', $scope.initialize, $rootScope.venuesNow );
						}, 0);
						
					}
				});
				
			};
			$scope.tabBook = 1;

			$scope.setTabBook = function setTabBook(tab){
				$scope.tabBook = tab;
				//
			};
			
		}
	] );


VendorMine.controller( 'filterFormController', 
	[
		'$scope',
		'$route',
		'$timeout',
		'$location',
		'$rootScope',
		'getExperience',
		'getAmenities',
		'postFilter',
		'postFilterResolver',
		'getAmenitiesResolver',
		'getSecondExperienceResolver',
		'postFilterAmenities',
		'amenityAndFeatures',
		function filterFormController( $scope, $route, $timeout, $location, $rootScope, getExperience, getAmenities, postFilter, postFilterResolver, getAmenitiesResolver, getSecondExperienceResolver, postFilterAmenities, amenityAndFeatures){
			$scope.initialize = {
					experience: getSecondExperienceResolver.map(function (w) {
			            return w.name;
			        }),
					amenities: getAmenitiesResolver.map(function (w) {
			            return {name: w.name, id: w.id, selected: false};
			        })
			};
			
			$scope.filters = {
				"exp": $route.current.params.exp,
				"city_address": $route.current.params.location,
				"est_guest": $route.current.params.guest
			};	
			
			postFilter.getPostFilter( $scope.filters, function(error, data){
				if(error){
					
				}else{
					var venues = data;
					$scope.venues = venues;
					$scope.$apply();
				}
				return venues;
			} );

			$scope.secondPageSelection = {
					"exp": "", 
					"city_address" : "", 
					"est_guest": $scope.filters.est_guest,
					"amenities" : []
			};

			$scope.bookVenue = function bookVenue( index, id ){
				$timeout( function(){
					$rootScope.$broadcast( 'Venues', $scope.venues );
				}, 100 );
				$location.path( "view/" + index  );
			};
			
			$scope.change = function change( id, selected ){
				
			};

			$scope.secondFilter = function secondFilter(){
				$scope.secondPageSelection.amenities = $scope.initialize.amenities.map(function( element, index , array){
					if(element.selected==true){
						var indexAmenities = "";
						return indexAmenities + element.id;
					}
				}).filter(function (w, idx, arr) {
					if(w==undefined){
						
					}else{
						return w;
					}
			            	
			     });
				
				postFilterAmenities.getPostFilterAmenities( $scope.secondPageSelection, function(error, data){
					if(error){
						
					}else{
						$scope.venues = data;
						
						
						$scope.$apply();
					}
				} )
			};
			
		}
	] );