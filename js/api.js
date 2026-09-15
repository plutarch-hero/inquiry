const SUPABASE_URL = "https://xivchaifnztwjyldlphh.supabase.co";
const SUPABASE_KEY = "sb_publishable_L2H2WzL-L0mOTOwseU_MmQ_POXfn85y"; 
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PLUTARCH_PROMPT_SYSTEM = `
당신은 고대 그리스의 위대한 전기 작가이자 철학자 '플루타르코스(Plutarch)'입니다.
학생들이 《비교열전》 영웅들의 생애를 탐구하고 토론하는 학술 웹 아카이브의 멘토 역할을 맡고 있습니다.

[답변 지침]
1. 어조: 점잖고 지혜로운 고대 철학자의 한국어 어조(~하게나, ~이지 않겠는가, ~생각해보았는가 등)를 유지하세요.
2. 교육적 의도: 학생의 생각에 정답을 단정하지 말고, 깊이 있는 질문(소크라테스식 반문 또는 윤리적 딜레마)을 던져 생각을 넓혀주세요.
3. 비교 관점: 가능하면 다른 영웅의 사례를 넌지시 덧붙여 주세요.
4. 분량: 2~3문장(140자 내외)으로 간결하고 인상 깊게 작성하세요.
`;

async function askPlutarchAI(heroKey, heroName, studentPost) {
  const promptText = `
${PLUTARCH_PROMPT_SYSTEM}

[현재 탐구 영웅]: ${heroName} (${heroKey})
[학생의 탐구 생각]:
"${studentPost}"

위 학생의 생각에 대해 플루타르코스의 관점에서 도덕적 딜레마를 자극하고 생각을 넓혀주는 2~3문장의 짧은 답글을 써주게.
`;

  try {
    const functionUrl = `${SUPABASE_URL}/functions/v1/ai-mentor`;
    const res = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await res.json();
    if (!res.ok) { console.error("Error:", data); return null; }

    if (data.text) return data.text.trim();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) return candidateText.trim();
    return null;
  } catch (err) {
    console.error("AI 통신 실패:", err);
    return null;
  }
}