VendorMine.directive( 'bookedRoom', 
	[
		'dateSetter',
		function directive( dateSetter ){
			return {
				"restrict": "E",
				"link": function link( scope, element, attribute ){
					scope.errorMessage = "Booked for this date";
					scope.bookedRoom = [];
					scope.message = false;
					scope.$watch( function(){
						return dateSetter.getData();
					}
					, function( newvalue, oldvalue ){
						scope.bookedRoom = newvalue.booked_room;
						//console.log(scope.bookedRoom);
						/*scope.bookedRoom = [{
					        "id": 1,
					        "name": "Room-301",
					        "venue_id": 1,
					        "created_at": "2015-02-11T03:31:44.597Z",
					        "updated_at": "2015-02-11T03:31:44.597Z",
					        "min_guest": null,
					        "price": null,
					        "price_model": null,
					        "status": "vacant"
					    }, {
					        "id": 2,
					        "name": "Room-302",
					        "venue_id": 1,
					        "created_at": "2015-02-11T03:31:57.068Z",
					        "updated_at": "2015-02-11T03:31:57.068Z",
					        "min_guest": null,
					        "price": null,
					        "price_model": null,
					        "status": "vacant"
					    }];*/
						scope.bookedRoom.map( function( obj , index , array ){
							if( obj.id == scope.rooms.id ){
								scope.message = true;
							}
						} )

						console.log( scope.rooms );
					} );
					//console.log(scope.room);
				}
			}
		}
	] )
