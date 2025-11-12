require('dotenv').config();
const express = require('express');
const cors = require('cors')
// const authenticate = require("./middleware/authenticate.js");
// const authorize = require("./middleware/authorize.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const companyRoutes = require("./company/routes.js");
app.use("/company", companyRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});