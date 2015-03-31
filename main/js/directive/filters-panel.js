VendorMine.directive( 'filtersPanel', 
	[
		'postFilterAmenities',
		function directive( postFilterAmenities ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/filters-panel-template.html",
				"link": function link( scope, element, attribute ){
					scope.secondPageSelection = {
							"exp": "", 
							"city_address" : "", 
							"est_guest": scope.filters.est_guest,
							"amenities" : []
					};

					scope.secondFilter = function secondFilter(){
						scope.secondPageSelection.amenities = map( scope.initialize.amenities );
						
						postFilterAmenities.getPostFilterAmenities( scope.secondPageSelection, function(error, data){
							if(error){
								
							}else{
								scope.venues = data;
								
								
								scope.$apply();
							}
						} )
					};
				}
			}
		}
	] )