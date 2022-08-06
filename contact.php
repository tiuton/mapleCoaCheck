<?php
session_start();
$name = isset($_SESSION["name"]) ? $_SESSION["name"] : "";
$email = isset($_SESSION["email"]) ? $_SESSION["email"] : "";
$message = isset($_SESSION["message"]) ? $_SESSION["message"] : "";
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
            <li><a href="./weeklyboss.html" class="header-a">週ボス計算機</a></li>
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
            <a href="./weeklyboss.html" class="header-a">週ボス計算機</a>
          </details>
        </li>
        <li class="h1-7"><a href="./article.html" class="header-menu">Staff</a></li>
        <li class="h1-8"><a href="./contact.php" class="header-menu">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="maxwidth">
    <div class=" loopSlide loopSlide1">
      <ul>
        <li><img src="./images/character/sunausagiF.gif" alt=""></li>
        <li><img src="./images/character/morinobannin.gif" alt=""></li>
        <li><img src="./images/character/kurowapanda.gif" alt=""></li>
        <li><img src="./images/character/tyakkuma.gif" alt=""></li>
        <li><img src="./images/character/rupan.gif" alt=""></li>
      </ul>
      <ul>
        <li><img src="./images/character/sunausagiM.gif" alt=""></li>
        <li><img src="./images/character/yorunobannin.gif" alt=""></li>
        <li><img src="./images/character/pinkkkuma.gif" alt=""></li>
        <li><img src="./images/character/tenshika.gif" alt=""></li>
        <li><img src="./images/character/hotarusuraimu.gif" alt=""></li>
      </ul>
    </div>
    <form id="contact" class="margin-top80" name="form1" method="post" action="check.php">
      <div class="container fadeUp duration">
        <div class="head width80">
          <h1>Contact</h2>
        </div>
        <dl>
          <dd> <input type="text" name="name" placeholder="Name" value="<?php echo $name; ?>">
            <div class="error-text">
            </div>
          </dd>
          <dd> <input type="email" name="email" placeholder="Email" value="<?php echo $email; ?>">
            <div class="error-text"></div>
          </dd>
          <dd>
            <div><textarea type="text" name="message" placeholder="Message"><?php echo $message; ?></textarea>
              <div class="error-text"></div>
            </div>
          </dd>
        </dl>
        <button id="submit" type="submit" class="center width80">Send!</button>
      </div>
    </form>
    <div class="loopSlide loopSlide2">
      <ul>
        <li><img src="./images/character/sunausagiF.gif" alt=""></li>
        <li><img src="./images/character/morinobannin.gif" alt=""></li>
        <li><img src="./images/character/kurowapanda.gif" alt=""></li>
        <li><img src="./images/character/tyakkuma.gif" alt=""></li>
        <li><img src="./images/character/rupan.gif" alt=""></li>
        <li><img src="./images/character/amuti.gif" alt=""></li>
        <li><img src="./images/character/blockpass.gif" alt=""></li>
      </ul>
      <ul>
        <li><img src="./images/character/sunausagiM.gif" alt=""></li>
        <li><img src="./images/character/yorunobannin.gif" alt=""></li>
        <li><img src="./images/character/pinkkkuma.gif" alt=""></li>
        <li><img src="./images/character/tenshika.gif" alt=""></li>
        <li><img src="./images/character/hotarusuraimu.gif" alt=""></li>
        <li><img src="./images/character/hikyu.gif" alt=""></li>
        <li><img src="./images/character/sukurat.gif" alt=""></li>
      </ul>
    </div>
  </main>
</body>

<script>
  $("form").on("submit", function(event) {
    $(".error-text").each(function() {
      $(this).empty();
    });
    var isValid = true;
    if ($("[name='name']").val() == "") {
      isValid = false;
      $("[name='name']").next().text("名前を入力してください。")
      $("[name='name']").next('.error-text').css("opacity", "1");
    }
    if ($("[name='email']").val() == "") {
      isValid = false;
      $("[name='email']").next().text("メールアドレスを入力してください。")
      $("[name='email']").next('.error-text').css("opacity", "1");
    }
    if ($("[name='message']").val() == "") {
      isValid = false;
      $("[name='message']").next().text("問い合わせ内容を入力してください。")
      $("[name='message']").next('.error-text').css("opacity", "1");
    }

    if (!isValid) {
      return false;
    }
  });

  $("[name='name']").on('change', function(event) {
    $("[name='name']").next('.error-text').css("opacity", "0");
  });

  $("[name='email']").on('change', function(event) {
    $("[name='email']").next('.error-text').css("opacity", "0");
  });

  $("[name='message']").on('change', function(event) {
    $("[name='message']").next('.error-text').css("opacity", "0");
  });
</script>

</html>