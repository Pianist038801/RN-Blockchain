export default function validatePassword(password, password_confirm) {
  if (password !== password_confirm) {
    return 'Passwords do not match'
  }

  if (password == "") {
    return 'Please enter a password'
  }

  if (password.length < 8) {
    return 'Password must be 8 characters long'
  }

  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasNumbers = /\d/.test(password);
  var hasNonalphas = /\W/.test(password);
  if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 3) { 
    return 'Password does not meet complexity requirements'
  }

  return true

}