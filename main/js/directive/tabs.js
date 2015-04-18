VendorMine.directive( 'tabs', 
	[
		'features',
		function directive( features ){
			return {
				"restrict": "A",
				"controller": function controller( $scope ){
					$scope.tabBook = 1;
					$scope.checker = $scope.tabBook == 1 || $scope.tabBook == 4;

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
					$scope.traverseBack = function traverseBack(tab){
						if( $scope.tabBook==1 ){
							console.log("aw");
						}else{
							$scope.tabBook -= 1;
						}
						
					};
					$scope.traverseForward = function traverseForward(tab){
						if( $scope.tabBook==4 ){
							console.log("aw");
						}else{
							$scope.tabBook += 1;
						}

					};
				},
				"link": function link( scope, element, attribute ){
					

				}
			}
		}
	] )