<?php
session_start();
$name = isset($_SESSION["name"]) ? $_SESSION["name"] : "";
$email = isset($_SESSION["email"]) ? $_SESSION["email"] : "";
$message = isset($_SESSION["message"]) ? $_SESSION["message"] : "";
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="keyword" content="メイプルストーリー,maplestory,コアジェム,ツール" />
    <meta name="description" content="メイプルストーリーのギルド雪いちごのサイトです。ゲームをプレイしてこれがあったら便利だなーってツールを作っています。" />
    <meta name="google-site-verification" content="vZm_VOhP1uJBQr-sku1oklL5SVCzVOKnahldYYnW71E" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="form.css">
    <script src="./js/jquery-3.6.0.min.js"></script>
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
        <form id="contact" name="form1" method="post" action="check.php">
            <div class="container">
                <div class="head">
                    <h2>Contact</h2>
                </div>
                <dl>
                    <dd> <input type="text" name="name" placeholder="Name"><div class="error-text"></div></dd>
                    <dd> <input type="email" name="email" placeholder="Email"><div class="error-text"></div></dd>
                    <dd>
                        <div class="left"><textarea type="text" name="message" placeholder="Message"></textarea><div class="error-text"></div></div>
                    </dd>
                </dl>
                <button id="submit" type="submit" class="center">Send!</button>
            </div>
        </form>
    </main>
</body>

<script>
  $("form").on("submit", function (event) {
    $(".error-text").each(function () {
      $(this).empty();
    });
    var isValid = true;
    if ($("[name='name']").val() == "") {
      isValid = false;
      $("[name='name']").next().text("入力してください。")
    }
    if ($("[name='email']").val() == "") {
      isValid = false;
      $("[name='email']").next().text("入力してください。")
    }
    if ($("[name='message']").val() == "") {
      isValid = false;
      $("[name='message']").next().text("入力してください。")
    }

    if (!isValid) {
      return false;
    }
  });
</script>
</html>