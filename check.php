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
    $error[] = "メールを入力してください。";
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
    <link rel="stylesheet" href="https://use.typekit.net/upr2vdx.css">
    <link rel="stylesheet" href="./css/style.css" />
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
    <header id="page-header">
        <a href="./index.html" class="a-deco margin-top10">
            <div class="flex">
                <p class="logo-text margin-left10">
                    <span class="icon-logo"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                </p>
                <p class="logo-text">雪いちご</p>
            </div>
        </a>
        <nav class="margin-top10">
            <ul>
                <li><a href="./index.html" class="header-menu">Top</a></li>
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
                <li><a href="./index.html" class="header-menu">Top</a></li>
                <li><a href="./tool.html" class="header-menu">Tool</a></li>
                <li><a href="./contact.php" class="header-menu">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form id="contact" name="form1" method="post" action="">
            <div class="container">
                <div class="head">
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