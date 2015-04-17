VendorMine.directive( 'errorMessage', 
	[	
		function directive(  ){
			return {
				"scope": {
					"errorMessage": "@",
				},
				"restrict": "E",
				"template": "{{errorMessage}}",
				"link": function link( scope, element, attribute ){
					
				}
			}
		}
	] )