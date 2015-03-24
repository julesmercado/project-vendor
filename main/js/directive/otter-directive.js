VendorMine.directive( 'headerDirective', 
	[

		'store',
		'Authentication',
		function directive( store, Authentication ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/tab.html",
				"link": function link( scope, element, attribute ){
					scope.member = store.get( 'member' );
					//console.log( scope.member );
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
						$scope.member = {
							memberExperience: $stateParams.memberExperience,
							memberLocation: $stateParams.memberLocation,
							memberGuest: $stateParams.memberGuest,
						};
						
						
							
						
						//console.log($scope.initialize.experience);
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
	'amenityAndFeatures',
	'bookVendorVenues',
	'$rootScope',
	'$filter',
	'eventService',
	'$timeout',
	'$state',
	'Authentication',
	'otterSpeachBubble',
	'otterFees',
	'flash',
	'features',
	'$http',
	'dateSetter',
		function directive( amenityAndFeatures, bookVendorVenues, $rootScope, $filter, eventService, timeout, $state, Authentication, otterSpeachBubble, otterFees, flash, features, $http, dateSetter ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"link": {
					post: function link( scope, element, attribute ){
							//if member is not logged in AND view is not set
							/*if( !Authentication.memberExists() && !Authentication.viewExists() ){
					          $state.go("index");
					        }*/
		//	otter Speech			        
					       
					        scope.otterSpeech = otterSpeachBubble.getSpeechOtter();
							
	
		//	Init			
							if(Authentication.memberExists()){
								$("#grabCar").removeAttr('disabled');
							}

							scope.skyEye = otterFees.getSkyEye();
							scope.grabCar = otterFees.getGrabCar();
							scope.test = "This is a test";
							var venuesNow = {};
							venuesNow = eventService.getVenue();
							scope.venuesNow = venuesNow;
							scope.tabBook = 1;

							scope.setTabBook = function setTabBook(tab){
								//console.log("jules is ok");
								scope.tabBook = tab;
								//
							};
							
		//	DatePicker
							scope.toggleMin = function() {
							    scope.minDate = scope.minDate ? null : new Date();
							  };
							  scope.toggleMin();

							scope.open = function($event,open) {
							    $event.preventDefault();
							    $event.stopPropagation();

							    scope.opened[open] = true;
							    
							};
							scope.opened = {
								first: false
							};
							scope.dates = {
								original_date: ""
							};

							/*scope.dateOptions = {
							   formatYear: 'yy',
							   startingDay: 1
							};*/
		// 	Tabs
							scope.checkThis = function checkThis( num ){
								if(scope.tabBook == num){
									
									return true;
								}else{
									return false;
								}
								
							};
							scope.getDetails = function getDetails(){
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
								
								}, 0);
								
							};
		//	step 1
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
							scope.$watch('formFields.grabCar', function( newValue, oldValue ) {
							 	console.log(scope.grabCarForm);
							 });
							init( scope, Authentication );
							scope.$watch('dates.original_date', function( newValue, oldValue ) {
							 	if( newValue != oldValue && ( typeof newValue == "object" ) ){
							 		var dateOriginal = $filter('date')( scope.dates.original_date, 'yyyy-MM-dd' );
							 		console.log( dateOriginal );
							 		dateSetter.checkDate( dateOriginal, 1 );
							 		
							 	}
							 });
		//	step 2
							scope.$on('amenities', function(event, data, venue){
								scope.amenities = data;
								scope.venue = venue;
								//console.log(venue);
								
								scope.formFields.venue_id = scope.venue.id;
								scope.amenityAndFeatures = {
									amenities: scope.amenities.amenities.map(function(w){
										return {name: w.name, id: w.id, selected: false};
									}),
									rooms: scope.amenities.rooms.map(function(w){
										return {name: w.name, id: w.id, selected: false};
									})
								};
								
								features.setFeatures( scope.amenities );
								console.log( scope.amenities );
								
							});
							scope.selectAmenity = function selectAmenity( id ){
								if(scope.selectedAmenity.length == 0){
									scope.selectedAmenity.push( id );
									
								}else{
									scope.selectedAmenity.map( function(w, index){
										if(w==id){
											scope.selectedAmenity.splice(index, 1)
										}else{

										}
										
									} );
								}
							};
		//	step 3
			// 	fees
							scope.$watch( function(){
								return otterFees.getSkyEye();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.skyEye = otterFees.getSkyEye();
							    }
							} );
							scope.$watch( function(){
								return otterFees.getGrabCar();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.grabCar = otterFees.getGrabCar();
							    }
							} );
							scope.$watch( function(){
								return otterFees.getTotal();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.total = otterFees.getTotal();
							    }
							} );
			//	addons
							scope.$watch( function(){
								return scope.addOns.grabCar;
							}, function( newvalue, oldvalue ){
								if( newvalue != oldvalue && newvalue == false ){
									scope.addOns.msgGrabCar = false;
									otterFees.resetGrabCar();
								}
							} );
							scope.$watch( function(){
								return scope.addOns.skyEye;
							}, function( newvalue, oldvalue ){
								if( newvalue != oldvalue && newvalue == false ){
									scope.addOns.msgSkyEye = false;
									otterFees.resetSkyEye();
								}
							} );

							scope.addOns = {
								grabCar: false,
								skyEye: false,
								msgGrabCar: false,
								msgSkyEye: false,
								okGrabCar: function(){
									scope.addOns.msgGrabCar = true;
									otterFees.setGrabCar();
								},
								cancelGrabCar: function(){
									scope.addOns.msgGrabCar = false;
									otterFees.resetGrabCar();
								},
								okSkyEye: function(){
									scope.addOns.msgSkyEye = true;
									otterFees.setSkyEye();
								},
								cancelSkyEye: function(){
									scope.addOns.msgSkyEye = false;
									otterFees.resetSkyEye();
								}
							};
		//	button
							scope.bookVendor = function bookVendor(){
								//console.log( scope.amenityAndFeatures );
								//console.log( scope.formFields );
								scope.formFields.amenities = scope.amenityAndFeatures.amenities.map(function( element, index , array){
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
								scope.formFields.rooms = scope.amenityAndFeatures.rooms.map(function( element, index , array){
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
								scope.formFields.original_date = $filter('date')(scope.dates.original_date, 'yyyy-MM-dd');
								dateSetter.checkDate( scope.formFields.original_date, 2 );
								if( dateSetter.getStatus() ){
									bookVendorVenues( scope.formFields );
									dateSetter.cancelAll();
								}else{
									console.log("Unsuccessful");
									dateSetter.cancelAll();
								}
								
								
								$.modal.close();
							};
					}
				}
			}
		}
	] )

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function init(scope, Authentication){
	if( Authentication.memberExists() ){
		scope.formFields.grabCar = "";
	}else{
		scope.formFields.grabCar = makeid();
	}
}