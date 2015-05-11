VendorMine.directive( 'paymentRundown', 
	[
		'otterFees',
		'$rootScope',
		'Authentication',
		function directive( otterFees, rootScope, Authentication ){
			return {
				"templateUrl": "main/js/template/payment-rundown.html",
				"restrict": "A",
				"link": function link( scope, element, attribute ){
					if( Authentication.memberExists() ){
						scope.siteFee = 240;
						scope.feeMember = true;
						scope.feeNonMember = false;
					}else{
						scope.siteFee = 400;
						scope.feeMember = false;
						scope.feeNonMember = true;
					}
					scope.payment = {
						grabCarFee: scope.grabCarFee,
						skyEyeFee: scope.skyEyeFee,
						rooms: "",
						amenities: "",
						siteFee: otterFees.getSiteFee,
						total: 0
					}
					scope.$watch( function(){
							return otterFees.getGrabCar();
					},	function(){

						scope.payment.grabCarFee = otterFees.getGrabCar();
						//$rootScope.broadcast( 'payment', scope.payment );
					} );

					scope.$watch( function(){
							return otterFees.getSkyEye();
					},	function(){

						scope.payment.skyEyeFee  = otterFees.getSkyEye();
						//$rootScope.broadcast( 'payment', scope.payment );
					} )

					scope.$watch( function(){
							return otterFees.getTotal();
					},	function(){

						scope.payment.total 	 = otterFees.getTotal();
						//$rootScope.broadcast( 'payment', scope.payment );
					} )
					
				}
			}
		}
	] )
