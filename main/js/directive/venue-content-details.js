VendorMine.directive( 'venueContentDetails', 
	[
		function directive( store, Authentication ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/venue-content-template.html",
				"link": function link( scope, element, attribute ){
					
				}
			}
		}
	] )