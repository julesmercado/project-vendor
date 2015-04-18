VendorMine.directive( 'headerDirective', 
	[

		'store',
		'Authentication',
		function directive( store, Authentication ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/tab.html",
				"link": function link( scope, element, attribute ){
					scope.member = Authentication.getMember();
					scope.memberCheckExist = function memberCheckExist(){
						return Authentication.memberExists();
					};
				}
			}
		}
	] )
VendorMine.directive( 'experienceDirective', 
	[
		'$timeout',
		function directive( timeout ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": function link( scope, element, attrs ){

				}
				
			}
		}
	] )
VendorMine.directive( 'landPageDirective', 
	[
		'$location',
		'$timeout',
		'$state',
		'$stateParams',
		function directive( $location, timeout, $state, $stateParams ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": {
					pre: function link( $scope, element, attribute ){
						$scope.initialize = {
								tab: 1,
								experience: ""
						};		
						$scope.firstPageSelection = {
								"exp": "", 
								"city_address" : "", 
								"est_guest" : ""
						};
						
						$scope.change = function change( id, selected ){
						};
						
						

					}
				}
			}
		}
	] )
VendorMine.directive( 'bookEvent', 
	[
	
	'otterSpeachBubble',
	'otterFees',
		function directive( otterSpeachBubble, otterFees ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"link": {
					pre: function link( scope, element, attribute ){
		//	otter Speech			        
					       
					        scope.otterSpeech = otterSpeachBubble.getSpeechOtter();
							
	
		//	Init			
							scope.skyEye = otterFees.getSkyEye();
							scope.grabCar = otterFees.getGrabCar();
							var venuesNow = {};
							
							scope.formFields = {
								name: "",
								email: "",
								contact_no: "",
								expected_guest: "",
								original_date: "",
								amenities: [],
								rooms: [],
								skyEye: "",
								grabCar: {
									key: "",
									price: ""
								}
							};
								
					}
				}
			}
		}
	] )

