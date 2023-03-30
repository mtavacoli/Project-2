
const expensesChart = new Chart(document.getElementById('expenses-chart'), chartOptions);
// array of data representing the user's expenses
const expensesData = [100, 200, 300, 400, 500];

const chartOptions = {
    type: 'line',
    data: {
        labels: ['Groceries', 'Bills', 'Automobile', 'Dine In/Take Out', 'Other'],
        datasets: [{
            label: 'Expenses',
            data: expensesData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
