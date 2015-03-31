VendorMine.directive( 'pdf', 
	[

		'store',
		'Authentication',
		'addOnService',
		'features',
		function directive( store, Authentication, addOnService, features ){
			return {
				"scope": {
					"venues": "=",
					"formField": "="
				},
				"restrict": "A",
				"templateUrl": "main/js/template/pdf.html",
				"link": {
					post: function link( scope, element, attribute ){
					
						scope.$watch( function(){
							return addOnService.getGrabCarKey();
						}, function( newvalue, oldvalue ){
							if( newvalue != oldvalue ){
								scope.grabCar = addOnService.getGrabCarKey();
							}
						} );
						scope.$watch( function(){
							return addOnService.getSkyEyeKey();
						}, function( newvalue, oldvalue ){
							if( newvalue != oldvalue ){
								scope.skyEye = addOnService.getSkyEyeKey();
							}
						} );

						scope.$watch( function(){
							return features.getWatch();
						}, function( newvalue, oldvalue ){
							scope.amenitiesAndRooms = oldvalue;
							console.log( scope.amenitiesAndRooms );	
						} );
					}
				}
					
			}
		}
	] )