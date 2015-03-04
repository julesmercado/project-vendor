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
						console.log("Venue is set");
						return Venue;
					},
					setVenue: function setEvent( venue ){
						console.log("venue");
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
					console.log("first");
					getExperience(function(data){
						scope.experienced = data.map(function (w) {
						    return w.name;
						});
						experience = scope.experienced;
						scope.$watch('experienced', function() {
							console.log("changed");
						       safeApply(scope);
						});
						console.log(experience);
					});

				}
			}
		}
	]);