// STATE VARIABLES-------------------------
let listData = [
  { id: 1, text: "ល. ក ភាសាខ្មែរ" },
  { id: 2, text: "ល. ខ គណិតវិទ្យា" },
  { id: 3, text: "ល. គ ប្រវត្តិវិទ្យា" },
  { id: 4, text: "ល. ឃ គីមីវិទ្យា" },
  { id: 5, text: "ល. ង រូបវិទ្យា" },
  { id: 6, text: "ល. ច ផែនដីវិទ្យា" },
  { id: 7, text: "ល. ឆ ព័ត៌មានវិទ្យា" },
  { id: 8, text: "ល. ជ ពលរដ្ឋវិទ្យា" },
  { id: 9, text: "ល. ឈ ភូមិវិទ្យា" },
  { id: 10, text: "ល. ញ ជីវវិទ្យា" },
  { id: 11, text: "ល. ក ភាសាខ្មែរ" },
  { id: 12, text: "ល. ខ គណិតវិទ្យា" },
  { id: 13, text: "ល. គ ប្រវត្តិវិទ្យា" },
  { id: 14, text: "ល. ឃ គីមីវិទ្យា" },
  { id: 15, text: "ល. ង រូបវិទ្យា" },
  { id: 16, text: "ល. ច ផែនដីវិទ្យា" },
  { id: 17, text: "ល. ឆ ព័ត៌មានវិទ្យា" },
  { id: 18, text: "ល. ជ ពលរដ្ឋវិទ្យា" },
  { id: 19, text: "ល. ឈ ភូមិវិទ្យា" },
  { id: 20, text: "ល. ញ ជីវវិទ្យា" },
  { id: 21, text: "ល. ក ភាសាខ្មែរ" },
  { id: 22, text: "ល. ខ គណិតវិទ្យា" },
  { id: 23, text: "ល. គ ប្រវត្តិវិទ្យា" },
  { id: 24, text: "ល. ឃ គីមីវិទ្យា" },
  { id: 25, text: "ល. ង រូបវិទ្យា" },
  { id: 26, text: "ល. ច ផែនដីវិទ្យា" },
  { id: 27, text: "ល. ឆ ព័ត៌មានវិទ្យា" },
  { id: 28, text: "ល. ជ ពលរដ្ឋវិទ្យា" },
  { id: 29, text: "ល. ឈ ភូមិវិទ្យា" },
  { id: 30, text: "ល. ញ ជីវវិទ្យា" },
  { id: 31, text: "ល. ក ភាសាខ្មែរ" },
  { id: 32, text: "ល. ខ គណិតវិទ្យា" },
  { id: 33, text: "ល. គ ប្រវត្តិវិទ្យា" },
  { id: 34, text: "ល. ឃ គីមីវិទ្យា" },
  { id: 35, text: "ល. ង រូបវិទ្យា" },
  { id: 36, text: "ល. ច ផែនដីវិទ្យា" },
  { id: 37, text: "ល. ឆ ព័ត៌មានវិទ្យា" },
  { id: 38, text: "ល. ជ ពលរដ្ឋវិទ្យា" },
  { id: 39, text: "ល. ឈ ភូមិវិទ្យា" },
  { id: 40, text: "ល. ញ ជីវវិទ្យា" },
];
let allGroups = ["ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បត្ត៍", "សុក្រ", "សៅរ៍"];
let allColumns = [
  "7-8",
  "8-9",
  "9-10",
  "10-11",
  "11-12",
  "12-13",
  "13-14",
  "14-15",
  "15-16",
  "16-17",
];
let allRows = [
  "7A",
  "7B",
  "8A",
  "8B",
  "9A",
  "9B",
  "10A",
  "10B",
  "11A",
  "11B",
  "12A",
  "12B",
];
let allowMultipleValueInOneCell = false;

// Generate table data with groups,
// making sure each day gets its own fresh subjects array.
const generateTableDataWithGroups = () => {
  let tableData = [];
  allRows.forEach((row) => {
    let rowData = { id: row, days: [] };
    allGroups.forEach((group) => {
      // Create a fresh subjects array for each day.
      let subjects = allColumns.map((column) => ({
        id: column,
        subject: null,
      }));
      rowData.days.push({ id: group, subjects: subjects });
    });
    tableData.push(rowData);
  });
  return tableData;
};

let tableData = generateTableDataWithGroups();

// Global variable to hold the currently dragged item.
let draggedItem = null;

// Render the draggable list.
const renderList = () => {
  const listContainer = document.querySelector(".draggable-list");
  listContainer.innerHTML = "";
  listData.forEach((item, index) => {
    const h5 = document.createElement("h5");
    h5.className = "cursor-grab";
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

// Render the table with cells corresponding to each row, group, and column.
const renderTable = () => {
  const tableContainer = document.querySelector("#dataTable");
  tableContainer.innerHTML = "";
  const table = document.createElement("table");
  table.className =
    "table-fixed [&_th]:border [&_td]:border [&_td]:border-green-500 [&_th]:min-w-[30px] md:[&_th]:min-w-[60px] [&_td]:text-lg [&_td]:px-2 [&_td]:py-1";

  // Create table header.
  const thead = document.createElement("thead");
  // First header row: group names.
  const headerRow1 = document.createElement("tr");
  headerRow1.innerHTML = `<th rowspan="2">ថ្នាក់/ថ្ងៃ</th>`;
  allGroups.forEach((group, idx) => {
    headerRow1.innerHTML += `<th colspan="${
      allColumns.length
    }" class="bg-black sticky top-0 left-0 text-green-500 py-1 z-[${
      (idx + 1) * 10
    }] before:absolute before:content-[''] before:z-1 before:inset-[0] before:border before:border-white/50">${group}</th>`;
  });
  // Second header row: columns.
  const headerRow2 = document.createElement("tr");
  allGroups.forEach(() => {
    allColumns.forEach((col) => {
      headerRow2.innerHTML += `<th>${col}</th>`;
    });
  });
  thead.appendChild(headerRow1);
  thead.appendChild(headerRow2);
  table.appendChild(thead);

  // Create table body.
  const tbody = document.createElement("tbody");
  tableData.forEach((row, classIndex) => {
    const tr = document.createElement("tr");
    tr.className = "text-center";
    // Row label cell.
    const tdLabel = document.createElement("td");
    tdLabel.innerText = row.id;
    tdLabel.className =
      "sticky top-0 left-0 z-20 isolate before:absolute before:content-[''] before:z-1 before:inset-[0] before:border before:border-green-500/30 bg-black";
    tr.appendChild(tdLabel);

    // For each group (day).
    row.days.forEach((day, dayIndex) => {
      // For each column (subject cell) in this group.
      day.subjects.forEach((cell, subjectIndex) => {
        const td = document.createElement("td");
        td.dataset.classIndex = classIndex;
        td.dataset.dayIndex = dayIndex;
        td.dataset.subjectIndex = subjectIndex;

        // Allow drop only if cell is empty and not existed in other classes
        td.addEventListener("dragover", (e) => {
          // Only allow dropping if either multiple values are allowed or the cell is empty.
          if (!(allowMultipleValueInOneCell || cell.subject == null)) {
            return;
          }

          // If dragging an item from the table with shift key pressed,
          // perform duplicate check across all other rows at the same day and subject index.
          if (draggedItem && draggedItem.source === "table" && e.shiftKey) {
            const currentClassIndex = parseInt(td.dataset.classIndex);
            const currentDayIndex = parseInt(td.dataset.dayIndex);
            const currentSubjectIndex = parseInt(td.dataset.subjectIndex);

            // If a duplicate is found, do not allow dropping.
            if (
              isDuplicateFound(
                currentClassIndex,
                currentDayIndex,
                currentSubjectIndex
              )
            ) {
              td.classList.remove("bg-green-500/30");
              return;
            }
          }

          // If everything is ok, allow the drop.
          e.preventDefault();
          td.classList.add("bg-green-500/30");
        });

        td.addEventListener("dragleave", (e) => {
          td.classList.remove("bg-green-500/30");
        });

        // On drop, update the cell with the dragged data.
        td.addEventListener("drop", (e) => {
          e.preventDefault();
          const classIndex = parseInt(td.dataset.classIndex);
          const dayIndex = parseInt(td.dataset.dayIndex);
          const subjectIndex = parseInt(td.dataset.subjectIndex);

          if (draggedItem) {
            // Remove the dragged item from its previous location.
            if (draggedItem.source === "list") {
              listData.splice(draggedItem.listIndex, 1);
            } else if (draggedItem.source === "table") {
              // if shift key is not pressed, change pos in table,
              // else duplicate item
              if (!e.shiftKey) {
                const { classIdx, dayIdx, subjectIdx } = draggedItem;
                tableData[classIdx].days[dayIdx].subjects[subjectIdx].subject =
                  null;
              } else {
                // Check if the same subject (by id) is already present in any other class (row)
                // at the same day (group) and subject column (subjectIndex)
                if (isDuplicateFound(classIndex, dayIndex, subjectIndex)) {
                  alert(
                    "A teacher cannot teach 2 different classes at the same time."
                  );
                  return; // exit without adding the duplicate
                }
              }
            }
            // Add the dragged item to the destination cell.
            tableData[classIndex].days[dayIndex].subjects[
              subjectIndex
            ].subject = {
              id: draggedItem.id,
              text: draggedItem.text,
            };

            // Re-render the list and table.
            renderList();
            renderTable();
            draggedItem = null;
          }
        });

        // If a subject exists in this cell, render it.
        if (cell.subject != null) {
          const h5 = document.createElement("h5");
          h5.className = "drag-item";
          h5.draggable = true;
          h5.innerText = cell.subject.text;
          h5.dataset.itemId = cell.subject.id;
          // When dragging an item from the table, store its location and data.
          h5.addEventListener("dragstart", (e) => {
            draggedItem = {
              source: "table",
              classIdx: classIndex,
              dayIdx: dayIndex,
              subjectIdx: subjectIndex,
              id: cell.subject.id,
              text: cell.subject.text,
            };
            e.dataTransfer.setData("text/plain", JSON.stringify(draggedItem));
          });
          // Double-click to remove the item from the cell and put it back to the list.
          h5.addEventListener("dblclick", (e) => {
            tableData[classIndex].days[dayIndex].subjects[
              subjectIndex
            ].subject = null;
            listData.push({
              id: e.target.dataset.itemId,
              text: e.target.innerText,
            });
            renderList();
            renderTable();
          });
          td.appendChild(h5);
        }

        tr.appendChild(td);
      });
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableContainer.appendChild(table);
};

renderList();
renderTable();

// Gather table data (for example, to display in a <pre> block).
const gatherTableData = () => {
  const result = document.querySelector("#result");
  result.innerText = JSON.stringify(tableData, null, 2);
};
document
  .querySelector("#gatherDataButton")
  ?.addEventListener("click", gatherTableData);

// check if duplicate exists in other class at same (day & subject) index
const isDuplicateFound = (cIdx, dIdx, sIdx) => {
  let duplicateFound = false;
  tableData.forEach((row, idx) => {
    if (idx !== cIdx) {
      if (
        row.days[dIdx] &&
        row.days[dIdx].subjects[sIdx].subject &&
        row.days[dIdx].subjects[sIdx].subject.id === draggedItem.id
      ) {
        duplicateFound = true;
      }
    }
  });
  return duplicateFound;
};
