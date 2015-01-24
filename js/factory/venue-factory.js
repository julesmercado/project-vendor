VendorMine.factory('venueFactory', 
	[
		'$http',
		function service( $http ){
			var url = "http://demo1290827.mockable.io/venue/get/data";

			return function venueFactory( callback ){
				$http.get( url )
					.success( function onSuccess( result ){
						callback( null, result );
					} )
					.error( function onError( error ){
						callback( error );
					} );

			} 
			
		}
	]);
VendorMine.factory('getExperience', 
	[
		'$http',
		function factory( $http ){

			return function getExperience( callback ){
				$.get( "http://192.168.1.36:3000/vendormines/get_experience",
					function(data){
						callback(data);
					} );

			} 
			
		}
	]);
VendorMine.factory('getSecondExperience', 
	[
		'$http',
		function factory( $http ){

			return {
				getSecondExperience: function ( callback ){
					var promise = $.get("http://192.168.1.36:3000/vendormines/get_experience", 
							function( data ){
								var experience = data.map(function (w) {
						            return w.name;
						        });
								return experience;
							});
					return promise;
				} 
			}
			
		}
	]);
VendorMine.factory('getAmenities', 
	[
		'$http',
		function factory( $http ){

			return {
				getAmenities: function ( callback ){
					var promise = $.get("http://192.168.1.36:3000/vendormines/get_amenities", 
							function( data ){
								var amenities = data.map(function (w) {
							        	return {name: w.name, selected: false};
							    	});
								return amenities;
							});
					return promise;
				} 
			}
			
		}
	]);

VendorMine.service('postFilter', 
	[
		'$http',
		function service( $http ){

			return {
				getPostFilter: function( dataFirst, callback ){
					if(dataFirst){
						var promise = $.post( "http://192.168.1.36:3000/vendormines/venues",
							{
								"exp": dataFirst.exp, 
								"city_address" : dataFirst.city_address, 
								"est_guest" : dataFirst.est_guest
							}
						)
						.success( function(data){
							callback(null, data)
						} )
						.error( function(error){
							callback(error);
						} );
						
					}
					return promise;
				}
			}
		}
	]);

VendorMine.service('amenityAndFeatures', 
	[
		'$http',
		function service( $http ){
			console.log("aw");
			return {
				getAmenityAndFeatures: function( id ){
					if(id){
						var promise = $.ajax( {
										url: "http://192.168.1.36:3000/vendormines/show",
										type: "POST",
										data: {
											id: id
										}
										})
						.success( function(data){
							var amenityAndFeatures = data;
							return amenityAndFeatures;
						} )
						.error( function(error){
							return error;
						} );
						
					}
					return promise;
				}
			}
		}
	]);
VendorMine.service('bookVendorVenues', 
	[
		'$http',
		function service( $http ){
			return function bookVendorVenues( dataVendor ){
					$.ajax( {
						type: "POST",
						url: "http://192.168.1.36:3000/vendormines/",
						data: dataVendor
						})
					.success( function(data){
						alert(data.confirmation);
						var amenityAndFeatures = data;
						return amenityAndFeatures;
					} )
					.error( function(error){
						return error;
					} );
				}
				
			
		}
	]);