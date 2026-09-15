function getHeroFullData(heroKey) {
  return {
    ...heroOverviewData[heroKey],
    graph: heroGraphData[heroKey]
  };
}

function renderOverview() {
  const h = getHeroFullData(currentHero);
  const spriteHtml = HERO_SPRITES[currentHero] || "";
  const ov = h.overview;

  const heroMeta = {
    theseus: { role: "아테네의 연방 통합자", tagline: "“청동 몽둥이로 불의를 꺾고 크레타의 미궁을 돌파한 자”" },
    romulus: { role: "영원한 제국 로마의 시조", tagline: "“늑대의 젖을 먹고 자라 팔라티노 언덕에 성벽을 쌓은 자”" },
    lycurgus: { role: "스파르타 철혈 규율의 입법관", tagline: "“성벽 대신 시민의 용기를 방패로 삼은 무적의 입법자”" },
    numa: { role: "로마의 성스러운 평화왕", tagline: "“무기 대신 신앙과 예법으로 야만의 도시를 길들인 현자”" },
    solon: { role: "아테네 민주정의 주춧돌", tagline: "“채무의 멍에를 부수고 중용의 방패로 시민을 지킨 입법자”" },
    publicola: { role: "로마 공화정을 지켜낸 시민의 벗", tagline: "“도끼를 내리고 시민 앞에 머리 숙여 자유를 세운 집정관”" }
  };
  const meta = heroMeta[currentHero] || { role: "플루타르코스 비교열전 영웅", tagline: "“역사의 흐름을 바꾼 거인”" };

  const points = ov.lifeCurve || [];
  let chartSvg = "";

  if (points.length > 0) {
    const svgW = 600, svgH = 220, padX = 50, padY = 35;
    const innerW = svgW - padX * 2, centerY = svgH / 2, maxAmp = (svgH - padY * 2) / 2;

    const coords = points.map((pt, i) => {
      let normalizedVal = (pt.score > 0 && pt.score <= 100 && !points.some(p => p.score < 0)) ? (pt.score - 50) / 50 : pt.score / 50;
      normalizedVal = Math.max(-1, Math.min(1, normalizedVal));
      return { ...pt, x: padX + (i / (points.length - 1)) * innerW, y: centerY - (normalizedVal * maxAmp), isPositive: normalizedVal >= 0 };
    });

    let pathD = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      pathD += ` C ${coords[i].x + (coords[i+1].x - coords[i].x)/2},${coords[i].y} ${coords[i].x + (coords[i+1].x - coords[i].x)/2},${coords[i+1].y} ${coords[i+1].x},${coords[i+1].y}`;
    }
    const areaD = `${pathD} L ${coords[coords.length - 1].x},${centerY} L ${coords[0].x},${centerY} Z`;

    let pointsHtml = "";
    coords.forEach((pt, i) => {
      pointsHtml += `
        <g class="curve-point-group" data-idx="${i}" onclick="showCurveDetail(${i})">
          <circle cx="${pt.x}" cy="${pt.y}" r="6" class="curve-dot ${pt.isPositive ? 'dot-pos' : 'dot-neg'}"></circle>
          <circle cx="${pt.x}" cy="${pt.y}" r="16" class="curve-touch-hitbox"></circle>
          <text x="${pt.x}" y="${svgH - 12}" class="curve-age-label">${pt.age.split(" ")[0]}</text>
        </g>
      `;
    });

    chartSvg = `
      <div class="life-curve-container">
        <svg viewBox="0 0 ${svgW} ${svgH}" class="life-curve-svg">
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
              <stop offset="50%" stop-color="#e5be75" stop-opacity="0.1"/>
              <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.25"/>
            </linearGradient>
          </defs>
          <text x="${padX - 8}" y="${padY + 4}" class="axis-guide-label" text-anchor="end">+ 전성/영광</text>
          <text x="${padX - 8}" y="${centerY + 4}" class="axis-guide-label zero" text-anchor="end">0 평온</text>
          <text x="${padX - 8}" y="${svgH - padY}" class="axis-guide-label" text-anchor="end">- 시련/위기</text>
          <line x1="${padX}" y1="${padY}" x2="${svgW - padX}" y2="${padY}" stroke="#2e241e" stroke-dasharray="2 4"/>
          <line x1="${padX}" y1="${centerY}" x2="${svgW - padX}" y2="${centerY}" stroke="#b89047" stroke-width="1.2" stroke-dasharray="4 4"/>
          <line x1="${padX}" y1="${svgH - padY}" x2="${svgW - padX}" y2="${svgH - padY}" stroke="#2e241e" stroke-dasharray="2 4"/>
          <path d="${areaD}" fill="url(#curveGradient)"/>
          <path d="${pathD}" fill="none" stroke="#e5be75" stroke-width="3" class="curve-line"/>
          ${pointsHtml}
        </svg>
        <div id="curveEventDesc" class="curve-event-panel">
          <strong>💡 ${coords[2].age}</strong> : ${coords[2].event}
        </div>
      </div>
    `;

    window.showCurveDetail = function(idx) {
      const pt = getHeroFullData(currentHero).overview.lifeCurve[idx];
      const descBox = document.getElementById("curveEventDesc");
      if (!descBox) return;
      descBox.innerHTML = `<strong>💡 ${pt.age}</strong> : ${pt.event}`;
      document.querySelectorAll(".curve-point-group").forEach((g, i) => { g.classList.toggle("active", i === idx); });
    };
  }

  document.getElementById("overviewBox").innerHTML = `
    <div class="hero-pixel-status">
      <div class="pixel-avatar-box">${spriteHtml}</div>
      <div class="pixel-status-info">
        <span class="pixel-title-badge">${meta.role}</span>
        <h2>${h.name}</h2>
        <p>${meta.tagline}</p>
      </div>
    </div>
    <div class="overview-section-card">
      <div class="ov-sec-header"><span class="ov-sec-icon">🏛️</span><h3>I. 출생과 시대적 배경</h3></div>
      <p class="ov-sec-body">${ov.birthBackground}</p>
    </div>
    <div class="overview-section-card">
      <div class="ov-sec-header"><span class="ov-sec-icon">📈</span><h3>II. 인물의 흥망성쇠 (생애 곡선)</h3></div>
      <p class="ov-sec-sub">시기별 점을 클릭하면 주요 사건과 삶의 변곡점을 확인할 수 있습니다.</p>
      ${chartSvg}
    </div>
    <div class="overview-section-card">
      <div class="ov-sec-header"><span class="ov-sec-icon">👤</span><h3>III. 성격과 기질</h3></div>
      <p class="ov-sec-body">${ov.character}</p>
    </div>
    <div class="overview-section-card question-card">
      <div class="ov-sec-header"><span class="ov-sec-icon">❓</span><h3>IV. 오늘을 위한 인생 질문</h3></div>
      <blockquote class="ov-question-quote">${ov.lifeQuestion}</blockquote>
    </div>
    <div class="overview-section-card verdict-card">
      <div class="ov-sec-header"><span class="ov-sec-icon">⚖️</span><h3>V. 플루타르코스의 해석과 평가</h3></div>
      <p class="ov-sec-body">${ov.plutarchVerdict}</p>
    </div>
  `;
}

function renderQuotes() {
  const h = getHeroFullData(currentHero);
  let html = "";
  (h.quotes || []).forEach(q => {
    html += `<div class="card"><h3>${q.text}</h3><p style="color:#aaa;margin-top:6px;">📌 ${q.desc}</p></div>`;
  });
  document.getElementById("quotesBox").innerHTML = html;
}

function renderGallery() {
  const container = document.getElementById("gallery-container");
  if (!container) return;
  const items = heroGalleries[currentHero] || [];
  if (items.length === 0) {
    container.innerHTML = `<div style="color:#a89f91; text-align:center; grid-column:1/-1; padding:40px 0;">아직 등록된 명화 자료가 없습니다.</div>`;
    return;
  }
  container.innerHTML = items.map(item => `
    <div class="art-card">
      <div class="art-img-wrap"><img src="${item.imgUrl}" alt="${item.title}" loading="lazy" referrerpolicy="no-referrer" crossorigin="anonymous" onerror="this.onerror=null; if(!this.src.startsWith('https://wsrv.nl/?url=')){ this.src='https://wsrv.nl/?url=' + encodeURIComponent(this.src) + '&w=700'; }"></div>
      <div class="art-info">
        <h4 class="art-title">${item.title}</h4>
        <p class="art-original-title">${item.originalTitle}</p>
        <ul class="art-meta">
          <li><strong>작가:</strong> ${item.artist}</li>
          <li><strong>연대/소장:</strong> ${item.year} | ${item.museum}</li>
          <li><strong>라이선스:</strong> <span class="license-badge">${item.license}</span></li>
        </ul>
        <p class="art-desc">${item.desc}</p>
        <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link">위키미디어 출처 보기 ↗</a>
      </div>
    </div>
  `).join('');
}

function renderNetwork() {
  const h = getHeroFullData(currentHero);
  const svg = d3.select("#networkSvg");
  svg.selectAll("*").remove();

  const wrap = document.getElementById("tabNetwork");
  const rect = wrap.getBoundingClientRect();
  const width = rect.width > 50 ? rect.width : window.innerWidth;
  const height = rect.height > 50 ? rect.height : (window.innerHeight - 95);

  svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`).style("width", `${width}px`).style("height", `${height}px`);

  const isMobile = width < 768;
  const cx = width / 2;
  const cy = isMobile ? (height * 0.32) : (height / 2);
  const radius = Math.min(width, height) * (isMobile ? 0.32 : 0.35);

  const axes = {
    origins:  { x: cx, y: cy - radius, color: "#67e8f9", glow: "#22d3ee", name: "I. 혈통과 기원의 성좌", labelY: cy - radius - (isMobile ? 40 : 50) },
    labors:   { x: cx + radius, y: cy, color: "#fdba74", glow: "#fb923c", name: "II. 모험과 업적의 성좌", labelY: cy + 5 },
    politics: { x: cx, y: cy + radius, color: "#6ee7b7", glow: "#34d399", name: "III. 제도와 통치의 성좌", labelY: cy + radius + (isMobile ? 45 : 55) },
    tragedy:  { x: cx - radius, y: cy, color: "#fda4af", glow: "#f43f5e", name: "IV. 갈등과 비극의 성좌", labelY: cy + 5 }
  };

  const defs = svg.append("defs");
  const starGlow = defs.append("filter").attr("id", "star-glow").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
  starGlow.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "blur1");
  starGlow.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "blur2");
  const m = starGlow.append("feMerge");
  m.append("feMergeNode").attr("in", "blur2");
  m.append("feMergeNode").attr("in", "blur1");
  m.append("feMergeNode").attr("in", "SourceGraphic");

  const g = svg.append("g");
  const zoomBehavior = d3.zoom().scaleExtent([0.55, 2.8]).on("zoom", (e) => g.attr("transform", e.transform));
  svg.call(zoomBehavior);

  const spaceDust = g.append("g");
  for (let i = 0; i < 80; i++) {
    spaceDust.append("circle")
      .attr("cx", Math.random() * width * 1.6 - width * 0.3).attr("cy", Math.random() * height * 1.6 - height * 0.3)
      .attr("r", Math.random() * 1.2 + 0.4).attr("fill", "#ffffff").attr("opacity", Math.random() * 0.5 + 0.15);
  }

  const celestialGrid = g.append("g");
  Object.values(axes).forEach(axis => {
    celestialGrid.append("text").attr("class", "axis-constellation-title").attr("x", axis.x).attr("y", axis.labelY).attr("fill", axis.color).text(axis.name);
  });

  const nodes = JSON.parse(JSON.stringify(h.graph.nodes));
  const links = JSON.parse(JSON.stringify(h.graph.links));

  nodes.forEach(d => { if (d.axis === "center") { d.x = cx; d.y = cy; d.fx = cx; d.fy = cy; } });

  const simulation = d3.forceSimulation(nodes)
    .velocityDecay(0.8)
    .force("link", d3.forceLink(links).id(d => d.id).distance(isMobile ? 55 : 75).strength(0.7))
    .force("charge", d3.forceManyBody().strength(-20))
    .force("collide", d3.forceCollide().radius(isMobile ? 24 : 28))
    .force("x", d3.forceX(d => d.axis === "center" ? cx : axes[d.axis].x).strength(0.85))
    .force("y", d3.forceY(d => d.axis === "center" ? cy : axes[d.axis].y).strength(0.85));

  const link = g.append("g").selectAll("line").data(links).enter().append("line").attr("class", "constellation-line")
    .attr("stroke", d => {
      const targetNode = nodes.find(n => n.id === (d.target.id || d.target));
      return (targetNode && targetNode.axis !== "center" && axes[targetNode.axis]) ? axes[targetNode.axis].color : "#665243";
    });

  const linkText = g.append("g").selectAll("text").data(links).enter().append("text").attr("text-anchor", "middle").attr("fill", "#c5b59f").attr("font-size", "9px").attr("dy", -3).text(d => d.label);

  const node = g.append("g").selectAll(".star-node").data(nodes).enter().append("g").attr("class", "star-node")
    .call(d3.drag().on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.1).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); if (d.axis !== "center") { d.fx = null; d.fy = null; } }));

  function getHeroDataUri(heroKey) {
    let rawSvg = HERO_SPRITES[heroKey] || "";
    if (!rawSvg.includes("xmlns=")) rawSvg = rawSvg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(rawSvg);
  }

  node.each(function(d, index) {
    const el = d3.select(this);
    const isCenter = d.axis === "center";
    const axisColor = isCenter ? "#ffd15c" : (axes[d.axis] ? axes[d.axis].color : "#fff");
    const glowColor = isCenter ? "#f59e0b" : (axes[d.axis] ? axes[d.axis].glow : "#fff");

    el.append("circle").attr("r", isCenter ? 26 : 22).attr("fill", "transparent").attr("class", "touch-hitbox");

    if (isCenter) {
      el.append("rect").attr("width", 38).attr("height", 38).attr("x", -19).attr("y", -19).attr("rx", 6).attr("fill", "#090d1a").attr("stroke", axisColor).attr("stroke-width", 2).attr("filter", "url(#star-glow)");
      const uri = getHeroDataUri(currentHero);
      el.append("image").attr("href", uri).attr("xlink:href", uri).attr("class", "pixel-art").attr("x", -14).attr("y", -14).attr("width", 28).attr("height", 28);
    } else {
      const driftClass = `star-drift-${index % 4}`;
      const randomDelay = -(Math.random() * 4).toFixed(2) + "s";
      const randomDuration = (3.5 + Math.random() * 2).toFixed(2) + "s";
      const gStar = el.append("g").attr("class", driftClass).style("animation-delay", randomDelay).style("animation-duration", randomDuration);

      if (d.shapeType === "item") {
        gStar.append("ellipse").attr("rx", 9).attr("ry", 3.5).attr("fill", "none").attr("stroke", axisColor).attr("stroke-width", 1.2).attr("transform", "rotate(-25)").attr("opacity", 0.85);
        gStar.append("circle").attr("r", 3.5).attr("fill", "#ffffff").attr("stroke", glowColor).attr("stroke-width", 1.5).attr("filter", "url(#star-glow)");
      } else {
        gStar.append("circle").attr("r", 6).attr("fill", glowColor).attr("opacity", 0.22).attr("filter", "url(#star-glow)");
        gStar.append("path").attr("d", "M 0,-6.5 Q 0,0 6.5,0 Q 0,0 0,6.5 Q 0,0 -6.5,0 Q 0,0 0,-6.5 Z").attr("fill", "#ffffff").attr("stroke", glowColor).attr("stroke-width", 0.8).attr("filter", "url(#star-glow)");
        gStar.append("circle").attr("r", 1.4).attr("fill", "#ffffff");
      }
    }
  });

  node.append("text").attr("class", "node-text").attr("dy", d => d.axis === "center" ? 32 : 19).attr("text-anchor", "middle").text(d => d.name);

  node.on("click", (e, d) => {
    e.stopPropagation();
    link.classed("active", l => (l.source.id || l.source) === d.id || (l.target.id || l.target) === d.id);
    const ins = document.getElementById("nodeInspector");
    document.getElementById("insType").innerText = d.type;
    document.getElementById("insName").innerText = d.name;
    document.getElementById("insDesc").innerText = d.desc;
    document.getElementById("insInsight").innerText = `💡 ${d.insight}`;
    ins.classList.remove("hidden");

    if (isMobile) {
      const targetY = height * 0.26;
      const transform = d3.zoomIdentity.translate(cx - d.x, targetY - d.y);
      svg.transition().duration(350).call(zoomBehavior.transform, transform);
    }
  });

  svg.on("click", () => { document.getElementById("nodeInspector").classList.add("hidden"); link.classed("active", false); });
  document.getElementById("closeInsBtn").onclick = () => { document.getElementById("nodeInspector").classList.add("hidden"); link.classed("active", false); };

  simulation.on("tick", () => {
    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    linkText.attr("x", d => (d.source.x + d.target.x) / 2).attr("y", d => (d.source.y + d.target.y) / 2);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
}