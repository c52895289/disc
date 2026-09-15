
const IMG = document.getElementById('pageImage');
const HOTSPOTS = document.getElementById('hotspots');
const STAGE = document.getElementById('stage');
const LOADING = document.getElementById('loading');
const TITLE = document.getElementById('heroOverlay');
const MENU_FINGERS = document.getElementById('menuFingerOverlays');
const FINGER_ASSETS = ['assets/finger_tiger.webp?v=5','assets/finger_peacock.webp?v=5','assets/finger_koala.webp?v=5','assets/finger_owl.webp?v=5'];
const BGM = document.getElementById('bgm');
const MUSIC = document.getElementById('musicControl');
let audioReady = false;
let musicOn = false;

const PAGES = {
  home:{
    img:'assets/home.webp?v=5',
    alt:'DISC 增員攻心術首頁',
    music:'audio/home.mp3',
    spots:[
      {label:'進入 D 型老虎攻略',x:2.5,y:46.8,w:47.5,h:22.0,to:'tigerMenu'},
      {label:'進入 I 型孔雀攻略',x:50.0,y:46.8,w:47.5,h:22.0,to:'peacockMenu'},
      {label:'進入 S 型無尾熊攻略',x:2.5,y:70.2,w:47.5,h:22.0,to:'koalaMenu'},
      {label:'進入 C 型貓頭鷹攻略',x:50.0,y:70.2,w:47.5,h:22.0,to:'owlMenu'}
    ]
  },
  tigerMenu:{
    img:'assets/tiger_menu.webp?v=5',alt:'D 型老虎攻略',music:'audio/tiger.mp3',back:'home',
    spots:[
      {label:'老虎線索辨識',x:2,y:29.0,w:96,h:22.5,to:'tigerClues'},
      {label:'老虎地雷區',x:2,y:51.8,w:96,h:21.5,to:'tigerMines'},
      {label:'老虎任務解鎖',x:2,y:74.0,w:96,h:22.0,to:'tigerMission'}
    ]
  },
  tigerClues:{img:'assets/tiger_clues.webp?v=5',alt:'D 型老虎線索辨識',music:'audio/tiger-clues.mp3',back:'tigerMenu'},
  tigerMines:{img:'assets/tiger_mines.webp?v=5',alt:'D 型老虎地雷區',music:'audio/tiger-mines.mp3',back:'tigerMenu'},
  tigerMission:{img:'assets/tiger_mission.webp?v=5',alt:'D 型老虎任務解鎖',music:'audio/tiger-mission.mp3',back:'tigerMenu'},

  peacockMenu:{
    img:'assets/peacock_menu.webp?v=5',alt:'I 型孔雀攻略',music:'audio/peacock.mp3',back:'home',
    spots:[
      {label:'孔雀線索辨識',x:2,y:29.0,w:96,h:22.5,to:'peacockClues'},
      {label:'孔雀地雷區',x:2,y:51.8,w:96,h:21.5,to:'peacockMines'},
      {label:'孔雀任務解鎖',x:2,y:74.0,w:96,h:22.0,to:'peacockMission'}
    ]
  },
  peacockClues:{img:'assets/peacock_clues.webp?v=5',alt:'I 型孔雀線索辨識',music:'audio/peacock-clues.mp3',back:'peacockMenu'},
  peacockMines:{img:'assets/peacock_mines.webp?v=5',alt:'I 型孔雀地雷區',music:'audio/peacock-mines.mp3',back:'peacockMenu'},
  peacockMission:{img:'assets/peacock_mission.webp?v=5',alt:'I 型孔雀任務解鎖',music:'audio/peacock-mission.mp3',back:'peacockMenu'},

  koalaMenu:{
    img:'assets/koala_menu.webp?v=5',alt:'S 型無尾熊攻略',music:'audio/koala.mp3',back:'home',
    spots:[
      {label:'無尾熊線索辨識',x:2,y:29.0,w:96,h:22.5,to:'koalaClues'},
      {label:'無尾熊地雷區',x:2,y:51.8,w:96,h:21.5,to:'koalaMines'},
      {label:'無尾熊任務解鎖',x:2,y:74.0,w:96,h:22.0,to:'koalaMission'}
    ]
  },
  koalaClues:{img:'assets/koala_clues.webp?v=5',alt:'S 型無尾熊線索辨識',music:'audio/koala-clues.mp3',back:'koalaMenu'},
  koalaMines:{img:'assets/koala_mines.webp?v=5',alt:'S 型無尾熊地雷區',music:'audio/koala-mines.mp3',back:'koalaMenu'},
  koalaMission:{img:'assets/koala_mission.webp?v=5',alt:'S 型無尾熊任務解鎖',music:'audio/koala-mission.mp3',back:'koalaMenu'},

  owlMenu:{
    img:'assets/owl_menu.webp?v=5',alt:'C 型貓頭鷹攻略',music:'audio/owl.mp3',back:'home',
    spots:[
      {label:'貓頭鷹線索辨識',x:2,y:29.0,w:96,h:22.5,to:'owlClues'},
      {label:'貓頭鷹地雷區',x:2,y:51.8,w:96,h:21.5,to:'owlMines'},
      {label:'貓頭鷹任務解鎖',x:2,y:74.0,w:96,h:22.0,to:'owlMission'}
    ]
  },
  owlClues:{img:'assets/owl_clues.webp?v=5',alt:'C 型貓頭鷹線索辨識',music:'audio/owl-clues.mp3',back:'owlMenu'},
  owlMines:{img:'assets/owl_mines.webp?v=5',alt:'C 型貓頭鷹地雷區',music:'audio/owl-mines.mp3',back:'owlMenu'},
  owlMission:{img:'assets/owl_mission.webp?v=5',alt:'C 型貓頭鷹任務解鎖',music:'audio/owl-mission.mp3',back:'owlMenu'}
};

let current = null;
let navToken = 0;

function pct(v){return `${v}%`;}

function addSpot(spot, isBack=false){
  const b=document.createElement('button');
  b.type='button';
  b.className='hotspot'+(isBack?' back':'');
  b.setAttribute('aria-label',spot.label);
  b.style.left=pct(spot.x);
  b.style.top=pct(spot.y);
  b.style.width=pct(spot.w);
  b.style.height=pct(spot.h);
  b.addEventListener('click',()=>go(spot.to));
  HOTSPOTS.appendChild(b);
}

function renderSpots(page){
  HOTSPOTS.innerHTML='';
  if(page.back){
    addSpot({label:'返回上一層',x:1.5,y:.8,w:20,h:6.8,to:page.back},true);
  }
  (page.spots||[]).forEach(s=>addSpot(s));
}

function setLoading(show){
  LOADING.classList.toggle('show',show);
}

function loadImage(src, token){
  return new Promise((resolve,reject)=>{
    const im=new Image();
    im.decoding='async';
    im.onload=()=>{ if(token===navToken) resolve(); else reject(new Error('stale')); };
    im.onerror=reject;
    im.src=src;
  });
}


async function prepareMusic(src){
  audioReady=false;
  MUSIC.hidden=true;
  BGM.pause();
  BGM.removeAttribute('src');
  BGM.load();
  if(!src) return;
  // 不預載：只有頁面切換/使用者互動後才真正請求 MP3。
  try{
    const r=await fetch(src,{method:'HEAD',cache:'no-store'});
    if(!r.ok) return;
    BGM.src=src;
    BGM.load();
    BGM.addEventListener('canplay',()=>{
      audioReady=true;
      MUSIC.hidden=false;
    },{once:true});
  }catch(e){ /* 沒有 MP3 時保持安靜 */ }
}
async function startMusicIfPossible(){
  if(!audioReady) return;
  try{
    await BGM.play();
    musicOn=true;
    MUSIC.classList.remove('off');
  }catch(e){}
}
MUSIC.addEventListener('click',async()=>{
  if(!audioReady)return;
  if(BGM.paused){
    await startMusicIfPossible();
  }else{
    BGM.pause();
    musicOn=false;
    MUSIC.classList.add('off');
  }
});
document.addEventListener('pointerdown',()=>{ startMusicIfPossible(); },{once:false,passive:true});

async function go(id, push=true){
  if(!PAGES[id] || id===current) return;
  const token=++navToken;
  const page=PAGES[id];
  setLoading(true);
  try{
    // 先切換實際圖片來源，再等待預載完成；避免預載失敗時整頁只剩背景色。
    IMG.src=page.img;
    IMG.alt=page.alt;
    await loadImage(page.img,token);
    if(token!==navToken)return;
    TITLE.style.setProperty('--page-bg', `url("${page.img}")`);
    renderSpots(page);
    const menuMatch = id.match(/^(tiger|peacock|koala|owl)Menu$/);
    MENU_FINGERS.classList.toggle('show', !!menuMatch);
    if(menuMatch){
      const animal = menuMatch[1];
      MENU_FINGERS.style.setProperty('--finger1', `url("assets/${animal}_menu_finger1.png?v=6")`);
      MENU_FINGERS.style.setProperty('--finger2', `url("assets/${animal}_menu_finger2.png?v=6")`);
      MENU_FINGERS.style.setProperty('--finger3', `url("assets/${animal}_menu_finger3.png?v=6")`);
    }
    prepareMusic(page.music);
    STAGE.classList.toggle('home-motion',id==='home');
    STAGE.classList.remove('page-enter');
    void STAGE.offsetWidth;
    STAGE.classList.add('page-enter');
    current=id;
    if(push) history.pushState({page:id},'',`#${id}`);
    setLoading(false);
    // 預留未來背景音樂：目前沒有 mp3 也完全不影響網站。
    // 音樂會在未來使用者互動後再啟用，避免阻塞初始載入。
  }catch(e){
    if(token===navToken) setLoading(false);
    console.error(e);
  }
}

window.addEventListener('popstate',()=>{
  const id=location.hash.slice(1)||'home';
  go(PAGES[id]?id:'home',false);
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && current && PAGES[current]?.back) go(PAGES[current].back);
});

const first=location.hash.slice(1);
// 非阻塞預載四個首頁手指素材；不影響首頁顯示。
FINGER_ASSETS.forEach(src=>{ const im=new Image(); im.decoding='async'; im.src=src; });
go(PAGES[first]?first:'home',false);
