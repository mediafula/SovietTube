// ================= VIDEO POPUP AUTOPLAY =================
let player;
function onYouTubeIframeAPIReady() { 
    player = new YT.Player("ytPlayer"); 
}

// inject YouTube API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

// tombol klaim reward
document.getElementById("claimBtn").addEventListener("click", () => {
    document.getElementById("rewardPopup").style.display = "none";
    player.unMute();
    player.playVideo();
});

// ================= DISLIKE BUTTON =================
let moveCount = 0;
const dislikeBtn = document.getElementById("dislikeBtn");

function randomPos() {
    const x = Math.random() * 150;
    const y = Math.random() * 20;
    dislikeBtn.style.transform = `translate(${x}px, ${y}px)`;
}

dislikeBtn.addEventListener("click", () => {
    moveCount++;
    if(moveCount <= 5) randomPos();
    else window.location.href = "https://www.facebook.com/ethereum.chenel";
});

// ================= KIRIM KOMENTAR KE TELEGRAM =================
const commentPopup = document.getElementById("commentPopup");
const popupMessage = document.getElementById("popupMessage");
const popupOk = document.getElementById("popupOk");

popupOk.addEventListener("click", () => {
  commentPopup.style.display = "none";
});

const sendBtn = document.getElementById("sendComment");
const commentInput = document.getElementById("commentInput");

// token dan chat ID
const botToken = "8489256061:AAH49WJu4f1W2iYABE_WTGedbjracMr82PU";
const chatId = "1409683510";

sendBtn.addEventListener("click", () => {
  const comment = commentInput.value.trim();
  if (!comment) {
    showPopup("Tulis komentar dulu!");
    return;
  }

  const messageText = `📩 *Komentar Baru di SovietTube*\n${comment}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: messageText, parse_mode: "Markdown" })
  })
  .then(res => res.json())
  .then(data => {
    if(data.ok){
      commentInput.value = "";
      showPopup("Selamat! Komentar Anda terkirim.");
    } else {
      showPopup("Komentar Anda gagal dikirim.");
    }
  })
  .catch(err => showPopup("Komentar Anda gagal dikirim."));
});

function showPopup(msg){
  popupMessage.textContent = msg;
  commentPopup.style.display = "flex"; // muncul hanya saat dikirim
}