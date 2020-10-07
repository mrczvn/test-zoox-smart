const { ServerError } = require('../errors/index')

module.exports = {
  badRequest: (error) => ({ statusCode: 400, body: error }),

  forbidden: (error) => ({ statusCode: 403, body: error }),

  serverError: (error) => ({ statusCode: 500, body: ServerError(error.stack) }),

  ok: (data) => ({ statusCode: 200, body: data }),

  created: () => ({ statusCode: 201, body: null }),

  noContent: () => ({ statusCode: 204, body: null })
}
