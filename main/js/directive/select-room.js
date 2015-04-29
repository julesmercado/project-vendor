VendorMine.directive( 'selectRoom', 
	[
		'selectRoom',
		function directive( selectRoom ){
			return {
				"scope": {
					"room": "=",
					"date": "="
				},
				"restrict": "A",
				"link": function link( scope, element, attribute ){
					scope.$watch( 'room.selected', function( newValue, oldValue ){
						if( newValue!=oldValue ){
							console.log( "dirty" );
							if(  newValue==true ){
								selectRoom.pending( scope.room, scope.date )
							}
							if( newValue==false ){
								selectRoom.available( scope.room, scope.date )
							}
						}else{
							console.log( "pristine" );
						}
					} )
				}
			}
		}
	] );
