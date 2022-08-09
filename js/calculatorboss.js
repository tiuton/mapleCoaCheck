$(function () {
    class Mylist {
        constructor(name, romaji, value, hunt, type) {
            this.name = name;
            this.romaji = romaji;
            this.value = value;
            this.hunt = hunt;
            this.type = type;
        }
    };

    let readData = [];
    let totalR = 0;
    let mylistLength = [];

    //びよーん
    $('.menu-item-btn').click(function () {
        $(this).siblings('div div.flex').stop().slideToggle();
    });

    // cookie書き込み,保存する際は金額のカンマ外し
    $("#save").click(function () {
        //cookieが使えるか確認
        if (navigator.cookieEnabled) {

            let $form = $('#form1');
            let param = $form.serializeArray();
            // 日本語の名前取得
            let name = [];
            $("dt").each((index, element) => {
                let ele = $(element).text();
                name.push(ele);
            });

            let nglist = ["名前", "ウィークリーボス", "デイリーボス", "マンスリーボス", "合計", "累計"]
            name = name.filter(element => {
                return !nglist.includes(element);
            });
            console.log(name);
            // 討伐数の取得
            let removeComma = param.map(num => num.value.replaceAll(',', ''));
            let hunt = removeComma.filter((num, index) => index % 2 !== 0);
            // 分類の取得
            let daily = $(".daily").length;
            let weekly = $(".weekly").length;
            let monthly = $(".monthly").length;
            let md = $(".md").length;
            let mm = $(".mm").length;
            let mw = $(".mw").length;
            let type = []

            if (md > 0) {
                type = "d,".repeat(md).split(",");
                type.pop();
                let array1 = "w,".repeat(mw).split(",");
                array1.pop();
                type = type.concat(array1);
                let array2 = "m,".repeat(mm).split(",");
                array2.pop();
                type = type.concat(array2);
            } else if (mm > 0) {
                type = "d,".repeat(md).split(",");
                type.pop();
                let array1 = "w,".repeat(mw).split(",");
                array1.pop();
                type = type.concat(array1);
                let array2 = "m,".repeat(mm).split(",");
                array2.pop();
                type = type.concat(array2);
            } else if (mw > 0) {
                type = "d,".repeat(md).split(",");
                type.pop();
                let array1 = "w,".repeat(mw).split(",");
                array1.pop();
                type = type.concat(array1);
                let array2 = "m,".repeat(mm).split(",");
                array2.pop();
                type = type.concat(array2);
            } else {
                type = "d,".repeat(daily).split(",");
                type.pop();
                let array1 = "w,".repeat(weekly).split(",");
                array1.pop();
                type = type.concat(array1);
                let array2 = "m,".repeat(monthly).split(",");
                array2.pop();
                type = type.concat(array2);
            }

            // 今日の日付を取得
            let now = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
            let today = now.join("_");
            // 累計を取得
            let total = Number($("#totalS").text().replaceAll(",", "")) + Number(totalR);
            if (isNaN(total)) {
                total = 0;
            }
            //md,mw,mmの数からmylistの上書き保存にいる処理

            mylistLength = md + mm + mw;
            //保存処理
            document.cookie = (`00data=${today};` + "expires=Tue, 31-Dec-2037 00:00:00 GMT;domain=yukiichigo.com").replace(" ", "");
            document.cookie = (`01data=${total};` + "expires=Tue, 31-Dec-2037 00:00:00 GMT;domain=yukiichigo.com").replace(" ", "");

            for (let i = 0; i < param.length; i++) {

                if (Number(hunt[i]) > 0) {
                    param[i * 2].name = param[i * 2].name.replaceAll("0", "");
                    param[i * 2].value = param[i * 2].value.replaceAll(',', '');
                    setData = (`${param[i * 2].name}=` + encodeURIComponent(`${name[i]}-${param[i * 2].name}-${param[i * 2].value}-${hunt[i]}-${type[i]}`) + ";expires=Tue, 31-Dec-2037 00:00:00 GMT;domain=yukiichigo.com").replace(" ", "");
                    document.cookie = setData;
                } else if (i < mylistLength) {
                    param[i * 2].name = param[i * 2].name.replaceAll("0", "");
                    param[i * 2].value = param[i * 2].value.replaceAll(',', '');
                    setData = (`${param[i * 2].name}=` + encodeURIComponent(`${name[i]}-${param[i * 2].name}-${param[i * 2].value}-${hunt[i]}-${type[i]}`) + ";expires=Tue, 31-Dec-2037 00:00:00 GMT;domain=yukiichigo.com").replace(" ", "");
                    document.cookie = setData;
                }
            }

            const cookies = document.cookie;
            alert("保存しました。");
            $(function () {
                setTimeout(function () {
                    totalR = Number($("#totalR").text().replaceAll(",", ""));
                    ruikei();
                }, 500);
            });
        }
    });

    // 計算する
    $(document).on("change", "input", function () {
        if (this.value > 10 || this.value < 0) {
            alert('10以下の数字を入力してください');
            this.value = 0;
        };

        $(function () {
            setTimeout(function () {
                ruikei();
            }, 1000);
        });
    });
    //トグルボタンの動作
    $('input[type=checkbox]').click(function () {
        $("input[type=checkbox]").prop("disabled", true);
        if (($(this).prop('checked'))) {
            // マイリストONの時
            $(function () {
                setTimeout(function () {
                    $(".mylist-off").css({
                        "display": "none",
                    });
                    $(".menu-item-btn").each(function () {
                        $(this).siblings('div div.flex').stop().slideUp();
                    });
                    $("input[type=checkbox]").prop("disabled", false);
                }, 800);
            });
            // アニメーション
            $(".mylist-off").css({
                "animation-name": "fadeOut",
                "animation-duration": "1s",
                "animation-fill-mode": "both"
            });
            $("#mylist").css({
                "display": "block",
                "animation-name": "fadeIn",
                "animation-duration": "1s",
                "animation-fill-mode": "both",
            });
            // 初期化
            let input = $("input");
            for (i in input) {
                if (i % 2 == 0) {
                    input[i].value = 0;
                }
            }
            // リストの作成

            // cookieの読込
            let cookies = decodeURI(document.cookie);
            let cookieData = [];
            let today = Date();
            function sort_num_block(a, b) {
                const sa = String(a).replace(/(\d+)/g, m => m.padStart(30, '0'));
                const sb = String(b).replace(/(\d+)/g, m => m.padStart(30, '0'));
                return sa < sb ? -1 : sa > sb ? 1 : 0;
            }

            let a = cookies.split(";");
            let array = [];
            for (let i = 0; i < a.length; i++) {
                array[i] = a[i].replaceAll(" ", "");
            }
            //phpid削除処理
            array.sort(sort_num_block);
            array = array.filter((value) => !value.includes("PHPSESSID"));
            for (let i = 0; i < array.length; i++) {

                if (Number(i) == 0) {
                    today = Date(array[i].split('=')[1].replaceAll("_", "/"));
                } else if (Number(i) == 1) {
                    totalR = array[i].split('=')[1];
                }
                else {
                    const content = array[i].split('=');
                    cookieData.push(content[1]);
                }
            };

            // リストの初期化処理
            readData = [];
            for (let i = 0; i < cookieData.length; i++) {
                let splitcomma = cookieData[i].split("-");
                //金額にカンマをつける
                splitcomma[2] = Number(splitcomma[2]).toLocaleString();
                // 日本語名-ローマ字-価格-討伐数-タイプ
                readData.push(new Mylist(splitcomma[0], splitcomma[1], splitcomma[2], splitcomma[3], splitcomma[4], splitcomma[5]));
            }
            let $mylist = $("#mylist");
            $mylist.empty();
            $mylist.append(`
            <dl>
            <dt>名前</dt>
            <dd>おこづかい</dd>
            <dd>討伐数</dd>
             </dl>
              `);
            readData.forEach((value) => {
                $mylist.append(`
                 <dl>
                 <dt class="m${value.type}">${value.name}</dt>
                 <dd><input type="text" class="no-border" name="${value.romaji}0" value="${value.value}" size="20"
                         readonly></dd>
                 <dd><input type="number" name="${value.romaji}1" value="${value.hunt}" size="20" min="0" max="10"></dd>
                 </dl>
                 `);
            });
        } else {
            // マイリストOFFの時
            $(function () {
                setTimeout(function () {
                    $("#mylist").css({
                        "display": "none",
                    });
                    $("input[type=checkbox]").prop("disabled", false);
                }, 800);
            });

            $(".mylist-off").css({
                "display": "block",
                "animation-name": "fadeIn",
                "animation-duration": "1s",
                "animation-fill-mode": "both",
            });
            $("#mylist").css({
                "animation-name": "fadeOut",
                "animation-duration": "1s",
                "animation-fill-mode": "both"
            });
            let $mylist = $("#mylist");
            $mylist.empty();
        }
    });

    // 累計の計算
    function ruikei() {
        if ($("#mylist").css("display") == "block") {
            // マイリスト表示時の計算
            let mylistInputs = [];

            for (let i = 0; i < $('#mylist').find('input').length; i++) {
                mylistInputs.push($('#mylist').find('input')[i].value);
            }
            let removeComma = mylistInputs.map(num => num.replaceAll(',', ''));

            let price = removeComma.filter((num, index) => index % 2 === 0);
            let hunt = removeComma.filter((num, index) => index % 2 !== 0);
            let md = $(".md").length;
            let mm = $(".mm").length;
            let mw = $(".mw").length;

            let dSum = 0;
            let wSum = 0;
            let mSum = 0;

            for (let i = 0; i < md; i++) {
                dSum = Number(dSum) + (Number(price[i]) * Number(hunt[i]));
            };
            for (let i = md; i < (md + mw); i++) {
                wSum = Number(wSum) + (Number(price[i]) * Number(hunt[i]));
            };
            for (let i = (md + mw); i < (md + mw + mm); i++) {
                mSum = Number(mSum) + (Number(price[i]) * Number(hunt[i]));
            };
            sSum = dSum + wSum + mSum;
            let total = sSum + Number(totalR);
            $('#totalD').text(dSum.toLocaleString());
            $('#totalW').text(wSum.toLocaleString());
            $('#totalM').text(mSum.toLocaleString());
            $('#totalS').text(sSum.toLocaleString());
            $('#total').css({ "display": "flex" });
            $('#setumei').css({ "display": "block" });
            $('#save').text("Save");
            $('#totalR').text(total.toLocaleString());
        } else {
            // マイリスト非表示の計算
            let $form = $('#form1');
            let param = $form.serializeArray();
            this.value = Number(this.value);

            let removeComma = param.map(num => num.value.replaceAll(',', ''));
            let price = removeComma.filter((num, index) => index % 2 === 0);
            let hunt = removeComma.filter((num, index) => index % 2 !== 0);

            let dSum = 0;
            let wSum = 0;
            let mSum = 0;
            let loop = 19;
            for (let i = 0; i < loop; i++) {
                dSum = dSum + (Number(price[i]) * Number(hunt[i]));
            }
            for (let i = loop; i < price.length - 1; i++) {
                wSum = wSum + (Number(price[i]) * Number(hunt[i]));
            }
            mSum = mSum + (Number(price.slice(-1)[0]) * Number(hunt.slice(-1)[0]));
            sSum = dSum + wSum + mSum;
            $('#totalD').text(dSum.toLocaleString());
            $('#totalW').text(wSum.toLocaleString());
            $('#totalM').text(mSum.toLocaleString());
            $('#totalS').text(sSum.toLocaleString());
            $('#total').css({ "display": "none" });
            $('#setumei').css({ "display": "none" });
            $('#save').text("マイリストに登録");
        };
    };
});