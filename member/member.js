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
.controller( 'LoginMemberCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.loginMember = function() {
    console.log($scope.user);
    $.post( 
      "https://demo-otter.herokuapp.com/vendormines/venues", 
      $scope.user
    )
    .success( function( response ) {
      console.log("member");
      store.set('jwt', response.data);
      $state.go('index');
    })
    .error( function( error ) {
      alert( error.data );
    });
  }

});
