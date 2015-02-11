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
VendorMine.directive( 'bookEvent', 
	[
	'amenityAndFeatures',
	'$rootScope',
	'$route',
	'eventService',
	'$timeout',
		function directive( amenityAndFeatures, $rootScope, $route, eventService, timeout ){
			return {
				
				"restrict": "A",
				"transclude": true,
				"template": "<div ng-transclude></div>",
				"link": function link( scope, element, attribute ){
					var venuesNow = {};

					console.log("aw");
					venuesNow = eventService.getVenue();

					scope.getDetails = function(){
						amenityAndFeatures.getAmenityAndFeatures(venuesNow[$route.current.params.id].id, function(error, data){
							if(error){
								console.error(error)
							}else{
								timeout(function() {
									scope.initialize = {
										amenities: data.amenities,
										rooms: data.rooms
									};
									$rootScope.$broadcast('amenities', scope.initialize, venuesNow[$route.current.params.id] );
								}, 0);
								
							}
						});
						
					};
					scope.tabBook = 1;

					scope.setTabBook = function setTabBook(tab){
						scope.tabBook = tab;
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
		function directive(bookVendorVenues, $filter){
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
					$scope.dates = {
						original_date: "",
						second_date: "",
						third_date: ""
					};
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
						second_date: "",
						third_date: "",
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
						$scope.formFields.second_date	= $filter('date')($scope.dates.second_date, 'yyyy-MM-dd');
						$scope.formFields.third_date	= $filter('date')($scope.dates.third_date, 'yyyy-MM-dd');
						bookVendorVenues( $scope.formFields );
						
						$.modal.close();
					};
				}
			}
		}
	] )