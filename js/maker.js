import { KeywordSet } from "./keyword.js";
import { Util } from "./keyword.js";

document.addEventListener("DOMContentLoaded", function (event) {
    resetOptions();
    getOptions();
});

/* 키워드 세트 선택 영역 */
const selectKeyword = document.getElementById("selectKeyword");
const selectForm = document.getElementById("selectForm");
const selectSet = document.getElementById("selectSet");
const selectSubmit = document.getElementById("selectSubmit");
const selectReset = document.getElementById("selectReset");

let selected_set = null;    //선택된 KeywordSet의 인덱스 값

selectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    selected_set = selectSet.value;
    startShow();
});

selectForm.addEventListener("reset", function (event) {
    event.preventDefault();
    selected_set = null;
    set = null
    endShow();
});

function getOptions() {
    const set_list = KeywordSet.set_list;
    if (set_list.length > 0) {
        let option = null;
        let set = null
        for (let i = 0; i < set_list.length; i++) {
            set = set_list[i];
            option = document.createElement("option");
            option.value = i;
            option.text = set.getTitle();
            selectSet.add(option);
        }
    }
}

function resetOptions() {
    while (selectSet.options.length > 0) {
        selectSet.remove(0);
    }
}

/* 키워드 출력 영역 */
const showKeyword = document.getElementById("showKeyword");
const showText = document.getElementById("showText");

let set = null;

function styleShowText(state) {
    switch (state) {
        case "all":
            showText.style.fontSize = "2vh";
            showText.style.color = "black";
            break;
        case "undefined":
            showText.style.fontSize = "6vh";
            showText.style.color = "lightgray";
            break;
        default:
            showText.style.fontSize = "6vh";
            showText.style.color = "black";
            break;
    }
}

function changeKeyword() {
    if (set) {
        styleShowText("keyword");
        showText.textContent = set.popKeyword();
    }
    else {
        styleShowText("undefined");
        showText.textContent = "undefined";
    }
}

function showAll() {
    if (set) {
        styleShowText("all");
        showText.textContent = KeywordSet.set_list[selected_set].getText();
    }
    else {
        styleShowText("undefined");
        showText.textContent = "undefined";
    }
}

function startShow() {
    set = KeywordSet.copySet(selected_set);
    console.log("set: ", set);
    if (set) {
        set.shuffleKeyword();
    }
    styleShowText("keyword");
    showText.textContent = "\"" + set.getTitle() + "\"";
}

function endShow() {
    styleShowText("keyword");
    showText.textContent = "keyword";
    startShow();
}

/* 키워드 조작 영역 */
const controlKeyword = document.getElementById("controlKeyword");
const controlChange = document.getElementById("controlChange");
const controlEnd = document.getElementById("controlEnd");
const controlAll = document.getElementById("controlAll");

controlChange.addEventListener("click", () => changeKeyword());
controlEnd.addEventListener("click", () => endShow());
controlAll.addEventListener("click", () => showAll());