import { FormErrorEnum } from "../../shared/enums/form-error.enum";

export const PASSWORD_ERROR_MESSAGES = {
  [FormErrorEnum.MIN_LENGTH]: 'Password must be at least 6 characters long',
  [FormErrorEnum.MAX_LENGTH]: 'Password can not exceed 50 characters',
  [FormErrorEnum.REQUIRED]: 'Password field is required'
}
export const EMAIL_ERROR_MESSAGES = {
  [FormErrorEnum.MIN_LENGTH]: 'Email must be at least 4 characters long',
  [FormErrorEnum.MAX_LENGTH]: 'Email can not exceed 50 characters',
  [FormErrorEnum.REQUIRED]: 'Email field is required'
}

