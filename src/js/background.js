'use strict'

import exps from '../expression.js';


let strings = [];
//  리스트 생성
const generateList = () => {
    initList();

    const list_box = document.getElementById('list-box');

    chrome.tabs.executeScript({ code: `(${scanRegex})(${JSON.stringify(exps)})` }, ([results]) => {
        results.forEach(result => {
            makeListElem(list_box, result);
            chrome.tabs.executeScript({ code: `(${text_focus})("${result[1]}")`});
            strings.push(result[1]);
        });
    });
};
const makeListElem = (container, content) => {
    //  container div
    const table = container.appendChild(document.createElement('div'));
    table.setAttribute('id', 'list_elem');
    table.setAttribute('data-type', content[0]);
    table.setAttribute('status', 'unchecked');

    //  _div for color
    const div_isChecked = table.appendChild(document.createElement('div'));
    div_isChecked.setAttribute('id', 'div_type');
    const div_isCheckedText = div_isChecked.appendChild(document.createElement('span'));
    // div_isCheckedText.setAttribute('id', 'type_text');
    div_isCheckedText.textContent = content[0];

    // _div for content
    const div_content = table.appendChild(document.createElement('div'));
    const div_contentText = div_content.appendChild(document.createElement('span'));
    div_contentText.textContent = content[1];
    div_content.setAttribute('id', 'content');
    div_contentText.addEventListener("click", 
        () => {chrome.tabs.executeScript({ code: `(${moveToText})("${content[1]}")`}); 
        table.setAttribute('status', 'checked');}
    );

    // // _div for undo btn
    // const div_undo = table.appendChild(document.createElement('div'));
    // const btn_undo = div_undo.appendChild(document.createElement('button'));
    // btn_undo.setAttribute('id', 'btn_focus');
    // // btn_undo.addEventListener("click", text_undo());

    // // _div for focus btn TODO: toggle (un)focus
    // const div_focus = table.appendChild(document.createElement('div'));
    // const btn_focus = div_focus.appendChild(document.createElement('button'));
    // btn_focus.setAttribute('id', 'btn_focus');
    // // btn_focus.addEventListener("click", moveToText());
};

// in-browser function
const scanRegex = (regex) => {

    //  TODO: set precise target area
    const targets = document.getElementsByTagName('body');
    console.log(targets);
    
    let results = [];

    for (let field of targets) {
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
    // for (let field of targets) {
    //     if (field.contentEditable) {
    //         console.log("editable : " + field);
    //         let textChunk = field.innerText ? field.innerText.split(/[ ,]+/) : null;
    //         textChunk.map((chunk) => {
    //             console.log(chunk);
    //             Object.keys(regex).map((key) => {
    //             for (let exp of regex[key]) {
    //                 let result = [];
    //                 let temp = chunk.match(exp);
    //                 console.log(temp, exp);
    //                 if (temp) {
    //                     result.push(key); result.push(temp[0]);
    //                     results.push(result);
    //                 }
    //             }
    //             });
    //         });
    //     }
    // }
    return results;
};

//  initialize list view
const initList = () => {
    
};

const text_focus = (content) => {
    const backgroundColor = "yellow";
    document.designMode = "on";
    const sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(content)) {
        document.execCommand("HiliteColor", false, backgroundColor);
        sel.collapseToEnd();
    }
    document.designMode = "off";
};

// TODO:
const text_unfocus = (element) => {
    const backgroundColor = "transparent";
    document.designMode = "on";
    const sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(element)) {
        document.execCommand("HiliteColor", false, backgroundColor);
        sel.collapseToEnd();
    }
    document.designMode = "off";
};

// TODO:
const moveToText = (content) => {
    const tags = document.getElementsByTagName("*");
    for (let tag of tags) {
        if (tag.textContent == content) {
            tag.scrollIntoView();
        }
    }
};

document.addEventListener('DOMContentLoaded', generateList());
window.onblur = () => {
    if (strings) {
        strings.forEach((element) => {
            chrome.tabs.executeScript({ code: `(${text_unfocus})("${element}")` });
        });
    }
    strings = [];
};
// onload -> found = scanExp(json) -> generateList(found)