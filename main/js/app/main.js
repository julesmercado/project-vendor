var VendorMine = angular.module( 'VendorMine', [ 
  'ui.router', 
  'ui.bootstrap', 
  'angularUtils.directives.dirPagination', 
  'angular-storage',
  'angular-jwt' ,
  'growlNotifications',
  'cc'
] );
VendorMine.config([
  '$httpProvider', 
  '$locationProvider', 
  'paginationTemplateProvider', 
  '$stateProvider', 
  '$urlRouterProvider', 
  'jwtInterceptorProvider',
    function ($httpProvider, $locationProvider, paginationTemplateProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider) {
      paginationTemplateProvider.setPath('/lib/dirPagination.tpl.html');
      var access = routingConfig.accessLevels;


     
      $urlRouterProvider.otherwise("/")

      //Anon Routes
        $stateProvider.
            state('login', {
              url: '/',
              controller: 'LoginBetaCtrl',
              templateUrl: 'partials/login/login.html',
              data: {
                access: access.anon
              }
            });

      //User Routes
        $stateProvider.
            state("index",{ 
              abstract: true,
              template: "<ui-view/>",
              data: {
                  access: access.user
              }
            }).

            state("index.index",{ 
              url: '/index',
              templateUrl: "/partials/land-page.html",
              controller: 'landPageController',
              resolve: {
                getSecondExperienceResolver: function( getSecondExperience ){
                    return getSecondExperience.getSecondExperience();
                  }
              }
            }).

            state("index.filter",{ 
              url: "/filter?experience&location&guest",
              controller: "filterFormController",
              templateUrl: '/partials/filter-page.html',
              resolve: {
                  getAmenitiesResolver: function( getAmenities ){
                    return getAmenities.getAmenities();
                  },
                  getSecondExperienceResolver: function( getSecondExperience ){
                    return getSecondExperience.getSecondExperience();
                  }
              } 
            }).

            state( "index.view", {
              url: "/view/:id",
              templateUrl: "/partials/book.html"
            } );

        $stateProvider.state('member', {
              url: '/member',
              controller: 'LoginMemberCtrl',
              templateUrl: 'partials/member/member.html',
              data: {
                  access: access.user
              }
            });

}]);

VendorMine
  .run(['$rootScope', '$state', 'Authentication', function( $rootScope, $state, Authentication) {
      
      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
         /* console.log(event);
          console.log(toState);
          console.log(toParams);
          console.log(fromState);
          console.log(fromParams);
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");*/
          if(!('data' in toState) || !('access' in toState.data)){
              $rootScope.error = "Access undefined for this state";
              event.preventDefault();
          }
          else if (!Authentication.authorize(toState.data.access)) {
              $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
              event.preventDefault();

              if(fromState.url === '^') {
                  if(Authentication.isLoggedIn()) {
                      Authentication.isLoggedIn()
                      $state.go('index');
                  } else {
                      $rootScope.error = null;
                      $state.go('login');
                  }
              }
          }
      });
  
  }]);
