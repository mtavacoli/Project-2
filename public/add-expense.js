const token = localStorage.getItem("token");
let page = 1;

const previous = document.getElementById("previous");
const next = document.getElementById("next");
var itemNum = localStorage.getItem("NumberOfExpense");

if (token) {
  document.getElementById("login").classList.add("display-nav");
  document.getElementById("signup").classList.add("display-nav");
} else {
  document.getElementById("logout").classList.add("display-nav");
}

async function callPage(event) {
  event.preventDefault();

  var itemNum = localStorage.getItem("NumberOfExpense") || 3;

  if (event.target.id == "next") {
    previous.style.display = "block";
    page = page + 1;

    await axios
      .get(`http://localhost:3001/expense/?page=${page}&item=${itemNum}`, {
        headers: { authorization: token },
      })
      .then((result) => {
        if (page == result.data.expense.count) {
          document.getElementById("next").style.display = "none";
        }
        if (result.data.length != 0) {
          const rows = result.data.expense.rows;
          const sumOfExpense = result.data.sum[0]["SUM(`amount`)"];

          showExpense(rows, sumOfExpense);
        } else {
          next.style.display = "none";
        }
      });
  } else {
    page = page - 1;

    await axios
      .get(`http://localhost:3001/expense/?page=${page}&item=${itemNum}`, {
        headers: { authorization: token },
      })
      .then((result) => {
        if (page == 1) {
          document.getElementById("previous").style.display = "none";
        }
        if (page < result.data.expense.count) {
          document.getElementById("next").style.display = "block";
        }
        const rows = result.data.expense.rows;
        const sumOfExpense = result.data.sum[0]["SUM(`amount`)"];

        showExpense(rows, sumOfExpense);
      });
  }
}

function showExpense(expenseList, sumOfExpense) {
  const expensesList = document.getElementById("debit-list");
}
expensesList.innerHTML = "";
expenseList.forEach((expense) => {
  const div = document.createElement("div");
  div.setAttribute("class", "list");
  div.setAttribute("id", `${expense.id}`);

  div.innerHTML = `       
        <div class="show">
            <li id="cate">${expense.category}</li>
            <li>${expense.amount}</li>
            <li id="desc">${expense.description}</li>
        </div>
        <div class="perform">
        <button onclick="getEditExpense(${expense.id})"><span class="material-symbols-outlined">edit</span></button>
        <button onclick="deleteExpense(${expense.id})"><span class="material-symbols-outlined">delete</span></button>
        </div>
    `;

  document.getElementById(
    "sum-of-expense"
  ).innerHTML = `Sum of Expense: ${sumOfExpense}`;

  expensesList.appendChild(div);
});

window.addEventListener("DOMContentLoaded", async () => {
  await axios
    .get(`http://localhost:3001/expense/?page=${page}&item=${itemNum}`, {
      headers: { authorization: token },
    })
    .then((result) => {
      previous.style.display = "none";

      const rows = result.data.expense.rows;
      const sumOfExpense = result.data.sum[0]["SUM(`amount`)"];

      showExpense(rows, sumOfExpense);
    })
    .catch((err) => {
      localStorage.clear();
    });
});

async function saveExpense(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const addExpense = {
    id: form.get("id"),
    category: form.get("category"),
    description: form.get("description"),
    amount: form.get("amount"),
  };
  if (addExpense.id) {
    const addExp = await axios
      .post("http://localhost:3001/edit-expense", addExpense, {
        headers: { authorization: token },
      })
      .then((result) => {
        alert("item edited");
      });
  } else {
    const log = await axios
      .post("http://localhost:3001/add-expense", addExpense, {
        headers: { authorization: token },
      })
      .then((result) => {
        alert("Item added");
        showExpense([addExpense]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteFromFrontEnd(id) {
  const div = document.getElementById(id);
  div.remove();
}

async function deleteExpense(id) {
  data = { id: id };
  const delete_expense = await axios
    .post(`http://localhost:3001/delete-expense`, data, {
      headers: { authorization: token },
    })
    .then((result) => {
      alert("item deleted");
      deleteFromFrontEnd(id);

      location.href = "http://localhost:3001/add-expense.html";
    })
    .catch((err) => {
      console.log("error in delete expense", err);
    });
}

async function getEditExpense(id) {
  data = { id: id };
  const edit_expense = await axios
    .get(`http://localhost:3001/edit-expense/?id=${id}`, {
      headers: { authorization: token },
    })
    .then((result) => {
      const expense = result.data.expense[0];
      document.getElementById("id").value = expense.id;
      document.getElementById("category").value = expense.category;
      document.getElementById("description").value = expense.description;
      document.getElementById("amount").value = expense.amount;
    })
    .catch((err) => {
      console.log("error in editing expense", err);
    });
}
const input = document.querySelector("input");
input.addEventListener("input", updateValue);

function updateValue(e) {
  localStorage.setItem("NumberOfExpense", e.target.value);
}
