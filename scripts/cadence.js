import { initialBlocks } from "../data/blocks.js";

function renderBlocks() {
  document.querySelectorAll('.day-column').forEach((dayColumn) => {
    const dayHeader = dayColumn.querySelector('.day-header').textContent;
    if (dayHeader) {
      dayHeader === block.day
      .block-container += `
      <div class="block-container">
        <strong>${block.time}</strong>
        <p>${block.title}</p>
      </div>
      `;
    }
  });
}

renderBlocks();
