VendorMine.directive( 'stepTwo', 
	[
		'features',
		function directive( features ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/step-two-template.html",
				"link": function link( scope, element, attribute ){

					scope.$on('amenities', function(event, data, venue){
						scope.amenities = data;
						scope.amenityAndFeatures = {
							amenities: scope.amenities.amenities.map(function(w){
								return {name: w.name, id: w.id, selected: false};
							}),
							rooms: scope.amenities.rooms.map(function(w){
								return {name: w.name, id: w.id, selected: false};
							})
						};
						
						features.setFeatures( scope.amenities );
						features.setAmenitiesAndFeatures( scope.amenityAndFeatures );
						
					});
					scope.selectAmenity = function selectAmenity( id ){
						if(scope.selectedAmenity.length == 0){
							scope.selectedAmenity.push( id );
							
						}else{
							scope.selectedAmenity.map( function(w, index){
								if(w==id){
									scope.selectedAmenity.splice(index, 1)
								}else{

								}
								
							} );
						}
					};
				  
				}
			}
		}
	] )