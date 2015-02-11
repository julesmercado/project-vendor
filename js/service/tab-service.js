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
VendorMine.service('eventService', 
	[
		function service(  ){
			
			var Venue = {};

				return {
					getVenue: function getTab( ){
						return Venue;
					},
					setVenue: function setEvent( venue ){
						Venue = venue;
					}
					
				}
			
		}
	]);
VendorMine.service('experienceService', 
	[
	'getExperience',
		function service( getExperience ){
			var experience = "";

			return {
				getExperienced: function getExperienced( ){
					return experience;
				},
				setExperienced: function setExperienced(){
					console.log("first");
					getExperience(function(data){
						experienced = data.map(function (w) {
						    return w.name;
						});
						experience = experienced;
						console.log(experience);
					});
				}
			}
			
		}
	]);