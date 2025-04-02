export const amountFormater = (value) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(Number(value));
};

export default amountFormater;
