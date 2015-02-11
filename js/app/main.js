var VendorMine = angular.module( 'VendorMine', [ 'ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination' ] );
VendorMine.config(['$httpProvider', '$locationProvider', '$routeProvider', 'paginationTemplateProvider', function ($httpProvider, $locationProvider, $routeProvider, paginationTemplateProvider) {
  paginationTemplateProvider.setPath('/lib/dirPagination.tpl.html');
  $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.
        when("/",{ 
          templateUrl: "/partials/land-page.html"
        }).

        when("/filter/:exp/location/:location/guest/:guest",{ 
          templateUrl: function(params, path, search){
        	   return '/partials/filter-page.html'; 
          },
          controller: "filterFormController",
          resolve: {
              postFilterResolver: function( postFilter ){
                return  postFilter;
              },
              getAmenitiesResolver: function( getAmenities ){
                return getAmenities.getAmenities();
              },
              getSecondExperienceResolver: function( getSecondExperience ){
                return getSecondExperience.getSecondExperience();
              }
          } 
        }).

        when( "/view/:id", {
          templateUrl: "/partials/book.html"
        } ).

        otherwise( { redirectTo: "/" });
}]);

VendorMine.run(['$rootScope', function($root) {
  $root.$on('$routeChangeStart', function(e, curr, prev) { 
    if (curr.$$route && curr.$$route.resolve) {
      // Show a loading message until promises are not resolved
      $root.loadingView = true;
    }
  });
  $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
    // Hide loading message
    $root.loadingView = false;
  });
}]);
