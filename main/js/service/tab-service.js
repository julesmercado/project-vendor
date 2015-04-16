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
						$http.post( "https://demo-otter.herokuapp.com/vendormines/verify/dates",
							{
								"date": date,
								"venue_id": id
								}
						)
						.success( function(data){
							count = num;
							if( count == 1 ){
								amenitiesAndRooms = data;
							}else if( count == 2){
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
								
							}
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
				var grabCarKey = "";
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
						grabCarKey = key;
						console.log( grabCarKey );
						
					},
					setSkyEyeOK: function setSkyEyeOK( date, timeOne, timeTwo ){
						skyEye = Math.random();
						skyEyeKey.date = formatter(date);
						skyEyeKey.time = timeOne + "-" + timeTwo;
						console.log( skyEyeKey.date );
						console.log( skyEyeKey.time );
						
					},

					// Cancel
					setGrabCarCancel: function setGrabCarCancel(  ){
						grabCarKey = "";
					},
					setSkyEyeCancel: function setSkyEyeCancel(  ){
						skyEyeKey = "";
					},

					// Getter
					getGrabCarKey: function getGrabCarKey(  ){
						return grabCarKey;
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