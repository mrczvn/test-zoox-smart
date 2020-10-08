const adaptRouteAdd = (controller) => async (req, res) => {
  const httpRequest = { body: req.body, params: req.params }

  const httpResponse = await controller.add(httpRequest)

  const { statusCode, body } = httpResponse

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}

const adaptRouteGetAll = (controller) => async (req, res) => {
  const httpResponse = await controller.getAll()

  const { statusCode, body } = httpResponse

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}

const adaptRouteUpdate = (controller) => async (req, res) => {
  const httpRequest = { body: req.body, params: req.params }

  const httpResponse = await controller.update(httpRequest)

  const { statusCode, body } = httpResponse

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}

const adaptRouteDelete = (controller) => async (req, res) => {
  const httpRequest = { params: req.params }

  const httpResponse = await controller.delete(httpRequest)

  const { statusCode, body } = httpResponse

  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(body)
  }

  return res.status(statusCode).json({ error: body.message })
}

module.exports = {
  adaptRouteAdd,
  adaptRouteDelete,
  adaptRouteGetAll,
  adaptRouteUpdate
}
