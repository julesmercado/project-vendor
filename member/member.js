angular.module( 'member', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  
})
.controller( 'LoginMemberCtrl', function LoginController( $scope, $http, store, $state, Authentication ) {

/*  if(Authentication.memberExists()){
    $state.go("index")
  }
  if(!Authentication.exists()){
    $state.go("index")
  }*/
  //console.log("membersssssssss");
  $scope.user = {};

  $scope.loginMember = function() {
    //console.log($scope.user);
    Authentication.requestMember( $scope.user );  
  }

});
