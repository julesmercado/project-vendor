VendorMine.directive( 'venuesPanel', 
	[
		'Authentication',
		'eventService',
		'$state',
		'venueFactory',
		function directive( Authentication, eventService, $state, venueFactory ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/venues-panel-template.html",
				"link": function link( scope, element, attribute ){
					scope.quickPeek = function quickPeek(){
						$('#quick-view-details').modal();
						//console.log("aw");
					};
					scope.bookVenue = function bookVenue( index, id, venue ){
						Authentication.setView();
						//console.log(scope.venues[index]);
						venueFactory.getVenues( id, function( error, data ){
							console.log(data);
						} );
						eventService.setVenue( venue );
						$state.go( 'index.view', {id: id} );
					};
							
				}
			}
		}
	] )