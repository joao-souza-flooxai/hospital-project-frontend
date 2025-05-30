import handleApiError from "./errorsHandler"

export const errorMessage = (error = {}, defaultMessage) => {
  const parsedError = handleApiError(error)
  return parsedError?.message || defaultMessage || 'Ocorreu um erro inesperado.'
}
