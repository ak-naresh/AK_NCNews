const app = require("./app");
//listen.js starts Express server by importing and calling app specifically on port 9090. This separation allows app-setup to be in app.js for cleaner structure.

app.listen(9090, () => {
  console.log(`App listening on port 9090`);
});
