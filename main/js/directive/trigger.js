VendorMine.directive( 'trigger', 
	[
		function directive( ){
			return {
				"restrict": "A",
				"link": function link( scope, element, attribute ){
					scope.$watch( 'form.skyEye.timeOne', function( newvalue, oldvalue ){
						if( scope.form.skyEye.timeOne>scope.form.skyEye.timeTwo )
							{scope.comparison = true;}
						if( scope.form.skyEye.timeOne<scope.form.skyEye.timeTwo )
							scope.comparison = false;
					} );
					scope.$watch( 'form.skyEye.timeTwo', function( newvalue, oldvalue ){
						if( scope.form.skyEye.timeOne>scope.form.skyEye.timeTwo )
							{scope.comparison = true;}
						if( scope.form.skyEye.timeOne<scope.form.skyEye.timeTwo )
							{scope.comparison = false;}
					} );
				}
			}
		}
	] );