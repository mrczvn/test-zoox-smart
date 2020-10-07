const CityInUseError = () => {
  const error = new Error('Cidade já existente')

  error.name = 'CityInUseError'

  return error
}

module.exports = CityInUseError
