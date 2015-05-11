VendorMine.directive( 'paymentRundown', 
	[
		'otterFees',
		'$rootScope',
		function directive( otterFees, rootScope ){
			return {
				"templateUrl": "main/js/template/payment-rundown.html",
				"restrict": "A",
				"link": function link( scope, element, attribute ){
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
						console.log( scope.payment );
					} );

					scope.$watch( function(){
							return otterFees.getSkyEye();
					},	function(){

						scope.payment.skyEyeFee  = otterFees.getSkyEye();
						//$rootScope.broadcast( 'payment', scope.payment );
						console.log( scope.payment );
					} )

					scope.$watch( function(){
							return otterFees.getTotal();
					},	function(){

						scope.payment.total 	 = otterFees.getTotal();
						//$rootScope.broadcast( 'payment', scope.payment );
						console.log( scope.payment );
					} )
					
				}
			}
		}
	] )
