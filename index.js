
const express = require('express')
const cors = require('cors')

require("dotenv").config();

const app = express()

const route = require('./api/routes/index')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

require('./api/db/db').connect()

app.get('/', (req, res) => {
    return res.json({
        status: "Success",
        message: "Welcome to MRsoft"
    })
})

app.use("/api/v1", route)

app.use(cors())

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on ${port}`));
