VendorMine.directive( 'stepThree', 
	[	
		'otterFees',
		'Authentication',
		'addOnService',
		'$rootScope',
		function directive( otterFees, Authentication, addOnService, $rootScope ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/step-three-template.html",
				"link": function link( scope, element, attribute ){
							
							init(scope, Authentication);
							scope.skyTime = time();
							scope.form = {};
							scope.form.skyEye = {
								date: "",
								timeOne: "",
								timeTwo: ""
							};

							scope.toggleMin = function() {
							    scope.minDates = scope.minDate ? null : new Date();
							  };
							  scope.toggleMin();

							scope.openSecond = function($event,open) {
							    $event.preventDefault();
							    $event.stopPropagation();

							    scope.opened[open] = true;
							    
							};
							scope.opened = {
								second: false
							};
		//	step 3	
			//	addOns
							scope.addOns = {
								grabCar: false,
								skyEye: false,
								msgGrabCar: false,
								okGrabCar: function( key ){
									scope.addOns.msgGrabCar = true;
									addOnService.setGrabCarOK( key );
									otterFees.setGrabCar();
								},
								cancelGrabCar: function(){
									scope.addOns.msgGrabCar = false;
									otterFees.resetGrabCar();
									addOnService.setGrabCarCancel();
								},

								okSkyEye: function( key ){
									scope.addOns.msgSkyEye = true;
									addOnService.setSkyEyeOK( scope.formFields.original_date, scope.form.skyEye.timeOne, scope.form.skyEye.timeTwo );
									otterFees.setSkyEye();
									$rootScope.$broadcast( 'timeOne', scope.form.skyEye.timeOne, scope.form.skyEye.timeTwo );
								},
								cancelSkyEye: function(){
									scope.addOns.msgSkyEye = false;
									otterFees.resetSkyEye();
									addOnService.setSkyEyeCancel();
								}
							};

							/*scope.$watch( function(){
								var timeCompare = scope.form.skyEye.timeOne < scope.form.skyEye.timeTwo 
								return timeCompare;
							}, function( newvalue, oldvalue ){
								
							} );*/
							scope.$watch( function(){
								return scope.addOns.grabCar;
							}, function( newvalue, oldvalue ){
								if( newvalue != oldvalue && newvalue == false ){
									scope.addOns.msgGrabCar = false;
									otterFees.resetGrabCar();
								}
							} );
							scope.$watch( function(){
								return scope.addOns.skyEye;
							}, function( newvalue, oldvalue ){
								if( newvalue != oldvalue && newvalue == false ){
									scope.addOns.msgSkyEye = false;
									otterFees.resetSkyEye();
								}
							} );
							//scope.formFields.grabCar = grabCar( Authentication );
							
			// 	fees
							scope.$watch( function(){
								return otterFees.getSkyEye();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.skyEye = otterFees.getSkyEye();
							    }
							} );
							scope.$watch( function(){
								return otterFees.getGrabCar();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.grabCar = otterFees.getGrabCar();
							    }
							} );
							scope.$watch( function(){
								return otterFees.getTotal();
							}, function( newvalue, oldvalue ){
								if (typeof newvalue !== 'undefined' && newvalue != oldvalue) {
							        scope.total = otterFees.getTotal();
							    }
							} );	  
				}
			}
		}
	] )
function grabCar( Authentication ){
	var value;
	//return var value = !Authentication.getMember() ? value = "" : value = makeid();
	if( !Authentication.memberExists() ){
		value = makeid();
		console.log(value);
		return value;
		
	}else{
		value = "";
		console.log(value); 
		return value;
	}
};
function init(scope, Authentication){
	if( Authentication.memberExists() ){
		scope.formFields.grabCar.key = "";
		$("#grabCar").removeAttr('disabled');
	}else{
		scope.formFields.grabCar.key = makeid();
	}
}
function time(){
	var skyTime = ["12:00 AM","12:30 AM","1:00 AM","1:30 AM","2:00 AM","2:30 AM","3:00 AM","3:30 AM","4:00 AM","4:30 AM","5:00 AM","5:30 AM","6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM","11:00 PM","11:30 PM"];
		return skyTime;
}
function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}