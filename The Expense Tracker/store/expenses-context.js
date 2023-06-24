import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "D1",
//     amount: 59.99,
//     date: new Date("2021-12-19"),
//   },
//   {
//     id: "e2",
//     description: "D2",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e3",
//     description: "D3",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e4",
//     description: "D4",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "e5",
//     description: "D5",
//     amount: 18.59,
//     date: new Date("2021-02-18"),
//   },
//   {
//     id: "e6",
//     description: "D1",
//     amount: 59.99,
//     date: new Date("2021-12-19"),
//   },
//   {
//     id: "e7",
//     description: "D2",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e8",
//     description: "D3",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e9",
//     description: "D4",
//     amount: 14.99,
//     date: new Date("2023-06-04"),
//   },
//   {
//     id: "e10",
//     description: "D5",
//     amount: 18.59,
//     date: new Date("2023-05-31"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const updateIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[updateIndex];
      const updatedItem = { ...updateExpense, ...action.payload.data };
      const updatedExpense = [...state];
      updatedExpense[updateIndex] = updatedItem;
      return updatedExpense;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    case "SET": 
    return action.payload;
    default:
      return state;
  }
}



function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({type: "SET", payload: expenses});
  }

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenses,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
