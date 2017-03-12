/*
 include this file in HTML for jQuery plugin (Included by WebWork automatically), which includes JSON parsing: 
	/webwork/htdocs/js/jquery.js
	
	Example saving file name for this info:
		user=admin
		hmwkSetName=Calc3
		pgFileName=Problem1.pg
	
		The resulting JSON file gets saved to /webwork/courses/admin/setCalc3/Problem1.json (The same directory as the PG file that was created)
*/

// Get the parameter in the query string of the URL
function getParam(parameterName){
	var queryStr = window.location.search.substring(1);
	var properties = queryStr.split("&");
	for(var i = 0; i < properties.length; i++){
		var propertyPair = properties[i];
		property = propertyPair.split("=");
		if(property[0] == parameterName){
			if(property.length != 1)
				return property[1];
			else
				return "";
		}
	}
	return "";
}

// Restore the state from the JSON file into the form (This method is called automatically when the page loads)
function restoreState(){
	// Get the JSON file
	var myFileURL = getParam("author") + "/set" + getParam("hmwkSet") + "/" + getParam("fileName") + ".json";//"/webwork2/courses/" + getParam("author") + "/set" + getParam("hmwkSet") + "/" + getParam("fileName") + ".json";
	if(getParam("author") != "" && getParam("hmwkSet") != "" && getParam("fileName") != "")
		alert("Restore JSON file from: " + myFileURL);
	// Parse the JSON file into a JSON object
	$.getJSON(myFileURL, function(JSONObject){
		// Replace the fields in the form with the ones in the JSON object
		for(var elementId in JSONObject){
			var formElement = $("#" + elementId);
			var formElementType = formElement.attr("type");
			var formElementValue = JSONObject[elementId];
			// Restore the value of the test input in HTML form
			if(formElementType == "text"){
				formElement.val(formElementValue);
			}
			// Restore the value of the radio button in HTML form
			else if(formElementType == "radio"){
				if(formElementValue == "true")
					formElement.prop("checked", true);
			}
			// Restore the value of the checkbos in HTML form
			else if(formElementType == "checkbox"){
				if(formElementValue == "true")
					formElement.prop("checked", true);
				else
					formElement.prop("checked", false);
			}
		}
	});
}

// Initiate the saving of the state by collecting all of the information and sending it to the perl file to save the state (Currently supports saving values for input-text, input-radio, and input-checkbox elements with the class "DuqWorkSave")
function saveState(){
	// The perl file location used for saving state
	var perlFile = "saveState.cgi";//"/webwork2/saveState.pl";
	// The username of the author (Required for the location of the directory to place the file in)
	var JSONAuthor = getParam("author");
	// The homework set name (Required for the location of the directory to place the file in)
	var JSONHomeworkSet = getParam("hmwkSet");
	// The file name of the problem
	var JSONFileName = getParam("fileName");
	// The parameters in the query string
	var postParameters = {directory: JSONAuthor + "/set" + JSONHomeworkSet, fileName: JSONFileName};
	// Attach each form value to the post parameters
	var formElements = $("#form").find(".DuqWorkSave");
	for(var i = 0; i < formElements.length; i++){
		var formElement = formElements[i];
		var id = $(formElement).attr("id");
		var type = $(formElement).attr("type");
		// Save the value of the text input in HTML form
		if(type == "text"){
			postParameters[id] = $(formElement).attr("value");
		}
		// Save the value from the radio button in HTML form
		else if(type == "radio"){
			postParameters[id] = formElement.checked;
		}
		// Save the value from the checkbox in HTML form
		else if(type == "checkbox"){
			postParameters[id] = formElement.checked;
		}
	}
	// Send a POST request with all of the information passed in the query string
	$.post(perlFile, postParameters, function(data){
		/*
		An example query string that it will send is this: 
		directory=12345&fileName=prob1%2ejson&problemType=multChoice&solution=A
		
		In the Perl file we call, it will take the POST parameters and create the 12345/prob1.json file with this as the content:
		{"problemType": "multChoice", "solution": "A"}
		*/
		alert("Form saved");
	});
	// Perl will handle the rest :)
}