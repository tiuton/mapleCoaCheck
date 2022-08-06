$(function () {

    $('.menu-item-btn').click(function () {
        $(this).siblings('div div.flex').stop().slideToggle();
    });

    $('input').change(function () {
        if (this.value > 10 || this.value < 0) {
            alert('10以下の数字を入力してください');
            this.value = 0;
        }
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
    });
});