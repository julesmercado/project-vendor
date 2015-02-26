angular.module( 'login', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/',
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
})
.controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.login = function() {
    console.log($scope.user);
    $.post( 
      "https://demo-otter.herokuapp.com/vendormines/venues", 
      $scope.user
    )
    .success( function( response ) {
      console.log(response);
      store.set('jwt', response.city_address);/*
      $state.go('index');*/
    })
    .error( function( error ) {
      alert( error.data );
    });
  }

});