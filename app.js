/* ── ANIMATED MESH CANVAS ──────────────────── */
(function(){
  const cv=document.getElementById('hero-canvas');
  if(!cv)return;
  const ctx=cv.getContext('2d');
  let W,H,pts=[],animId=null,isMobile=window.innerWidth<768;
  const SPACING=isMobile?180:100;
  function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight||innerHeight}
  function init(){
    pts=[];
    const cols=Math.ceil(W/SPACING)+1,rows=Math.ceil(H/SPACING)+1;
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)
      pts.push({bx:c*SPACING,by:r*SPACING,ox:0,oy:0,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
  }
  let lastTime=0,fps=isMobile?24:60,interval=1000/fps;
  function draw(ts){
    if(ts-lastTime<interval){animId=requestAnimationFrame(draw);return}
    lastTime=ts;
    ctx.clearRect(0,0,W,H);
    const cols=Math.ceil(W/SPACING)+1;
    pts.forEach((p,i)=>{
      p.ox+=p.vx;p.oy+=p.vy;
      if(Math.abs(p.ox)>22)p.vx*=-1;
      if(Math.abs(p.oy)>22)p.vy*=-1;
      const x=p.bx+p.ox,y=p.by+p.oy;
      if((i+1)%cols!==0&&i+1<pts.length){
        const q=pts[i+1];
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(q.bx+q.ox,q.by+q.oy);
        ctx.strokeStyle='rgba(16,185,129,.05)';ctx.lineWidth=1;ctx.stroke();
      }
      if(i+cols<pts.length){
        const q=pts[i+cols];
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(q.bx+q.ox,q.by+q.oy);
        ctx.strokeStyle='rgba(16,185,129,.05)';ctx.lineWidth=1;ctx.stroke();
      }
      ctx.beginPath();ctx.arc(x,y,1.2,0,Math.PI*2);
      ctx.fillStyle='rgba(16,185,129,.18)';ctx.fill();
    });
    animId=requestAnimationFrame(draw);
  }
  function startCanvas(){if(!animId){resize();init();animId=requestAnimationFrame(draw)}}
  function stopCanvas(){if(animId){cancelAnimationFrame(animId);animId=null}}
  startCanvas();
  window.addEventListener('resize',()=>{resize();init()});
  window._canvasCtrl={start:startCanvas,stop:stopCanvas};
})();

/* ── TICKER ─────────────────────────────── */
const TDATA=[
  {p:'BTC/USD',v:'67,241',c:'+2.83%',s:94,u:true},
  {p:'USD/JPY',v:'151.84',c:'-0.38%',s:88,u:false},
  {p:'EUR/USD',v:'1.0832',c:'+0.12%',s:73,u:true},
  {p:'NVDA',v:'$874.20',c:'+4.12%',s:91,u:true},
  {p:'SOL/USD',v:'$178.40',c:'+3.42%',s:88,u:true},
  {p:'GBP/USD',v:'1.2644',c:'+0.31%',s:79,u:true},
  {p:'XAU/USD',v:'$2,312',c:'-0.44%',s:71,u:false},
  {p:'AUD/USD',v:'0.6523',c:'-0.09%',s:66,u:false},
];
(()=>{
  const arr=[...TDATA,...TDATA];
  document.getElementById('ticker').innerHTML=arr.map(t=>`
    <div class="tick">
      <span class="tick-pair">${t.p}</span>
      <span class="tick-price">${t.v}</span>
      <span class="${t.u?'tick-up':'tick-dn'}">${t.c}</span>
      <span class="tick-score">${t.s}</span>
    </div>`).join('');
})();

/* ── CLOCK ─────────────────────────────── */
setInterval(()=>{
  const n=new Date(),pad=v=>String(v).padStart(2,'0');
  const t=`${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}:${pad(n.getUTCSeconds())} GMT`;
  const el=document.getElementById('clk');if(el)el.textContent=t;
},1000);

/* ── COUNTER ────────────────────────────── */
(()=>{
  const el=document.getElementById('ctr');if(!el)return;
  let v=0;const T=466984,st=Math.ceil(T/60);
  function tick(){
    v=Math.min(v+st,T);el.textContent=v.toLocaleString();
    if(v<T)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ── SPARKS ─────────────────────────────── */
function spark(up,w=72,h=26){
  let pts=[],v=up?h*.8:h*.2;
  for(let i=0;i<=7;i++){
    const x=(i/7)*w;
    v=Math.max(2,Math.min(h-2,v+(Math.random()-.46)*(h/3)*(up?-1:1)));
    pts.push(`${x.toFixed(1)},${v.toFixed(1)}`);
  }
  return `<svg width="${w}" height="${h}"><polyline points="${pts.join(' ')}" fill="none" stroke="${up?'#10b981':'#f43f5e'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/* ── FEED DATA ──────────────────────────── */
const FEED=[
  {id:1,p:'BTC/USD',cat:'Crypto',s:94,c:'+2.83',u:true},
  {id:2,p:'NVDA',cat:'Equity',s:91,c:'+4.12',u:true},
  {id:3,p:'SOL/USD',cat:'Crypto',s:88,c:'+3.42',u:true},
  {id:4,p:'USD/JPY',cat:'Forex',s:88,c:'-0.38',u:false},
  {id:5,p:'BNB/USD',cat:'Crypto',s:86,c:'+1.22',u:true},
  {id:6,p:'AMZN',cat:'Equity',s:83,c:'+2.11',u:true},
  {id:7,p:'GBP/USD',cat:'Forex',s:82,c:'+0.31',u:true},
  {id:8,p:'AAPL',cat:'Equity',s:81,c:'+1.04',u:true},
  {id:9,p:'ETH/USD',cat:'Crypto',s:79,c:'+0.92',u:true},
  {id:10,p:'EUR/USD',cat:'Forex',s:73,c:'+0.12',u:true},
  {id:11,p:'WTI/USD',cat:'Commodity',s:75,c:'+1.33',u:true},
  {id:12,p:'XAU/USD',cat:'Commodity',s:71,c:'-0.44',u:false},
  {id:13,p:'TSLA',cat:'Equity',s:38,c:'-2.14',u:false},
  {id:14,p:'AUD/USD',cat:'Forex',s:66,c:'-0.09',u:false},
  {id:15,p:'NZD/USD',cat:'Forex',s:52,c:'+0.07',u:true},
  {id:16,p:'USD/CAD',cat:'Forex',s:60,c:'+0.18',u:true},
  {id:17,p:'MSFT',cat:'Equity',s:77,c:'+1.56',u:true},
  {id:18,p:'AMD',cat:'Equity',s:75,c:'+2.88',u:true},
  {id:19,p:'GOOG',cat:'Equity',s:72,c:'+0.95',u:true},
  {id:20,p:'META',cat:'Equity',s:69,c:'+1.12',u:true},
];

const HM=[
  {p:'BTC/USD',l:82,s:18},{p:'ETH/USD',l:74,s:26},{p:'SOL/USD',l:88,s:12},
  {p:'NVDA',l:91,s:9},{p:'AAPL',l:77,s:23},{p:'USD/JPY',l:89,s:11},
];

const NEWS=[
  {t:'14:12',x:'<b>USD/JPY BREAKOUT:</b> BoJ Decision triggers highest-conviction Forex signal'},
  {t:'13:58',x:'<b>BTC $67K:</b> Institutional buy returns — Mensch Score spikes to 94'},
  {t:'13:47',x:'<b>NFP:</b> US Non-Farm Payrolls smash 272K vs 182K forecast'},
  {t:'13:37',x:'<b>ECB:</b> Lagarde hints at rate pause — EUR conviction drops'},
  {t:'13:22',x:'<b>GBP/USD:</b> Sterling holds gains on UK jobs beat'},
  {t:'13:12',x:'<b>SOL:</b> Momentum hits 88 on three converging catalysts'},
  {t:'12:58',x:'<b>NVDA:</b> Blackwell demand surge pushes score to 91'},
  {t:'12:41',x:'<b>Gold</b> dips as Dollar Strength weighs'},
];

/* helpers */
function sc(s){return s>=85?'bs-hi':s>=70?'bs-md':'bs-lo'}
function sl(s){return s>=85?'HIGH':s>=70?'MED':'LOW'}

/* ── PAGE ROUTER ────────────────────────── */
let _currentPage='home';
function go(id){
  _currentPage=id;
  document.querySelectorAll('.pg').forEach(p=>p.classList.toggle('on',p.id==='pg-'+id));
  document.querySelectorAll('.nav-a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('onclick')&&a.getAttribute('onclick').includes(`'${id}'`)&&!a.getAttribute('onclick').includes('Scroll'));
  });
  if(id==='app')buildApp();
  if(window._canvasCtrl){id==='home'?_canvasCtrl.start():_canvasCtrl.stop()}
  syncBnav(id==='home'?'home':_activeTab);
  window.scrollTo(0,0);
}
function goScroll(pg,sec){
  go(pg);
  setTimeout(()=>{const el=document.getElementById(sec);if(el)el.scrollIntoView({behavior:'smooth'})},80);
}

/* ── APP TAB SWITCHER ─────────────────────── */
let _activeTab = 'dash';

function _aTab(id){
  _activeTab = id;
  document.querySelectorAll('.app-tab').forEach(t=>t.classList.remove('on'));
  const panel=document.getElementById('at-'+id);if(panel)panel.classList.add('on');
  document.querySelectorAll('.sb-item').forEach(s=>{
    const oc=s.getAttribute('onclick')||'';
    s.classList.toggle('on', oc.includes(`'${id}'`) && !oc.includes('home') && !oc.includes('Settings'));
  });
  syncBnav(id);
}
/* expose aTab globally for onclick handlers */

function bnav(el){void el}

function bnavGo(target){
  if(target==='home'){
    go('home');
  } else {
    if(_currentPage!=='app') go('app');
    aTab(target);
  }
}

function syncBnav(activeId){
  document.querySelectorAll('.bnav-item').forEach(b=>{
    const bId=b.id.replace('bn-','');
    b.classList.toggle('on', bId===activeId);
  });
}

/* ── APP BUILD (lazy) ──────────────────── */
let appBuilt=false;
function buildApp(){
  if(appBuilt)return;appBuilt=true;

  // dash movers
  const dm=document.getElementById('dash-movers');
  if(dm)dm.innerHTML=`<thead><tr><th>Pair</th><th>Trend</th><th>Score</th><th>Chg</th></tr></thead><tbody>`+
    FEED.slice(0,8).map(d=>`<tr>
      <td class="cell-pair">${d.p}</td>
      <td>${spark(d.u)}</td>
      <td><span class="badge-score ${sc(d.s)}">${d.s} · ${sl(d.s)}</span></td>
      <td class="${d.u?'up':'dn'}" style="font-family:var(--ff-mono);font-size:10px">${d.u?'+':''}${d.c}%</td>
    </tr>`).join('')+'</tbody>';

  // dash heatmap
  const dh=document.getElementById('dash-hm');
  if(dh)dh.innerHTML=HM.map(h=>`
    <div class="hm-cell">
      <div class="hm-pair">${h.p}</div>
      <div class="hm-bar-row"><span class="hm-bar-lbl">Long</span><div class="hm-bar-track"><div class="hm-fill-em" style="width:${h.l}%"></div></div><span class="hm-pct up">${h.l}%</span></div>
      <div class="hm-bar-row"><span class="hm-bar-lbl">Short</span><div class="hm-bar-track"><div class="hm-fill-red" style="width:${h.s}%"></div></div><span class="hm-pct dn">${h.s}%</span></div>
    </div>`).join('');

  // dash news
  const dn=document.getElementById('dash-news');
  if(dn)dn.innerHTML=NEWS.map(n=>`<div class="nfi"><span class="nfi-t">${n.t}</span><div class="nfi-x">${n.x}</div></div>`).join('');

  // feed table
  const fr=document.getElementById('feed-rows');
  if(fr)fr.innerHTML=FEED.map(d=>`<tr>
    <td style="font-family:var(--ff-mono);font-size:9px;color:var(--txt3)">${d.id}</td>
    <td class="cell-pair">${d.p}</td>
    <td><span class="cell-cat">${d.cat}</span></td>
    <td>${spark(d.u)}</td>
    <td><span class="badge-score ${sc(d.s)}">${d.s}</span></td>
    <td><span class="badge-score ${sc(d.s)}">${sl(d.s)}</span></td>
    <td class="${d.u?'up':'dn'}" style="font-family:var(--ff-mono);font-size:10px">${d.u?'+':''}${d.c}%</td>
    <td><div class="filt-btn" onclick="aTab('asset')" style="font-size:9px;padding:4px 8px;cursor:pointer">Dive</div></td>
  </tr>`).join('');

  // full heatmap
  const hfull=[
    {p:'EUR/USD',l:75,s:23},{p:'USD/JPY',l:89,s:11},{p:'GBP/USD',l:70,s:11},{p:'AUD/USD',l:70,s:13},
    {p:'BTC/USD',l:82,s:18},{p:'ETH/USD',l:74,s:26},{p:'SOL/USD',l:88,s:12},{p:'BNB/USD',l:65,s:35},
    {p:'NVDA',l:91,s:9},{p:'AAPL',l:77,s:23},{p:'AMZN',l:83,s:17},{p:'TSLA',l:38,s:62},
    {p:'XAU/USD',l:55,s:45},{p:'WTI/USD',l:72,s:28},{p:'USD/CAD',l:60,s:40},{p:'NZD/USD',l:48,s:52},
  ];
  const hmf=document.getElementById('hm-full');
  if(hmf)hmf.innerHTML=hfull.map(h=>{
    const em=h.l>=80,med=h.l>=60;
    const col=em?'var(--em)':med?'var(--gold)':'var(--red)';
    const bg=em?'rgba(16,185,129,.06)':med?'rgba(245,158,11,.05)':'rgba(244,63,94,.05)';
    const bc=em?'rgba(16,185,129,.18)':med?'rgba(245,158,11,.14)':'rgba(244,63,94,.12)';
    return `<div style="background:${bg};border:1px solid ${bc};border-radius:11px;padding:14px;cursor:pointer;transition:transform .2s,border-color var(--trans)" onmouseenter="this.style.transform='scale(1.03)'" onmouseleave="this.style.transform='scale(1)'" onclick="aTab('asset')">
      <div style="font-family:var(--ff-mono);font-size:10px;color:var(--txt);margin-bottom:5px">${h.p}</div>
      <div style="font-size:26px;font-weight:900;color:${col};line-height:1;${em?`text-shadow:0 0 20px ${col}44`:''}">${h.l}</div>
      <div style="font-family:var(--ff-mono);font-size:8px;color:${col};margin-bottom:7px;letter-spacing:1px">${em?'HIGH':med?'MEDIUM':'LOW'} CONVICTION</div>
      <div style="height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;margin-bottom:4px"><div style="height:100%;width:${h.l}%;background:${col};border-radius:2px"></div></div>
      <div style="display:flex;justify-content:space-between;font-family:var(--ff-mono);font-size:8px;color:var(--txt3)"><span>L ${h.l}%</span><span>S ${h.s}%</span></div>
    </div>`;
  }).join('');

  // alerts
  const ac=document.getElementById('alerts-card');
  if(ac){
    const al=[
      {p:'BTC/USD',c:'Score crosses above',v:'90',status:'active'},
      {p:'USD/JPY',c:'Price drops below',v:'149.50',status:'active'},
      {p:'NVDA',c:'Score crosses above',v:'85',status:'fired'},
    ];
    ac.innerHTML='<div class="scard-title"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Active Alerts</div>'+al.map(a=>`
      <div class="alert-item">
        <div class="alert-dot ${a.status}"></div>
        <div style="flex:1">
          <div class="alert-name">${a.p}</div>
          <div class="alert-cond">${a.c} <b>${a.v}</b></div>
        </div>
        <span class="alert-status ${a.status==='active'?'as-active':'as-fired'}">${a.status.toUpperCase()}</span>
        <button class="btn-del" onclick="this.closest('.alert-item').style.opacity='.3'">×</button>
      </div>`).join('');
  }

  // bots in app
  buildBots('bots-app');
  buildIPR();
}

/* ── INTEL PREVIEW (landing bento) ─────── */
function buildIPR(){
  const el=document.getElementById('ipr-list');if(!el||el.children.length)return;
  el.innerHTML=FEED.slice(0,5).map(d=>`
    <div class="ipr">
      <span class="ipr-pair">${d.p}</span>
      <div class="ipr-bar"><div class="ipr-fill" style="width:${d.s}%"></div></div>
      <span class="ipr-sc">${d.s}</span>
      <span class="ipr-chg ${d.u?'up':'dn'}">${d.u?'+':''}${d.c}%</span>
    </div>`).join('');
}
buildIPR();

/* ── SVG ICON STRINGS for bots ───────────── */
const IC={
  scalper:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  brain:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  crypto:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  dca:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  arb:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  hedge:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

/* ── BOTS DATA ──────────────────────────── */
const BOTS=[
  {ic:IC.scalper,n:'Alpha Scalper Pro',sub:'High-freq Forex scalper',badge:'bb-live',btxt:'LIVE',feat:true,roi:'+34.2%',tr:'1,204',wr:'71%',desc:'Executes 100–300 micro-trades per day using Mensch Score momentum bursts. Optimized for EUR/USD and USD/JPY during London session.',tags:['FOREX','EUR/USD','SCALP','LONDON'],price:49,note:'Per month · Cancel anytime'},
  {ic:IC.brain,n:'Conviction Bot X',sub:'Mensch Score signal trader',badge:'bb-hot',btxt:'HOT',feat:false,roi:'+28.7%',tr:'342',wr:'68%',desc:'Trades exclusively on assets with Mensch Score ≥85. Waits for institutional-grade conviction before any entry.',tags:['MULTI-ASSET','SCORE ≥85','SWING'],price:79,note:'Pro plan required'},
  {ic:IC.crypto,n:'Crypto Momentum',sub:'BTC/ETH/SOL trend rider',badge:'bb-new',btxt:'NEW',feat:false,roi:'+51.3%',tr:'88',wr:'63%',desc:'Rides large crypto momentum waves. Uses sentiment heatmap + Mensch Score convergence as triggers. Holds 2–5 days.',tags:['CRYPTO','BTC','ETH','SOL'],price:59,note:'30-day backtest'},
  {ic:IC.dca,n:'DCA Intelligence',sub:'Smart accumulation engine',badge:'bb-live',btxt:'LIVE',feat:false,roi:'+19.4%',tr:'24',wr:'100%',desc:'Systematic DCA bot that increases position size when Mensch Score drops below 50 (buying the intelligent dip).',tags:['DCA','BTC','ETH','LOW RISK'],price:29,note:'Beginner friendly'},
  {ic:IC.arb,n:'Arbitrage Engine',sub:'Cross-exchange spread capture',badge:'bb-live',btxt:'LIVE',feat:false,roi:'+12.1%',tr:'4,820',wr:'89%',desc:'Captures price discrepancies across Binance, Kraken, and Coinbase. Ultra-low risk, ultra-high frequency.',tags:['ARBITRAGE','MULTI-EXCHANGE'],price:99,note:'Institutional grade'},
  {ic:IC.hedge,n:'Hedge Protocol',sub:'Automated portfolio protection',badge:'bb-new',btxt:'NEW',feat:false,roi:'-2.1%',tr:'12',wr:'100%',desc:'Opens hedge positions when Mensch Score drops below 40. Protects against market downturns. Essential risk layer.',tags:['HEDGING','RISK MGMT','PRO'],price:69,note:'Risk management tool'},
];

function buildBots(id){
  const c=document.getElementById(id);if(!c||c.children.length)return;
  c.innerHTML=BOTS.map(b=>`
    <div class="bot-card${b.feat?' featured':''}">
      <div class="bot-top-bar"></div>
      <div class="bot-hdr">
        <div class="bot-top">
          <div class="bot-icon">${b.ic}</div>
          <span class="bot-badge ${b.badge}">${b.btxt}</span>
        </div>
        <div class="bot-name">${b.n}</div>
        <div class="bot-sub">${b.sub}</div>
      </div>
      <div class="bot-chart-wrap">
        ${spark(parseFloat(b.roi)>0,260,44)}
        <div class="bot-30d">30D</div>
      </div>
      <div class="bot-stats">
        <div class="bot-stat"><div class="bs-val ${parseFloat(b.roi)>0?'up':'dn'}">${b.roi}</div><div class="bs-lbl">30D ROI</div></div>
        <div class="bot-stat"><div class="bs-val">${b.tr}</div><div class="bs-lbl">TRADES</div></div>
        <div class="bot-stat"><div class="bs-val up">${b.wr}</div><div class="bs-lbl">WIN RATE</div></div>
      </div>
      <div class="bot-body">
        <div class="bot-desc">${b.desc}</div>
        <div class="bot-tags">${b.tags.map(t=>`<span class="btag">${t}</span>`).join('')}</div>
        <div class="bot-footer">
          <div>
            <div class="bot-price">$${b.price}<sub>/mo</sub></div>
            <div class="bot-price-note">${b.note}</div>
          </div>
          <button class="btn-bot ${b.feat?'btn-bot-em':'btn-bot-ghost'}" onclick="go('app');aTab('bots-app')">${b.feat?'Deploy Now →':'View Bot'}</button>
        </div>
      </div>
    </div>`).join('');
}
buildBots('bots-grid');

/* ── PRICING ────────────────────────────── */
const PLANS=[
  {tier:'FREE',price:0,desc:'First taste of sovereign alpha.',
   items:[['✓','100 signals/day'],['✓','Sentiment heatmap'],['✓','3 watchlist slots'],['✓','Zenith AI (5/day)'],['✗','Full 466K feed'],['✗','Trading Bots'],['✗','API Access']],
   btn:'btn-pc-out',btxt:'Start Free'},
  {tier:'PRO',price:49,desc:'Full access for serious traders.',pro:true,
   items:[['✓','Unlimited signals'],['✓','Full 466K feed'],['✓','All Trading Bots'],['✓','Zenith AI (unlimited)'],['✓','AI Research Lab'],['✓','API Key (1 key)'],['✓','Priority support']],
   btn:'btn-pc-em',btxt:'Start Pro Trial'},
  {tier:'INSTITUTIONAL',price:299,desc:'For funds and prop desks.',
   items:[['✓','Everything in Pro'],['✓','Dedicated Supabase'],['✓','Unlimited API keys'],['✓','Custom webhooks'],['✓','White-label option'],['✓','SLA + Onboarding'],['✓','Custom bot builds']],
   btn:'btn-pc-out',btxt:'Contact Sales'},
];
document.getElementById('pricing-grid').innerHTML=PLANS.map(p=>`
  <div class="price-card${p.pro?' pro':''}">
    <div class="pc-tier">${p.tier}</div>
    <div class="pc-price">$${p.price}<span>/mo</span></div>
    <div class="pc-desc">${p.desc}</div>
    <ul class="pc-list">${p.items.map(i=>`<li><span class="${i[0]==='✓'?'pck':'pcx'}">${i[0]==='✓'?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'}</span>${i[1]}</li>`).join('')}</ul>
    <button class="btn-pc ${p.btn}" onclick="go('app')">${p.btxt}</button>
  </div>`).join('');

/* ── WHAT-IF SIM ────────────────────────── */
function sim(btn,delta){
  document.querySelectorAll('#at-asset .filt-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  const ns=Math.max(0,Math.min(100,Math.round(94*(1+delta/100)+(delta>0?2:-3))));
  const sv=document.getElementById('sim-v');
  sv.textContent=ns;
  sv.style.color=ns>=94?'var(--em)':ns>=80?'var(--gold)':'var(--red)';
  document.getElementById('sim-n').textContent={5:'Mild expansion — holds.',10:'Moderate stress — slight drop.',20:'High vol — significant drop.','-10':'Compression — spike likely.'}[delta]||'';
}

/* ── AGENT ──────────────────────────────── */
let agentOpen=false;
function toggleAgent(){
  agentOpen=!agentOpen;
  document.getElementById('agent-panel').classList.toggle('open',agentOpen);
  document.getElementById('agent-backdrop').classList.toggle('show',agentOpen);
}
const AR=[
  "Based on current data, <strong>BTC/USD holds Mensch Score 94</strong> — the highest active signal. Want me to open the full deep-dive?",
  "Running query… <strong>14 Forex pairs</strong> show conviction above 80 right now. Top: USD/JPY at 88. Should I filter the feed?",
  "<strong>3-point brief:</strong><br>• NVDA leads Tech at 91 (+4.12%)<br>• BTC broke $66K — confirmation active<br>• Fed decision at 17:00 GMT — macro caution",
  "<strong>Note:</strong> Not financial advice — AI intelligence only. EUR/USD technicals weak vs macro. Conviction: 73.",
];
let ai=0;
function sendAgent(){
  const inp=document.getElementById('agent-in'),msg=inp.value.trim();if(!msg)return;
  const msgs=document.getElementById('agent-msgs');
  msgs.innerHTML+=`<div class="amsg amsg-user">${msg}</div>`;
  inp.value='';
  const dot=document.createElement('div');dot.className='amsg amsg-ai';
  dot.innerHTML='<div class="tdots"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
  msgs.appendChild(dot);msgs.scrollTop=msgs.scrollHeight;
  setTimeout(()=>{dot.innerHTML=AR[ai%AR.length];ai++;msgs.scrollTop=msgs.scrollHeight},850+Math.random()*450);
}

/* ── LAB ─────────────────────────────────── */
const LR=[
  "Querying 466,984 rows for AI/ML equities…\n\nFound **23 assets** tagged `AI/ML`. Avg Mensch Score: **84.2** (+12% WoW).\n\n**Top 3:** NVDA (91), MSFT (77), AMD (75). Rendering report on canvas…",
  "**Top 10 Forex by Conviction:**\n1. USD/JPY — 88\n2. GBP/USD — 82\n3. EUR/USD — 73\n\nMacro risk: Fed at 17:00 GMT.",
  "**Daily Brief:**\n• Tech leads — NVDA 91, sector +2.3%\n• Crypto bullish — BTC broke $66K\n• Macro caution — CPI at 14:30 GMT\n\nOverall: **Cautiously Bullish**",
];
let li=0;
function sendLab(){const i=document.getElementById('lab-in');labMsg(i.value.trim());i.value=''}
function labMsg(msg){
  if(!msg)return;
  const msgs=document.getElementById('lab-msgs');
  msgs.innerHTML+=`<div class="lm-user"><div class="lm-av av-user"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div class="lm-bubble lm-bubble-user">${msg}</div></div>`;
  const dot=document.createElement('div');dot.className='lm-ai';
  dot.innerHTML='<div class="lm-av av-ai"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="14" r="1.5" fill="white" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="white" stroke="none"/><line x1="9" y1="17" x2="15" y2="17"/></svg></div><div class="lm-bubble lm-bubble-ai"><div class="tdots"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>';
  msgs.appendChild(dot);msgs.scrollTop=msgs.scrollHeight;
  setTimeout(()=>{
    const rep=LR[li%LR.length];li++;
    dot.querySelector('.lm-bubble').innerHTML=rep.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`(.*?)`/g,'<code style="font-family:var(--ff-mono);font-size:10px;background:rgba(16,185,129,.1);padding:1px 5px;border-radius:3px;color:var(--em)">$1</code>').replace(/\n/g,'<br>');
    msgs.scrollTop=msgs.scrollHeight;
    renderCanvas(rep);
  },1100+Math.random()*500);
}
function renderCanvas(txt){
  const gh=document.getElementById('canvas-ghosts');
  const cr=document.getElementById('canvas-report');
  if(gh)gh.style.display='none';
  if(cr){
    cr.className='canvas-report show';
    cr.innerHTML=`
      <div class="cr-hdr">AI Report · ${new Date().toLocaleTimeString()}</div>
      <div class="cr-sub" style="font-family:var(--ff-mono)">466,984 rows queried · Gemini 2.5 Flash · Zenith Agent</div>
      <table class="intel-table">
        <thead><tr><th>Asset</th><th>Score</th><th>Category</th><th>Signal</th><th>24h</th></tr></thead>
        <tbody>${FEED.slice(0,6).map(d=>`<tr>
          <td class="cell-pair">${d.p}</td>
          <td><span class="badge-score ${sc(d.s)}">${d.s}</span></td>
          <td><span class="cell-cat">${d.cat}</span></td>
          <td class="${d.u?'up':'dn'}" style="font-family:var(--ff-mono);font-size:10px;font-weight:600">${d.u?'BUY ↑':'SELL ↓'}</td>
          <td class="${d.u?'up':'dn'}" style="font-family:var(--ff-mono);font-size:10px">${d.u?'+':''}${d.c}%</td>
        </tr>`).join('')}</tbody>
      </table>
      <div style="font-family:var(--ff-mono);font-size:8px;color:var(--txt3);padding-top:8px">Not financial advice. AI intelligence only.</div>`;
  }
}

/* ── FILT BTN TOGGLE ────────────────────── */
document.querySelectorAll('.filt-btn:not([onclick])').forEach(b=>{
  b.addEventListener('click',function(){
    const tb=this.closest('.intel-toolbar');
    if(tb){tb.querySelectorAll('.filt-btn:not([onclick])').forEach(x=>x.classList.remove('on'))}
    this.classList.toggle('on');
  });
});

/* ── INTEL TAB BUILD HOOK ───────────────── */
const _origATab=_aTab;
_aTab=function(id){
  _origATab(id);
  if(id==='intel') buildIntel();
};
function buildIntel(){
  const REPORTS=[
    {rank:1,tag:'FOREX',tCls:'tag-forex',title:'USD/JPY BREAKOUT: BoJ Decision Triggers High-Conviction Signal',meta:'14:12 · 6 min',score:94,sCls:'i-rs-hi',feat:true},
    {rank:2,tag:'CRYPTO',tCls:'tag-crypto',title:'BITCOIN: BTC Breaks $67K — Score 94, Institutional Buy Returns',meta:'13:58 · 4 min',score:91,sCls:'i-rs-hi',feat:false},
    {rank:3,tag:'EQUITY',tCls:'tag-equity',title:'NVIDIA Scores 91 on Mensch Scale Following Blackwell Demand Surge',meta:'13:44 · 5 min',score:91,sCls:'i-rs-hi',feat:false},
    {rank:4,tag:'MACRO',tCls:'tag-macro',title:'EUROZONE INFLATION: Lagarde Hints at Rate Pause — EUR/USD Impact',meta:'13:37 · 6 min',score:73,sCls:'i-rs-md',feat:false},
    {rank:5,tag:'FOREX',tCls:'tag-forex',title:'GBP/USD: Sterling Holds Gains as UK Jobs Data Beats Forecast',meta:'13:22 · 3 min',score:82,sCls:'i-rs-hi',feat:false},
    {rank:6,tag:'CRYPTO',tCls:'tag-crypto',title:'SOL Momentum Score Hits 88: Three Catalysts Behind the Move',meta:'13:10 · 4 min',score:88,sCls:'i-rs-hi',feat:false},
    {rank:7,tag:'MACRO',tCls:'tag-macro',title:'US Non-Farm Payrolls Smash Expectations — Dollar Index Surges',meta:'12:47 · 5 min',score:85,sCls:'i-rs-hi',feat:false},
    {rank:8,tag:'EQUITY',tCls:'tag-equity',title:'AMAZON Q1 Beats: Cloud Revenue Drives Mensch Score to 83',meta:'12:33 · 4 min',score:83,sCls:'i-rs-hi',feat:false},
    {rank:9,tag:'COMMODITY',tCls:'tag-commodity',title:'GOLD Pulls Back as Dollar Strength Weighs on Safe Haven Demand',meta:'12:18 · 3 min',score:71,sCls:'i-rs-md',feat:false},
    {rank:10,tag:'CRYPTO',tCls:'tag-crypto',title:'ETH Gas Fees Drop 40%: Network Upgrade Drives Conviction Spike',meta:'12:05 · 4 min',score:79,sCls:'i-rs-md',feat:false},
    {rank:11,tag:'FOREX',tCls:'tag-forex',title:'AUD/USD Weakens as China PMI Disappoints — Score Drops to 66',meta:'11:52 · 3 min',score:66,sCls:'i-rs-lo',feat:false},
    {rank:12,tag:'MACRO',tCls:'tag-macro',title:'Fed Minutes Reveal Split on Rate Path — USD Reaction Muted',meta:'11:38 · 5 min',score:70,sCls:'i-rs-md',feat:false},
  ];
  const rl=document.getElementById('i-report-list');
  if(rl&&!rl.children.length) rl.innerHTML=REPORTS.map(r=>`
    <div class="i-report-item${r.feat?' feat':''}">
      <div class="i-rank${r.feat?' em':''}">${r.rank}</div>
      <div class="i-rbody">
        <div class="i-rtag ${r.tCls}">${r.tag}</div>
        <div class="i-rtitle">${r.title}</div>
        <div class="i-rmeta"><span class="i-rscore ${r.sCls}">${r.score}</span>${r.meta}</div>
      </div>
    </div>`).join('');

  const ARTICLES=[
    {tag:'CRYPTO',tCls:'tag-crypto',title:'BITCOIN: Institutional Accumulation Resumes Above $66K — Mensch Score 94',time:'13:58',score:94,up:true},
    {tag:'EQUITY',tCls:'tag-equity',title:'NVIDIA Scores 91 on Mensch Scale as Blackwell Demand Surge Confirmed',time:'13:44',score:91,up:true},
    {tag:'MACRO',tCls:'tag-macro',title:'ECB Rate Pause Signals — What Lagarde Really Said Between the Lines',time:'13:37',score:73,up:true},
    {tag:'FOREX',tCls:'tag-forex',title:'GBP/USD Holds Gains After UK Jobs Data Beats Forecast by Wide Margin',time:'13:22',score:82,up:true},
  ];
  const ag=document.getElementById('i-article-grid');
  if(ag&&!ag.children.length) ag.innerHTML=ARTICLES.map(a=>`
    <div class="i-article">
      <div class="i-athumb">${spark(a.up,180,60)}</div>
      <div class="i-atag ${a.tCls}">${a.tag}</div>
      <div class="i-atitle">${a.title}</div>
      <div class="i-ameta">
        <span style="font-family:var(--ff-mono);font-size:9px;padding:1px 6px;border-radius:2px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);color:var(--em)">${a.score}</span>
        <span>${a.time} GMT</span>
      </div>
    </div>`).join('');

  const FEED_I=[
    {t:'14:12',x:'<b>USD/JPY BREAKOUT:</b> BoJ Decision Triggers Highest-Conviction Forex Signal of Q2'},
    {t:'13:58',x:'<b>BITCOIN:</b> BTC Breaks $67K Resistance — Mensch Score Spikes to 94'},
    {t:'13:47',x:'<b>NFP:</b> US Non-Farm Payrolls Smash 272K vs 182K Forecast — Dollar Surges'},
    {t:'13:37',x:'<b>ECB:</b> Lagarde Hints at Rate Pause — EUR/USD Conviction Drops to 73'},
    {t:'13:12',x:'<b>SOL:</b> Solana Momentum Score Hits 88 on Three Converging Catalysts'},
  ];
  const lf=document.getElementById('i-live-feed');
  if(lf&&!lf.children.length) lf.innerHTML=FEED_I.map(f=>`
    <div class="i-feed-item">
      <div class="i-ftime">${f.t}</div>
      <div class="i-farrow">›</div>
      <div class="i-ftext">${f.x}</div>
    </div>`).join('');

  const CAL=[
    {dot:'hi',time:'14:30',event:'US CPI (Consumer Price Index)',impact:'HIGH',iCls:'i-imp-hi'},
    {dot:'md',time:'16:00',event:'BoE Governor Bailey Speaks',impact:'',iCls:''},
    {dot:'hi',time:'16:00',event:'BoE Monetary Policy Decision',impact:'HIGH',iCls:'i-imp-hi'},
    {dot:'md',time:'17:00',event:'BoE Governor Press Conference',impact:'MED',iCls:'i-imp-md'},
    {dot:'hi',time:'19:00',event:'Fed Vice Chair Speaks',impact:'HIGH',iCls:'i-imp-hi'},
  ];
  const cl=document.getElementById('i-cal-list');
  if(cl&&!cl.children.length) cl.innerHTML=CAL.map(c=>`
    <div class="i-cal-item">
      <div class="i-cdot ${c.dot}"></div>
      <div class="i-ctime">${c.time}</div>
      <div class="i-cevent">${c.event}</div>
      ${c.impact?`<div class="i-cimpact ${c.iCls}">${c.impact}</div>`:''}
    </div>`).join('');

  const HM_I=[{p:'EUR/USD',l:75,s:23},{p:'USD/JPY',l:89,s:11},{p:'GBP/USD',l:70,s:11},{p:'AUD/USD',l:70,s:13}];
  const hm=document.getElementById('i-hm-grid');
  if(hm&&!hm.children.length) hm.innerHTML=HM_I.map(h=>`
    <div class="i-hm-cell">
      <div class="i-hm-pair">${h.p}</div>
      <div class="i-hm-row"><span class="i-hm-lbl">Long</span><div class="i-hm-track"><div class="i-hm-em" style="width:${h.l}%"></div></div><span class="i-hm-pct up">${h.l}%</span></div>
      <div class="i-hm-row"><span class="i-hm-lbl">Short</span><div class="i-hm-track"><div class="i-hm-red" style="width:${h.s}%"></div></div><span class="i-hm-pct dn">${h.s}%</span></div>
    </div>`).join('');

  function iChart(id,c1,c2,l1,l2){
    const el=document.getElementById(id);if(!el)return;
    const w=el.offsetWidth||380,h=80;
    function ln(){
      const pts=[];let v=50;
      for(let i=0;i<=28;i++){
        v=Math.max(10,Math.min(90,v+(Math.random()-.47)*15));
        pts.push(`${((i/28)*w).toFixed(1)},${(h-((v/100)*(h-12))-6).toFixed(1)}`);
      }return pts.join(' ');
    }
    const p1=ln(),p2=ln();
    const e1=parseFloat(p1.split(' ').pop().split(',')[1]);
    const e2=parseFloat(p2.split(' ').pop().split(',')[1]);
    el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="rgba(255,255,255,.04)" stroke-dasharray="3,3"/>
      <polyline points="${p1}" fill="none" stroke="${c1}" stroke-width="1.5" stroke-linecap="round"/>
      <polyline points="${p2}" fill="none" stroke="${c2}" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
      <circle cx="${w}" cy="${e1}" r="3" fill="${c1}" style="filter:drop-shadow(0 0 4px ${c1})"/>
      <circle cx="${w}" cy="${e2}" r="3" fill="${c2}" style="filter:drop-shadow(0 0 4px ${c2})"/>
      <text x="${w-4}" y="${e1-5}" text-anchor="end" fill="${c1}" font-family="Roboto Mono" font-size="9">${l1}</text>
      <text x="${w-4}" y="${e2+11}" text-anchor="end" fill="${c2}" font-family="Roboto Mono" font-size="9">${l2}</text>
    </svg>`;
  }
  setTimeout(()=>{
    iChart('i-chart1','#10b981','#f43f5e','DXY 104.2','BTC $67.2K');
    iChart('i-chart2','#10b981','#f59e0b','10Y 4.38%','XAU $2,312');
  },80);

  document.querySelectorAll('.i-cat').forEach(b=>{
    b.addEventListener('click',function(){
      document.querySelectorAll('.i-cat').forEach(x=>x.classList.remove('on'));
      this.classList.add('on');
    });
  });
}

/* ── GLOBAL EXPOSURES for onclick attributes ── */
window.go=go;
window.goScroll=goScroll;
window.aTab=_aTab;
window.bnavGo=bnavGo;
window.bnav=bnav;
window.toggleAgent=toggleAgent;
window.sendAgent=sendAgent;
window.sendLab=sendLab;
window.labMsg=labMsg;
window.sim=sim;
