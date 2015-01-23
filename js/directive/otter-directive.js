VendorMine.directive( 'headerDirective', 
	[
		function directive(){
			return {
				
				"restrict": "A",
				"controller": "headerController",
				"templateUrl": "js/template/tab.html",
				"link": function link( scope, element, attribute ){
					
					
				}
			}
		}
	] )
VendorMine.directive( 'landPageDirective', 
	[
		function directive(){
			return {
				
				"restrict": "A",
				"controller": "landPageController",
				"templateUrl": "js/template/land-page-template.html",
				"link": function link( scope, element, attribute ){
					
					
				}
			}
		}
	] )

VendorMine.directive( 'filterFormDirective', 
	[
		function directive(){
			return {
				
				"restrict": "A",
				"controller": "filterFormController",
				"link": function link( scope, element, attribute ){
					
					
				}
			}
		}
	] )

VendorMine.directive( 'venueDirective', 
	[
		function directive(){
			return {
				
				"restrict": "A",
				"controller": "venueController",
				"templateUrl": "js/template/venue-template.html",
				"link": function link( scope, element, attribute ){
					
					
				}
			}
		}
	] )