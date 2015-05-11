VendorMine.directive( 'venueDetailsButton', 
	[
		'$timeout',
		'amenityAndFeatures',
		'eventService',
		'$rootScope',
		'$state',
		function directive( timeout, amenityAndFeatures, eventService, $rootScope, $state ){
			return {
				
				"restrict": "A",
				"template": "<a ng-click='goToBookForm()' class='btn btn-cta'>Book this venue</a>",
				"link": function link( scope, element, attribute ){
				
					/*Init*/
					venuesNow = eventService.getVenue();
					scope.venuesNow = venuesNow;
					var venue = scope.venuesNow.name;

					scope.goToBookForm = function goToBookForm(){
						console.log( venuesNow );
						amenityAndFeatures.getAmenityAndFeatures(venuesNow.id,function (error, data) {
								if(error){
									console.error(error)
								}else{
									//console.log( data );
									scope.initialize = {
										amenities: data.amenities,
										rooms: data.rooms
									};
									$rootScope.$broadcast('amenities', scope.initialize, venuesNow );	
								}
							});
						
						$state.go( 'index.landPage.bookform', { venue: venue } );

						//$('#quick-view-details').modal();
						/**/
						
					};
				}
			}
		}
	] )