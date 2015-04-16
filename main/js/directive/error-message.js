VendorMine.directive( 'errorMessage', 
	[	
		function directive(  ){
			return {
				"scope": {
					"errorMessage": "@",
				},
				"restrict": "E",
				"template": "{{errorMessage}}",
				"link": function link( scope, element, attribute ){
					/*scope.$watch( 'timOne', function( newvalue, oldvalue ){
						console.log(scope.timeOne);
					} );*/
					scope.$on( 'timeOne', function( event, timeOne, timeTwo ){
						scope.timeOne = timeOne;
						scope.timeTwo = timeTwo;
						console.log( scope.timeOne, scope.timeTwo );
						scope.timeComparison = function(){
							scope.compared = scope.timeOne > scope.timeTwo;
							console.log(scope.timeOne > scope.timeTwo);
							console.log(scope.compared);

						}
						//scope.timeComparison();
					} );
					scope.compared=false;
							
				}
			}
		}
	] )