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
		'experienceService',
		'$timeout',
		function directive( experienceService, timeout ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": {
					pre: function link( scope, element, attribute ){
						experienceService.setExperienced(scope);
					
					},
					post: function link( scope, element, attribute ){
						timeout( function(){
							scope.initialize.experience = experienceService.getExperienced();
						}, 500 );
						
					}
				}
				
			}
		}
	] )
VendorMine.directive( 'landPageDirective', 
	[
		'$location',
		'getExperience',
		'experienceService',
		'$timeout',
		'$state',
		'$stateParams',
		function directive( $location, getExperience, experienceService, timeout, $state, $stateParams ){
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
						
						$scope.setFirst= function( obj ){
							alert(obj);
							$state.go('filter', {experience: obj.exp});
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
								grabCar: ""
							};
								
					}
				}
			}
		}
	] )

