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
.controller( 'LoginBetaCtrl', [
    '$scope',
    '$http',
    'store',
    '$state',
    'Authentication',
    function LoginController( $scope, $http, store, $state, Authentication ) {

        if(Authentication.exists()){
          $state.go("index")
        }

        $scope.user = {};
        $scope.$watch('user.exp', function(){
          //console.log("exp");
        })
        $scope.login = function login() {
          Authentication.requestUser( $scope.user );  
          
        }

  }
]);
