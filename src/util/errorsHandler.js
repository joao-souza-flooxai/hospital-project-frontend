export const handleApiError = (error) => {
  if (!error?.response) {
    return {
      type: 'server',
      message: 'Erro de conexão. Verifique sua internet ou tente novamente mais tarde.',
    }
  }

  const { status, data } = error.response

 
  if (status === 400 && data?.message === 'Validation error') {
    const errors = {}
    data.errors.forEach(err => {
      errors[err.path] = err.message
    })

    return {
      type: 'validation',
      errors,
      message: 'Preencha os campos corretamente.',
    }
  }

 
  if (status === 400) {
    return {
      type: 'client',
      message: data.message || 'Erro na operação.',
    }
  }


  return {
    type: 'server',
    message: 'Ocorreu um erro interno. Tente novamente mais tarde.',
  }
}