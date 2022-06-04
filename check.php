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
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="form.css">
    <title>雪いちご</title>

</head>

<header>
    <a href="./index.html"><span class="logo"><img src="./images/logo.svg" alt="logo"></span>雪いちご</a>
    <nav>
        <ul>
            <li><a href="./index.html">top</a></li>
            <li><a href="./tool.html">tool</a></li>
            <li><a href="./contact.php">contact</a></li>
            <!--                 <li><a href="./index.html">tips</a></li>
                <li><a href="./index.html">policy</a></li> -->
        </ul>
    </nav>
</header>

<body>
    <main>
        <form id="contact" name="form1" method="post" action="">
            <div class="container">
                <div class="head">
                    <h2>Check</h2>
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
                        <p class="p1">name:</p>
                        <p class="p2"><?php echo $name; ?></p>
                    </div>
                    <div class="flex space1">
                        <p class="p1">e-mail:</p>
                        <p class="p2"><?php echo $email; ?></p>
                    </div>
                    <div class="flex space1">
                        <p class="p1">message:</p>
                        <p class="p2"><?php echo $messageView; ?></p>
                    </div>
                </dl>
                <div class="flex space1">
                    <p class="center"><a href="./contact.php">Back</a></p>
                    <p>
                        <?php
                        if (!isset($error)) {
                            echo '<p class="center"><a href="./send.php">Send!</a></p>';
                        }
                        ?>
                    </p>
                </div>
            </div>
        </form>
    </main>
</body>

</html>