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
  "7C",
  "8A",
  "8B",
  "8C",
  "9A",
  "9B",
  "9C",
  "10A",
  "10B",
  "11A",
  "11B",
  "12A",
  "12B",
  "12C",
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
    h5.className = "cursor-grab h-fit";
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
  const tableContainer = document.querySelector("#mainTableContainer");
  tableContainer.innerHTML = "";
  const table = document.createElement("table");
  table.className = `min-w-[800px] table-auto border-collapse [&_th]:border [&_td]:border [&_td]:border-green-500 [&_th]:min-w-[30px] md:[&_th]:min-w-[30px] lg:[&_th]:min-w-[3vw] xl:[&_th]:min-w-[3.8vw] [&_td]:text-lg [&_td]:px-2 [&_td]:py-1 [&_td:has(h5)_h5]:text-sm [&_td:has(h5)_h5]:text-center [&_td:has(h5)_h5]:text-green-500 [&_td:has(h5)_h5]:cursor-grab`;

  // Create table header.
  const thead = document.createElement("thead");
  thead.className = `sticky top-0 z-[99]`;
  // First header row: group names.
  const headerRow1 = document.createElement("tr");
  headerRow1.innerHTML = `<th class="text-green-500 dark:bg-black bg-white border border-black dark:border-green-500 select-none sticky top-0 left-0 z-[999] isolate before:absolute before:content-[''] before:z-1 before:inset-[0] before:border before:border-black dark:before:border-green-500 dark:text-white" rowspan="2">ថ្នាក់/ថ្ងៃ</th>`;
  allGroups.forEach((group, idx) => {
    headerRow1.innerHTML += `<th colspan="${
      allColumns.length
    }" class="bg-white dark:bg-black sticky top-0 left-0 text-green-500 py-2 z-[${
      (idx + 1) * 10
    }] before:absolute before:content-[''] before:z-1 before:-inset-[.3px] before:border before:border-black dark:before:border-green-500 select-none">${group}</th>`;
  });
  // Second header row: columns.
  const headerRow2 = document.createElement("tr");
  allGroups.forEach(() => {
    allColumns.forEach((col) => {
      headerRow2.innerHTML += `<th class="text-sm sm:-rotate-[65deg] md:rotate-0 border border-black dark:border-green-500 py-4 select-none sticky left-0 z-[99] isolate before:absolute before:content-[''] before:z-1 before:inset-[0] before:border before:border-black dark:before:border-green-500 dark:text-white bg-white dark:bg-black">${col}</th>`;
    });
  });
  thead.appendChild(headerRow1);
  thead.appendChild(headerRow2);
  table.appendChild(thead);

  // Create table body.
  const tbody = document.createElement("tbody");
  tableData.forEach((row, classIndex) => {
    const tr = document.createElement("tr");
    tr.className = "text-center h-[3.2rem] select-none";
    // Row label cell.
    const tdLabel = document.createElement("td");
    tdLabel.innerText = row.id;
    tdLabel.className =
      "sticky top-0 left-0 z-20 isolate before:absolute before:content-[''] before:z-1 before:inset-[0] before:border before:border-green-500/30 dark:bg-black bg-white text-black dark:text-white";
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
          if (!(allowMultipleValueInOneCell || cell.subject == null)) {
            return;
          }
          const currentDayIndex = parseInt(td.dataset.dayIndex);
          const currentSubjectIndex = parseInt(td.dataset.subjectIndex);
          if (draggedItem && draggedItem.source === "table" && e.shiftKey) {
            // Check duplicate across ALL rows (including same class)
            if (isDuplicateFound(currentDayIndex, currentSubjectIndex)) {
              td.classList.remove("bg-green-500/30");
              return;
            }
          } else if (draggedItem && draggedItem.source === "table") {
            if (
              hasMoreThanOneID(
                parseInt(td.dataset.classIndex),
                parseInt(td.dataset.dayIndex),
                currentSubjectIndex
              )
            ) {
              td.classList.remove("bg-green-500/30");
              return;
            }
          }
          e.preventDefault();
          td.classList.add("bg-green-500/30");
        });

        // remove bg-green-500/30 when drag over
        td.addEventListener("dragleave", (e) => {
          td.classList.remove("bg-green-500/30");
        });

        // On drop, update the cell with the dragged data.
        td.addEventListener("drop", (e) => {
          e.preventDefault();
          const classIndex = parseInt(td.dataset.classIndex);
          const dayIndex = parseInt(td.dataset.dayIndex);
          const subjectIndex = parseInt(td.dataset.subjectIndex);

          if (draggedItem && draggedItem.source === "list") {
            listData.splice(draggedItem.listIndex, 1);
          } else if (draggedItem && draggedItem.source === "table") {
            if (!e.shiftKey) {
              // Move: Remove from original cell before adding
              const { classIdx, dayIdx, subjectIdx } = draggedItem;
              tableData[classIdx].days[dayIdx].subjects[subjectIdx].subject =
                null;
            } else {
              // Duplicate: check for any duplicate on the same day and subject slot across ALL rows
              if (isDuplicateFound(dayIndex, subjectIndex)) {
                alert(
                  "A teacher cannot teach 2 different classes at the same time."
                );
                return; // exit without adding the duplicate
              }
            }
          }
          tableData[classIndex].days[dayIndex].subjects[subjectIndex].subject =
            {
              id: draggedItem.id,
              text: draggedItem.text,
            };

          renderList();
          renderTable();
          draggedItem = null;
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
            // Remove subject from the current cell.
            tableData[classIndex].days[dayIndex].subjects[
              subjectIndex
            ].subject = null;
            // Convert the subject id to number for proper comparison.
            const currentSubjectId = parseInt(e.target.dataset.itemId, 10);
            // Only add back to the list if no duplicate is found.
            if (!isDuplicateExists(currentSubjectId)) {
              listData.push({
                id: currentSubjectId,
                text: e.target.innerText,
              });
            }
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

const elementToScroll = document.querySelector("#mainTableContainer");
document.querySelector("#leftButton")?.addEventListener("click", scrollToLeft);
document
  .querySelector("#rightButton")
  ?.addEventListener("click", scrollToRight);

function scrollToLeft(e) {
  // for mobile view, decrement scrollLeft 100
  if (window.innerWidth < 768) {
    elementToScroll.scrollLeft -= 300;
    return;
  }
  // for tablet view, decrement scrollleft 300
  if (window.innerWidth >= 768 && window.innerWidth < 1416) {
    elementToScroll.scrollLeft -= 300;
    return;
    // for desktop view, decrement scrollLeft 500
  }

  if (window.innerWidth >= 1416) {
    elementToScroll.scrollLeft -= 720;
  }
}

function scrollToRight(e) {
  // for mobile view, increment scrollLeft 100
  if (window.innerWidth < 768) {
    elementToScroll.scrollLeft += 300;
    return;
  }
  // for tablet view, increment scrollleft 300
  if (window.innerWidth >= 768 && window.innerWidth < 1416) {
    elementToScroll.scrollLeft += 300;
    return;
    // for desktop view, increment scrollLeft 500
  }
  if (window.innerWidth >= 1416) {
    elementToScroll.scrollLeft += 720;
  }
}

// check if duplicate exists in other class at same (day & subject) index
const isDuplicateFound = (dIdx, sIdx) => {
  return tableData.some((row) => {
    return (
      row.days[dIdx] &&
      row.days[dIdx].subjects[sIdx].subject &&
      row.days[dIdx].subjects[sIdx].subject.id === draggedItem.id
    );
  });
};

// check if the id exists in other class at same (day & subject) index more than once
const hasMoreThanOneID = (cIdx, dIdx, sIdx) => {
  let hasMoreThanOne = false;
  let counter = 0;
  tableData.forEach((row, idx) => {
    if (idx !== cIdx) {
      if (
        row.days[dIdx] &&
        row.days[dIdx].subjects[sIdx].subject &&
        row.days[dIdx].subjects[sIdx].subject.id === draggedItem.id
      ) {
        counter++;
      }
    }
  });
  if (counter > 1) {
    hasMoreThanOne = true;
  }
  return hasMoreThanOne;
};

// check if duplicate exists in the table
const isDuplicateExists = (id) => {
  let result = false;
  tableData.forEach((row) => {
    row.days.forEach((day) => {
      day.subjects.forEach((cell) => {
        if (cell.subject && cell.subject.id === id) {
          result = true;
        }
      });
    });
  });
  return result;
};
