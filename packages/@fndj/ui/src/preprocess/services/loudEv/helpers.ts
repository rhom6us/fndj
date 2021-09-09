/* eslint-disable no-console */
/*
Copyright 2014 Sebastian Zimmer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Helper functions. These are available in the global namespace!
 *
 * @module HELPERS
 */

/**
 * Helper functions. These are available in the global namespace!
 *
 * @class HELPERS
 */


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
export function postWithAJAX(url: string, post_data: Document | BodyInit | null | undefined, success_callback: (arg0: XMLHttpRequest) => void, additional_headers: string | any[]) {

    const http = new XMLHttpRequest();

    http.open("POST", url, true);

    if (additional_headers) {

        for (let h = 0; h < additional_headers.length; h++) {
            log("setting header: " + additional_headers[h].key + ": " + additional_headers[h].value);
            http.setRequestHeader(additional_headers[h].key, additional_headers[h].value);
        }

    }

    http.onreadystatechange = function () { //Call a function when the state changes.

        if (http.readyState == 4 && http.status == 200) {

            console.log("AJAX successful!");

            success_callback(http);

        }
    };

    console.log("Sending ajax request to: " + url);

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
export function getWithAJAX(url: string, success_callback: { (http: any): void; (arg0: XMLHttpRequest): void; }) {

    const http = new XMLHttpRequest();

    http.open("GET", url, true);

    http.onreadystatechange = function () { //Call a function when the state changes.

        if (http.readyState == 4 && http.status == 200) {

            console.log("AJAX successful!");

            success_callback(http);

        }
    };

    console.log("Sending ajax request to: " + url);

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
export function getTextWithAJAX(url: any, success_callback: { (responseText: any): void; (arg0: any): void; }) {

    return getWithAJAX(url, function (http: { responseText: any; }) {
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
export function getJSONWithAJAX(url: any, success_callback: any) {

    getTextWithAJAX(url, function (responseText: any) {
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
export function cloneObject<T extends any[] | Record<string, any>>(obj: T): T {
    let clone: Partial<typeof obj> = {};

    if (Array.isArray(obj)) {
        clone = [] as any;
    }


    for (const i in obj) {
        if (obj[i] && typeof obj[i] == 'object') {
            clone[i] = cloneObject(obj[i]);
        } else {
            clone[i] = obj[i];
        }
    }

    return clone as T;
}


/**
 * Parses a Javascript Blob object for its text. This obviously works only with text files.
 * @method readFileAsText
 * @param {mixed} file File as Blob object.
 * @param {function} onsuccess Callback function to be called when file is parsed. It gets the resulting string, if parsing was successful.
 * @static
 */
export function readFileAsText(file: Blob, onsuccess: { (result: any): void; (arg0: string | ArrayBuffer | null): void; }) {

    const reader = new FileReader();

    reader.onload = function (e) {

        const result = e.target!.result;

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
export function parseJSON(string: string, onsuccess: (arg0: any) => void, onerror?: ((arg0?: any) => void)) {

    let object;

    try {
        object = JSON.parse(string);
    }

    catch (e) {
        log("parseJSON: String is not valid JSON");
        if (typeof onerror == "function") {
            onerror(e);
        }
        return;
    }

    if (typeof object == "undefined") {
        log("parseJSON: String is not valid JSON");
        if (typeof onerror == "function") {
            onerror();
        }
        return;
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
export function readFileAsJSON(file: any, onsuccess: any, onerror: any) {

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
export function addScript(url: string, onloaded?: ((this: HTMLScriptElement, ev: Event) => any), async?: boolean) {

    const script = document.createElement("script");
    script.src = url;

    //if async parameter is not defined, load it sync
    script.async = async || false;

    console.log("adding script: " + url + ", async=" + script.async);

    if (onloaded) {
        script.addEventListener("load", onloaded, false);
    }

    document.head.appendChild(script);

    script.addEventListener("load", function () {
        console.log("script " + url + " ready!");
    }, false);

}


/**
 * Loads a CSS stylesheet file from a URL and adds it dynamically to the webapp.
 * @method addStylesheet
 * @param {string} url URL of the CSS file
 * @static
 */
export function addStylesheet(filename: string) {

    const fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

}


/**
 * Adds either a JS file or a CSS file to the web page. This function is a wrapper of the two functions addScript and addStylesheet
 * @method addFile
 * @param {string} filename URL of the resource
 * @static
 */
export const addFile = function (filename: any) {

    if (/\.js$/.test(filename)) {
        addScript(filename);
    }

    if (/\.css$/.test(filename)) {
        addStylesheet(filename);
    }

};


/**
 * Adds files to the web page, which can be either JS or CSS. This function is a wrapper of the function addFile, which again is a wrapper of addScript and addStylesheet
 * @method addFiles
 * @param {Mixed} string_or_array String or array of strings with URL(s) of the resource(s)
 * @param {String} url_prefix Prefix which is added to each passed URL
 * @static
 */
export const addFiles = function (string_or_array: string, url_prefix: string) {

    if (typeof string_or_array == "string") {

        if (url_prefix) {
            string_or_array = url_prefix + string_or_array;
        }

        addFile(string_or_array);

        return;
    }

    if (Array.isArray(string_or_array)) {

        forEach(string_or_array, function (file: any) {

            if (url_prefix) {
                file = url_prefix + file;
            }

            addFile(file);

        });

        return;

    }

};


/**
 * Searches an array of objects. If an object is found, where object[key]==value, the function returns the index of the object in the array.
 * @method getIndex
 * @param {Array} array Array of Javascript Objects
 * @param {String} key Key in object
 * @param {String} value Value of key in object
 * @return {Mixed} Returns index as number or undefined, if there is no such object.
 * @static
 */
export const getIndex = function (array: string | any[], key: string, value: any) {

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
export const getIndexByID = function (array: any, id: any) {

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
export const getObject = function (array: string | any[], key: string, value: any) {

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
export const getObjectByID = function (array: any, id: any) {

    return getObject(array, "id", id);

};


/**
 * Iterates through ALL items of an array. This function should be preferred over forEach, when the action could delete items of the array. I. e. this function iterates really through ALL items, even if some of them are deleted along the way.
 * @method forAllItems
 * @param {Array} array Any array
 * @param {Function} action Action that is performed on each item.
 * @static
 */
export const forAllItems = function (array: string | any[], action: (arg0: any) => void) {

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
export const map = function (array: string | any[], transform: { (item: any): any; (arg0: any): any; }) {
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
export const getArrayWithValuesByKey = function (array: any, key: string) {

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
export const getArrayWithIDs = function (array: any) {

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
export const filter = function (array: string | any[], test: (arg0: any) => any) {
    const passed = [];
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            passed.push(array[i]);
        }
    }

    return passed;

};


export function forEach<T>(array: T[], action: (item: T, index: number) => void) {

    for (let i = 0; i < array.length; i++) {
        action(array[i], i);
    }
}
// // eslint-disable-next-line no-var
// export var forEacha = function (array: string | any[], action: {
//     (option: { value: any; }): void;
//     (elem: { style: { display: string; }; }): void;
//     (option: { [x: string]: any; }, index: any): void;
//     (DOM_element: any): void; (file: any): void;
//     (arg0: any, arg1: number): void;
// }) {
//     for (let i = 0; i < array.length; i++) {
//         action(array[i], i);
//     }
// };


//this method is also in dom, but has to be here too to avoid circular dependencies
const getSelectedRadioIndex = function (radios: string | ArrayLike<any>) {

    for (let r = 0; r < radios.length; r++) {

        if (radios[r].checked === true) {

            return r;

        }

    }

    return 0;

};


// eslint-disable-next-line no-var
var log = function (item: string) {

    console.log(item);

};


//this method is also in dom, but has to be here too to avoid circular dependencies
const getSelectedRadioValue = function (radios: string | NodeListOf<HTMLInputElement>) {

    if (typeof radios == "string") {

        radios = document.getElementsByName(radios) as NodeListOf<HTMLInputElement>;

    }

    return radios[getSelectedRadioIndex(radios)].value;

};


export function get(name: string) {

    let elem = document.getElementsByName(name) as any;

    if (elem[0] && elem[0].nodeName == "INPUT" && elem[0].type == "radio") {
        return getSelectedRadioValue(elem);
    }

    elem = elem[0];

    if (typeof elem == "undefined") {

        elem = g(name);

    }

    if (typeof elem == "undefined") {

        console.error("get: Element " + name + " is undefined!");
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

            break;
        }

        default: console.log("Function \"get\" has been misused with a " + elem.nodeName + " element. This should not have happened!");

    }
}


export const g = function (id: string): HTMLElement {

    if (document.getElementById(id)) {
        return document.getElementById(id)!;
    }
    return undefined as any;

    // if (document.getElementsByName(id).length > 0) {
    //     return document.getElementsByName(id)!;
    // }

    // return undefined;

};

export const gg = function (id: string) {

    // if (document.getElementById(id)) {
    //     return document.getElementById(id)!;
    // }

    if (document.getElementsByName(id).length > 0) {
        return document.getElementsByName(id)!;
    }

    // return undefined;

};


/**
 * Remove an element and provide a function that inserts it into its original position
 * @method removeToInsertLater
 * @param element {Element} The element to be temporarily removed
 * @return {Function} A function that inserts the element into its original position
 **/
export const removeToInsertLater = function (element: { parentNode: any; nextSibling: any; }) {
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
export function o(object: any, property_array: string | any[]) {
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


function a(array: string | any[], index: string | number) {

    const list = [];

    for (let i = 0; i < array.length; i++) {

        list.push(array[i][index]);

    }

    return list;

}


export function sortBySubKey(array: any[], keys: (string | number)[]) {

    return array.sort(function (a: { [x: string]: { [x: string]: any; }; }, b: { [x: string]: { [x: string]: any; }; }) {
        let x = a[keys[0]][keys[1]];
        let y = b[keys[0]][keys[1]];

        if (typeof x == "string") {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });


}


export function sortByKey(array: any[], key: string | number) {

    return array.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
        let x = a[key];
        let y = b[key];

        if (typeof x == "string") {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


export function getMaxOfArray(numArray: string | any[]) {
    // returning Math.max.apply(null, numArray);
    // will result in "Uncaught RangeError: Maximum call stack size exceeded"
    let max_pos = 0;
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] > numArray[max_pos]) {
            max_pos = i;
        }
    }
    return numArray[max_pos];
}


export function getMinOfArray(numArray: string | any[]) {
    let min_pos = 0;
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] < numArray[min_pos]) {
            min_pos = i;
        }
    }
    return numArray[min_pos];
}
