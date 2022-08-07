<?php
session_start();
$name = htmlspecialchars($_POST["name"], ENT_QUOTES);
$email = htmlspecialchars($_POST["email"], ENT_QUOTES);
$message = htmlspecialchars($_POST["message"], ENT_QUOTES);
$messageView = nl2br($message);

if (strlen(trim($name)) == 0) {
    $error[] = "名前を入力してください。";
}
if (strlen(trim($email)) == 0) {
    $error[] = "メールアドレスを入力してください。";
} else {
    if (!preg_match(
        "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/",
        $email
    )) {
        $error[] = "メールの形式が正しくありません。";
    }
}
if (strlen(trim($messageView)) == 0) {
    $error[] = "お問い合わせ詳細を入力してください。";
}

$_SESSION["name"] = $name;
$_SESSION["email"] = $email;
$_SESSION["message"] = $message;
?>

<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="keyword" content="メイプルストーリー,maplestory,コアジェム,ツール" />
    <meta name="description" content="メイプルストーリーのギルド雪いちごのサイトです。ゲームをプレイしてこれがあったら便利だなーってツールを作っています。" />
    <meta name="google-site-verification" content="vZm_VOhP1uJBQr-sku1oklL5SVCzVOKnahldYYnW71E" />
    <script src="./js/fontload.js"></script>
    <link rel="stylesheet" href="./css/form.css">
    <link rel="icon" href="favicon.ico">
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
    <header id="page-header" class="fadeUp duration2">
        <a href="./index.html" class="a-deco margin-top10">
            <img class="logo" src="./images/logo.png" alt="logo">
        </a>
        <nav class="margin-top10 pc">
            <ul class="header-dropmenu">
                <li><a href="./top.html" class="header-menu">Top</a></li>
                <li>
                    <p class="header-menu">Tool</p>
                    <ul>
                        <li><a href="./ringocal.html" class="header-a">りんごちゃんの計算機</a></li>
                        <li><a href="./weeklyboss.html" class="header-a">初ちゃんのおこづかい</a></li>
                    </ul>
                </li>
                <li><a href="./article.html" class="header-menu">Staff</a></li>
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
            <h1 class="h1-1 padding-left10">Menu</h1>
            <ul>
                <li class="h1-5"><a href="./top.html" class="header-menu">Top</a></li>
                <li class="h1-6">
                    <details>
                        <summary>Tool</summary>
                        <a href="./ringocal.html" class="header-a">りんごちゃんの計算機</a>
                        <a href="./weeklyboss.html" class="header-a">初ちゃんのおこづかい</a>
                    </details>
                </li>
                <li class="h1-7"><a href="./article.html" class="header-menu">Staff</a></li>
                <li class="h1-8"><a href="./contact.php" class="header-menu">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form id="contact" class="margin-top80" name="form1" method="post" action="">
            <div class="container">
                <div class="head width80">
                    <h1>Check</h1>
                </div>
                <div>
                    <?php
                    if (isset($error)) {
                        echo "<ol>\n";
                        foreach ($error as $e) {
                            echo "<li>{$e}</li>\n";
                        }
                        echo "</ol>\n";
                    }
                    ?>
                </div>
                <dl>
                    <div class="flex space1">
                        <p class="p1 rem2">name:</p>
                        <p class="p2 rem2"><?php echo $name; ?></p>
                    </div>
                    <div class="flex space1">
                        <p class="p1 rem2">e-mail:</p>
                        <p class="p2 rem2"><?php echo $email; ?></p>
                    </div>
                    <div class="flex space1">
                        <p class="p1 rem2">message:</p>
                        <p class="p2 rem2"><?php echo $messageView; ?></p>
                    </div>
                </dl>
                <div class="flex space1">
                    <p class="center"><a href="./contact.php">Back</a></p>
                    <?php
                    if (!isset($error)) {
                        echo '<p class="center"><a href="./send.php">Send!</a></p>';
                    }
                    ?>
                </div>
            </div>
        </form>
    </main>
</body>

</html>