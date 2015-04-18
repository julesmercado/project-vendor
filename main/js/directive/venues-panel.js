VendorMine.directive( 'venuesPanel', 
	[
		'Authentication',
		'eventService',
		'$state',
		function directive( Authentication, eventService, $state ){
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
						eventService.setVenue( venue );
						$state.go( 'index.view', {id: id} );
					};
							
				}
			}
		}
	] )