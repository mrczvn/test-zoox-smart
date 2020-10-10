const {
  badRequest,
  forbidden,
  created,
  serverError,
  CityInUseError,
  invalidParamError,
  ok,
  noContent
} = require('./city-controller-protocols')

const cityController = (
  validation,
  loadStateById,
  addCity,
  loadCitys,
  loadCityById,
  updateCity,
  deleteCityById
) => ({
  async add(req) {
    try {
      const { stateId } = req.params

      const state = await loadStateById.loadById(stateId)

      if (!state) return badRequest(invalidParamError('stateId'))

      const requiredFieldError = validation.validate(req.body)

      if (requiredFieldError) return badRequest(requiredFieldError)

      const { nome } = req.body

      const city = await addCity.add({ stateId, nome })

      if (!city) return forbidden(CityInUseError())

      return created()
    } catch (error) {
      return serverError(error)
    }
  },

  async getAll() {
    try {
      const citys = await loadCitys.load()

      if (!citys) return noContent()

      return ok(citys)
    } catch (error) {
      return serverError(error)
    }
  },

  async update(req) {
    try {
      const { cityId } = req.params

      const city = await loadCityById.loadById(cityId)

      if (!city) return forbidden(invalidParamError('cityId'))

      const { nome } = req.body

      const requiredFieldError = validation.validate(req.body)

      if (requiredFieldError) return badRequest(requiredFieldError)

      await updateCity.update({ cityId, nome })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  },

  async delete(req) {
    try {
      const { cityId } = req.params

      const city = await loadCityById.loadById(cityId)

      if (!city) return forbidden(invalidParamError('stateId'))

      await deleteCityById.deleteById(cityId)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
})

module.exports = cityController
