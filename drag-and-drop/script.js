let listData = [
  { id: 1, text: "ភាសាខ្មែរ" },
  { id: 2, text: "គណិតវិទ្យា" },
  { id: 3, text: "ប្រវត្តិវិទ្យា" },
  { id: 4, text: "គីមីវិទ្យា" },
  { id: 5, text: "រូបវិទ្យា" },
  { id: 6, text: "ផែនដីវិទ្យា" },
  { id: 7, text: "ព័ត៌មានវិទ្យា" },
];

let tableData = [
  {
    id: "7-8",
    cells: [
      { id: "Monday", items: [] },
      { id: "Tuesday", items: [] },
      { id: "Wednesday", items: [] },
      { id: "Thursday", items: [] },
      { id: "Friday", items: [] },
      { id: "Saturday", items: [] },
    ],
  },
  {
    id: "8-9",
    cells: [
      { id: "Monday", items: [] },
      { id: "Tuesday", items: [] },
      { id: "Wednesday", items: [] },
      { id: "Thursday", items: [] },
      { id: "Friday", items: [] },
      { id: "Saturday", items: [] },
    ],
  },
  {
    id: "9-10",
    cells: [
      { id: "Monday", items: [] },
      { id: "Tuesday", items: [] },
      { id: "Wednesday", items: [] },
      { id: "Thursday", items: [] },
      { id: "Friday", items: [] },
      { id: "Saturday", items: [] },
    ],
  },
  {
    id: "10-11",
    cells: [
      { id: "Monday", items: [] },
      { id: "Tuesday", items: [] },
      { id: "Wednesday", items: [] },
      { id: "Thursday", items: [] },
      { id: "Friday", items: [] },
      { id: "Saturday", items: [] },
    ],
  },
];

let draggedItem = null;

const renderList = () => {
  const listContainer = document.querySelector(".draggable-list");
  listContainer.innerHTML = ""; // clear previous content
  listData.forEach((item, index) => {
    const h5 = document.createElement("h5");
    h5.className = "drag-item";
    h5.draggable = true;
    h5.innerText = item.text;
    h5.dataset.itemId = item.id;

    h5.addEventListener("dragstart", (e) => {
      draggedItem = { ...item, source: "list", listIndex: index };
      e.dataTransfer.setData("text/plain", JSON.stringify(draggedItem));
    });
    listContainer.appendChild(h5);
  });
};

const renderTable = () => {
  const tableContainer = document.querySelector("#dataTable");
  tableContainer.innerHTML = ""; // clear previous content

  const table = document.createElement("table");
  table.className =
    "table-auto w-full [&_th]:border [&_td]:border [&_td]:border-green-500 [&_th]:w-[120px] [&_td]:text-lg [&_td]:px-2 [&_td]:py-1";

  // Create header row
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  // First header for row labels
  const classnames =
    "py-2 font-bold text-white bg-green-700 border-2 border-white";
  const thRow = document.createElement("th");
  thRow.className = classnames;
  thRow.innerText = "Hour/Day";
  headerRow.appendChild(thRow);
  // Assume each row has the same number of cells
  tableData[0].cells.forEach((cell) => {
    const th = document.createElement("th");
    th.className = classnames;
    th.innerText = cell.id;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create body rows from tableData.
  const tbody = document.createElement("tbody");
  tableData.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    tr.className = "text-center";
    // Row label cell
    const tdLabel = document.createElement("td");
    tdLabel.innerText = row.id;
    tr.appendChild(tdLabel);

    row.cells.forEach((cell, cellIndex) => {
      const td = document.createElement("td");
      // Save indices as data attributes to know the drop target
      td.dataset.rowIndex = rowIndex;
      td.dataset.cellIndex = cellIndex;

      // Allow dropping by preventing default.
      td.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      // On drop, update the data models.
      td.addEventListener("drop", (e) => {
        e.preventDefault();
        const rIndex = parseInt(td.dataset.rowIndex);
        const cIndex = parseInt(td.dataset.cellIndex);
        if (draggedItem) {
          // Remove the item from its source.
          if (draggedItem.source === "list") {
            listData.splice(draggedItem.listIndex, 1);
          } else if (draggedItem.source === "table") {
            const {
              rowIndex: fromRow,
              cellIndex: fromCell,
              itemIndex,
            } = draggedItem;
            tableData[fromRow].cells[fromCell].items.splice(itemIndex, 1);
          }
          // Add the item to the destination cell.
          tableData[rIndex].cells[cIndex].items.push({
            id: draggedItem.id,
            text: draggedItem.text,
          });
          // Re-render both the list and the table.
          renderList();
          renderTable();
          draggedItem = null;
        }
      });

      // Render any items already in this cell.
      cell.items.forEach((item, itemIndex) => {
        const h5 = document.createElement("h5");
        h5.className = "drag-item";
        h5.draggable = true;
        h5.innerText = item.text;
        h5.dataset.itemId = item.id;
        // When dragging an item from a table cell, store its source location.
        h5.addEventListener("dragstart", (e) => {
          draggedItem = {
            ...item,
            source: "table",
            rowIndex: rowIndex,
            cellIndex: cellIndex,
            itemIndex: itemIndex,
          };
          e.dataTransfer.setData("text/plain", JSON.stringify(draggedItem));
        });
        // double click to remove from table
        h5.addEventListener("dblclick", removeFromTable);
        td.appendChild(h5);
      });

      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableContainer.appendChild(table);
};

// Initial render
renderList();
renderTable();

// gatherTableData to a button click if needed.
const gatherTableData = () => {
  console.log(JSON.stringify(tableData, null, 2));
};
document
  .querySelector("#gatherDataButton")
  ?.addEventListener("click", gatherTableData);

// Remove from table and put back into list
const removeFromTable = (e) => {
  const rIndex = parseInt(e.target.parentElement.dataset.rowIndex);
  const cIndex = parseInt(e.target.parentElement.dataset.cellIndex);
  // remove from tableData
  tableData[rIndex].cells[cIndex].items = [];
  // add value back to list
  listData.push({
    id: e.target.parentElement.dataset.itemId,
    text: e.target.parentElement.innerText,
  });
  renderList();
  renderTable();
};
