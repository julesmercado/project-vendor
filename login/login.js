angular.module( 'login', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/',
    controller: 'LoginBetaCtrl',
    templateUrl: 'login/login.html'
  });
})
.controller( 'LoginBetaCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {};
  $scope.$watch('user.exp', function(){
    console.log("exp");
  })
  $scope.login = function login() {
    $.post( 
      "http://demo1290827.mockable.io/venue/get/data", 
      $scope.user
    )
    .success( function( response ) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      console.log(response.data);
      store.set('jwt', response.data.token);
      //$state.go('index');
    })
    .error( function( error ) {
      alert( error.data );
    });
  }

});
