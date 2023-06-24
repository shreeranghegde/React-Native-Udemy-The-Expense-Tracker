import axios from "axios";
// Create a backend url to store expense data.
// The following file is not present in the public repo of this project
import { URL_ROOT } from "../constants/url";

export async function storeExpense(expenseData) {
  axios.post(URL_ROOT + "/expenses.json", expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(URL_ROOT + "/expenses.json");
  console.log(response)
    
  const expenses = [];

  for (const key in response.data) {
    const expenseItem = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseItem);
  }
  return expenses; 
}

export function updateExpense(id, expenseData) {

    return axios.put(URL_ROOT + `/expenses/${id}.json`, expenseData); 
}

export function deleteExpense(id) {
    return axios.delete(URL_ROOT + `/expenses/${id}.json`); 
}