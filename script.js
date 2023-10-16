const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// selecting DOM elements
const formElm = document.querySelector(".fact-form");
const btnOpenElm = document.querySelector(".btn-open");
const factListElm = document.querySelector(".fact-list");
const categoryElm = document.querySelector(".drop-down-option");
const sideMenuElm = document.querySelector(".side-menu");

// toggle form visibility
btnOpenElm.addEventListener("click", () => {
  console.log("i clicked you");
  // open / close form
  formElm.classList.toggle("hidden");

  //change the button text while form open / close
  formElm.classList.contains("hidden")
    ? (btnOpenElm.textContent = "share a fact")
    : (btnOpenElm.textContent = "close");
});

// form select option (drop-down)
categoryElm.innerHTML = `<option value=""> -- choose category -- </option>`;
sideMenuElm.innerHTML = `<li class="category">
<button class="btn btn-all-categories">All</button>
</li>`;

CATEGORIES.forEach((item) => {
  categoryElm.innerHTML += `<option value=${item.name}>${item.name}</option>`;
  sideMenuElm.innerHTML += `<li class="category">
<button class="btn btn-category" style="background: ${item.color}">${item.name}</button>
</li>`;
});

// render facts in list
factListElm.textContent = "";

// function to create facts list
const createFactsList = (dataArray) => {
  const htmlArr = dataArray.map(
    (fact) =>
      `<li class="fact">
      <p>
        ${fact.text}
        <a
          href=${fact.source}
          target="_blank"
          class="source"
          >(Source)</a
        >
      </p>
      <span class="tag" style="background: ${
        CATEGORIES.find((item) => item.name === fact.category).color
      }">${fact.category}</span>
      <div class="vote-buttons">
        <button>👍 ${fact.votesInteresting}</button>
        <button>🤯 ${fact.votesMindblowing}</button>
        <button>👎 ${fact.votesFalse}</button>
      </div>
    </li>`
  );

  const html = htmlArr.join("");
  factListElm.insertAdjacentHTML("afterbegin", html);
};

// calling and invoking function
createFactsList(initialFacts);

// fetching data from supabase
const loadFacts = async () => {
  const res = await fetch(
    "https://iwhjdhhvxtcqjtvqxjfx.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aGpkaGh2eHRjcWp0dnF4amZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODAyNDIsImV4cCI6MjAxMjk1NjI0Mn0.YEcgZGo9unvMoRYievSIwuBG_tgMgGQTpg8jxR24HVo",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aGpkaGh2eHRjcWp0dnF4amZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODAyNDIsImV4cCI6MjAxMjk1NjI0Mn0.YEcgZGo9unvMoRYievSIwuBG_tgMgGQTpg8jxR24HVo",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
};

loadFacts();
