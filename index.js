module.exports = (app, threshold = 100) => {
  app.set('trust proxy', true)
  const ips = Object.create(null)
  return (req, res) => {
    if(ips[req.ip] > threshold) {
      res.status(429).end()
      return
    }

    ips[req.ip] += 1
    setTimeout(() => {
      if((ips[req.ip] -= 1) <= 0) {
        delete ips[req.ip]
      }
    }, 1000)
  }
}
