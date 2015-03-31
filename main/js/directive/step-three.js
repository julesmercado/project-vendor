VendorMine.directive( 'stepThree', 
	[	
		'otterFees',
		'Authentication',
		'addOnService',
		function directive( otterFees, Authentication, addOnService ){
			return {
				
				"restrict": "A",
				"templateUrl": "main/js/template/step-three-template.html",
				"link": function link( scope, element, attribute ){
							if(Authentication.memberExists()){
								$("#grabCar").removeAttr('disabled');
							}
							init(scope, Authentication);
		//	step 3
			//	addOns
							scope.addOns = {
								grabCar: false,
								skyEye: false,
								msgGrabCar: false,
								msgSkyEye: false,
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
									addOnService.setSkyEyeOK( key );
									otterFees.setSkyEye();
								},
								cancelSkyEye: function(){
									scope.addOns.msgSkyEye = false;
									otterFees.resetSkyEye();
									addOnService.setSkyEyeCancel();
								}
							};
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
		scope.formFields.grabCar = "";
	}else{
		scope.formFields.grabCar = makeid();
	}
}
function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}