export class KeywordSet {
    title = "";     //string 값
    keyword = [];   //string 배열
    static set_list = [];   //KeywordSet 배열

    constructor(title, text) {
        this.title = title;
        this.keyword = Util.splitByComma(text);
    }

    static findSet(title) {
        let set = null;
        for (let i = 0; i < KeywordSet.set_list.length; i++) {
            set = KeywordSet.set_list[i];
            if (set.getTitle() == title) {
                return i;
            }
        }
        return -1;
    }

    static checkExist(title) {
        if (KeywordSet.findSet(title) > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    static checkModify(index) {
        let set = KeywordSet.set_list[index];
        KeywordSet.set_list[index] = new KeywordSet("", "");
        let check = KeywordSet.checkExist(this.title)
        KeywordSet.set_list[index] = set;
        return check;
    }

    static copySet(index) {
        const origin = KeywordSet.set_list[index];
        if (!origin) {
            console.warn("copySet 실패: set_list에 해당 인덱스 없음", index);
            return null;
        }
        return new KeywordSet(origin.getTitle(), origin.getText());
    }

    static removeSet(index) {
        KeywordSet.set_list.splice(index, 1);
    }

    setTitle(title) {
        this.title = title;
    }

    setText(text) {
        this.keyword = Util.splitByComma(text);
    }

    regist() {
        KeywordSet.set_list.push(this);
    }

    update(index) {
        KeywordSet.set_list[index] = this;
    }

    getTitle() {
        return this.title;
    }

    getText() {
        if (!Array.isArray(this.keyword)) return this.keyword;
        return this.keyword.map(k => String(k)).join(", ");
    }

    getLength() {
        return this.keyword.length;
    }

    getKeyword(index) {
        if (index < 0 || index >= this.keyword.length) return null;
        return this.keyword[index];
    }

    shuffleKeyword() {
        this.keyword = Util.shuffleArray(this.keyword);
    }

    popKeyword() {
        return this.keyword.pop();
    }

    static saveJson() {
        localStorage.setItem("save", JSON.stringify(KeywordSet.set_list));
    }

    static loadJson() {
        const saved = localStorage.getItem("save");
        if (!saved) return false;
        try {
            const rawList = JSON.parse(saved);
            KeywordSet.set_list = rawList.map(obj => {
                return new KeywordSet(obj.title, obj.keyword.join(", "));
            });
            return true;
        } catch (e) {
            console.error("불러오기 실패:", e);
            return false;
        }
    }

    static exportJson() {
        const json_text = JSON.stringify(KeywordSet.set_list, null, 4);
        const blob = new Blob([json_text], { type: "application/json" });
        const link = URL.createObjectURL(blob);
        return link;
    }

    static importJson(file) {
        const saved = file;
        if (!saved) return false;
        try {
            const rawList = JSON.parse(saved);
            KeywordSet.set_list = rawList.map(obj => {
                return new KeywordSet(obj.title, obj.keyword.join(", "));
            });
            return true;
        } catch (e) {
            console.error("불러오기 실패:", e);
            return false;
        }
    }
}

export class Util {
    static splitByComma(text) {
        if (!text) return [];
        return text.split(/,\s*/);
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffleArray(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Util.getRandomInt(0, i);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    static isEmpty(text) {
        return text.trim() === "";
    }
}