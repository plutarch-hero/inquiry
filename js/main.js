/* ==========================================
   1. 전역 변수 및 DOM 요소 초기화
   ========================================== */
let mainMap = null;
let currentHero = "theseus";
const heroMarkers = {}; 

let pollTimer = null;
let lastDataFingerprint = "";

// 주요 화면 요소
const mapSection = document.getElementById("mapSection");
const heroDetailSection = document.getElementById("heroDetailSection");
const homeMapBtn = document.getElementById("homeMapBtn");
const heroSelect = document.getElementById("heroSelect");

/* ==========================================
   2. 지도(Leaflet) 초기화 및 애니메이션 로직
   ========================================== */
function initMainMap() {
  const mapEl = document.getElementById('mainMap');
  if (!mapEl) return;

  if (!mainMap) {
    mainMap = L.map('mainMap', { zoomControl: true, fadeAnimation: true }).setView([39.0, 18.0], 5);

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ko', {
      maxZoom: 18,
      attribution: '© Google Maps'
    }).addTo(mainMap);

    allMapEvents.forEach(evt => {
      const spriteHtml = HERO_SPRITES[evt.hero] || "";
      const icon = L.divIcon({
        className: 'pixel-pin-container',
        html: `<div class="pixel-pin-body" id="pin-body-${evt.hero}">${spriteHtml}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 36],
        popupAnchor: [0, -45] // 팝업창을 캐릭터 머리 위로 올림
      });

      const marker = L.marker([evt.lat, evt.lng], { icon: icon }).addTo(mainMap);
      
      heroMarkers[evt.hero] = {
        marker: marker,
        latlng: [evt.lat, evt.lng]
      };

      marker.bindPopup(`
        <div class="popup-inner">
          <h4 style="margin:0 0 6px 0; color:#e5be75; font-size:14px;">[${evt.heroName}] ${evt.title}</h4>
          <p style="margin:0 0 10px 0; font-size:12px; line-height:1.4; color:#ddd;">${evt.desc}</p>
          <button class="popup-btn" style="width:100%; padding:6px 0; background:#b45309; color:#fff; border:none; border-radius:4px; font-size:12px; cursor:pointer;" onclick="openHeroView('${evt.hero}')">
            👤 ${evt.heroName} 상세 보기 &gt;
          </button>
        </div>
      `);

      // 마커를 직접 클릭했을 때도 카메라 이동!
      marker.on('click', () => {
        mainMap.flyTo([evt.lat, evt.lng], 7, { animate: true, duration: 1.2 });
        triggerPinAnimation(evt.hero);
      });
    });
  }
  setTimeout(() => { if (mainMap) mainMap.invalidateSize(); }, 200);
}

// 애니메이션 종료 시 설명창(팝업)도 같이 닫기
window.triggerPinAnimation = function(heroKey) {
  const pinElement = document.getElementById(`pin-body-${heroKey}`);
  if (pinElement) {
    document.querySelectorAll('.pixel-pin-body').forEach(el => el.classList.remove('highlight-pin'));
    pinElement.classList.add('highlight-pin');
    
    // 아이들이 글을 읽고 '상세 보기' 버튼을 누를 수 있도록 시간 대기
    setTimeout(() => {
      pinElement.classList.remove('highlight-pin');
      if (heroMarkers[heroKey] && heroMarkers[heroKey].marker) {
        heroMarkers[heroKey].marker.closePopup(); 
      }
    }, 3000); 
  }
};

// 범례 버튼 클릭 시 실행
window.highlightHeroPin = function(heroKey) {
  const heroData = heroMarkers[heroKey];
  if (!heroData || !mainMap) return;

  mainMap.flyTo(heroData.latlng, 7, { animate: true, duration: 1.2 });
  setTimeout(() => {
    heroData.marker.openPopup();
    triggerPinAnimation(heroKey);
  }, 1000);
};

/* ==========================================
   3. 화면 이동 및 탭 전환 로직
   ========================================== */
homeMapBtn.addEventListener("click", () => { showMapView(); });
heroSelect.addEventListener("change", (e) => { openHeroView(e.target.value); });

function showMapView() {
  homeMapBtn.classList.add("active");
  heroSelect.value = "";
  mapSection.classList.add("active");
  heroDetailSection.classList.remove("active");
  document.getElementById("appTitle").innerText = "🏛️ 플루타르코스 세계 지도";
  initMainMap();
}

window.openHeroView = function(heroKey) {
  currentHero = heroKey;
  homeMapBtn.classList.remove("active");
  heroSelect.value = heroKey;
  mapSection.classList.remove("active");
  heroDetailSection.classList.add("active");

  const fullData = getHeroFullData(heroKey);
  document.getElementById("appTitle").innerText = `🏛️ ${fullData.name || heroKey}`;
  switchHeroTab("overview");
};

document.querySelectorAll(".hero-sub-nav .tab-btn").forEach(btn => {
  btn.addEventListener("click", (e) => { switchHeroTab(e.target.dataset.tab); });
});

function switchHeroTab(tabName) {
  document.querySelectorAll(".hero-sub-nav .tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  const targetBtn = document.querySelector(`.hero-sub-nav .tab-btn[data-tab="${tabName}"]`);
  if (targetBtn) targetBtn.classList.add("active");

  if (tabName === "overview") {
    document.getElementById("tabOverview").classList.add("active");
    renderOverview();
  } else if (tabName === "network") {
    document.getElementById("tabNetwork").classList.add("active");
    requestAnimationFrame(() => { setTimeout(renderNetwork, 50); });
  } else if (tabName === "quotes") {
    document.getElementById("tabQuotes").classList.add("active");
    renderQuotes();
  } else if (tabName === "gallery") {
    document.getElementById("tabGallery").classList.add("active");
    renderGallery();
  } else if (tabName === "debate") {
    document.getElementById("tabDebate").classList.add("active");
    renderDebates();
  }
}

/* ==========================================
   4. 공동탐구 게시판 로직 (Supabase 연동)
   ========================================== */
async function renderDebates() {
  const h = getHeroFullData(currentHero);
  document.getElementById("debateFormTitle").innerText = `💭 ${h.name} 공동탐구 생각 나누기`;

  const anchorBox = document.getElementById("inquiryAnchorBox");
  if (anchorBox) {
    const questionText = h.overview.lifeQuestion || "이 영웅의 결단에서 우리가 배울 수 있는 핵심 교훈은 무엇인가요?";
    anchorBox.innerHTML = `
      <div class="anchor-badge">🧭 오늘의 핵심 공동탐구 과제</div>
      <div class="anchor-content">
        <p><strong>Q1. 고전 딜레마:</strong> ${questionText}</p>
        <p><strong>Q2. 역사적 평가:</strong> 당시 ${h.name}의 선택은 최선이었을까요? 내가 그 시대의 시민 또는 지도자였다면 어떤 선택을 내렸을지 근거와 함께 탐구해 보세요.</p>
      </div>
    `;
  }

  const listContainer = document.getElementById("debateList");
  if (!listContainer.hasChildNodes() || listContainer.innerHTML.includes("불러오는 중")) {
    listContainer.innerHTML = `<div class="no-posts">서버에서 탐구 기록을 불러오는 중...</div>`;
  }

  try {
    const { data: posts, error: postErr } = await supabaseClient.from('debates').select('*').eq('hero', currentHero).order('created_at', { ascending: false });
    if (postErr) throw postErr;

    if (!posts || posts.length === 0) {
      listContainer.innerHTML = `<div class="no-posts">아직 등록된 탐구 생각이 없습니다.<br>첫 번째 탐구 질문 또는 주장을 남겨보세요!</div>`;
      return;
    }

    const postIds = posts.map(p => p.id);
    const { data: replies, error: replyErr } = await supabaseClient.from('replies').select('*').in('debate_id', postIds).order('created_at', { ascending: true });
    if (replyErr) throw replyErr;

    let html = "";
    posts.forEach(post => {
      const postReplies = (replies || []).filter(r => r.debate_id === post.id);
      const hasAiReply = postReplies.some(r => r.author.includes("플루타르코스"));
      
      let repliesHtml = "";
      postReplies.forEach(r => {
        const isAi = r.author.includes("플루타르코스");
        repliesHtml += `
          <div class="reply-item ${isAi ? 'ai-reply' : ''}">
            <div>
              <span class="reply-author ${isAi ? 'ai-author' : ''}">${r.author}:</span>
              <span>${r.text}</span>
            </div>
            <div>
              ${!isAi ? `<button class="action-btn del" onclick="deleteDebateReply(${r.id}, '${r.password}')">삭제</button>` : ''}
            </div>
          </div>
        `;
      });

      const dateObj = new Date(post.created_at);
      const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${dateObj.getHours()}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
      const aiBtnHtml = hasAiReply 
        ? `<span style="font-size:10px; color:#ffd15c; margin-right:6px;">✨ 플루타르코스 조언 완료</span>`
        : `<button class="action-btn" id="ai-req-btn-${post.id}" style="color:#ffd15c; font-weight:bold; margin-right:8px; border:1px solid rgba(255,209,92,0.4); border-radius:4px; padding:2px 6px;" onclick="requestPlutarchAdvice(${post.id})">🏛️ 플루타르코스의 조언 듣기</button>`;

      html += `
        <div class="debate-post" id="post-card-${post.id}">
          <div class="post-header">
            <div>
              <span class="post-author">👤 ${post.author}</span>
              <span class="post-date" style="margin-left: 6px;">${dateStr}</span>
            </div>
            <div>
              ${aiBtnHtml}
              <button class="action-btn del" onclick="deleteDebatePost(${post.id}, '${post.password}')">삭제</button>
            </div>
          </div>
          <div class="post-content">${post.content}</div>
          <div class="reply-section">
            <div class="reply-list" id="reply-list-${post.id}">${repliesHtml}</div>
            <div class="reply-input-row">
              <input type="text" class="reply-nick" id="replyNick-${post.id}" placeholder="닉네임" maxlength="8">
              <input type="password" class="reply-nick reply-pwd" id="replyPwd-${post.id}" placeholder="비번" maxlength="8">
              <input type="text" class="reply-text" id="replyText-${post.id}" placeholder="생각 덧붙이기(반론/보강)...">
              <button class="reply-btn" onclick="addDebateReply(${post.id})">등록</button>
            </div>
          </div>
        </div>
      `;
    });
    listContainer.innerHTML = html;
  } catch (err) {
    console.error(err);
    listContainer.innerHTML = `<div class="no-posts">데이터를 불러오는 중 오류가 발생했습니다.</div>`;
  }
}

window.addDebatePost = async function() {
  const pwdInput = document.getElementById("debatePassword");
  const contentInput = document.getElementById("debateQuestion");
  const authorInput = document.getElementById("debateAuthor");
  const selectedTag = document.querySelector('input[name="inquiryTag"]:checked')?.value || "";
  const author = authorInput ? authorInput.value.trim() : "익명";
  const password = pwdInput.value.trim();
  const rawContent = contentInput.value.trim();

  if (!rawContent) return alert("탐구 내용을 작성해 주세요.");
  if (!password) return alert("수정/삭제용 비밀번호를 입력해 주세요.");

  const fullContent = selectedTag ? `${selectedTag}\n${rawContent}` : rawContent;
  const { error } = await supabaseClient.from('debates').insert([{ hero: currentHero, author: author, password: password, content: fullContent }]);
  if (error) { alert("등록 실패: " + error.message); return; }

  contentInput.value = "";
  pwdInput.value = "";
  await renderDebates();
};

window.requestPlutarchAdvice = async function(postId) {
  const btn = document.getElementById(`ai-req-btn-${postId}`);
  if (btn) { btn.disabled = true; btn.innerText = "🏛️ 사유하는 중... ⏳"; }
  let lockReplyId = null;

  try {
    const { data: lockReply, error: lockErr } = await supabaseClient.from('replies').insert([{
      debate_id: postId, author: "🏛️ 플루타르코스 AI", password: "9999", text: "깊은 지혜를 떠올리며 사유하고 있네... 잠시 기다려 주게나. ⏳"
    }]).select().single();
    if (lockErr) throw lockErr;
    lockReplyId = lockReply.id;
    await renderDebates();

    const postCard = document.getElementById(`post-card-${postId}`);
    const postContent = postCard ? postCard.querySelector('.post-content').innerText : "";
    const heroName = getHeroFullData(currentHero).name;
    const aiAnswer = await askPlutarchAI(currentHero, heroName, postContent);

    if (aiAnswer) {
      await supabaseClient.from('replies').update({ text: aiAnswer }).eq('id', lockReplyId);
    } else {
      await supabaseClient.from('replies').update({ text: "흠, 깊은 사유에 잠겨 순간 답변이 늦어졌군요. 스스로 답을 찾아가는 과정 자체가 훌륭한 지혜라네." }).eq('id', lockReplyId);
    }
  } catch (err) {
    console.error("AI 요청 처리 중 오류:", err);
    if (lockReplyId) await supabaseClient.from('replies').update({ text: "지혜의 기록을 불러오는 중 마찰이 발생했다네. 다시 시도해 주게나." }).eq('id', lockReplyId);
  } finally {
    await renderDebates();
  }
};

window.deleteDebatePost = async function(postId, originPwd) {
  const inputPwd = prompt("글 등록 시 설정한 비밀번호를 입력하세요:");
  if (inputPwd === null) return;
  if (inputPwd !== originPwd) return alert("비밀번호가 일치하지 않습니다!");
  if (confirm("정말 이 탐구 기록을 삭제하시겠습니까?")) {
    const { error } = await supabaseClient.from('debates').delete().eq('id', postId);
    if (error) alert("삭제 실패: " + error.message);
    else await renderDebates();
  }
};

window.addDebateReply = async function(postId) {
  const nick = document.getElementById(`replyNick-${postId}`).value.trim() || "익명";
  const pwd = document.getElementById(`replyPwd-${postId}`).value.trim();
  const text = document.getElementById(`replyText-${postId}`).value.trim();
  if (!text) return alert("내용을 입력하세요.");
  if (!pwd) return alert("답변 삭제용 비밀번호를 입력하세요.");

  const { error } = await supabaseClient.from('replies').insert([{ debate_id: postId, author: nick, password: pwd, text: text }]);
  if (error) { alert("등록 실패: " + error.message); return; }

  document.getElementById(`replyText-${postId}`).value = "";
  document.getElementById(`replyPwd-${postId}`).value = "";
  await renderDebates();
};

window.deleteDebateReply = async function(replyId, originPwd) {
  const inputPwd = prompt("답변 비밀번호를 입력하세요:");
  if (inputPwd === null) return;
  if (inputPwd !== originPwd) return alert("비밀번호가 일치하지 않습니다!");
  if (confirm("이 생각을 삭제하시겠습니까?")) {
    const { error } = await supabaseClient.from('replies').delete().eq('id', replyId);
    if (error) alert("삭제 실패: " + error.message);
    else await renderDebates();
  }
};

/* ==========================================
   5. 실시간 동기화 로직 (WebSockets & Polling)
   ========================================== */
function setupRealtimeDebates() {
  try {
    supabaseClient.removeAllChannels();
    supabaseClient.channel('room-parallel-lives')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'debates' }, () => { checkAndSyncDebates(true); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'replies' }, () => { checkAndSyncDebates(true); })
      .subscribe();
  } catch (e) { console.warn("웹소켓 연결 시도 중:", e); }

  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(() => { checkAndSyncDebates(false); }, 3000);
}

function isUserTyping() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName.toLowerCase();
  return (tag === "input" || tag === "textarea") && active.closest("#tabDebate");
}

async function checkAndSyncDebates(forceRender = false) {
  const debateTab = document.getElementById("tabDebate");
  if (!debateTab || !debateTab.classList.contains("active")) return;
  if (isUserTyping()) return;

  try {
    const { data: posts } = await supabaseClient.from('debates').select('id, created_at').eq('hero', currentHero);
    const { data: replies } = await supabaseClient.from('replies').select('id, created_at');
    const currentFingerprint = `${(posts || []).length}_${(replies || []).length}_${posts?.[0]?.id || 0}_${replies?.[replies.length - 1]?.id || 0}`;

    if (forceRender || currentFingerprint !== lastDataFingerprint) {
      lastDataFingerprint = currentFingerprint;
      await renderDebates();
    }
  } catch (err) { console.warn("동기화 확인 중 오류:", err); }
}

/* ==========================================
   6. UI 유틸리티 및 초기 실행
   ========================================== */
// 인물 설명창(Inspector) 드래그 기능
(function enableInspectorDrag() {
  const inspector = document.getElementById("nodeInspector");
  if (!inspector) return;
  let isDragging = false, startX, startY, initialLeft, initialTop;

  function onStart(e) {
    if (e.target.id === "closeInsBtn") return;
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX; startY = clientY;
    const rect = inspector.getBoundingClientRect();
    const parentRect = inspector.parentElement.getBoundingClientRect();
    initialLeft = rect.left - parentRect.left;
    initialTop = rect.top - parentRect.top;
  }
  function onMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    inspector.style.left = `${initialLeft + (clientX - startX)}px`;
    inspector.style.top = `${initialTop + (clientY - startY)}px`;
    inspector.style.right = "auto"; inspector.style.margin = "0";
  }
  function onEnd() { isDragging = false; }

  inspector.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);
  inspector.addEventListener("touchstart", onStart, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onEnd);
})();

// 앱 최초 실행
showMapView();
setupRealtimeDebates();