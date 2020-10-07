const StateInUseError = () => {
  const error = new Error('Estado já existente')

  error.name = 'StateInUseError'

  return error
}

module.exports = StateInUseError
