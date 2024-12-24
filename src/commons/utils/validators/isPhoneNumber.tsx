const isPhoneNumber = (phoneNumber: string | number) => {
  if (
    /^(۰۹|09)[۰-۹0-9]{9}$/.test(phoneNumber.toString()) ||
    /^(۹|9)[۰-۹0-9]{9}$/.test(phoneNumber.toString()) ||
    (/^\+98\d{10}$/.test(phoneNumber.toString())) ||
    /^\+۹۸[۰-۹]{10}$/.test(phoneNumber.toString())
  ) {
    return true;
  } else {
    return false;
  }
};

export default isPhoneNumber;