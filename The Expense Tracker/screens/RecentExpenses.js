import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getRecentDateByDays } from "../util/dateUtil";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();


  useLayoutEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        console.log("Fetching expenses");
        const expenses = await fetchExpenses();  
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not Fetch expenses.");
      }
      
      setIsFetching(false); 
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null); 
  }

  if(error && ! isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/> ;
  }

  if(isFetching) {
    return <LoadingOverlay />
  }


  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getRecentDateByDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodicity="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
