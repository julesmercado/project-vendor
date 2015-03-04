angular.module( 'verify', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('verify', {
    url: '/verify',
    controller: 'VerifyCtrl',
    templateUrl: 'verify/verify.html'
  });
})
.controller( 'VerifyCtrl', function LoginController( $scope, $http, store, $state, Authentication ) {

  if(Authentication.memberExists()){
    $state.go("index")
  }
  if(!Authentication.exists()){
    $state.go("index")
  }
  $scope.user = {};

  $scope.verify = function() {
    console.log($scope.user);
    Authentication.requestMember( $scope.user );  
  }

});
