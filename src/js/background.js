'use strict'

import exps from '../expression.js';


let isFocused = false;
//  리스트 생성
const generateList = () => {
    initList();

    const list_box = document.getElementById('list-box');

    chrome.tabs.executeScript({ code: `(${scanRegex})(${JSON.stringify(exps)})` }, ([results]) => {
        results.forEach(result => {
            makeListElem(list_box, result);
        });
    });
};
const makeListElem = (container, content) => {
    //  container div
    const table = container.appendChild(document.createElement('div'));
    table.setAttribute('id', 'list_elem'); 
    table.setAttribute('data-type', content[0]);
    table.setAttribute('status', 'unchecked');
    if (table.getAttribute('status') == 'unchecked') {
        document.getElementById('list_elem').style.backgroundColor = "rgb(235,152,210)";
    } else if (table.getAttribute('status') == 'checked') {

    }

    //  _div for color
    const div_isChecked = table.appendChild(document.createElement('div'));
    div_isChecked.setAttribute('id', table.getAttribute('id') === 'unchecked');

    // _div for content
    const div_content = table.appendChild(document.createElement('div'));
    const div_contentText = div_content.appendChild(document.createElement('span'));
    div_contentText.textContent = content[1];
    div_content.setAttribute('id', 'content');
    div_contentText.addEventListener("click", () => {chrome.tabs.executeScript({ code: `(${text_focus})("${content[1]}", ${isFocused})` });isFocused=!isFocused;});

    // _div for undo btn
    const div_undo = table.appendChild(document.createElement('div'));
    const btn_undo = div_undo.appendChild(document.createElement('button'));
    btn_undo.setAttribute('id', 'btn btn_focus');
    btn_undo.addEventListener("click", text_undo());

    // _div for focus btn TODO: toggle (un)focus
    const div_focus = table.appendChild(document.createElement('div'));
    const btn_focus = div_focus.appendChild(document.createElement('button'));
    btn_focus.setAttribute('id', 'btn btn_focus');
    btn_focus.addEventListener("click", () => {chrome.tabs.executeScript({ code: `(${text_focus})("${content[1]}", ${isFocused})` });isFocused=!isFocused;});
};

// in-browser function
const scanRegex = (regex) => {

    //  TODO: set precise target area
    const targets = document.getElementsByTagName('body');
    console.log(targets);
    
    let results = [];

    for (let field of targets) {
        // console.log(field.innerText);   //test
        let textChunk = field.innerText ? field.innerText.split(/[ ,]+/) : null;
        textChunk.map((chunk) => {
            console.log(chunk);
            Object.keys(regex).map((key) => {
            for (let exp of regex[key]) {
                let result = [];
                let temp = chunk.match(exp);
                console.log(temp, exp);
                if (temp) {
                    result.push(key); result.push(temp[0]);
                    results.push(result);
                }
            }
            });
        });
    }
    return results;
};

//  initialize list view
const initList = () => {
    
};

const text_undo = () => {

};

const text_focus = (content, isFocused) => {
    let backgroundColor = "transparent";
    if (!isFocused) {
        backgroundColor = "yellow";
    }
    document.designMode = "on";
    const sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(content)) {
        document.execCommand("HiliteColor", false, backgroundColor);
        sel.collapseToEnd();
    }
    document.designMode = "off";
};


document.addEventListener('DOMContentLoaded', generateList());
// onload -> found = scanExp(json) -> generateList(found)