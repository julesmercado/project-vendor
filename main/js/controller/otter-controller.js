VendorMine.controller( 'viewController', 
	[
		'$scope',
		'state',
		'Authentication',
		function headerController( $scope, state, Authentication ){
			
		}
	] );
VendorMine.controller('landPageController', 
	[
		'$scope',
		'$http',
		'postFilter',
		'$rootScope',
		'$location',
		'$state',
		'Authentication',
		function landPageController( $scope, http, postFilter, $rootScope, $location, state, Authentication ) {
			
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
		}
	] );

VendorMine.controller( 'LoginBetaCtrl', [
    '$scope',
    '$http',
    'store',
    '$state',
    'Authentication',
    function LoginController( $scope, $http, store, $state, Authentication ) {

       

        $scope.user = {};
        $scope.$watch('user.exp', function(){
          //console.log("exp");
        })
        $scope.login = function login() {
          Authentication.requestUser( $scope.user );  
          
        }

  }
]);
VendorMine.controller( 'LoginMemberCtrl', 
	function LoginController( $scope, $http, store, $state, Authentication ) {

	  $scope.user = {};

	  $scope.loginMember = function() {
	    //console.log($scope.user);
	    Authentication.requestMember( $scope.user );  
	  }

});
VendorMine.controller( 'filterFormController', 
	[
		'$scope',
		'$stateParams',
		'$state',
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
		'eventService',
		'Authentication',
		'$state',
		'otterFees',
		function filterFormController( $scope, $stateParams, $state, $timeout, $location, $rootScope, getExperience, getAmenities, postFilter, postFilterResolver, getAmenitiesResolver, getSecondExperienceResolver, postFilterAmenities, amenityAndFeatures, eventService, Authentication, state, otterFees){
			otterFees.resetSkyEye();
			otterFees.resetGrabCar();
			$scope.skyEye = otterFees.getSkyEye();
			$scope.grabCar = otterFees.getGrabCar();

			$scope.$watch( function(){
				return otterFees.getTotal();
			}, function( newvalue, oldvalue ){
				if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
			        $scope.total = otterFees.getTotal();
			    }
			} );

			
			$scope.initialize = {
					experience: getSecondExperienceResolver.map(function (w) {
			            return w.name;
			        }),
					amenities: getAmenitiesResolver.map(function (w) {
			            return {name: w.name, id: w.id, selected: false};
			        })
			};
			
			$scope.filters = {
				"exp": $stateParams.experience,
				"city_address": $stateParams.location,
				"est_guest": $stateParams.guest
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
				Authentication.setView();
				console.log($scope.venues[index]);
				eventService.setVenue( $scope.venues[index] );
				$state.go( 'index.view', {id: id} );
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