const express = require("express");
const path = require('path');
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());


// CONNECTION TO POSTGRESQL DATABASE
const { Client } = require("pg");
const { db } = require('./db');
const connection = new Client(db);

connection.connect((err) => {
    if (err){
        console.log(err);
    }    
    else{
        console.log("Connected to database! ", db.host);
    }
});

module.exports = { connection }



app.use("/", express.static("public"));

 // ACCOUNT CONTROLLER APIs
app.use("/api/login", require("./controller/account_controller/SignInController"));
app.use("/api/authenticatelogin", require("./controller/account_controller/AuthenticateLoginController"));
app.use("/api/getallaccount", require("./controller/account_controller/GetAllAccountController"));
app.use("/api/getallproduct", require("./controller/account_controller/GetAllProductController"));
app.use("/api/createaccount", require("./controller/account_controller/CreateAccountController"));
app.use("/api/updateaccount", require("./controller/account_controller/UpdateAccountDataController"))
app.use("/api/deletemultipleaccount", require("./controller/account_controller/DeleteMultipleAccountController"));
app.use("/api/accountDetail", require("./controller/account_controller/AccountDetailController"))


// Search APIs
app.use("/api/directSearch", require("./controller/search_controller/DirectSearchController"));
app.use("/api/guidedSearch", require("./controller/search_controller/GuidedSearchController"));
app.use ("/api/guidedDropdown", require("./controller/search_controller/GuidedSearchDropdownController"));

// Application APIS
app.use("/api/createApplication", require("./controller/product_controller/CreateApplicationController"));
app.use("/api/applicationDetail", require("./controller/product_controller/ApplicationDetailController"));
app.use("/api/updateApplication", require("./controller/product_controller/UpdateApplicationDataController"))
app.use("/api/deletemultipleapplication", require("./controller/product_controller/DeleteMultipleApplicationController"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.on('error', (err) => {
    console.log(err.message);
 });