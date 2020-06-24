export const verifyAdmin = (req, res, next) => {
  console.log(req.user)
  if(!req.user.isAdmin) return res.status(403).json({ error: "Access Denied" })
  next()
}