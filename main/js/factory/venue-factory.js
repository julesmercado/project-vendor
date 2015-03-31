
VendorMine.factory('Authentication', function Authentication($q, $http, $timeout, store, $state) {
	
	var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    var authenticatedUser = store.get('beta') || { username: '', role: userRoles.public };
    var memberUser = store.get('member') || { username: '', role: userRoles.public };
    var setView = null;

    function changeBetaUser( user ){
    	angular.extend( authenticatedUser, user );
    	console.log( authenticatedUser );
    }

    function changeMemberUser( user ){
    	angular.extend( memberUser, user );
    } 
    return  {
    	authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = authenticatedUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function( user ) {
            if( user === undefined ) {
                user = authenticatedUser;
                console.log(authenticatedUser);
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.member.title;
        },
    	setView: function(  ){
    		//console.log("set");
    		setView = true;
    	},
    	viewExists: function(  ){
    		return setView != null;
    	},
        requestUser: function( credentials )
        {
            //console.log("authentication.requestUser");
            /*var deferred = $q.defer();

            $.get( 
		      "http://demo1290827.mockable.io/venue/get/data", 
		      credentials
		    )
		    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		      console.log(authenticatedUser);
		      //changeBetaUser( response.data )
		      
		    })
		    .error( function( error ) {
		      alert( error.data );
		    });

            return deferred.promise;*/
            changeBetaUser( {
            	username: 'user',
            	role: userRoles.user
            } );
            $state.go('index.index');
        },

        requestMember: function( credentials )
        {
            /*var deferred = $q.defer();

            $.get( 
		      "http://demo1290827.mockable.io/venue/get/data", 
		      credentials
		    )
		    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		      //console.log(response.data);

		      memberUser = response.data;
		      store.set('member', response.data);
		      $state.go('index');
		    })
		    .error( function( error ) {
		      alert( error.data );
		    });

            return deferred.promise;*/
            changeMemberUser( {
            	username: 'user',
            	role: userRoles.user
            } );
            $state.go('index.index');
        },

        getUser: function()
        {
            //console.log("authentication.getUser");
            return authenticatedUser;
        },

        getMember: function()
        {
            //console.log("authentication.getUser");
            return memberUser;
        },

        memberExists: function()
        {
            //console.log("authentication.exists");
            
            return memberUser.role.title === 'user';
        },
        exists: function()
        {
            //console.log("authentication.exists");
            return authenticatedUser != null;
        }
    }
  });

VendorMine.factory('safeApply', 
	[
		'$rootScope',
		function($rootScope) {
		    return function($scope, fn) {
		        var phase = $scope.$root.$$phase;
		        if(phase == '$apply' || phase == '$digest') {
		            if (fn) {
		                $scope.$eval(fn);
		            }
		        } else {
		            if (fn) {
		                $scope.$apply(fn);
		            } else {
		                $scope.$apply();
		            }
		    }
    }
}]);
VendorMine.factory('venueFactory', 
	[
		'$http',
		function service( $http ){
			var url = "http://demo1290827.mockable.io/venue/get/data";

			return function venueFactory( callback ){
				$http.get( url )
					.success( function onSuccess( result ){
						callback( null, result );
					} )
					.error( function onError( error ){
						callback( error );
					} );

			} 
			
		}
	]);
VendorMine.factory('getSecondExperience', 
	[
		'$http',
		function factory( $http ){

			return {
				getSecondExperience: function ( callback ){
					var promise = $http.get("https://demo-otter.herokuapp.com/vendormines/get_experience")
									.success(function( data ){
										var experience = data.map(function (w) {
								            return w.name;
								        });
										return experience;
									});
					return promise;
				} 
			}
			
		}
	]);
VendorMine.factory('getAmenities', 
	[
		'$http',
		function factory( $http ){

			return {
				getAmenities: function ( callback ){
					var promise = $.get("https://demo-otter.herokuapp.com/vendormines/get_amenities", 
							function( data ){
								var amenities = data.map(function (w) {
							        	return {name: w.name, selected: false};
							    	});
								return amenities;
							});
					return promise;
				} 
			}
			
		}
	]);

VendorMine.service('postFilter', 
	[
		'$http',
		function service( $http ){

			return {
				getPostFilter: function( dataFirst, callback ){
					if(dataFirst){
						var promise = $.post( "https://demo-otter.herokuapp.com/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest" : dataFirst.est_guest
							}
						)
						.success( function(data){
							callback(null, data)
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);
VendorMine.service('postFilterAmenities', 
	[
		'$http',
		function service( $http ){

			return {
				getPostFilterAmenities: function( dataFirst, callback ){
					if(dataFirst){
						var promise = $.post( "https://demo-otter.herokuapp.com/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest"	: dataFirst.est_guest,
								"amenities" : dataFirst.amenities
							}
						)
						.success( function(data){
							callback(null, data)
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);

VendorMine.service('amenityAndFeatures', 
	[
		'$http',
		function service( $http ){
			return {
				getAmenityAndFeatures: function( id, callback ){
					if(id){
						var promise = $.ajax( {
										url: "https://demo-otter.herokuapp.com/vendormines/show",
										type: "POST",
										data: {
											id: id
										}
										})
						.success( function(data){
							callback(null, data);
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);
VendorMine.service('bookVendorVenues', 
	[
		'$http',
		function service( $http ){
			return function bookVendorVenues( dataVendor ){
					$.ajax( {
						type: "POST",
						url: "https://demo-otter.herokuapp.com/vendormines/",
						data: dataVendor
						})
					.success( function(data){
						alert(data.confirmation);
						var amenityAndFeatures = data;
						return amenityAndFeatures;
					} )
					.error( function(error){
						return error;
					} );
				}
				
			
		}
	]);
VendorMine.service('staticVenue', 
	[
		'$http',
		function service( $http ){
			var staticData = [{
				$$hashKey: "00B",
				address: "Divisoria",
				city_address: "Cagayan de Oro",
				contact: "09263593778",
				created_at: "2015-01-19T13:36:22.833Z",
				email: "eebasadre20@gmail.com",
				id: 4,
				max_guest: 50,
				min_guest: 20,
				name: "Dynasty Hotel",
				updated_at: "2015-01-19T13:36:22.833Z",
				venue_code: null
			},{
				$$hashKey: "00A",
				address: "Divisoria",
				city_address: "Cagayan de Oro",
				contact: "09263593778",
				created_at: "2015-01-19T13:36:22.833Z",
				email: "eebasadre20@gmail.com",
				id: 4,
				max_guest: 50,
				min_guest: 20,
				name: "VIP Hotel",
				updated_at: "2015-01-19T13:36:22.833Z",
				venue_code: null
			}];
			return {
					getStaticData: function getStaticData(){
						return staticData;
					}
				}
				
			
		}
	]);