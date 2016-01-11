export function bsStyle(fieldValidation) {
  if (fieldValidation.touched === false) {
    return null;
  }
  return fieldValidation.touched && fieldValidation.error ? 'error' : 'success';
}
