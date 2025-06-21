import { KeywordSet } from "./keyword.js";
import { Util } from "./keyword.js";

document.addEventListener("DOMContentLoaded", function (event) {
    resetPage();
});

/* 키워드 세트 관리 영역 */
const manuSet = document.getElementById("manuSet");
const manuRegist = document.getElementById("manuRegist");
const manuMod = document.getElementById("manuMod");
const manuDelete = document.getElementById("manuDelete");

let manu_select = null;

manuRegist.addEventListener("click", () => resetRegist());
manuMod.addEventListener("click", () => resetMod());
manuDelete.addEventListener("click", () => resetDelete());

function resetPage() {
    manu_select = null;
    selectKeyword.classList.add("hidden");
    modifySet.classList.add("hidden");
    deleteSet.classList.add("hidden");
}

function resetRegist() {
    resetPage();
    manu_select = "regist";
    startModify();
}

function resetMod() {
    resetPage();
    manu_select = "mod";
    startSelect();
}

function resetDelete() {
    resetPage();
    manu_select = "delete";
    startSelect();
}

/* 키워드 세트 선택 영역 */
const selectKeyword = document.getElementById("selectKeyword");
const selectForm = document.getElementById("selectForm");
const selectSet = document.getElementById("selectSet");
const selectSubmit = document.getElementById("selectSubmit");

let selected_set = null;    //선택된 KeywordSet의 인덱스 값

selectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    selected_set = selectSet.value;
    switch (manu_select) {
        case "mod":
            startModify();
            break;
        case "delete":
            startDelete();
            break;
        default:
            break;
    }
});

function startSelect() {
    selectKeyword.classList.remove("hidden");
    resetOptions();
    getOptions();
}

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

/* 키워드 세트 편집 영역 */
const modifySet = document.getElementById("modifySet");
const modifyForm = document.getElementById("modifyForm");
const modifyTitle = document.getElementById("modifyTitle");
const modifyText = document.getElementById("modifyText");
const modifySave = document.getElementById("modifySave");
const modifyMessage = document.getElementById("modifyMessage");

modifyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (Util.isEmpty(modifyTitle.value)) {
        modifyMessage.textContent = "제목이 비어있습니다."
        return false;
    }
    else if (Util.isEmpty(modifyText.value)) {
        modifyMessage.textContent = "키워드가 없습니다."
        return false;
    }
    let set = new KeywordSet(modifyTitle.value, modifyText.value);
    switch (manu_select) {
        case "mod":
            if (KeywordSet.checkModify(selected_set)) {
                modifyMessage.textContent = "같은 제목의 키워드 세트가 존재합니다."
                return false;
            }
            else {
                set.update(selected_set);
                KeywordSet.saveJson();
                resetPage();
                break;
            }
        default:
            if (KeywordSet.checkExist(set.getTitle())) {
                modifyMessage.textContent = "같은 제목의 키워드 세트가 존재합니다."
                return false;
            }
            else {
                set.regist();
                KeywordSet.saveJson();
                resetPage();
                break;
            }
    }
    return true;
});

function startModify() {
    modifySet.classList.remove("hidden");
    modifyTitle.value = "";
    modifyText.value = "";
    modifyMessage.textContent = "";
    switch (manu_select) {
        case "mod":
            const set = KeywordSet.set_list[selected_set];
            if (set) {
                modifyTitle.value = set.getTitle();
                modifyText.value = set.getText();
            }
            else {
                manu_select = "regist";
            }
            break;
        default:
            break;
    }
}

const deleteSet = document.getElementById("deleteSet");
const deleteForm = document.getElementById("deleteForm");
const deleteMessage = document.getElementById("deleteMessage");
const deleteSubmit = document.getElementById("deleteSubmit");
const deleteReset = document.getElementById("deleteReset");

deleteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    KeywordSet.removeSet(selected_set);
    KeywordSet.saveJson();
    resetPage();
});

deleteForm.addEventListener("reset", function (event) {
    event.preventDefault();
    deleteSet.classList.add("hidden");
});

function startDelete() {
    const set = KeywordSet.set_list[selected_set];
    if (set) {
        deleteSet.classList.remove("hidden");
        deleteMessage.textContent = "\"" + set.getTitle() + "\"";
    }
}