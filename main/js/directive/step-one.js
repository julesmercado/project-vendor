VendorMine.directive( 'stepOne', 
	[
		'dateSetter',
		'$filter',
		function directive( dateSetter, $filter ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/step-one-template.html",
				"link": function link( scope, element, attribute ){
					
					scope.$watch('formFields.grabCar', function( newValue, oldValue ) {
					 	// console.log( scope.grabCarForm );
					 });
					scope.$watch('dates.original_date', function( newValue, oldValue ) {
					 	if( newValue != oldValue && ( typeof newValue == "object" ) ){
					 		var dateOriginal = $filter('date')( scope.dates.original_date, 'yyyy-MM-dd' );
					 		//console.log( dateOriginal );
					 		dateSetter.checkDate( dateOriginal, scope.venue.id, 1 );
					 		//console.log(scope.venue);
					 	}
					 });

					scope.$on('amenities', function(event, data, venue){
						scope.venue = venue;
						//console.log(venue);
						scope.formFields.venue_id = scope.venue.id;
						
						
					});
	//	DatePicker
					scope.toggleMin = function() {
					    scope.minDate = scope.minDate ? null : new Date();
					  };
					  scope.toggleMin();

					scope.open = function($event,open) {
					    $event.preventDefault();
					    $event.stopPropagation();

					    scope.opened[open] = true;
					    
					};
					scope.opened = {
						first: false
					};
					scope.dates = {
						original_date: ""
					};			  	
				}
			}
		}
	] )
