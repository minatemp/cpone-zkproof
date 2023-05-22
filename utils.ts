export const walletFormat = (address : any, digits = 5) => {
  return (
    address.substring(0, digits+1) +
    "..." +
    address.substring(address.length - digits, address.length)
  );
};