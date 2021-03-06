VendorMine.service('dateSetter', 
	[
		'$http',
		function service( $http ){
			
			var dateIsOkay = false
			  , dateIsReallyOkay = false
			  , count = 0
			  , amenitiesAndRooms = {};
				return {
					checkDate: function checkDate( date, id, num ){
						//console.log( date );
						$http.post( "http://demo-otter.herokuapp.com/vendormines/verify/dates",
							{
								"date": date,
								"venue_id": id
								}
						)
						.success( function(data){
							count = num;
							if( count == 1 ){
								amenitiesAndRooms = data;
								console.log( amenitiesAndRooms );
							}/*else if( count == 2){
								if( data.status ){
									dateIsReallyOkay = true;
									//console.log( "Second ");
									//console.log( data );
									//console.log( dateIsReallyOkay );
									
								}else{
									dateIsReallyOkay = false;
									//console.log( "Second ");
									//console.log( data );
									//console.log( dateIsReallyOkay );
									
								}
								
							}*/
						} )
						.error( function(error){
							console.log(error);
						} );
					},
					getStatus: function getStatus(  ){
						/*console.log( dateIsOkay );
						console.log( dateIsReallyOkay );*/
						return dateIsOkay && dateIsReallyOkay;
					},
					cancelAll: function cancelAll( ){
						dateIsOkay = false;
						dateIsReallyOkay = false;
						count = 0;
					}, 
					getData: function getData(){
						return amenitiesAndRooms;
					}
				}
			
		}
	]);
VendorMine.service('addOnService', 
	[
		
		function service(  ){
				var grabCar = {};
				var skyEye = "";
				var skyEyeKey = {};
				function formatter( date ){
					var day = date.getDate();	
					var month = date.getMonth();
					var year = date.getFullYear();	
					var fullDate = "(dd/mm/yy)" + " " + day +"-" + (month + 1) +"-" + year;

					return fullDate;
				}
	// 	service description:
	/*
		Set addOns key only when the client clicks ok button
	*/
				return {
					// Setter
					setGrabCarOK: function setGrabCarOK( key ){
						grabCar.key = key;
						grabCar.price = 1000;
						console.log(key);
					},
					setSkyEyeOK: function setSkyEyeOK( date, timeOne, timeTwo ){
						skyEye = Math.random();
						var dateToFormate = new Date( date )
						skyEyeKey.time = "";
						if( timeOne<timeTwo ){
							skyEyeKey.date = formatter(dateToFormate);
							console.log( skyEyeKey.date );
							skyEyeKey.time = timeOne + "-" + timeTwo;
							skyEyeKey.price = 1000;
						}
						
						
					},

					// Cancel
					setGrabCarCancel: function setGrabCarCancel(  ){
						grabCarKey = {};
					},
					setSkyEyeCancel: function setSkyEyeCancel(  ){
						skyEyeKey = {};
					},

					// Getter
					getGrabCar: function getGrabCarKey(  ){
						return grabCar;
					},
					getSkyEyeKey: function getSkyEyeKey(  ){
						return skyEye;
					},
					getSkyEyeBooking: function getSkyEyeKey(  ){
						return skyEyeKey;
					}
					
				}
			
		}
	]);
VendorMine.service('spinnerService', 
	[
		function service(  ){
			
			

				return {
					show: function getTab( name ){
						angular.element( '#' + name ).attr( 'ng-show', 'true' );
						angular.element( '#' + name ).removeAttr( "class" );
						console.log( angular.element( '#' + name ).attr( 'ng-show' ) );
						console.log( angular.element( '#' + name ) );
					},
					hide: function setTab( name ){
						angular.element( '#' + name ).attr( 'ng-show', 'false' );
					}
					
				}
			
		}
	]);
VendorMine.service('dateChecker', 
	[
		function service(  ){
			
			

				return {
					getTab: function getTab( ){
						return tab;
					},
					setTab: function setTab( num ){
						tab = num;
						return tab;
					}
					
				}
			
		}
	]);
VendorMine.service('tabService', 
	[
		function service(  ){
			
			var tab = 0;

				return {
					getTab: function getTab( ){
						return tab;
					},
					setTab: function setTab( num ){
						tab = num;
						return tab;
					}
					
				}
			
		}
	]);
VendorMine.service('features', 
	[
		function service(  ){
			
			var features = {};
			var amenitiesAndFeatures = {};
			var bookedRooms = {};
			var selectedAmenitiesAndRooms = {};
				return {
					getFeatures: function getTab( ){
						return features;
					},
					setFeatures: function setTab( data ){
						features = data;
						return features;
					},
					setAmenitiesAndFeatures: function setAmenitiesAndFeatures( data ){
						amenitiesAndFeatures = data;
						bookedRooms = data.booked_rooms;
					},
					getBookedRooms: function getBookedRooms( ){
						return bookedRooms;
					},
					getWatch: function getWatch(){
						return selectedAmenitiesAndRooms;
					},
					getAmenitiesAndFeatures: function getAmenitiesAndFeatures(){
						function map( array ){
							var result;
							result = array.map(function( element, index , array){
								if(element.selected==true){
									var indexAmenities = "";
									return indexAmenities + element.name;
								}
							}).filter(function (w, idx, arr) {
								return result = ( w==undefined ) ? "" : w;
						     });
							return result;
						}
						var selectedAmenities = {};
						var selectedRooms	= {};
						

						
						//selectedAmenities = map( amenitiesAndFeatures.amenities );
						selectedRooms = map( amenitiesAndFeatures.room )
						//console.log(amenitiesAndFeatures)
						selectedAmenitiesAndRooms = {
									//amenities: selectedAmenities,
									room: selectedRooms
								};
						return selectedAmenitiesAndRooms;
					}
				}
			
		}
	]);
VendorMine.service('eventService', 
	[
		function service(  ){
			
			var Venue = {};

				return {
					getVenue: function getTab( ){
						//console.log("Venue is set");
						return Venue;
					},
					setVenue: function setEvent( venue ){
						//console.log("venue");
						Venue = venue;
					}
					
				}
			
		}
	]);
VendorMine.service( 'otterSpeachBubble', 
	[
	function service(){
		var speachArray = [
			"That is a nice place",
			"Did you know that this is the place where Emilio Aguinaldo got married?",
			"This place has been booked by famous people",
		];
		var rand = speachArray[Math.floor(Math.random() * speachArray.length)];

		return {
			getSpeechOtter: function (){
				return rand;
			}
		}
	}
	] );

VendorMine.service( 'otterFees', 
	[
	'Authentication',
	function service( Authentication ){
		var nonMemberFee = 240;
		var memberFee = 200;
		var skyEyeFee = 0;
		var grabCarFee = 0;
		var skyEye = false;
		var grabCar = false;
		return{
			getNonMemberFee: function(){
				return nonMemberFee;
			},
			getMemberFee: function(){
				return memberFee;
			},

			//skyEye
			getSkyEye: function(){
				return skyEyeFee;
			},
			setSkyEye: function(){
				//console.log("SkyEye set");
				skyEyeFee = 1500;
			},
			resetSkyEye: function(){
				skyEyeFee = 0;
				skyEye = false;
			},

			//GrabCar
			getGrabCar: function(){
				return angular.copy( grabCarFee );
			},
			setGrabCar: function(){
				//console.log("GrabCar set");
				grabCarFee = 1000;
			},
			resetGrabCar: function(){
				grabCarFee = 0;
				grabCar = false;
			},

			test: function(){
				if( Authentication.memberExists() ){
					//console.log("member exists");
				}
				if( Authentication.exists() ){
					//console.log("beta exist");
				}
			},
			getSiteFee: function(){
				if(Authentication.memberExists()){
					//console.log("member");
					return memberFee;
				}else{
					//console.log("non member");
					return nonMemberFee;
				}

			},

			getTotal: function(){
				if(Authentication.memberExists()){
					//console.log("member");
					return memberFee + skyEyeFee + grabCarFee;
				}else{
					//console.log("non member");
					return nonMemberFee + skyEyeFee + grabCarFee;
				}
			}
		}
	}
	] )