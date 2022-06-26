const currentTitleDIV = document.querySelector('.current-title');
const titleInputField = document.querySelector('#item-title');
const currentTitle = currentTitleDIV.innerText;

console.log(currentTitle);

titleInputField.value = currentTitle;
