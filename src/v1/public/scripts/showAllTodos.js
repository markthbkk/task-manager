const editTodos = document.querySelectorAll('.edit-todo');
const openButtons = document.querySelectorAll('.open-btn');
const completeButtons = document.querySelectorAll('.complete-btn');
const closeButtons = document.querySelectorAll('.close-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');
const customersButton = document.querySelector('.customers-btn');
const displaySelect = document.querySelector('.display-select');
const addTodoButton = document.querySelector('.add-todo-btn');

const completedTodoStatusIndicatorDIVs = document.querySelectorAll(
  "[data-status='Completed']"
);
const closedTodoStatusIndicatorDIVs = document.querySelectorAll(
  "[data-status='Closed']"
);

function getDocumentIDFromDOMElement(selectedElement) {
  const topLevelOfThisTodo = selectedElement.closest('.todo-item-summary');

  const documentID =
    topLevelOfThisTodo.lastElementChild.lastElementChild.innerText;
  return documentID;
}

function getStatusIndicator(selectedElement) {
  const topLevelOfThisTodo = selectedElement.closest('.todo-item-summary');
  const statusIndicator = topLevelOfThisTodo.childNodes[1].childNodes[1];
  return statusIndicator;
}

function redirectToSingleTodo(editTodo) {
  editTodo.addEventListener('click', (e) => {
    e.preventDefault();

    let docID = getDocumentIDFromDOMElement(editTodo);

    window.location.href = `/api/v1/todos/${docID}`;
  });
}

function markItemOpen(openButton) {
  openButton.addEventListener('click', (e) => {
    e.preventDefault();
    const statusIndicatorDiv = getStatusIndicator(openButton);
    statusIndicatorDiv.className = 'item-ctrl status-indicator item-open';
    let docID = getDocumentIDFromDOMElement(openButton);
    const data = {
      status: 'Open',
    };
    const uRL = `/api/v1/todos/${docID}`;
    fetch(uRL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
}

function markItemComplete(completeButton) {
  completeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const statusIndicatorDiv = getStatusIndicator(completeButton);
    statusIndicatorDiv.className = 'item-ctrl status-indicator item-completed';
    let docID = getDocumentIDFromDOMElement(completeButton);
    const data = {
      status: 'Completed',
    };
    const uRL = `/api/v1/todos/${docID}`;
    fetch(uRL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
}

function markItemClosed(closeButton) {
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const statusIndicatorDiv = getStatusIndicator(closeButton);
    statusIndicatorDiv.className = 'item-ctrl status-indicator item-closed';
    let docID = getDocumentIDFromDOMElement(closeButton);
    const data = {
      status: 'Closed',
    };
    const uRL = `/api/v1/todos/${docID}`;
    fetch(uRL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
}

function deleteItem(deleteButton) {
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    let docID = getDocumentIDFromDOMElement(deleteButton);

    const uRL = `/api/v1/todos/${docID}`;
    fetch(uRL, {
      method: 'DELETE',
    }).then(function (data) {
      window.location.reload(); // to refresh
      window.location.href = '/api/v1/todos'; // to navigate
    });
  });
}

editTodos.forEach(redirectToSingleTodo);
openButtons.forEach(markItemOpen);
completeButtons.forEach(markItemComplete);
closeButtons.forEach(markItemClosed);
deleteButtons.forEach(deleteItem);

displaySelect.addEventListener('change', (e) => {
  e.preventDefault();
  const statusFilter = `${e.target.value}`;

  const uRL = `/api/v1/todos?status=${statusFilter}`;

  window.location.href = uRL;
});

customersButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/api/v1/todos/customers';
});

addTodoButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/api/v1/todos/add';
});

completedTodoStatusIndicatorDIVs.forEach((element) => {
  element.className = 'item-ctrl status-indicator item-completed';
});
closedTodoStatusIndicatorDIVs.forEach((element) => {
  element.className = 'item-ctrl status-indicator item-closed';
});

const currentStatus = window.location.href.split('=')[1];

if (currentStatus == 'All') {
  displaySelect.innerHTML =
    '\n          <option>All</option>\n          <option>Open</option>\n          <option>Closed</option>\n          <option>Completed</option>\n        ';
}

if (currentStatus == 'Open') {
  displaySelect.innerHTML =
    '\n          <option>Open</option>\n          <option>All</option>\n          <option>Closed</option>\n          <option>Completed</option>\n        ';
}

if (currentStatus == 'Closed') {
  displaySelect.innerHTML =
    '\n          <option>Closed</option>\n          <option>All</option>\n          <option>Open</option>\n          <option>Completed</option>\n        ';
}

if (currentStatus == 'Completed') {
  displaySelect.innerHTML =
    '\n          <option>Completed</option>\n          <option>All</option>\n          <option>Open</option>\n          <option>Closed</option>\n        ';
}
