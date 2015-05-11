VendorMine.directive( 'stepTwo', 
	[
		'features',
		'dateSetter',
		function directive( features, dateSetter ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/step-two-template.html",
				"link": function link( scope, element, attribute ){
					
					scope.$watch( function(){
							return dateSetter.getData();
						}, function( newvalue, oldvalue ){
							var datas = newvalue;

							scope.amenities = datas;
							scope.amenityAndFeatures = {
								/*amenities: scope.amenities.amenities.map(function(w){
									return {name: w.name, id: w.id, selected: false};
								}),*/
								room: scope.amenities.room.map(function(w){
									return {name: w.name, id: w.id, selected: false, price: w.price}; 
								})
							};
							//console.log(scope.amenityAndFeatures);
							features.setFeatures( scope.amenities );
							features.setAmenitiesAndFeatures( scope.amenityAndFeatures );
						} );

					/*scope.$on('amenities', function(event, data, venue){
						console.log(data);
						
						
					});*/
					//for multiple selection delete updateSelection
					scope.updateSelection = function updateSelection( position, entities ) {

						angular.forEach(entities, function(subscription, index) {
						    if (position != index)
						      	scope.amenityAndFeatures.room[ index ].selected = false;
						});
					}
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