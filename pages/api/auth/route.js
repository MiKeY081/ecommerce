const NextAuth = require("next-auth/next");

const handle = NextAuth();

module.exports = { GET: handle, POST: handle };
