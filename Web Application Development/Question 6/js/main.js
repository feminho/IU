// Define the ComputerOrder prototype
function ComputerOrder(name, email, component, quantity) {
    this.name = name;
    this.email = email;
    this.component = component;
    this.quantity = quantity;
}

// Array to hold the list of computer orders
const computerOrders = [];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const component = document.getElementById('componentSelect').value;
        const quantity = document.getElementById('quantity').value;

        // Create a new ComputerOrder object
        const newOrder = new ComputerOrder(name, email, component, quantity);

        // Add the new order to the list
        computerOrders.push(newOrder);

        // Display the order summary
        const summaryText = `Thank you, ${name}. You have ordered ${quantity} unit(s) of ${component}. A confirmation email will be sent to ${email}.\nHere's your order history'`;
        document.getElementById('summaryText').textContent = summaryText;
        document.getElementById('orderSummary').style.display = 'block';

        // Update the order table
        updateOrderTable();

        // Show the order table if it's hidden
        document.getElementById('orderSumary').style.display = 'block';
    });
});

// Function to update the order table
function updateOrderTable() {
    const tableBody = document.getElementById('orderTableBody');
    tableBody.innerHTML = ''; // Clear the table body

    computerOrders.forEach(order => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = order.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = order.email;
        row.appendChild(emailCell);

        const componentCell = document.createElement('td');
        componentCell.textContent = order.component;
        row.appendChild(componentCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = order.quantity;
        row.appendChild(quantityCell);

        tableBody.appendChild(row);
    });
}
