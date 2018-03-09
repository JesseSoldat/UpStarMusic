const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmail = (email) => {
  const valid = re.test(email);
  if(valid) return '';
  return 'You must provide a valid email.'
}