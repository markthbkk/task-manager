const deleteButtons = document.querySelectorAll('.delete-btn');
const addCustomerButton = document.querySelector('.add-customer-btn');


function getDocumentIDFromDOMElement(selectedElement) {
  const topLevelOfThisTodo = selectedElement.closest('.customer-display');

  const documentID = topLevelOfThisTodo.childNodes[3].innerText;
  return documentID;
}

function deleteItem(deleteButton) {
  deleteButton.addEventListener('click', (e) => {
    // e.preventDefault();
    let docID = getDocumentIDFromDOMElement(deleteButton);

    const uRL = `/api/v1/todos/customers/${docID}`;
    fetch(uRL, {
      method: 'DELETE',
    }).then(function(data){
        window.location.reload(); // to refresh
        window.location.href = '/api/v1/todos/customers'; // to navigate
    })
  });
}

deleteButtons.forEach(deleteItem);

addCustomerButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/api/v1/todos/customers/add';
});