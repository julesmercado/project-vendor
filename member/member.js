angular.module( 'member', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('member', {
    url: '/member',
    controller: 'LoginMemberCtrl',
    templateUrl: 'member/member.html'
  });
})
.controller( 'LoginMemberCtrl', function LoginController( $scope, $http, store, $state, Authentication ) {

  if(Authentication.memberExists()){
    $state.go("index")
  }
  if(!Authentication.exists()){
    $state.go("index")
  }
  //console.log("membersssssssss");
  $scope.user = {};

  $scope.loginMember = function() {
    //console.log($scope.user);
    Authentication.requestMember( $scope.user );  
  }

});
