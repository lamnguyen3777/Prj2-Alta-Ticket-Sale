export const formatCurrency = (amount: number, delimiter: string = ".") => {
  const chainAmount = amount.toString().split("").reverse();

  let rs = "";
  let count = 3;
  for (let i = 0; i < chainAmount.length; i++) {
    rs += chainAmount[i];
    if (i === count - 1 && i !== chainAmount.length - 1) {
      rs += delimiter;
      count += 3;
    }
  }
  return rs.split("").reverse();
};
