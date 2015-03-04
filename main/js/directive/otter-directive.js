VendorMine.directive( 'headerDirective', 
	[

		'$stateParams',
		function directive( $stateParams ){
			return {
				
				"restrict": "A",
				"controller": "headerController",
				"templateUrl": "main/js/template/tab.html",
				"link": function link( scope, element, attribute ){
					scope.member = {
							memberExperience: $stateParams.memberExperience,
							memberLocation: $stateParams.memberLocation,
							memberGuest: $stateParams.memberGuest
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
						$scope.member = {
							memberExperience: $stateParams.memberExperience,
							memberLocation: $stateParams.memberLocation,
							memberGuest: $stateParams.memberGuest,
						};
						
						
							
						
						console.log($scope.initialize.experience);
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
VendorMine.directive( 'bookEvent', 
	[
	'amenityAndFeatures',
	'$rootScope',
	'$stateParams',
	'eventService',
	'$timeout',
	'$state',
	'Authentication',
		function directive( amenityAndFeatures, $rootScope, $stateParams, eventService, timeout, $state, Authentication ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": function link( scope, element, attribute ){
					//if member is not logged in AND view is not set
					if( !Authentication.memberExists() && !Authentication.viewExists() ){
			          $state.go("index")
			        }
					var venuesNow = {};

					venuesNow = eventService.getVenue();
					scope.getDetails = function(){
						$('#quick-view-details').modal();
						timeout( function(){
						amenityAndFeatures.getAmenityAndFeatures(venuesNow.id, function(error, data){
							if(error){
								console.error(error)
							}else{
								timeout(function() {
									scope.initialize = {
										amenities: data.amenities,
										rooms: data.rooms
									};
									$rootScope.$broadcast('amenities', scope.initialize, venuesNow );
								}, 0);
								
							}
						});
						
						}, 2000);
						
					};
					scope.tabBook = 1;

					scope.setTabBook = function setTabBook(tab){
						scope.tabBook = tab;
						//
					};
					scope.setAddons = function setAddons(tab){
						scope.thirdPartyAddons = tab;
						//
					};
					
				}
			}
		}
	] )
VendorMine.directive( 'amenitiesDetails', 
	[
		'bookVendorVenues',
		'$filter',
		'flash',
		function directive(bookVendorVenues, $filter, flash){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": function link( $scope, element, attribute ){
					$scope.opened = {
						first: false,
						second: false,
						third: false
					};
					$scope.addons = {
						grabCar: false,
						skyEye: false
					}
					$scope.dates = {
						original_date: ""
					};
					 $scope.$watch('dates.original_date', function( newValue, oldValue ) {
					 	if( newValue != oldValue && ( typeof newValue == "object" ) ){
					 		var dateOriginal = $filter('date')($scope.dates.original_date, 'yyyy-MM-dd');
					 		console.log( dateOriginal );
					 		flash('error', 'Something went wrong…');
					 	}
					       console.log( typeof newValue);
					       console.log(oldValue);
					 });
					$scope.$on('amenities', function(event, data, venue){
						$scope.amenities = data;
						$scope.venue = venue;
						console.log(venue);
						
						$scope.formFields.venue_id = $scope.venue.id;
						$scope.amenityAndFeatures = {
							amenities: $scope.amenities.amenities.map(function(w){
								return {name: w.name, id: w.id, selected: false};
							}),
							rooms: $scope.amenities.rooms.map(function(w){
								return {name: w.name, id: w.id, selected: false};
							})
						};
						
					});
					$scope.formFields = {
						name: "",
						email: "",
						contact_no: "",
						expected_guest: "",
						original_date: "",
						amenities: [],
						rooms: []
					};
					$scope.toggleMin = function() {
					    $scope.minDate = $scope.minDate ? null : new Date();
					  };
					  $scope.toggleMin();

					$scope.open = function($event,open) {
					    $event.preventDefault();
					    $event.stopPropagation();

					    $scope.opened[open] = true;
					    
					};

					  $scope.dateOptions = {
					    formatYear: 'yy',
					    startingDay: 1
					  };

					$scope.selectAmenity = function selectAmenity( id ){
						if($scope.selectedAmenity.length == 0){
							$scope.selectedAmenity.push( id );
							
						}else{
							$scope.selectedAmenity.map( function(w, index){
								if(w==id){
									$scope.selectedAmenity.splice(index, 1)
								}else{

								}
								
							} );
						}
					};
					$scope.setTabAmenities = function(){
						
					}

					$scope.checkThisAmenities = function checkThisAmenities( num ){
						if($scope.tabAmenities == num){
							
							return true;
						}else{
							return false;
						}
						
					};

					$scope.checkThis = function checkThis( num ){
						if($scope.tabBook == num){
							
							return true;
						}else{
							return false;
						}
						
					};

					$scope.bookVendor = function bookVendor(){
						$scope.formFields.amenities = $scope.amenityAndFeatures.amenities.map(function( element, index , array){
							if(element.selected==true){
								var indexAmenities = "";
								return indexAmenities + element.id;
							}
						}).filter(function (w, idx, arr) {
							if(w==undefined){
								
							}else{
								return w;
							}
					            	
					     });
						$scope.formFields.rooms = $scope.amenityAndFeatures.rooms.map(function( element, index , array){
							if(element.selected==true){
								var indexAmenities = "";
								return indexAmenities + element.id;
							}
						}).filter(function (w, idx, arr) {
							if(w==undefined){
								
							}else{
								return w;
							}
					            	
					     });
						$scope.formFields.original_date = $filter('date')($scope.dates.original_date, 'yyyy-MM-dd');
						bookVendorVenues( $scope.formFields );
						
						$.modal.close();
					};
				}
			}
		}
	] )