import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      periodicity="Total"
      expenses={expensesContext.expenses}
      fallbackText="No registered expenses found."
    />
  );
}

export default AllExpenses;
