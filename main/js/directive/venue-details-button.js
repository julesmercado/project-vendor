VendorMine.directive( 'venueDetailsButton', 
	[
		'$timeout',
		'amenityAndFeatures',
		'eventService',
		'$rootScope',
		function directive( timeout, amenityAndFeatures, eventService, $rootScope ){
			return {
				
				"restrict": "A",
				"template": "<a ng-click='getDetails()' class='venue-details btn btn-proceed'>Book this venue</a>",
				"link": function link( scope, element, attribute ){
				
					/*Init*/
					venuesNow = eventService.getVenue();
					scope.venuesNow = venuesNow;

					scope.getDetails = function getDetails(){
						$('#quick-view-details').modal();
						timeout( function(){
						amenityAndFeatures.getAmenityAndFeatures(venuesNow.id,function (error, data) {
								if(error){
									console.error(error)
								}else{
									timeout(function() {
										scope.initialize = {
											amenities: data.amenities,
											rooms: data.rooms
										};
										$rootScope.$broadcast('amenities', scope.initialize, venuesNow );
									}, 0);
									
								}
							});
						
						}, 0);
						
					};
				}
			}
		}
	] )