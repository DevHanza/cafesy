function formatPhoneNumber(input) {
  // Remove all non-digit characters
  let phoneNumber = input.value.replace(/\D/g, "");

  // Apply formatting based on the number of digits
  if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
    phoneNumber = phoneNumber.replace(/^(\d{3})(\d{1,3})$/, "$1-$2");
  } else if (phoneNumber.length > 6) {
    phoneNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{1,4})$/, "$1-$2-$3");
  }

  // Update the input value
  input.value = "+" + phoneNumber;
}
