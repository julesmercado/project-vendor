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

				return {
					getFeatures: function getTab( ){
						return tab;
					},
					setFeatures: function setTab( data ){
						features = data;
						return features;
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
VendorMine.service('experienceService', 
	[
	'getExperience',
	'safeApply',
		function service( getExperience, safeApply ){
			var experience = "";

			return {
				getExperienced: function getExperienced( ){
					return experience;
				},
				setExperienced: function setExperienced(scope){
					//console.log("first");
					getExperience(function(data){
						scope.experienced = data.map(function (w) {
						    return w.name;
						});
						experience = scope.experienced;
						scope.$watch('experienced', function() {
							//console.log("changed");
						       safeApply(scope);
						});
						//console.log(experience);
					});

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