const showAllCustomers = document.querySelector('.all-customers-btn');

showAllCustomers.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/api/v1/todos/customers';
});