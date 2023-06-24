import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpenses({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEdit = !!expenseId;
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  async function onDelete() {
    setIsFetching(true);
    try {
      await deleteExpense(expenseId);  
      expensesContext.deleteExpense(expenseId);
    } catch (error) {
      setError("Could not delete expense - Please try again later");
      setIsFetching(false);
    }
    
    navigation.goBack();
  }

  function onCancelHandler() {
    navigation.goBack();
  }

  async function onConfirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEdit) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
        
      } else {
        const id = await storeExpense(expenseData)
        expensesContext.addExpense({...expenseData, id: id});
      } 
      navigation.goBack();       
    } catch (error) {
      setError("Could not save expense - Please Try again later.");
      setIsFetching(false)  
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
    }

  if(isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEdit ? "Update" : "Add"}
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
        defaultValues={selectedExpense}
      />
      {isEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={onDelete}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
