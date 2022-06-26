// const updateTodo = document.querySelector('.update-todo');
// const topLevelOfThisTodo = editTodo.closest('.todo-item-summary');

// editTodo.addEventListener('click', () => {
//   e.preventDefault();
//   const documentID =
//     topLevelOfThisTodo.lastElementChild.lastElementChild.innerText;
//   console.log(documentID);

//   window.location.href = `/api/v1/todos/${documentID}`;
// });

const openButtons = document.querySelectorAll('.open-btn');
const completeButtons = document.querySelectorAll('.complete-btn');
const closeButtons = document.querySelectorAll('.close-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

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
    });
  });
}


openButtons.forEach(markItemOpen);
completeButtons.forEach(markItemComplete);
closeButtons.forEach(markItemClosed);
deleteButtons.forEach(deleteItem);
