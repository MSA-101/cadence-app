import { initialBlocks } from "../data/blocks.js";

const savedData = localStorage.getItem("cadenceBlocks");
let blocks = savedData ? JSON.parse(savedData) : initialBlocks;

function saveBlocksToStorage(blocksArray) {
  localStorage.setItem("cadenceBlocks", JSON.stringify(blocksArray));
}

const blockForm = document.querySelector("#block-form");

blockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#task-title").value;
  const day = document.querySelector("#task-day").value;
  const time = document.querySelector("#task-time").value;  

  const newBlock = {
    id: Date.now(),
    title,
    day,
    time
  }

  blocks.push(newBlock);
  saveBlocksToStorage(blocks);
  renderBlocks();
  blockForm.reset();
  
});

const plannerGrid = document.querySelector("#planner-grid");

plannerGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const blockId = Number(event.target.dataset.id);
    blocks = blocks.filter((block) => block.id !== blockId);

    saveBlocksToStorage(blocks);
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
      <div class="block-container">
        <strong>${block.time}</strong>
        <p>${block.title}</p>
        <button class="delete-btn" data-id="${block.id}">delete</button>
      </div>
    `;
  }
  });
});

}

renderBlocks();
