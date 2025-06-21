import { KeywordSet } from "./keyword.js";
import { Util } from "./keyword.js";

/* 헤더 ~ 메인메뉴 영역 */
const toMaker = document.getElementById("toMaker");
const toRegister = document.getElementById("toRegister");
const toSave = document.getElementById("toSave");
const toManual = document.getElementById("toManual");

toMaker.addEventListener("click", () => gotoPage("keyword-maker.html"));
toRegister.addEventListener("click", () => gotoPage("keyword-register.html"));
toSave.addEventListener("click", () => gotoPage("keyword-save.html"));
toManual.addEventListener("click", () => gotoPage("keyword-manual.html"));

document.addEventListener("DOMContentLoaded", function (event) {
    KeywordSet.loadJson();
});

function gotoPage(url) {
    KeywordSet.saveJson();
    location.href = url;
}