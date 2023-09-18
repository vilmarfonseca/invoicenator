// Checks for the presence of an uppercase letter, a lowercase letter,
// a digit, a special character, and a minimum length of 8 characters.
// It also ensures that there are no whitespace characters.
export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

// Regular email address validations
export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
