VendorMine.directive( 'tabs', 
	[
		'features',
		function directive( features ){
			return {
				"restrict": "A",
				"controller": function controller( $scope ){
					$scope.tabBook = 1;

					$scope.setTabBook = function setTabBook(tab){
						$scope.tabBook = tab;
						$scope.selectedAmenitiesAndRooms = features.getAmenitiesAndFeatures();

						
					};
					$scope.checkThis = function checkThis( num ){
						if($scope.tabBook == num){
							
							return true;
						}else{
							return false;
						}
						
					};

				},
				"link": function link( scope, element, attribute ){
					

				}
			}
		}
	] )