import { KeywordSet } from "./keyword.js";
import { Util } from "./keyword.js";

/* 키워드 세트 저장 영역 */
const saveJson = document.getElementById("saveJson");

saveJson.addEventListener("click", function (event) {
    const link = document.createElement("a");
    link.href = KeywordSet.exportJson();
    link.download = "keywordset";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

/* 키워드 세트 불러오기 영역 */
const loadSet = document.getElementById("loadSet");
const jsonFile = document.getElementById("jsonFile");
const jsonText = document.getElementById("jsonText");
const loadJson = document.getElementById("loadJson");

let file_text = "";

jsonFile.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const read = new FileReader();
    read.onload = function (e) {
        file_text = e.target.result;
        jsonText.value = file_text;
    };
    read.readAsText(file, "utf-8");
});

loadSet.addEventListener("submit", function (event) {
    KeywordSet.importJson(file_text);
    KeywordSet.saveJson();
});