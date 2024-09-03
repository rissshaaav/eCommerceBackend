const express = require("express");
const app = express();

app.get("/", (req, res)=> {
    res.send("Server is working atleast!");
})

app.listen(3000, ()=>{
    console.log("Server is up and running");
})