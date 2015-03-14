angular.module( 'otter', [
  'VendorMine',
  'login',
  'member',
  'verify',
  'angular-storage',
  'angular-jwt',
  'ngSanitize',
  'ngAnimate',
  'ngQuantum'
])
.config( function myAppConfig ($urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt');
  }

  $httpProvider.interceptors.push('jwtInterceptor');
});
angular.module('otter')
 .run(function (Authentication, $rootScope, $location, RouteFilter) {
    //console.log("app.js run: first");

    $rootScope.$on('$locationChangeStart', function(scope, next, current) {
      //console.log(next);
      //console.log(current);
      //console.log("From: " + $location.path()); 
      RouteFilter.run($location.path());
    })
    //console.log("app.js run: second");
  });
 /*
angular.module('otter')

.run(function (RouteFilter, Authentication, $location)
{
    //console.log("filters run: first");
    RouteFilter.register('auth', ['/index'], function()
    {
        return Authentication.exists();
    }, 'index');

    RouteFilter.register('guest', ['/login'], function()
    {
        return ! Authentication.exists();
    }, '/');

    RouteFilter.register('developer', ['/settings'], function()
    {
        return Authentication.isDeveloper();
    }, '/');
    //console.log("filters run: second");

    ////console.log("Test: " + $location.path().test('profile')); 
});*/