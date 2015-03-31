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
						console.log("aw");
					};
					scope.bookVenue = function bookVenue( index, id ){
						Authentication.setView();
						//console.log(scope.venues[index]);
						eventService.setVenue( scope.venues[index] );
						$state.go( 'index.view', {id: id} );
					};
							
				}
			}
		}
	] )