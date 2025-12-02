export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  const numbers = phoneNumber.replace(/[^\d]/g, "");
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  return phoneNumber;
};

export const unformatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^\d]/g, "");
};
