/**
 * 活動公告資料設定檔
 * ─────────────────────────────────────────
 * 新增活動只需在下方陣列加一筆物件，存檔後網頁自動顯示，不需修改任何 HTML。
 *
 * 欄位說明：
 *   url   : 活動頁面路徑（相對路徑）
 *   tag   : 標籤文字（活動 / 禮包 / 慶典 / 系統 / 新開 … 自由填寫）
 *   title : 活動標題
 *   desc  : 一行簡介
 *   date  : 日期字串，用於排序（格式 YYYY-MM-DD）
 *   pin   : true = 置頂（可省略，預設 false）
 */
var EVENTS = [
  {
    url:   'events.html',
    tag:   '活動',
    title: '開局紅變＋紅娃活動',
    desc:  '登入就送英雄變身＋娃娃，開局加碼稀有＋7武器，自帶魔武！！練功必備',
    date:  '2026-05-15',
    pin:   true,
  },
  {
    url:   'event-line.html',
    tag:   '禮包',
    title: '預約 LINE 禮包',
    desc:  '加入官方 LINE 社群預約，開服即可領取專屬新手好禮',
    date:  '2026-05-12',
  },
  {
    url:   'event-bonfire.html',
    tag:   '慶典',
    title: '烽火慶典禮包',
    desc:  '烽火慶典限定好禮，豐厚獎勵等你來領',
    date:  '2026-05-12',
  },
    {n    tag:   '活動',n    desc:  '端午節活動・消滅海怪・討伐屈原的魂魄・活動時間 06/01~06/30',n    pin:   true,n// ── 在此往下新增活動 ──────────────────
  // {
  //   url:   'event-xxx.html',
  //   tag:   '活動',
  //   title: '活動名稱',
  //   desc:  '簡短說明',
  //   date:  '2026-06-01',
  // },
];

// 自動渲染上一則/下一則導覽到 #eventNav（若頁面存在）
function renderEventNav(){
  var nav = document.getElementById('eventNav');
  if(!nav) return;

  // 依置頂→日期降序排序，與活動一覽相同
  var sorted = EVENTS.slice().sort(function(a,b){
    if(a.pin && !b.pin) return -1;
    if(!a.pin && b.pin) return 1;
    return (b.date||'').localeCompare(a.date||'');
  });

  // 比對目前頁面檔名
  var current = location.pathname.split('/').pop() || 'index.html';
  var idx = sorted.findIndex(function(ev){ return ev.url === current; });
  if(idx === -1) return;

  var prev = idx > 0 ? sorted[idx - 1] : null;
  var next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  nav.innerHTML = '<div class="feature-nav-btns">'
    + (prev ? '<a href="' + prev.url + '" class="btn-outline">← ' + prev.title + '</a>' : '<span></span>')
    + (next ? '<a href="' + next.url + '" class="btn-outline">' + next.title + ' →</a>' : '<span></span>')
    + '</div>';
}

// 自動渲染到 #eventList（若頁面存在）
function renderEventList(){
  var list = document.getElementById('eventList');
  if(!list) return;

  var sorted = EVENTS.slice().sort(function(a,b){
    if(a.pin && !b.pin) return -1;
    if(!a.pin && b.pin) return 1;
    return (b.date||'').localeCompare(a.date||'');
  });

  if(sorted.length === 0){
    list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0">目前沒有進行中的活動</p>';
    return;
  }

  list.innerHTML = sorted.map(function(ev){
    var tagClass = 'tag-' + (ev.tag || '其他');
    return '<a href="' + ev.url + '" class="event-item">'
      + '<span class="event-tag ' + tagClass + '">' + (ev.tag||'其他') + '</span>'
      + '<div class="event-info">'
      + '<div class="event-title">' + ev.title + '</div>'
      + '<div class="event-desc">' + (ev.desc||'') + '</div>'
      + '</div>'
      + '<span class="event-arrow">→</span>'
      + '</a>';
  }).join('');
}
document.addEventListener('DOMContentLoaded', function(){
  renderEventList();
  renderEventNav();
});
