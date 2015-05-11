VendorMine.directive( 'venueContentDetails', 
	[
		function directive( store, Authentication ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/venue-content-template.html",
				"link": function link( scope, element, attribute ){
					scope.venueImage = [
							'img/venue/kitchen_adventurer_caramel.jpg',
							'img/venue/kitchen_adventurer_cheesecake_brownie.jpg',
							'img/venue/kitchen_adventurer_donut.jpg',
							'img/venue/kitchen_adventurer_donut.jpg'
					];
				}
			}
		}
	] )