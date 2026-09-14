const pages = [...document.querySelectorAll(".page")];
const toast = document.getElementById("toast");
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

function showPage(id, push=true){
  const target = document.getElementById(id);
  if(!target) return;
  pages.forEach(p => p.classList.toggle("active", p === target));
  window.scrollTo({top:0, behavior:"smooth"});
  if(push) history.pushState({page:id}, "", "#" + id);
}

function notify(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(()=>toast.classList.remove("show"), 1700);
}

document.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-go]");
  if(btn){
    e.preventDefault();
    showPage(btn.dataset.go);
    return;
  }
  const coming = e.target.closest("[data-coming]");
  if(coming){
    e.preventDefault();
    notify(`${coming.dataset.coming} 攻略頁製作中`);
  }
});

function loadHash(){
  const id = location.hash.replace("#","");
  if(document.getElementById(id)) showPage(id,false);
  else showPage("homePage",false);
}
window.addEventListener("popstate", ()=>loadHash());
window.addEventListener("hashchange", ()=>loadHash());

musicBtn.addEventListener("click", async ()=>{
  try{
    if(bgm.paused){
      await bgm.play();
      musicBtn.textContent = "♫ 音樂：開";
      notify("背景音樂已開啟");
    }else{
      bgm.pause();
      musicBtn.textContent = "♫ 音樂：關";
      notify("背景音樂已關閉");
    }
  }catch(err){
    notify("請先把 MP3 放入 audio/bgm.mp3");
  }
});

loadHash();
