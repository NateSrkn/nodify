import { app } from './index'

let port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

module.exports = server