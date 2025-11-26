require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const companyRoutes = require("./company/routes.js");
const studentRoutes = require("./student/routes/catalog.js");
app.use("/company", companyRoutes)
app.use("/student",studentRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});