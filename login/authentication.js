/*angular.module( 'login')
	.factory( 'authentication', [
		'$q',
		'$http',
		'store',
		function authentication( $q, $http, store ){
			var authenticatedUser = null;

			return {
				loginBeta: function( credentials ){
					$.post( 
				      "http://demo1290827.mockable.io/venue/get/data", 
				      credentials
				    )
				    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
				      console.log(response.data);

				      authenticatedUser = response.data;
				      
				      store.set('jwt', response.data.token);
				      //$state.go('index');
				    })
				    .error( function( error ) {
				      alert( error.data );
				    });
				},
				
				loginMember: function( credentials ){

				},

				getUser: function(){
					return authenticatedUser;
				},

				userExist: function(){
					return authenticatedUser != null;
				},

				logout: function(){
			        authenticatedUser = null;
			    },

			}
		}
] );*/