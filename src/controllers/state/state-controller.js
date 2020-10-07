const { invalidParamError } = require('../../helpers/errors')
const {
  badRequest,
  forbidden,
  created,
  serverError,
  StateInUseError,
  ok,
  noContent
} = require('./state-controller-protocols')

const stateController = (
  validation,
  addState,
  loadStates,
  loadStateById,
  updateState,
  deleteStateById
) => ({
  async add(req) {
    try {
      const requiredFieldError = validation.validate(req.body)

      if (requiredFieldError) return badRequest(requiredFieldError)

      const { nome, abreviacao } = req.body

      const state = addState.add({ nome, abreviacao })

      if (!state) return forbidden(StateInUseError())

      return created()
    } catch (error) {
      return serverError(error)
    }
  },

  async getAll() {
    try {
      const states = await loadStates.load()

      return states.length ? ok(states) : noContent()
    } catch (error) {
      return serverError(error)
    }
  },

  async update(req) {
    try {
      const { stateId } = req.params

      const state = await loadStateById.loadById(stateId)

      if (!state) return forbidden(invalidParamError('stateId'))

      const { nome, abreviacao } = req.body

      const requiredFieldError = validation.validate(req.body)

      if (requiredFieldError) return badRequest(requiredFieldError)

      await updateState.update({ stateId, nome, abreviacao })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  },

  async delete(req) {
    try {
      const { id } = req.params

      const state = await loadStateById.loadById(id)

      if (!state) return forbidden(invalidParamError('stateId'))

      await deleteStateById.deleteById(id)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
})

module.exports = stateController
