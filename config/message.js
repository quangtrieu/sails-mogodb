module.exports.message = {

	customError: function(err){
		let errThrow = JSON.stringify(err);

		let objError = {};
		let fieldName = Object.keys(err.invalidAttributes).toString();
		let errorMsg ='';
		let errorCode ='';

		if(errThrow.indexOf('unique') > -1){
			  msg= fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
			  errorCode = 401;
			  errorMsg = msg;
		}else if(errThrow.indexOf('required') > -1){
				msg= fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' is required';
				errorCode = 402;
				errorMsg = msg;
		}else{
			   errorCode = 500;
			   errorMsg = 'System Error! Please try again';
		}
		objError.code = errorCode;
		objError.message = errorMsg;

		return objError;
	}
};