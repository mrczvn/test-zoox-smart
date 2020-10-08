const { Router } = require('express')
/* eslint-disable import/no-dynamic-require */
const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = (app) => {
  const router = Router()

  app.use('/api', router)

  const requiredRoutes = ['/api/city', '/api/state']

  app.all('*', (req, res) => {
    const requiredRoutesError = requiredRoutes.reduce(
      (acc, route) => acc || !req.url[route],
      !req.url[requiredRoutes[0]]
    )

    if (requiredRoutesError) return res.json({ error: 'invalid route' })
  })

  const dir = join(__dirname, './')

  readdirSync(dir)
    .filter((files) => files.endsWith('routes.js', files.length))
    .map(async (file) =>
      // eslint-disable-next-line global-require
      (await Promise.resolve().then(() => require(`${dir}/${file}`)))(router)
    )
}
