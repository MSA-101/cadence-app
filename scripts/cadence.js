import { initialBlocks } from "../data/blocks.js";

const blockForm = document.querySelector("#block-form");

blockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#task-title").value;
  const day = document.querySelector("#task-day").value;
  const time = document.querySelector("#task-time").value;

  const newBlock = {
    title,
    day,
    time
  }

  initialBlocks.push(newBlock);
  renderBlocks();
  blockForm.reset();
  
});


function renderBlocks() { 
const dayColumns = document.querySelectorAll(".day-column");

dayColumns.forEach((column) => {
  const container  = column.querySelector(".blocks-container");
  container.innerHTML = "";
})

initialBlocks.forEach((block) => {
  dayColumns.forEach((column) => {
  const dayHeader = column.querySelector(".day-header").textContent;
  if (dayHeader === block.day) {
    const container = column.querySelector(".blocks-container");
    container.innerHTML += `
      <div class="block-container">
        <strong>${block.time}</strong>
        <p>${block.title}</p>
      </div>
    `;
  }
  });
});

}

renderBlocks();
