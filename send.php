<?php
//------------------------------------------------------
// セッションを開始
//------------------------------------------------------
session_start();

$name = $_SESSION["name"];
$email = $_SESSION["email"];
$message = $_SESSION["message"];

$current = time();
date_default_timezone_set("Asia/Tokyo");
$time = date("Y年m月d日 H時i分", $current);

//--------------------------------------
// メール本文の整形
//--------------------------------------
$body = <<< END
以下の内容で承りました。

日時　：　{$time}
名前　：　{$name}
メール　：　{$email}
詳細　：　{$message}
END;

//--------------------------------------
// 言語・文字コードの設定
//--------------------------------------
mb_language("Japanese");
mb_internal_encoding("UTF-8");

//--------------------------------------
// ユーザーに自動返信メール
//--------------------------------------
$user_to = $email;
$user_subject = "お問い合わせありがとうございました。";
$user_header = "From: info@yukiichigo.com";
/* ここはメール送信なのでコメントアウトしています */
$user_result = mb_send_mail($user_to, $user_subject, $body, $user_header);

//--------------------------------------
// 管理者に送るメール
//--------------------------------------
$admin_to = "info@yukiichigo.com";
$admin_subject = "お問い合わせがありました。";
$admin_header = "From: $email";

/* ここはメール送信なのでコメントアウトしています */
$admin_result = mb_send_mail($admin_to, $admin_subject, $body, $admin_header);

//--------------------------------------
// メールが正常に送信されたか判定
// メッセージを出力する
//--------------------------------------
// デバッグ用(メール送信テスト。trueがメール正常送信、falseメール送信不可)
/* $user_result = true; */

//--------------------------------------
// セッションの初期化・破棄
//--------------------------------------
$_SESSION = array();
session_destroy();
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="keyword" content="メイプルストーリー,maplestory,コアジェム,ツール" />
    <meta name="description" content="メイプルストーリーのギルド雪いちごのサイトです。ゲームをプレイしてこれがあったら便利だなーってツールを作っています。" />
    <meta name="google-site-verification" content="vZm_VOhP1uJBQr-sku1oklL5SVCzVOKnahldYYnW71E" />
    <script src="./js/fontload.js"></script>
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/form.css">
    <title>雪いちご</title>
    <script src="./js/jquery-3.6.0.min.js"></script>
    <script type="text/javascript">
        $(function() {
            $('#nav-toggle').click(function() {
                $('body').toggleClass('open');
            });
        });
    </script>
</head>

<body>
    <header id="page-header">
        <a href="./index.html" class="a-deco margin-top10">
            <img class="logo" src="./images/logo.png" alt="logo">
        </a>
        <nav class="margin-top10">
            <ul>
                <li><a href="./top.html" class="header-menu">Top</a></li>
                <li><a href="./tool.html" class="header-menu">Tool</a></li>
                <li><a href="./contact.php" class="header-menu">Contact</a></li>
            </ul>
        </nav>
        <div id="nav-toggle" class="sp">
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <nav class="header-nav sp">
            <h1>Menu</h1>
            <ul>
                <li><a href="./top.html" class="header-menu">Top</a></li>
                <li><a href="./tool.html" class="header-menu">Tool</a></li>
                <li><a href="./contact.php" class="header-menu">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form id="contact" name="form1" method="post" action="check.php">
            <div class="container">
                <div class="head">

                </div>
                <h2>
                    <?php
                    $admin_result = true;
                    if ($user_result && $admin_result) {
                        echo "Send Completely!!\n";
                    } else {
                        echo "<p>Transmission error</p>";
                        echo "<p>Please retry again</p>";
                    }
                    ?>
                </h2>
            </div>
        </form>
    </main>
</body>

</html>