import { initialBlocks } from "../data/blocks.js";

const savedData = localStorage.getItem("cadenceBlocks");

let blocks = savedData ? JSON.parse(savedData) : initialBlocks;

function saveBlockToStorage(blocksArray) {
  localStorage.setItem("cadenceBlocks", JSON.stringify(blocksArray));
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const blockForm = document.querySelector("#block-form");

blockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = capitalizeWords(document.querySelector("#task-title").value);
  const day = document.querySelector("#task-day").value;
  const time = document.querySelector("#task-time").value.toUpperCase();  

  const newBlock = {
    id: Date.now(),
    title,
    day,
    time,
    completed: false
  }

  blocks.push(newBlock);
  saveBlockToStorage(blocks);
  renderBlocks();
  blockForm.reset();
  
});

const plannerGrid = document.querySelector("#planner-grid");

plannerGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const blockId = Number(event.target.dataset.id);
    blocks = blocks.filter((block) => block.id !== blockId);
    saveBlockToStorage(blocks);
    renderBlocks();
  }

if (event.target.classList.contains("complete-btn")) {
    const blockId = Number(event.target.dataset.id);
    
    blocks = blocks.map((block) => {
      if (block.id === blockId) {
        return { ...block, completed: !block.completed };
      }
      return block;
    });

    saveBlockToStorage(blocks);
    renderBlocks();
  }
});


function renderBlocks() { 
const dayColumns = document.querySelectorAll(".day-column");

dayColumns.forEach((column) => {
  const container  = column.querySelector(".blocks-container");
  container.innerHTML = "";
})

blocks.forEach((block) => {
  dayColumns.forEach((column) => {
  const dayHeader = column.querySelector(".day-header").textContent;
  if (dayHeader === block.day) {
    const container = column.querySelector(".blocks-container");
    container.innerHTML += `
      <div class="block-container ${block.completed ? "completed" : ""}">
        <strong>${block.time}</strong>
        <p>${block.title}</p>
        <div class="block-actions">
          <button class="complete-btn" data-id="${block.id}">✓</button>
          <button class="delete-btn" data-id="${block.id}">delete</button>
        </div>
      </div>
    `;
  }
  });
});

}

renderBlocks();
