VendorMine.controller('landPageController', 
	[
		'$scope',
		'getSecondExperienceResolver',
		'getLocation',
		function landPageController( $scope, getSecondExperienceResolver, getLocation ) {
			var data = getSecondExperienceResolver.data;
			$scope.experience = data.map(function (w) {
	            return w.name;
	        });
	        $scope.locations = getLocation.data.map(function (w) {
	            return w.name;
	        });
	        //console.log( $scope.location);
		}
		    
	]);
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
        $scope.login = function login( name ) {
          Authentication.requestUser( $scope.user, name );  
          
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
		'postFilter',
		'getAmenitiesResolver',
		'getSecondExperienceResolver',
		'otterFees',
		function filterFormController( $scope, $stateParams, postFilter, getAmenitiesResolver, getSecondExperienceResolver, otterFees){
			
//	OtterFees
			$scope.$watch( function(){
				return otterFees.getTotal();
			}, function( newvalue, oldvalue ){
				if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
			        $scope.total = otterFees.getTotal();
			    }
			} );
//	Initialize	
			otterFees.resetSkyEye();
			otterFees.resetGrabCar();
			$scope.skyEye = otterFees.getSkyEye();
			$scope.grabCar = otterFees.getGrabCar();

			$scope.initialize = {
					experience: getSecondExperienceResolver.data.map(function (w) {
			            return w.name;
			        }),
					amenities: getAmenitiesResolver.data.map(function (w) {
			            return {name: w.name, id: w.id, selected: false};
			        })
			};
			$scope.filters = {
				"exp": $stateParams.experience,
				"city_address": $stateParams.location,
				"est_guest": $stateParams.guest
			};	
			//console.log($scope.filters);
			postFilter.getPostFilter( $scope.filters, function(error, data){
				if(error){
					
				}else{
					var venues = data;
					$scope.venues = venues;
					$scope.$apply();
				}
				return venues;
			} );	
					
		}
	] );
function map( amenities ){
	amenities.map(function( element, index , array){
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
};