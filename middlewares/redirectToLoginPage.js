module.exports = function redirectToLoginPage(req, res, next) {
  res.redirect(
    `https://www.facebook.com/v5.0/dialog/oauth?client_id=506153643447733&redirect_uri=http://localhost:3000/auth/facebook/success`);
}