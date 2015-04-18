
VendorMine.factory('Authentication', function Authentication($q, $http, $timeout, store, $state) {
	
	var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles;

    var authenticatedUser = store.get('beta') || { username: '', role: userRoles.public };
    var memberUser = store.get('member') || { username: '', role: userRoles.public };
    var setView = null;

    function changeBetaUser( user ){
    	angular.extend( authenticatedUser, user );
    	//console.log( authenticatedUser );
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
                //console.log(authenticatedUser);
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
