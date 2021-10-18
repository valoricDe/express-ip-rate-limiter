module.exports = (app, threshold = 100, replenishTimeMs = 10000, backoffThreshold = 0.8 * threshold, waitTime = 5000) => {
  app.set('trust proxy', true)
  const ips = {}
  return (req, res, next) => {
    const requestCount = ips[req.ip]

    if(requestCount > threshold) {
      res.status(429).end()
      return
    }
    if(requestCount > backoffThreshold) {
      ips[req.ip] = requestCount + 1
      setTimeout(() => {
        if((ips[req.ip] -= 1) <= 0) {
          delete ips[req.ip]
        }
      }, replenishTimeMs)
      setTimeout(next, waitTime)
      return
    }

    if(!requestCount) ips[req.ip] = 1
    else ips[req.ip] = requestCount + 1
    setTimeout(() => {
      if((ips[req.ip] -= 1) <= 0) {
        delete ips[req.ip]
      }
    }, replenishTimeMs)
    next()
  }
}
