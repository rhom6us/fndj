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

import { forEach, g } from './helpers';


export const getSelectedRadioIndex = function (radios: string | any[] | NodeListOf<HTMLElement>) {

    if (typeof radios == "string") {

        radios = document.getElementsByName(radios);

    }

    for (let r = 0; r < radios.length; r++) {

        if (radios[r].checked === true) {

            return r;

        }

    }

    return 0;

};

type HTMLRadioButtonElement = HTMLInputElement & { type: 'radio'; };
export const getSelectedRadioValue = function (radios: string | NodeListOf<HTMLRadioButtonElement>) {

    if (typeof radios == "string") {

        radios = document.getElementsByName(radios) as NodeListOf<HTMLRadioButtonElement>;

    }

    return radios[getSelectedRadioIndex(radios)].value;

};


export const makeRadios = function (parent: any, array: string | any[], name: any, id_prefix: number, title_key: string | number, value_key: string | number, start_value: number, on_change: any, hovers: any[]) {
    const radios = [];
    let radio;
    let span;

    for (let f = 0; f < array.length; f++) {

        if (hovers) {
            var hover = hovers[f];
        }

        else {
            hover = undefined;
        }

        radio = makeRadio(
            parent, array[f][value_key], array[f][title_key], id_prefix + f, name, on_change, hover
        );

        if (f === start_value || start_value == array[f][value_key]) {
            radio.checked = true;
        }

        br(parent);

        radios.push(radio);

    }

    return radios;

};


export const makeRadio = function (parent: any, value: any, title: string, id: any, name: any, on_click: (arg0: any) => void, hover: any) {

    const radio = input(parent, id, "", name, "radio", value);
    if (hover) {
        radio.title = hover;
    }

    const s = span(parent, "", "", " " + title);
    if (hover) {
        s.title = hover;
    }

    s.addEventListener("click", function (radio) {
        return function () {
            radio.checked = true;
        };
    }(radio), false);

    if (on_click) {
        radio.addEventListener("click", function (event: { stopPropagation: () => void; }) {

            event.stopPropagation();
            on_click(value);

        }, false);

        s.addEventListener("click", function (event: { stopPropagation: () => void; }) {

            event.stopPropagation();
            on_click(value);

        }, false);
    }

    return radio;

};


export const removeOptions = function (selectbox: HTMLSelectElement/*{ options: string | any[]; remove: (arg0: number) => void; }*/) {

    let i;

    for (i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }

};


export const setRadiosByValue = function (radios: string | any[], value: string) {

    for (let r = 0; r < radios.length; r++) {

        if (radios[r].value == value) {

            radios[r].checked = true;
            return;

        }

    }

    console.error("dom.setRadioByValue: Value " + value + " not available in radios!");

};


export const setRadioIndex = function (radios: { checked: boolean; }[], index: string | number) {

    if (typeof index != "number") {
        console.error("dom.setRadioIndex: index is not of type number but " + typeof index);
        return;
    }

    radios[index].checked = true;

};


export const getOptionValuesOfSelect = function (select: { options: any[]; }) {

    const option_values: any[] = [];
    select.options.forEach(option => {
        option_values.push(option.value);
    });
    // forEach(select.options, function (option: { value: any; }) {


    // });

    return option_values;

};


export const br = function (parent: any) {

    const br = newElement("br", "", "", parent);
    return br;

};


export const img = function (parent: any, id: any, className: any, src: any) {

    const img = newElement("img", id, className, parent);
    img.src = src;

    return img;

};


export const div = function (parent: any, id: any, className: any, innerHTML: any) {

    const div = newElement("div", id, className, parent, innerHTML);

    return div;

};


export const span = function (parent: any, id: any, className: any, innerHTML: any) {

    const span = newElement("span", id, className, parent, innerHTML);

    return span;

};


export const spanBR = function (parent: any, id: any, className: any, innerHTML: any) {

    const s = span(parent, id, className, innerHTML);

    br(parent);

    return s;

};


export const p = function (parent: any, innerHTML: any, id: any, className: any) {

    const p = newElement("p", id, className, parent, innerHTML);

    return p;

};


export const a = function (parent: any, id: any, className: any, href: any, innerHTML: any, onclick: any) {

    const a = newElement("a", id, className, parent, innerHTML);

    if (href) {
        a.href = href;
    }

    if (typeof onclick != "undefined") {
        a.addEventListener("click", onclick);
    }

    return a;

};


export const link = function (parent: any, id: any, className: any, innerHTML: any, onclick: any) {

    return a(parent, id, className, undefined, innerHTML, onclick);


};


export const h1 = function (parent: any, innerHTML: any) {

    const h1 = newElement("h1", "", "", parent, innerHTML);
    return h1;

};


export const h2 = function (parent: any, innerHTML: any) {

    const h2 = newElement("h2", "", "", parent, innerHTML);
    return h2;

};


export const h3 = function (parent: any, innerHTML: any) {

    const h3 = newElement("h3", "", "", parent, innerHTML);
    return h3;

};


export const h5 = function (parent: any, innerHTML: any) {

    const h5 = newElement("h5", "", "", parent, innerHTML);
    return h5;

};


export const input = function (parent: any, id: any, className: any, name: any, type: any, value?: any) {

    const input = newElement("input", id, className, parent);
    input.type = type;
    input.name = name;

    if (typeof value != "undefined") {
        input.value = value;
    }

    return input;

};


export const checkbox = function (parent: any, id: any, className: any, name: any, checked: any) {

    const inp = input(parent, id, className, name, "checkbox");
    inp.checked = checked;

    return inp;

};


export const textInput = function (parent: any, id: any, className: any, name: any, value: any) {

    return input(parent, id, className, name, "text", value);

};


export const button = function (parent: any, value: any, onclick: any) {

    const inp = input(parent, "", "", "", "button", value);

    inp.addEventListener("click", onclick, false);

    return inp;

};


export const textarea = function (parent: any, id: any, className: any, rows: any, cols: any, value: any) {

    const textarea = make("textarea", id, className, parent);
    textarea.rows = rows;
    textarea.cols = cols;
    textarea.value = value;
    return textarea;

};


export const newElement = function (element_tag: any, element_id: string, element_class: string, parent_to_append_to: { appendChild: (arg0: any) => void; }, innerHTML?: any) {

    const element = document.createElement(element_tag);

    if (element_id !== "") {
        element.id = element_id;
    }

    if (element_class !== "") {
        element.className = element_class;
    }

    if (typeof parent_to_append_to != "undefined") {
        parent_to_append_to.appendChild(element);
    }

    if (innerHTML) {

        element.innerHTML = innerHTML;

    }

    return element;
};


export const make = newElement;


export const remove = function (elem: HTMLElement/*{ parentNode: { removeChild: (arg0: any) => any; }; }*/) {

    if (typeof elem == "string") {
        var id = elem;
        const result = g(id);
        if (typeof result == "undefined") {

            console.error("dom.remove: Element undefined. id = " + id);
            return undefined;

        }
        elem = result as HTMLElement;
    }


    return elem.parentNode!.removeChild(elem);

};


export const hideAllChildren = function (elem: { children: any; }) {

    const children = elem.children;
    forEach(children, hideElement);

};


export const showAllChildren = function (elem: { children: any; }) {

    const children = elem.children;

    for (let c = 0; c < children.length; c++) {

        children[c].style.display = "";

    }

};


export const hideElement = function (elem: { style: { display: string; }; }) {
    elem.style.display = "none";
};


export const hide = hideElement;


export const unhideElement = function (elem: { style: { display: string; }; }) {

    elem.style.display = "";

};


export const scrollTop = function (element: { scrollTop: number; }) {

    element.scrollTop = 0;

};


export const setSelectOptions = function (select: HTMLSelectElement/*{ options: string | any[]; selectedIndex: number; }*/, options: any, text_key: string, value_key: string, first_option_empty: boolean) {
    let text;

    removeOptions(select);

    if (first_option_empty === true) {

        const NewOption = new Option("", 0..toString(), false, true);
        select.options[select.options.length] = NewOption;

    }

    forEach(options, function (option: { [x: string]: any; }, index: any) {
        let value;

        if (typeof text_key != "undefined") {
            text = option[text_key];
        }

        else {
            text = option;
        }


        if (text_key == "take_index") {
            text = index;
        }

        if (typeof value_key != "undefined") {
            value = option[value_key];
        }

        else {
            value = option;
        }


        if (value_key == "take_index") {
            value = index;
        }


        appendOption(select, text, value);

    });

    select.selectedIndex = 0;

};


export const setSelectValue = function (select: { options: string | any[]; selectedIndex: number; }, value: any) {

    for (let i = 0, len = select.options.length; i < len; i++) {

        if (select.options[i].value == value) {

            select.selectedIndex = i;
            return;

        }

    }

    //if value isn't available, set no selectedIndex
    select.selectedIndex = -1;

};


export const appendOption = function (select: HTMLSelectElement/*{ options: string | any[]; }*/, text: string | undefined, value: string | undefined) {

    const NewOption = new Option(text, value, false, true);
    select.options[select.options.length] = NewOption;

};


export const appendHTMLContent = function (parent: { appendChild: (arg0: any) => void; }, content: any) {

    if (typeof content == "string") {

        const s = span(parent, "", "", "");
        s.innerHTML += content;

    }

    if (typeof content == "object" &&
        Object.prototype.toString.call(content) !== '[object Array]') {

        parent.appendChild(content);

    }

    if (Object.prototype.toString.call(content) === '[object Array]') {

        forEach(content, function (DOM_element: any) {
            appendHTMLContent(parent, DOM_element);
        });

    }

};


export const getByName = function (name: string) {

    return document.getElementsByName(name);

};
