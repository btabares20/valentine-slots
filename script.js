const reasons = [
  { sentence: "Being with you feels like home in the best possible way.", explanation: "I always feel safe with you" },
  { sentence: "You make even the quietest days feel warm and special.", explanation: "Doing nothing with you is not boring!" },
  { sentence: "You are the safest and happiest place I've ever known.", explanation: "Your love surrounds me with peace and happiness." },
  { sentence: "I love your laugh! it brightens my day instantly.", explanation: "Hearing you laugh is my favorite sound in the world." },
  { sentence: "You are funny as fuuuuuuuuuuuuh!", explanation: "Lagi akong tawa nang tawa kapag kasama ka" },
  { sentence: "Your hugs make all my worries disappear.", explanation: "I dunno, kapag yakap mo ko parang ang gaan gaan ng lahat" },
  { sentence: "The way you care about people is beautiful.", explanation: "You have your own way of caring, and I love that!!!!" },
  { sentence: "Your voice soothes me no matter what is happening.", explanation: "Kung ikaw napapatulog ko sa boses ko, ako diiiin" },
  { sentence: "You are my partner in crime and my greatest ally.", explanation: "Yung pakiramdam na parang walang makakapigil saten" },
  { sentence: "Your courage inspires me to be better.", explanation: "Idol kita e, isa ka sa mga pinakamatapang at malakas na taong kilala ko" },
  { sentence: "You make me laugh like no one else can.", explanation: "Your humor fills my life with joy and light." },
  { sentence: "Your love makes everything better.", explanation: "I wanted to live longer because of you hehe, cheesyyyyy" },
  { sentence: "I love the way you believe in me even when I doubt myself.", explanation: "You believe in me, big deal saken yon!" },
  { sentence: "You are sweet in your own way!", explanation: "You have your own way sa pagiging sweet, at kinikilig ako don kasi feeling ko ang special ko" }
];

let lastSpins = [];

function splitIntoThree(text) {
  const words = text.split(" ");
  const third = Math.ceil(words.length / 3);
  return [
    words.slice(0, third).join(" "),
    words.slice(third, third*2).join(" "),
    words.slice(third*2).join(" ")
  ];
}

function pickReason() {
  let index;
  do {
    index = Math.floor(Math.random() * reasons.length);
  } while (lastSpins.includes(index) && lastSpins.length < reasons.length);
  lastSpins.push(index);
  if(lastSpins.length > 5) lastSpins.shift();
  return reasons[index];
}

function randomSnippet() {
  const r = reasons[Math.floor(Math.random() * reasons.length)].sentence;
  return r.split(" ").slice(0,3).join(" ") + "...";
}

function spin() {
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  const btn = document.getElementById("spinBtn");

  btn.disabled = true;

  const chosen = pickReason();
  const parts = splitIntoThree(chosen.sentence);

  // Start spinning
  [reel1, reel2, reel3].forEach(r=>r.classList.add("spinning"));
  const spin1 = setInterval(()=>reel1.textContent=randomSnippet(),120);
  const spin2 = setInterval(()=>reel2.textContent=randomSnippet(),120);
  const spin3 = setInterval(()=>reel3.textContent=randomSnippet(),120);

  setTimeout(()=>{
    clearInterval(spin1);
    reel1.classList.remove("spinning");
    reel1.textContent=parts[0];
    reel1.classList.add("settle");
    setTimeout(()=>reel1.classList.remove("settle"),120);
  },1800);

  setTimeout(()=>{
    clearInterval(spin2);
    reel2.classList.remove("spinning");
    reel2.textContent=parts[1];
    reel2.classList.add("settle");
    setTimeout(()=>reel2.classList.remove("settle"),120);
  },2200);

  setTimeout(()=>{
    clearInterval(spin3);
    reel3.classList.remove("spinning");
    reel3.textContent=parts[2];
    reel3.classList.add("settle");
    setTimeout(()=>reel3.classList.remove("settle"),120);

      setTimeout(()=>{
          showModal(chosen.sentence, chosen.explanation);
          btn.disabled=false;
      }, 400);
  },2600);
}

function showModal(sentence, explanation) {
  const overlay = document.getElementById("modalOverlay");
  const modalReason = document.getElementById("modalReason");
  const modalExplanation = document.getElementById("modalExplanation");
  modalReason.textContent = sentence;
  modalExplanation.textContent = explanation;
  overlay.style.display = "flex";

  for(let i=0;i<8;i++){
    const heart = document.createElement("div");
    heart.className="heart";
    heart.style.left = (Math.random()*80+10)+"%";
    heart.style.fontSize = (Math.random()*12+16)+"px";
    heart.textContent="❤️";
    overlay.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
  }
}
function addToHistory(sentence) {
  const historyList = document.getElementById("historyList");
  const historyPanel = document.getElementById("historyPanel");

  const item = document.createElement("div");
  item.className = "history-item";
  item.textContent = sentence;
  historyList.prepend(item); // latest on top

  const machine = document.querySelector(".machine");
  const bubble = document.createElement("div");
  bubble.className = "floating-bubble";
  bubble.textContent = sentence.split(" ").slice(0,4).join(" ") + "...";
  bubble.style.left = Math.random() * 60 + 10 + "%"; // random x
  bubble.style.top = Math.random() * 50 + 40 + "%"; // random y
  machine.appendChild(bubble);
  setTimeout(() => bubble.remove(), 3000);

historyToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling
    historyPanel.classList.add("active");
});

historyPanel.addEventListener("click", () => {
    historyPanel.classList.remove("active");
});
}

function showModal(sentence, explanation) {
  const overlay = document.getElementById("modalOverlay");
  const modalReason = document.getElementById("modalReason");
  const modalExplanation = document.getElementById("modalExplanation");
  modalReason.textContent = sentence;
  modalExplanation.textContent = explanation;
  overlay.style.display = "flex";

  addToHistory(sentence); // ← Track reason here

  // floating hearts
  for(let i=0;i<8;i++){
    const heart = document.createElement("div");
    heart.className="heart";
    heart.style.left = (Math.random()*80+10)+"%";
    heart.style.fontSize = (Math.random()*12+16)+"px";
    heart.textContent="❤️";
    overlay.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
  }
}

document.getElementById("historyToggle").addEventListener("click", ()=>{
  const panel = document.getElementById("historyPanel");
  panel.classList.toggle("active");
});
document.getElementById("modalOverlay").addEventListener("click",(e)=>{
  if(e.target.id==="modalOverlay") e.target.style.display="none";
});
