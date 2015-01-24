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

VendorMine.controller( 'bookController', 
	[
		'$scope',
		'$route',
		'$rootScope',
		'bookVendorVenues',
		function bookController( $scope, $route, $rootScope, bookVendorVenues ){
			$scope.tabBook = 1;
			
			$scope.$on( 'Venues', function(event, data){	
				$rootScope.venuesNow = data[$route.current.params.id];
				
				/*console.log($route.current.params.id);
				console.log(data);*/

				//$rootScope.amenityAndFeatures = getAmenityAndFeaturesResolver;
			} );
			$scope.formFields = {
				venue_id: $rootScope.venuesNow.id,
				name: "",
				email: "",
				contact_no: "",
				expected_guest: ""/*,
				original_date: "",
				second_date: "",
				third_date: "",
				amenenities: [],
				rooms: []*/
			};

			$scope.setTabBook = function setTabBook(tab){
				$scope.tabBook = tab;
				console.log($rootScope.venuesNow);
			};

			$scope.setTabAmenities = function setTabAmenities(tab){
				$scope.tabAmenities = tab;
				console.log($scope.tabAmenities);
			};

			$scope.checkThisAmenities = function checkThisAmenities( num ){
				if($scope.tabAmenities == num){
					
					return true;
				}else{
					return false;
				}
				
			};

			$scope.checkThis = function checkThis( num ){
				if($scope.tabBook == num){
					
					return true;
				}else{
					return false;
				}
				
			};

			$scope.bookVendor = function bookVendor(){
				bookVendorVenues( $scope.formFields );
				$.modal.close();
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
		function filterFormController( $scope, $route, $timeout, $location, $rootScope, getExperience, getAmenities, postFilter, postFilterResolver, getAmenitiesResolver, getSecondExperienceResolver ){
			$scope.initialize = {
					experience: getSecondExperienceResolver.map(function (w) {
			            return w.name;
			        }),
					amenities: getAmenitiesResolver.map(function (w) {
			            return {name: w.name, selected: false};
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
					$scope.$apply();
				}
				return venues;
			} );

			$scope.secondPageSelection = {
					"exp": "", 
					"city_address" : "", 
					"amenities" : []
			};

			$scope.bookVenue = function bookVenue( index ){
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
						return indexAmenities + index;
					}
				}).filter(function (w, idx, arr) {
					if(w==undefined){
						
					}else{
						return w;
					}
			            	
			     });
				postFilter.getPostFilter( $scope.secondPageSelection, function(error, data){
					if(error){
						console.log(error);
					}else{
						$scope.venues = data;
						console.log($scope.venues);
						$scope.$apply();
					}
				} )
			};
			
		}
	] );