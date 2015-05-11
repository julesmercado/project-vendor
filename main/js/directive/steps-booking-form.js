VendorMine.directive( 'stepsBookingForm', 
	[
		function directive( ){
			return {
				"restrict": "A",
				"controller": [ '$scope', 'otterFees', 
						function controller( scope , otterFees ){

							scope.stepOneImage = "img/btn-header/step-details-active.png";
							scope.stepTwoImage = "img/btn-header/step-ammenities.png";
							scope.stepThreeImage = "img/btn-header/step-addons.png";
							scope.stepFourImage = "img/btn-header/step-payment.png";
							
						}
				],
				"link": function link( scope, element, attribute ){
					
					

					scope.$watch('tabBook', function( newValue, oldValue ) {

					 	switch( newValue ) {

							case 1 :
								scope.stepOneImage = "img/btn-header/step-details-active.png";
								scope.stepTwoImage = "img/btn-header/step-ammenities.png";
								scope.stepThreeImage = "img/btn-header/step-addons.png";
								scope.stepFourImage = "img/btn-header/step-payment.png";
								break;
							case 2 :
								scope.stepOneImage = "img/btn-header/step-details.png";
								scope.stepTwoImage = "img/btn-header/step-ammenities-active.png";
								scope.stepThreeImage = "img/btn-header/step-addons.png";
								scope.stepFourImage = "img/btn-header/step-payment.png";
								break;
							case 3 :
								scope.stepOneImage = "img/btn-header/step-details.png";
								scope.stepTwoImage = "img/btn-header/step-ammenities.png";
								scope.stepThreeImage = "img/btn-header/step-addons-active.png";
								scope.stepFourImage = "img/btn-header/step-payment.png";
								break;
							case 4 :
								scope.stepOneImage = "img/btn-header/step-details.png";
								scope.stepTwoImage = "img/btn-header/step-ammenities.png";
								scope.stepThreeImage = "img/btn-header/step-addons.png";
								scope.stepFourImage = "img/btn-header/step-payment-active.png";
								break;
						}

					 });

						
					
				}
			}
		}
	] )
