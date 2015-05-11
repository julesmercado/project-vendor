VendorMine.directive( 'stepOne', 
	[
		'dateSetter',
		'$filter',
		function directive( dateSetter, $filter ){
			return {
				"templateUrl": "main/js/template/step-one-template.html",
				"restrict": "A",
				"link": function link( scope, element, attribute ){
					scope.datepicker = false;
					scope.$watch('formFields.grabCar', function( newValue, oldValue ) {
					 	// console.log( scope.grabCarForm );
					 });
					scope.$watch('dates.original_date', function( newValue, oldValue ) {
						if( newValue != oldValue ){

							var dateOriginal = new Date( newValue );
							var dateObj = $filter('date')( dateOriginal, 'yyyy-MM-dd' );
							scope.formFields.original_date = dateObj;
							console.log( scope.formFields )
					 		//console.log( dateObj );
					 		//console.log(scope.venue);
					 		dateSetter.checkDate( dateObj, scope.venue.id, 1 );

						}
					 });

					scope.$on('amenities', function(event, data, venue){
						/*console.log(data);
						console.log(venue);
						console.log(scope.formFields);*/
						scope.venue = venue;
						scope.formFields.venue_id = scope.venue.id;
						
					});
	//	DatePicker
					scope.toggleMin = function() {
					    scope.minDate = scope.minDate ? null : new Date();
					  };
					  scope.toggleMin();

					scope.open = function() {
						scope.datepicker = !scope.datepicker; 
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
