type currencyConverterProps = {
  currency: string;
  rate: number;
  amount: number;
};

export const convertCurrency = (props: currencyConverterProps) => {
  const { currency, rate, amount } = props;

  const formattedAmount = (currency === "USD" ? amount / rate : amount).toFixed(
    2,
  );

  return formattedAmount;
};
