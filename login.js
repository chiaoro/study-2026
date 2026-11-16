// 複習站登入：首頁要先輸入密碼；其他頁沒登入就送回首頁登入。
// 只存密碼加鹽後的 SHA-256 雜湊，不存密碼本身。換密碼：改 HASH（雜湊「study-2026|新密碼」）。
(function () {
  var HASH = "84dbb4cb9fc5584517776e24ad4cd347eeea52fe46c9a3dc673f056bdf4e77e9";
  var KEY = "study-login-v1";
  var ok = false;
  try { ok = localStorage.getItem(KEY) === HASH; } catch (e) {}
  var isHome = document.currentScript && document.currentScript.dataset.home === "1";
  if (ok) return;
  if (!isHome) { document.documentElement.style.visibility = "hidden"; location.replace("./"); return; }
  // 首頁：先遮住內容，顯示登入畫面
  document.documentElement.classList.add("locked");
  var css = document.createElement("style");
  css.textContent =
    "html.locked body>*:not(#login){display:none!important}" +
    "#login{min-height:100vh;display:grid;place-items:center;padding-block:24px}" +
    "#login form{width:min(360px,100%);background:var(--card);border:1.5px solid var(--line);border-radius:18px;padding:28px 24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 0 4px var(--now-soft)}" +
    "#login .seal{width:64px;height:64px;border-radius:50%;border:2.5px solid var(--now);color:var(--now);display:grid;place-items:center;font-family:var(--f-display);font-weight:700;font-size:20px;align-self:center}" +
    "#login h1{font-family:var(--f-display);font-size:28px;margin:0;text-align:center}" +
    "#login p{margin:0;color:var(--muted);font-size:14px;text-align:center}" +
    "#login label{font-size:14px;font-weight:700}" +
    "#login input{font:inherit;font-size:22px;letter-spacing:.2em;text-align:center;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink)}" +
    "#login input:focus-visible{outline:3px solid var(--now);outline-offset:1px}" +
    "#login button{font:inherit;font-weight:700;font-size:17px;padding:12px;border:none;border-radius:10px;background:var(--now);color:var(--card);cursor:pointer}" +
    "#login .err{color:#C0392B;min-height:1.4em;text-align:center;font-size:14px}";
  document.head.appendChild(css);
  async function sha(t) {
    var b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
    return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, "0"); }).join("");
  }
  function show() {
    var box = document.createElement("div");
    box.id = "login";
    box.innerHTML =
      '<form autocomplete="off"><span class="seal" aria-hidden="true">複習</span>' +
      "<h1>六年級複習站</h1><p>請先輸入密碼再開始練習</p>" +
      '<label for="pw">密碼</label><input id="pw" type="password" inputmode="numeric" autocomplete="current-password" required>' +
      '<button type="submit">登入</button><div class="err" id="err" role="alert"></div></form>';
    document.body.prepend(box);
    var pw = document.getElementById("pw");
    pw.focus();
    box.querySelector("form").addEventListener("submit", async function (e) {
      e.preventDefault();
      var h = await sha("study-2026|" + pw.value.trim());
      if (h === HASH) {
        try { localStorage.setItem(KEY, HASH); } catch (err) {}
        box.remove();
        document.documentElement.classList.remove("locked");
      } else {
        document.getElementById("err").textContent = "密碼不對，再試一次";
        pw.value = ""; pw.focus();
      }
    });
  }
  if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
})();
