(function(){

  const AD_LINK = "https://otieu.com/4/10457378";
  const TOTAL_SECONDS = 10;
  const INTERVAL = 5 * 60 * 1000; // 5 minutes

  const lastSeen = localStorage.getItem("lastAdSeen");
  const now = Date.now();

  if(lastSeen && now - lastSeen < INTERVAL) return;

  // ===== CREATE CSS =====
  const style = document.createElement("style");
  style.innerHTML = `
    .epk-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      display: flex; align-items: center; justify-content: center; z-index: 999999;
      font-family: Verdana, sans-serif;
    }
    .epk-popup {
      width: 90%; max-width: 420px; background: #3a3a3a; color: #fff;
      padding: 25px; border-radius: 10px; text-align: center;
    }
    .epk-btn {
      background: #a12a2a; color: #fff; padding: 14px; border-radius: 6px;
      display: block; margin: 15px 0; font-weight: bold; text-decoration: none;
      cursor: pointer;
    }
    .epk-counter { color:#ffeb3b; font-size:18px; display:none; margin-top:10px; }
    .epk-error { color:red; display:none; margin-top:10px; }
  `;
  document.head.appendChild(style);

  // ===== CREATE HTML POPUP =====
  const overlay = document.createElement("div");
  overlay.className = "epk-overlay";
  overlay.innerHTML = `
    <div class="epk-popup">
      <div style="color:#ffeb3b; font-size:24px; margin-bottom:20px;">We Need Support</div>
      <a class="epk-btn" id="epkBtn">Click Here<br><small>Open 1 Ads Per Day</small></a>
      <div class="epk-counter" id="epkCounter">${TOTAL_SECONDS}</div>
      <p style="font-size:13px; color:#ccc; margin-top:10px;">
        1. Click the ads button above.<br>
        2. Ads will open in your browser.<br>
        3. Watch ads for at least 10 seconds.<br>
        4. Return back to the website.
      </p>
      <p style="color:#00ff6a;">Without ads, we don’t have enough funds to run this website.</p>
      <div class="epk-error" id="epkError">❌ You must watch the ad for at least 10 seconds.</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const btn = document.getElementById("epkBtn");
  const counter = document.getElementById("epkCounter");
  const errorMsg = document.getElementById("epkError");

  let adWindow, adTimer, startTime;

  btn.addEventListener("click", function(e){
    e.preventDefault();
    errorMsg.style.display = "none";
    counter.style.display = "block";
    startTime = Date.now();
    adWindow = window.open(AD_LINK, "_blank");
    let secondsLeft = TOTAL_SECONDS;
    counter.textContent = secondsLeft;

    adTimer = setInterval(()=>{
      secondsLeft--;
      counter.textContent = secondsLeft;
      if(secondsLeft <= 0){
        clearInterval(adTimer);
        if(adWindow && !adWindow.closed) adWindow.close();
        localStorage.setItem("lastAdSeen", Date.now());
        overlay.remove();
      }
    }, 1000);
  });

  // check if user closes ad early
  setInterval(()=>{
    if(startTime && adWindow && adWindow.closed){
      const watched = Math.floor((Date.now() - startTime)/1000);
      if(watched < TOTAL_SECONDS){
        clearInterval(adTimer);
        counter.style.display = "none";
        errorMsg.style.display = "block";
      } else {
        overlay.remove();
        localStorage.setItem("lastAdSeen", Date.now());
      }
      startTime = null;
    }
  },1000);

})();
