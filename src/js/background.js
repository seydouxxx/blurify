'use strict'

import exps from '../expression.js';

//  리스트 생성
const generateList = () => {
    initList();

    const list_box = document.getElementById('list-box');

    chrome.tabs.executeScript({ code: `(${scanRegex})(${JSON.stringify(exps)})` }, ([results]) => {
        results.forEach(result => {
            let div = list_box.appendChild(document.createElement('div'));
            div.setAttribute('type', result[0]);
            let span = div.appendChild(document.createElement('span'));
            span.innerHTML = result[1];
        });
    });
};

// in-browser function
const scanRegex = (regex) => {

    //  TODO: set precise target area
    const targets = document.getElementsByTagName('body');
    
    let results = [];
    console.log(regex);
    for (let field of targets) {
        console.log(field.innerText);   //test
        Object.keys(regex).map((key) => {   //  eg. ["email", "name", "phone_number", "card_number"]
            
            for (let exp of regex[key]) {
                let result = []; // eg. result = ["email", "yverns1972@gmail.com"]

                let temp = field.innerText ? field.innerText.match(exp) : null;
                console.log(temp, exp);
                if (temp) {
                    result.push(key); result.push(temp[0]);
                    results.push(result);
                }
            }
        });
    }
    return results;
};

//  initialize list view
const initList = () => {
    
};

document.addEventListener('DOMContentLoaded', generateList());
// onload -> found = scanExp(json) -> generateList(found)