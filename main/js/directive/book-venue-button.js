VendorMine.directive( 'bookVenueButton', 
	[
		'dateSetter',
		'$filter',
		'bookVendorVenues',
		'addOnService',
		function directive( dateSetter, $filter, bookVendorVenues, addOnService ){
			return {
				
				"restrict": "A",
				"template": "<button type='submit' class='btn btn-proceed' ng-click='bookVendor()''>Book Venue</button>",
				"link": function link( scope, element, attribute ){
					scope.bookVendor = function bookVendor(){
						scope.tabBook = 4;

						//scope.formFields.amenities = map( scope.amenityAndFeatures.amenities );
						scope.formFields.rooms = map( scope.amenityAndFeatures.room );

						// Only get Addons Key if client clicks ok
						scope.formFields.grabCar = addOnService.getGrabCar();
						scope.formFields.skyEye = addOnService.getSkyEyeBooking();
						
						//dateSetter.checkDate( scope.formFields.original_date, 2 );
						/*if( dateSetter.getStatus() ){
							
							dateSetter.cancelAll();
						}else{
							console.log("Unsuccessful");
							dateSetter.cancelAll();
						}*/
						
						bookVendorVenues( scope.formFields );
						console.log( scope.formFields );
						//console.log( scope.amenityAndFeatures.room );
						$.modal.close();
					};
				}
			}
		}
	] );
function map( array ){
	var result;
	result = array.map(function( element, index , array){
		if(element.selected==true){
			var indexAmenities = "";
			return indexAmenities + element.id;
		}
	}).filter(function (w, idx, arr) {
		return result = ( w==undefined ) ? "" : w;
     });
	console.log( result	);
	return result;
}
