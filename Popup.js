<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Esports PK - Ads Popup</title>
<style>
body { font-family: Verdana, sans-serif; margin: 0; background: #000; color: #fff; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.popup { width: 90%; max-width: 420px; background: #3a3a3a; padding: 25px; border-radius: 10px; text-align: center; }
.support { color: #ffeb3b; font-size: 24px; margin-bottom: 20px; }
.btn { background: #a12a2a; color: #fff; padding: 14px; border-radius: 6px; text-decoration: none; display: block; margin: 15px 0; font-weight: bold; }
.small { font-size: 13px; color: #ccc; }
.green { color: #00ff6a; }
.reload { background: #eee; color: #000; padding: 6px 14px; border-radius: 4px; cursor: pointer; }
.error { color: red; display: none; margin-top: 10px; }
.counter { color: #ffeb3b; font-size: 18px; display: none; margin-top: 10px; }
</style>
</head>
<body>

<div class="overlay" id="overlay">
    <div class="popup">
        <div class="support">We Need Support</div>
        <a href="#" class="btn" id="adBtn">Click Here<br><small>Open 1 Ads Per Day</small></a>
        <div class="counter" id="counter">10</div>
        <p class="small">
            1. Click the ads button above.<br>
            2. Ads will open in your browser.<br>
            3. Watch ads for at least 10 seconds.<br>
            4. Return back to the website.
        </p>
        <p class="green">Without ads, we don’t have enough funds to run this website.</p>
        <p class="error" id="errorMsg">❌ You must watch the ad for at least 10 seconds.</p>
        <div class="reload" onclick="location.reload()">Reload</div>
    </div>
</div>

<script>
const AD_LINK = "https://otieu.com/4/10457378";
const SITE_LINK = "https://esportspk.site/";
const TOTAL_SECONDS = 10;
const INTERVAL = 5 * 60 * 1000;

const overlay = document.getElementById("overlay");
const adBtn = document.getElementById("adBtn");
const errorMsg = document.getElementById("errorMsg");
const counter = document.getElementById("counter");

let adWindow, adTimer, startTime;
const lastSeen = localStorage.getItem("lastAdSeen");
const now = Date.now();

if (!lastSeen || now - lastSeen > INTERVAL) {
    overlay.style.display = "flex";
} else {
    overlay.style.display = "none";
}

adBtn.addEventListener("click", function(e){
    e.preventDefault();
    errorMsg.style.display = "none";
    counter.style.display = "block";
    startTime = Date.now();
    adWindow = window.open(AD_LINK, "_blank");
    let secondsLeft = TOTAL_SECONDS;
    counter.textContent = secondsLeft;
    adTimer = setInterval(() => {
        secondsLeft--;
        counter.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(adTimer);
            if(adWindow && !adWindow.closed) adWindow.close();
            localStorage.setItem("lastAdSeen", Date.now());
            overlay.style.display = "none";
        }
    }, 1000);
});

setInterval(() => {
    if (startTime && adWindow && adWindow.closed) {
        let watched = Math.floor((Date.now() - startTime) / 1000);
        if (watched < TOTAL_SECONDS) {
            clearInterval(adTimer);
            counter.style.display = "none";
            errorMsg.style.display = "block";
        } else {
            overlay.style.display = "none";
            localStorage.setItem("lastAdSeen", Date.now());
        }
        startTime = null;
    }
}, 1000);
</script>

</body>
</html>
