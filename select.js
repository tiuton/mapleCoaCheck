const indexScript = (() => {
    //宣言
    let csvArray = [[]];
    let select = document.getElementById("job");
    let skill = document.getElementById("skill");
    let jobname = document.getElementById("jobname");
    let addSelect = document.getElementById(`skillset`);
    const skill_checked = document.getElementsByName('skill');
    const reset_Btn = document.getElementById('reset_btn');
    const next_Btn = document.getElementById("next_btn");
    const secondBackBtn = document.getElementById('second_back_btn');
    const secondNextBtn = document.getElementById("second_next_btn");
    const thirdBackBtn = document.getElementById('third_back_btn');
    const thirdNextBtn = document.getElementById("third_next_btn");
    const plusBtn = document.getElementById('plus_btn');
    const firstPageView = document.getElementById("first_page");
    const secondPageView = document.getElementById("second_page");
    const thirdPageView = document.getElementById("third_page");
    let preadd = `<div class="skillsetbox"><span>1</span>`;
    let skillsetboxIdCount = 0;
    let idNum = 1;
    let haveSkill = [];
    let wantSkill = [];
    let resultData = document.getElementById("result");

    ////最初のページ
    ////csv
    function import_csv(csv_path) {
        fetch(csv_path)
            .then((res) => {
                if (!res.ok) {
                    console.log('正常にリクエストを処理できませんでした。');
                }
                return res.text();
            })
            .then((csv_data) => {
                csvArray = convert_array(csv_data);
                let jobArray = [];
                //jobの読込
                for (let i = 0; i < csvArray.length; i++) {
                    if (!jobArray.includes(csvArray[i][0])) {
                        jobArray.push(csvArray[i][0]);
                    }
                }
                for (let i = 0; i < jobArray.length - 1; i++) {
                    const option1 = document.createElement('option');
                    option1.value = `${jobArray[i]}`;
                    option1.textContent = `${jobArray[i]}`;
                    select.appendChild(option1);
                }
                //職業が変わった時の処理
                //スキルの設定
                select.onchange = event => {
                    if (select.value === "未選択") {
                        skill.style.display = "none";
                        let choiceJobP = document.getElementById("first");
                        choiceJobP.style.display = "none";
                        removeFunc();
                    } else {
                        skill.style.display = "flex";
                        skill.innerHTML = "";
                        let choiceJobP = document.getElementById("first");
                        choiceJobP.style.display = "block";

                        let animationIndex = 0;

                        for (let i = 0; i < csvArray.length; i++) {
                            if (select.value == csvArray[i][0]) {
                                animationIndex += 1;
                                if (animationIndex < 9) {
                                    let replaceLine = csvArray[i][1].replace("\n", "");
                                    replaceLine = replaceLine.replace("\r", "");
                                    let addSkill = `
                                    <div class="skillbox box fadeUp delay-time0${animationIndex}">
                                    <div>
                                      <input type="checkbox" name="skill" id="skill${i + 1}">
                                      <label for="skill${i + 1}" id="label${i + 1}">${replaceLine}</label>
                                    </div>
                                  </div>
                                    `;
                                    skill.innerHTML = skill.innerHTML + addSkill;
                                } else {
                                    let replaceLine = csvArray[i][1].replace("\n", "");
                                    replaceLine = replaceLine.replace("\r", "");
                                    let addSkill = `
                                    <div class="skillbox box fadeUp delay-time${animationIndex}">
                                    <div>
                                      <input type="checkbox" name="skill" id="skill${i + 1}">
                                      <label for="skill${i + 1}" id="label${i + 1}">${replaceLine}</label>
                                    </div>
                                  </div>
                                    `;
                                    skill.innerHTML = skill.innerHTML + addSkill;
                                }

                            }
                        }
                    }
                }
            })
            .catch((error) => {
                console.log('エラーが発生しました。');
            })
    }
    // テキストデータを配列に変換
    function convert_array(csv_data) {
        let data_array = [];
        let data_string = csv_data.split('\n');

        for (let i = 0; i < data_string.length; i++) {
            data_array[i] = data_string[i].split(',');
        }
        return data_array;
    }
    //csvの出力
    let array = import_csv('./data.csv');
    //リセットボタンを押したときの処理
    reset_Btn.addEventListener('click', removeFunc, false);
    //進むボタンを押したときの処理
    next_Btn.addEventListener('click', firstNext, false);
    ////1ページ関数
    function removeFunc() {
        for (let i = 0; i < skill_checked.length; i++) {
            skill_checked[i].checked = false;
        }
    }
    function firstNext() {
        let skill_true_count = 0;
        for (let i = 0; i < skill_checked.length; i++) {
            if (skill_checked[i].checked == true) {
                skill_true_count += 1;
            }
        }
        if (skill_true_count < 3) {
            alert("スキルを3個以上選択してください。");
        } else if (skill_true_count <= 9) {
            firstPageView.style.display = "none";
            next_Btn.style.display = "none";
            reset_Btn.style.display = "none";
            secondPageView.style.display = "block";
            secondBackBtn.style.display = "block";
            secondNextBtn.style.display = "block";
            thirdPageView.style.display = "none";
            thirdBackBtn.style.display = "none";
            thirdNextBtn.style.display = "none";
            jobname.innerHTML = '<img src="./images/mell.gif" alt="メル"></img>';
            jobname.innerHTML += '職業名：' + select.value;
            loadSkill(0);
            SetSelectboxEvent();
        } else {
            alert("スキルの選択は9個までにしてください。");
        }
    }
    function loadSkill(spanCount) {
        if (spanCount != 0) {
            preadd = `<div class="skillsetbox skill-group${spanCount + 1}"><span>${spanCount + 1}</span>`;
            skillsetboxIdCount += 3;
            addSkills(skillsetboxIdCount);
        } else {
            preadd = `<div class="skillsetbox skill-group1"><span>1</span>`;
            skillsetboxIdCount = 0;
            addSkills(0);
        }
        function addSkills(num) {
            for (let j = 0; j < 3; j++) {
                let midstart = `<select name="skillset${j + 1}" id="${j + 1 + num}"><option value="未選択">(${j + 1})未選択</option>`;
                preadd += midstart;
                for (let i = 0; i < csvArray.length; i++) {
                    let skillboxID = document.getElementById(`skill${i + 1}`);
                    if (skillboxID != null) {
                        if (skillboxID.checked) {
                            let labelID = document.getElementById(`label${i + 1}`);
                            preadd += `<option value="${labelID.innerText}">${labelID.innerText}</option>`;
                        }
                    }
                }
                preadd = preadd + `</select>`;
            }
        }
        preadd += `</div>`;
        addSelect.insertAdjacentHTML("beforeend", preadd);
    }

    ////2ページ
    //戻るボタンを押したときの処理
    secondBackBtn.addEventListener('click', secondBack, false);
    //Plusボタンを押したときの処理
    plusBtn.addEventListener('click', addColumn, false);
    //進むボタンを押したときの処理
    secondNextBtn.addEventListener('click', compareSelect, false);
    ////2ページ関数
    function secondBack() {
        addSelect.innerHTML = "";
        firstPageView.style.display = "block";
        next_Btn.style.display = "block";
        reset_Btn.style.display = "block";
        secondPageView.style.display = "none";
        secondBackBtn.style.display = "none";
        secondNextBtn.style.display = "none";
        thirdPageView.style.display = "none";
        thirdBackBtn.style.display = "none";
        thirdNextBtn.style.display = "none";
    }
    function addColumn() {
        let classId = document.getElementsByClassName("skillsetbox");
        if (classId.length < 10) {
            loadSkill(classId.length);
            SetSelectboxEvent();
        }
    }
    //2ページ目のselectを選んだ時、重複できないようにする処理
    function SetSelectboxEvent() {
        let classId = document.getElementsByClassName("skillsetbox");

        var selectGroup = document.getElementsByClassName('skill-group' + (classId.length))[0].querySelectorAll('select');

        Array.prototype.forEach.call(selectGroup, function (element) {
            element.addEventListener('change', function () {
                var selectValue = this.value;
                if (selectValue != "未選択") {
                    Array.prototype.forEach.call(selectGroup, function (element) {
                        element.querySelector('[value=' + selectValue + ']').setAttribute('disabled', true);
                    })
                };
            }, false);
            element.addEventListener('blur', function () {
                var selectValue = this.value;
                if (selectValue != "未選択") {
                    Array.prototype.forEach.call(selectGroup, function (element) {
                        element.querySelector('[value=' + selectValue + ']').setAttribute('disabled', true);
                    })
                };
            }, false);
            element.addEventListener('focus', function () {
                var selectValue = this.value;
                Array.prototype.forEach.call(selectGroup, function (element) {
                    element.querySelector('[value=' + selectValue + ']').removeAttribute('disabled');
                })
            }, false);
        })
    }
    //2ページ目進むボタン押したとき
    function compareSelect() {
        firstPageView.style.display = "none";
        next_Btn.style.display = "none";
        reset_Btn.style.display = "none";
        secondPageView.style.display = "none";
        secondBackBtn.style.display = "none";
        secondNextBtn.style.display = "none";
        thirdPageView.style.display = "block";
        thirdBackBtn.style.display = "block";
        thirdNextBtn.style.display = "block";

        resultSkill = [];
        wantSkill = [];
        haveSkill = [];

        addChoiceSkill();
        wantSkill = createWantSkill();
        let skillset1 = combinationSkill();
        wantData = [skillset1];
        let count = 0;
        if (wantSkill.length != 3) {
            while (true) {
                let skillset2 = combinationSkill();
                count = 0;
                for (let i = 0; i < skillset1.length; i++) {
                    if (getIsDuplicate(skillset1[i], skillset2[i])) {
                        count += 1;
                        if (count > (skillset1.length - 1)) {
                            wantData.push(skillset2);
                        }
                    }
                }
                if (wantSkill.length > 8) {
                    if (wantData.length > 5) {
                        break;
                    }
                } else if (wantSkill.length > 6) {
                    if (wantData.length > 3) {
                        break;
                    }
                } else {
                    if (wantData.length > 2) {
                        break;
                    }
                }
            }
        }
        for (let i = 0; i < wantData.length; i++) {
            for (let j = 0; j < wantData[i].length; j++) {
                for (let k = 0; k < wantData[i][j].length; k++) {
                    if (wantData[i][j][k] == undefined) {
                        wantData[i][j][k] = "自由枠";
                    }
                }
            }
        }
        console.log(wantData);


        let finalData = ``;

        let count2 = 0;
        createResultView();

        resultData.innerHTML = finalData;

        let selectId = document.getElementById("1");
        let count3 = 1;
        //selectを取得
        while (selectId != undefined) {

            count2 = 0;
            let selectId1 = document.getElementById(`${count3}`);
            let selectId2 = document.getElementById(`${count3 + 1}`);
            let selectId3 = document.getElementById(`${count3 + 2}`);

            for (let i = 0; i < wantData.length; i++) {
                for (let j = 0; j < wantData[i].length; j++) {
                    if (wantData[i][j][0] == selectId1.value) {
                        console.log("ここ" + wantData[i][j][1]);
                        if ((((wantData[i][j][1] == selectId2.value) && (wantData[i][j][2] == selectId3.value))) ||
                            (((wantData[i][j][1] == "自由枠") && (wantData[i][j][2] == selectId3.value))) ||
                            (((wantData[i][j][1] == selectId2.value) && (wantData[i][j][2] == "自由枠")))) {
                            let data1 = document.getElementById(`data${count2}${j}${0}`);
                            let data2 = document.getElementById(`data${count2}${j}${1}`);
                            let data3 = document.getElementById(`data${count2}${j}${2}`);
                            data1.style.backgroundColor = "gray";
                            data2.style.backgroundColor = "gray";
                            data3.style.backgroundColor = "gray";

                        } else if ((((wantData[i][j][2] == selectId2.value) && (wantData[i][j][1] == selectId3.value))) ||
                            (((wantData[i][j][2] == "自由枠") && (wantData[i][j][1] == selectId3.value))) ||
                            (((wantData[i][j][2] == selectId2.value) && (wantData[i][j][1] == "自由枠")))) {
                            let data1 = document.getElementById(`data${count2}${j}${0}`);
                            let data2 = document.getElementById(`data${count2}${j}${1}`);
                            let data3 = document.getElementById(`data${count2}${j}${2}`);
                            data1.style.backgroundColor = "gray";
                            data2.style.backgroundColor = "gray";
                            data3.style.backgroundColor = "gray";
                        } else { }
                    }
                }
                count2 += 1;
            }

            count3 += 3;
            selectId = document.getElementById(`${count3}`);
            if (count3 == 99) {
                console.log("selectIDオーバーフローしました");
                break;
            }
        }

        //関数
        function createResultView() {
            for (let i = 0; i < wantData.length; i++) {
                let addStartData = `<div class="result_box fadeUp delay-time${i}"><p>組み合わせ${i + 1}</p>`;
                for (let j = 0; j < wantData[i].length; j++) {
                    let middleStartData = `<div class="koa_box" id="data${count2}${j}"><p>${j + 1}. </p>`;
                    for (let k = 0; k < wantData[i][j].length; k++) {
                        middleStartData += `<p id="data${count2}${j}${k}">${wantData[i][j][k]}</p>`;
                    }
                    addStartData = addStartData + middleStartData + `</div>`
                }
                addStartData += `</div>`;
                finalData += addStartData;
                count2 += 1;
            }
            finalData = "<p>既に持っている組み合わせはグレー色</p>" + finalData;
        }
        function getIsDuplicate(arr1, arr2) {
            return [...arr1, ...arr2].filter(item => arr1.includes(item) && arr2.includes(item)).length > 0
        }

        function combinationSkill() {
            let passCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            let numyo = 0;
            while (true) {
                passCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                let resultList = [];
                let test11 = randomCreate(0, wantSkill.length, 0);
                let test22 = randomCreate(0, wantSkill.length, 1);
                let test33 = randomCreate(0, wantSkill.length, 2);

                let test1 = [wantSkill[0], wantSkill[test11[1]], wantSkill[test11[2]]];
                let test2 = [wantSkill[1], wantSkill[test22[1]], wantSkill[test22[2]]];
                let test3 = [wantSkill[2], wantSkill[test33[1]], wantSkill[test33[2]]];
                let test4 = [];
                let test5 = [];
                let test6 = [];

                if (wantSkill.length == 3) {
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                }
                if (wantSkill.length == 4) {
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                }
                if (wantSkill.length == 5) {
                    let test44 = randomCreate(Number(0), wantSkill.length, 3);
                    test4 = [wantSkill[3], wantSkill[test44[1]], wantSkill[test44[2]]];
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    pass(test4);
                }
                if (wantSkill.length == 6) {
                    let test44 = randomCreate(Number(0), wantSkill.length, 4);
                    test4 = [wantSkill[3], wantSkill[test44[1]], wantSkill[test44[2]]];
                    passCounter.pop();
                    passCounter.pop();
                    passCounter.pop();
                    pass(test4);
                }
                if (wantSkill.length == 7) {
                    let test44 = randomCreate(Number(0), wantSkill.length, 5);
                    test4 = [wantSkill[3], wantSkill[test44[1]], wantSkill[test44[2]]];
                    let test55 = randomCreate(0, wantSkill.length, 4);
                    test5 = [wantSkill[4], wantSkill[test55[1]], wantSkill[test55[2]]];
                    passCounter.pop();
                    passCounter.pop();
                    pass(test4);
                    pass(test5);
                }
                if (wantSkill.length == 8) {
                    let test44 = randomCreate(Number(0), wantSkill.length, 6);
                    test4 = [wantSkill[3], wantSkill[test44[1]], wantSkill[test44[2]]];
                    let test55 = randomCreate(0, wantSkill.length, 4);
                    test5 = [wantSkill[4], wantSkill[test55[1]], wantSkill[test55[2]]];
                    let test66 = randomCreate(0, wantSkill.length, 5);
                    test6 = [wantSkill[5], wantSkill[test66[1]], wantSkill[test66[2]]];
                    passCounter.pop();
                    pass(test4);
                    pass(test5);
                    pass(test6);
                }
                if (wantSkill.length == 9) {
                    let test44 = randomCreate(Number(0), wantSkill.length, 7);
                    test4 = [wantSkill[3], wantSkill[test44[1]], wantSkill[test44[2]]];
                    let test55 = randomCreate(0, wantSkill.length, 4);
                    test5 = [wantSkill[4], wantSkill[test55[1]], wantSkill[test55[2]]];
                    let test66 = randomCreate(0, wantSkill.length, 5);
                    test6 = [wantSkill[5], wantSkill[test66[1]], wantSkill[test66[2]]];
                    pass(test4);
                    pass(test5);
                    pass(test6);
                }
                pass(test1);
                pass(test2);
                pass(test3);
                console.log(passCounter);
                let isTwo = passCounter.every(function (value) {
                    return value == 2;
                });
                if (isTwo) {
                    resultList.push(test1, test2, test3);
                    if (wantSkill.length >= 5) {
                        resultList.push(test4);
                    }
                    if (wantSkill.length >= 7) {
                        resultList.push(test5);
                    }
                    if (wantSkill.length >= 8) {
                        resultList.push(test6);
                    }

                    return resultList;
                    break;
                }
                numyo += 1;
                console.log(numyo);
                function pass(array) {
                    array.forEach(element => {
                        for (let j = 0; j < wantSkill.length; j++) {
                            if (element == wantSkill[j]) {
                                passCounter[j] += 1;
                            }
                        }
                    });
                };
            }
        }

        function randomCreate(min, max, removeNum) {
            /** 重複チェック用配列 */
            let randoms = [removeNum];
            /** 重複チェックしながら乱数作成 */
            for (i = 0; i < 2; i++) {
                while (true) {
                    let tmp = intRandom(min, max);
                    if ((!randoms.includes(tmp)) || (!randoms.includes(removeNum))) {
                        randoms.push(Number(tmp));
                        break;
                    }
                }
            }
            return randoms;
            /** min以上max以下の整数値の乱数を返す */
            function intRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }

        function createWantSkill() {
            let result1 = [];
            let result = [];
            for (let i = 0; i < csvArray.length; i++) {
                let skillboxID = document.getElementById(`skill${i + 1}`);
                if (skillboxID != null) {
                    if (skillboxID.checked) {
                        let labelID = document.getElementById(`label${i + 1}`);
                        result.push(labelID.innerText);
                    }
                }
            }
            for (let i = 0; i < result.length; i++) {
                let result2 = result[i].replace("\n", "");
                result1.push(result2);
            }
            return result1;
        }

        function addChoiceSkill() {
            idNum = 1;
            let loopnum = 1;
            let haveArray = [];
            while (true) {
                try {
                    let have = document.getElementById(`${idNum}`).value;
                    let haveIn = have.replace("\n", "");
                    haveArray.push(haveIn);
                    if ((loopnum % 3) == 0) {
                        haveSkill.push(haveArray);
                        haveArray = [];
                    }

                    idNum++;
                    loopnum++;
                } catch (e) {
                    break;
                }
            }
        }
    }

    ////3ページ
    //Plusボタンを押したときの処理
    thirdBackBtn.addEventListener('click', backSecondPage, false);
    //進むボタンを押したときの処理
    thirdNextBtn.addEventListener('click', goTitle, false);

    function backSecondPage() {
        firstPageView.style.display = "none";
        next_Btn.style.display = "none";
        reset_Btn.style.display = "none";
        secondPageView.style.display = "block";
        secondBackBtn.style.display = "block";
        secondNextBtn.style.display = "block";
        thirdPageView.style.display = "none";
        thirdBackBtn.style.display = "none";
        thirdNextBtn.style.display = "none";
    }
    function goTitle() {
        addSelect.innerHTML = "";
        firstPageView.style.display = "block";
        next_Btn.style.display = "block";
        reset_Btn.style.display = "block";
        secondPageView.style.display = "none";
        secondBackBtn.style.display = "none";
        secondNextBtn.style.display = "none";
        thirdPageView.style.display = "none";
        thirdBackBtn.style.display = "none";
        thirdNextBtn.style.display = "none";
    }
})();