define(['jquery'],  function ($) {

    var TimeUnit = [
            {
                scale:    1000,
                name:     "秒"
            },
            {
                scale:    60,
                name:     "分钟"
            },
            {
                scale:    60,
                name:     "小时"
            },
            {
                scale:    24,
                name:     "天"
            },
            {
                scale:    7,
                name:     "周"
            },
            {
                scale:    30 / 7,
                name:     "月"
            },
            {
                scale:    12,
                name:     "年"
            }
        ];

    return {
        passed:    function (iTS) {

            iTS = $.now() - iTS;

            for (var i = 0, _Value_ = iTS;  TimeUnit[i];  i++) {

                _Value_ = _Value_ / TimeUnit[i].scale;

                if (_Value_ >= 1)
                    iTS = _Value_;
                else
                    break;
            }

            return  (! i)  ?
                "刚刚"  :  (iTS.toFixed(0) + TimeUnit[--i].name + "前");
        }
    };
});