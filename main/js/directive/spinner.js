VendorMine.directive( 'spinner', 
	[
		function directive(  ){
			return {
				
				"restrict": "E",
				"template": "<img id='mySpinner' src='/img/loading-2.gif' style='padding-right: 7px;width: {{ spinnerSize }};' />",
				"link": function link( scope, element, attribute ){
					scope.loading = false;
					if (attribute.hasOwnProperty('name')) {
				        attribute.name = attribute.name.toLowerCase();
				      }
				     if (attribute.hasOwnProperty('size')) {
				        attribute.size = attribute.size.toLowerCase();
				      }
				    switch (attribute.size) {
				        case 'tiny':
				          scope.spinnerSize = '15px';
				          break;
				        case 'small':
				          scope.spinnerSize = '25px';
				          break;
				        case 'medium':
				          scope.spinnerSize = '35px';
				          break;
				        case 'large':
				          scope.spinnerSize = '64px';
				          break;
				        default:
				          scope.spinnerSize = '50px';
				          break;
				      }
				}
			}
		}
	] );