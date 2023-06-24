import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({
  onCancel,
  onConfirm,
  submitButtonLabel,
  defaultValues,
}) {
  const [input, setInput] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });

  function onInputChanged(inputIdentifier, enteredValue) {
    setInput((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function confirmHandler() {
    const data = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const isAmountValid = !isNaN(data.amount) && data.amount > 0;
    const isDateValid = !isNaN(data.date);
    const isDescriptionValid = data.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert("Invalid Input", "Please Check your input amount");
      setInput((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: isAmountValid },
          date: { value: currentInput.date.value, isValid: isDateValid },
          description: {
            value: currentInput.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }

    onConfirm(data);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Manage Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!input.amount.isValid}
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: onInputChanged.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!input.date.isValid}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onInputChanged.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!input.description.isValid}
        textInputProps={{
          multiline: true,
          onChangeText: onInputChanged.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {(!input.amount.isValid ||
        !input.date.isValid ||
        !input.description.isValid) && (
        <Text style={styles.errorText}>Invalid Input. Please Check your input amount</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button onPress={confirmHandler} style={styles.buttons}>
          {submitButtonLabel}
        </Button>
        <Button mode="flat" onPress={onCancel} style={styles.buttons}>
          Cancel
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 25,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});
