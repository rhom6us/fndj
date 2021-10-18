import { logger } from '@rhombus/logger';

type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return;

/**
 * Sends a HTTP POST via AJAX.
 * @method postWithAJAX
 * @param {string} url URL of the resource.
 * @param {string} post_data Request body data as string.
 * @param {function} success_callback Callback function to be called when there is a HTTP response. It gets the XMLHttpRequest object.
 * @param {array} additional_headers Array with key-value-pairs, that are used as HTTP request headers.
 * @return {Object} Returns the value of XMLHttpRequest.send()
 * @static
 */
function postWithAJAX(url: string, post_data: any, success_callback: Func, additional_headers: { key: string; value: string; }[]) {

	const http = new XMLHttpRequest();

	http.open("POST", url, true);

	if (additional_headers) {

		for (let h = 0; h < additional_headers.length; h++) {
			logger.log("setting header: " + additional_headers[h].key + ": " + additional_headers[h].value);
			http.setRequestHeader(additional_headers[h].key, additional_headers[h].value);
		}

	}

	http.onreadystatechange = function () { //Call a function when the state changes.

		if (http.readyState == 4 && http.status == 200) {
			success_callback(http);

		}
	};

	return http.send(post_data);

}



/**
 * Downloads a resource via AJAX, using the HTTP GET method.
 * @method getWithAJAX
 * @param {string} url URL of the resource.
 * @param {function} success_callback Callback function to be called when resource is downloaded and ready. It gets the XMLHttpRequest object.
 * @return {mixed} http.send() Value of http.send()
 * @static
 */
function getWithAJAX(url: string, success_callback: Func) {

	const http = new XMLHttpRequest();

	http.open("GET", url, true);

	http.onreadystatechange = function () { //Call a function when the state changes.

		if (http.readyState == 4 && http.status == 200) {


			success_callback(http);

		}
	};


	return http.send();

}


/**
 * Downloads a text resource via AJAX, using the HTTP GET method.
 * @method getTextWithAJAX
 * @param {string} url URL of the resource.
 * @param {function} success_callback Callback function to be called when resource is downloaded and ready. It gets the resource as text string.
 * @return {mixed} http.send() Value of http.send()
 * @static
 */
function getTextWithAJAX(url: string, success_callback: Func) {

	return getWithAJAX(url, function (http: any) {
		const response = http.responseText;
		success_callback(response);
	});

}


/**
 * Downloads a JSON resource via AJAX, using the HTTP GET method.
 * @method getJSONWithAJAX
 * @param {string} url URL of the resource.
 * @param {function} success_callback Callback function to be called when resource is downloaded and ready. It gets the resulting javascript object, when JSON parsing was successful.
 * @return {mixed} http.send() Value of http.send()
 * @static
 */
function getJSONWithAJAX(url: string, success_callback: Func) {

	getTextWithAJAX(url, function (responseText: string) {
		parseJSON(responseText, success_callback, undefined);
	});

}


/**
 * Clones a javascript object (instead of just copying references of it).
 * @method cloneObject
 * @param {mixed} obj Source object.
 * @return {mixed} clone Clone of the object
 * @static
 */
function cloneObject(obj: any) {
	let clone = {} as any;

	if (Array.isArray(obj)) {
		clone = [];
	}


	for (const i in obj) {
		if (obj[i] && typeof obj[i] == 'object') {
			clone[i] = cloneObject(obj[i]);
		} else {
			clone[i] = obj[i];
		}
	}

	return clone;
}


/**
 * Parses a Javascript Blob object for its text. This obviously works only with text files.
 * @method readFileAsText
 * @param {mixed} file File as Blob object.
 * @param {function} onsuccess Callback function to be called when file is parsed. It gets the resulting string, if parsing was successful.
 * @static
 */
function readFileAsText(file: Blob, onsuccess: Func) {

	const reader = new FileReader();

	reader.onload = function (e: any) {

		const result = e.target.result;

		onsuccess(result);

	};

	reader.readAsText(file);

}



/**
 * Parses a JSON string to a JavaScript object. If JSON is invalid, the error is catched and a callback function is called. This is better than just relying on JSON.parse throwing real errors.
 * @method parseJSON
 * @param {string} string JSON string
 * @param {function} onsuccess Function to be called when JSON could be parsed. Javascript Object is passed as parameter.
 * @param {function} onerror Function to be called when JSON could not be parsed. No parameters are passed here.
 * @static
 */
function parseJSON(string: string, onsuccess: (...args: any[]) => any, onerror?: (...args: any[]) => any) {

	let object;

	try {
		object = JSON.parse(string);
	}

	catch (e) {

		if (typeof onerror == "function") {
			onerror(e);
		} else {
			throw e;
		}
	}

	if (typeof object == "undefined") {

		if (typeof onerror == "function") {
			onerror();
		}
		throw new TypeError("parseJSON: String is not valid JSON");
	}

	onsuccess(object);

};


/**
 * Reads the JSON content of a Javascript File Object and parses it.
 * @method readFileAsJSON
 * @param {Object} Javascript File Object to be parsed
 * @param {function} onsuccess Function to be called when JSON could be parsed. Javascript Object is passed as parameter.
 * @param {function} onerror Function to be called when JSON could not be parsed. No parameters are passed here.
 * @static
 */
function readFileAsJSON(file: Blob, onsuccess: (...args: any[]) => any, onerror: (...args: any[]) => any) {

	readFileAsText(file, function (result: any) {
		parseJSON(result, onsuccess, onerror);
	});

}


/**
 * Loads a script from a URL and adds it dynamically to the webapp.
 * @method addScript
 * @param {string} url URL of the JS file
 * @param {function} onloaded Function to be called when script is loaded and ready.
 * @param {Boolean} async
 * @static
 */
function addScript(url: string, onloaded: HTMLScriptElement['onload'], async: boolean) {

	const script = document.createElement("script");
	script.src = url;

	//if async parameter is not defined, load it sync
	script.async = async || false;

	logger.log("adding script: " + url + ", async=" + script.async);

	if (onloaded) {
		script.addEventListener("load", onloaded, false);
	}

	document.head.appendChild(script);

	script.addEventListener("load", () => {
		logger.log("script " + url + " ready!");
	}, false);

}


/**
 * Loads a CSS stylesheet file from a URL and adds it dynamically to the webapp.
 * @method addStylesheet
 * @param {string} url URL of the CSS file
 * @static
 */
// function addStylesheet(filename:string){

// 	let fileref = document.createElement("link");
// 	fileref.setAttribute("rel", "stylesheet");
// 	fileref.setAttribute("type", "text/css");
// 	fileref.setAttribute("href", filename);

// 	if (typeof fileref != "undefined"){
// 		document.getElementsByTagName("head")[0].appendChild(fileref);
// 	}

// }


/**
 * Adds either a JS file or a CSS file to the web page. This function is a wrapper of the two functions addScript and addStylesheet
 * @method addFile
 * @param {string} filename URL of the resource
 * @static
 */
// function addFile(filename:string){

// 	if (strings.getFileTypeFromFilename(filename) == "js"){
// 		addScript(filename);
// 	}

// 	if (strings.getFileTypeFromFilename(filename) == "css"){
// 		addStylesheet(filename);
// 	}

// };


/**
 * Adds files to the web page, which can be either JS or CSS. This function is a wrapper of the function addFile, which again is a wrapper of addScript and addStylesheet
 * @method addFiles
 * @param {Mixed} string_or_array String or array of strings with URL(s) of the resource(s)
 * @param {String} url_prefix Prefix which is added to each passed URL
 * @static
 */
// function addFiles(string_or_array:any, url_prefix: string){

// 	if (typeof string_or_array == "string"){

// 		if (url_prefix){
// 			string_or_array = url_prefix + string_or_array;
// 		}

// 		addFile(string_or_array);

// 		return;
// 	}

// 	if (Array.isArray(string_or_array)){

// 		forEach(string_or_array, function(file: string){

// 			if (url_prefix){
// 				file = url_prefix + file;
// 			}

// 			addFile(file);

// 		});

// 		return;

// 	}

// };


/**
 * Searches an array of objects. If an object is found, where object[key]==value, the function returns the index of the object in the array.
 * @method getIndex
 * @param {Array} array Array of Javascript Objects
 * @param {String} key Key in object
 * @param {String} value Value of key in object
 * @return {Mixed} Returns index as number or undefined, if there is no such object.
 * @static
 */
function getIndex(array: string | any[], key: string, value: any) {

	for (let i = 0; i < array.length; i++) {

		if (array[i][key] == value) {
			return i;
		}
	}

	return undefined;

};


/**
 * Searches an array of objects. If an object is found, where object["id"]==value, the function returns the index of the object in the array.
 * @method getIndexByID
 * @param {Array} array Array of Javascript Objects
 * @param {String} id Value of ID
 * @return {Mixed} Returns index as number or undefined, if there is no such object.
 * @static
 */
const getIndexByID = function (array: any, id: any) {

	return getIndex(array, "id", id);

};


/**
 * Searches an array of objects. If an object is found, where object[key]==value, the function returns the respective object.
 * @method getObject
 * @param {Array} array Array of Javascript Objects
 * @param {String} key Key in object
 * @param {String} value Value of key in object
 * @return {Mixed} Returns an object or undefined, if there is no such object.
 * @static
 */
const getObject = function (array: string | any[], key: string, value: any) {

	for (let i = 0; i < array.length; i++) {

		if (array[i][key] == value) {
			return array[i];
		}
	}

	return undefined;

};


/**
 * Searches an array of objects. If an object is found, where object["id"]==value, the function returns the the respective object.
 * @method getIndexByID
 * @param {Array} array Array of Javascript Objects
 * @param {String} id Value of ID
 * @return {Mixed} Returns an object or undefined, if there is no such object.
 * @static
 */
const getObjectByID = function (array: any, id: any) {

	return getObject(array, "id", id);

};


/**
 * Iterates through ALL items of an array. This function should be preferred over forEach, when the action could delete items of the array. I. e. this function iterates really through ALL items, even if some of them are deleted along the way.
 * @method forAllItems
 * @param {Array} array Any array
 * @param {Function} action Action that is performed on each item.
 * @static
 */
const forAllItems = function (array: string | any[], action: (arg0: any) => void) {

	let i = array.length;

	for (; ;) {

		if (i !== 0) {
			i = i - 1;
		}

		else {
			return;
		}

		action(array[i]);

	}

};



/**
 * Maps an array like Array.map()
 * @method maps
 * @param {Array} array Any array
 * @param {Function} transform Transformation method that is performed on each item
 * @return {Array} Returns the resulting array of the map.
 * @static
 */
const map = function (array: string | any[], transform: { (item: any): any; (arg0: any): any; }) {
	const mapped = [];

	for (let i = 0; i < array.length; i++) {
		mapped.push(transform(array[i]));
	}

	return mapped;
};


/**
 * Creates an array with values by an array of JS objects. Of every object, the value of a specific key is taken.
 * @method getArrayWithValuesByKey
 * @param {Array} array Any array
 * @param {String} key Key, of which the value is taken.
 * @return {Array} Array with values.
 * @static
 */
const getArrayWithValuesByKey = function (array: any, key: string) {

	const new_array = map(array, function (item: { [x: string]: any; }) {
		return item[key];
	});

	return new_array;

};


/**
 * Creates an array with IDs by an array of JS objects. Of every object, the value of the key "id" is taken.
 * @method getArrayWithIDs
 * @param {Array} array Any array
 * @return {Array} Array with IDs
 * @static
 */
const getArrayWithIDs = function (array: any) {

	return getArrayWithValuesByKey(array, "id");

};


/**
 * Filters an array like Array.filter()
 * @method filter
 * @param {Array} array Any array
 * @param {Function} test Test function that is called for every array item. Array item is passed. If the function returns true, the item will appear in the array that is returned.
 * @return {Array} Filtered array
 * @static
 */
const filter = function (array: string | any[], test: (arg0: any) => any) {
	const passed = [];
	for (let i = 0; i < array.length; i++) {
		if (test(array[i])) {
			passed.push(array[i]);
		}
	}

	return passed;

};


const forEach = function (array: string | any[], action: { (file: any): void; (arg0: any, arg1: number): void; }) {
	for (let i = 0; i < array.length; i++) {
		action(array[i], i);
	}
};


//this method is also in dom, but has to be here too to avoid circular dependencies
const getSelectedRadioIndex = function (radios: string | any[]) {

	for (let r = 0; r < radios.length; r++) {

		if (radios[r].checked === true) {

			return r;

		}

	}

	return 0;

};





//this method is also in dom, but has to be here too to avoid circular dependencies
const getSelectedRadioValue = function (radios: any) {

	if (typeof radios == "string") {

		radios = document.getElementsByName(radios);

	}

	return radios[getSelectedRadioIndex(radios)].value;

};


function get(name: string) {

	let elem: any = document.getElementsByName(name);

	if (elem[0] && elem[0].nodeName == "INPUT" && elem[0].type == "radio") {
		return getSelectedRadioValue(elem);
	}

	elem = elem[0];

	if (typeof elem == "undefined") {

		elem = g(name);

	}

	if (typeof elem == "undefined") {

		logger.error("get: Element " + name + " is undefined!");
		return;

	}

	switch (elem.nodeName) {

		case "INPUT": return elem.value;

		case "TEXTAREA": return elem.value;

		case "SELECT": {

			if (elem.selectedIndex != -1) {
				return elem.options[elem.selectedIndex].value;
			}

			else {
				return "";
			}

		}

		default: logger.log("Function \"get\" has been misused with a " + elem.nodeName + " element. This should not have happened!");

	}``;
}


const g = function (id: string) {

	if (document.getElementById(id)) {
		return document.getElementById(id);
	}

	if (document.getElementsByName(id).length > 0) {
		return document.getElementsByName(id);
	}

	return undefined;

};


/**
 * Remove an element and provide a function that inserts it into its original position
 * @method removeToInsertLater
 * @param element {Element} The element to be temporarily removed
 * @return {Function} A function that inserts the element into its original position
 **/
const removeToInsertLater = function (element: { parentNode: any; nextSibling: any; }) {
	const parentNode = element.parentNode;
	const nextSibling = element.nextSibling;
	parentNode.removeChild(element);
	return function () {
		if (nextSibling) {
			parentNode.insertBefore(element, nextSibling);
		} else {
			parentNode.appendChild(element);
		}
	};
};


/**
 * Remove an element and provide a function that inserts it into its original position
 * @param element {Element} The element to be temporarily removed
 * @return {Function} A function that inserts the element into its original position
 **/
function o<T extends Record<PropertyKey, any>>(object: T, property_array: Array<keyof T>) {
	//returns value of object properties if they exist, if not returns ""

	let value = object;

	for (let p = 0; p < property_array.length; p++) {


		if (property_array[p] in value) {
			value = value[property_array[p]];

		}

		else {
			return "";
		}

	}

	return value;

}


function a(array: number[][], index: number) {

	const list = [];

	for (let i = 0; i < array.length; i++) {

		list.push(array[i][index]);

	}

	return list;

}


function sortBySubKey<T extends Record<PropertyKey, Record<PropertyKey, any>>>(array: T[], keys: [keyof T, keyof T[keyof T]]) {
	return array.sort(function (a, b) {
		let x = a[keys[0]][keys[1]];
		let y = b[keys[0]][keys[1]];

		if (typeof x == "string") {
			x = x.toLowerCase();
			y = y.toLowerCase();
		}

		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});


}


function sortByKey<T extends Record<PropertyKey, any>>(array: T[], key: keyof T) {
	return array.sort(function (a, b) {
		let x = a[key];
		let y = b[key];

		if (typeof x == "string") {
			x = x.toLowerCase();
			y = y.toLowerCase();
		}

		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
function _max(a: number, b: number) {
	return Math.max(a, b);
}
export function max(array: ArrayLike<number>): number {
	if (!('reduce' in array)) {
		return max(Array.from(array));
	}
	return (array as number[]).reduce(_max);
};
export function maxAbs(array: ArrayLike<number>): number {
	if (!('reduce' in array)) {
		return max(Array.from(array));
	}
	return (array as number[]).map(Math.abs).reduce(_max);
};
;


export const roundTo1Decimal = function (val: number) {
	return (Math.round(val * 10) / 10).toFixed(1);
};
export function absoluteValueToDBFS(value: number){
    return 20 * Math.log10(value);
}
export function getFloatTimeDomainData(node: AnalyserNode) {
    const result = new Float32Array(node.frequencyBinCount);
    node.getFloatTimeDomainData(result);
    return result;
}
export type $<T extends keyof HTMLElementTagNameMap | HTMLElement> = T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T;
export const $ = <T extends keyof HTMLElementTagNameMap | HTMLElement>(...args: Parameters<typeof document.querySelector>) => document.querySelector(...args) as $<T>;
export const $$ = <T extends keyof HTMLElementTagNameMap | HTMLElement>(...args: Parameters<typeof document.querySelector>) => document.querySelectorAll(...args) as NodeListOf<$<T>>;
export function using<T extends $<'canvas'>>(canvas: T, contextId: '2d', fn: (context: CanvasRenderingContext2D) => void) {
    const ctx = canvas.getContext(contextId);
    if (!ctx) {
        throw new Error('canvas context not found');
    }
    fn(ctx);
}
