var VendorMine = angular.module( 'VendorMine', [ 
  'ngRoute', 
  'ui.router', 
  'ui.bootstrap', 
  'angularUtils.directives.dirPagination', 
  'flash',
  'angular-storage',
  'angular-jwt' ,
  'growlNotifications',
  'cc'
] );
VendorMine.config([
  '$httpProvider', 
  '$locationProvider', 
  '$routeProvider', 
  'paginationTemplateProvider', 
  '$stateProvider', 
  '$urlRouterProvider', 
  'jwtInterceptorProvider',
    function ($httpProvider, $locationProvider, $routeProvider, paginationTemplateProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider) {
      paginationTemplateProvider.setPath('/lib/dirPagination.tpl.html');

      jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('jwt');
      }

      $httpProvider.interceptors.push('jwtInterceptor');

      $urlRouterProvider.otherwise("/")
        $stateProvider.
            state("index",{ 
              url: '/index',
              templateUrl: "/partials/land-page.html",
              controller: 'landPageController'
            }).

            state("filter",{ 
              url: "/filter?experience&location&guest",
              controller: "filterFormController",
              templateUrl: '/partials/filter-page.html',
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

            state( "view", {
              url: "/view/:id",
              templateUrl: "/partials/book.html"
            } )

}]);

/*VendorMine.run(['$rootScope', function($root) {
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
}]);*/
