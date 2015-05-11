VendorMine.directive( 'formRequirements', 
	[
		'features',
		function directive( features ){
			return {
				"restrict": "A",
				"link": function link( scope, element, attribute ){
					console.log( "Loaded Form requirement js" )
					scope.$watch( 'formStepOne.$valid', function( newValue, oldValue ){
						
						if( scope.formStepOne.$pristine == true ){
							scope.errorMessageFormOne = false;
							console.log( "errorM:" + scope.errorMessageFormOne )
						}
						if( scope.formStepOne.$pristine == false ){
							scope.errorMessageFormOne = true;
							console.log( "errorM:" + scope.errorMessageFormOne )
						}
						if( newValue != oldValue && newValue == true ){
							scope.formStepOneCheck = true;
						}
					} );
					scope.$watch( 'formRooms', function( ){
						console.log( scope.formRooms );
					} );
				}
			}
		}
	] )