VendorMine.directive( 'footer', 
	[
		function directive( postFilterAmenities ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/footer-template.html",
				"link": function link( scope, element, attribute ){
					
				}
			}
		}
	] )