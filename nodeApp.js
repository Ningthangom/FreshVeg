const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql");
const colors = require("colors");

const connection = mysql.createConnection({
    host: "tyduzbv3ggpf15sx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "rcp5kgnzh5w2y4w4",
    password: "mr7txoqjdyittef0",
    database: "thjgsjh6mvck6pc7",
});

connection.connect(function(err) {
    if (err) throw err;

    run();
});


function run() {

    function mainMenu() {
        inquirer.prompt([
            {
                type: "list",
                name: "menu",
                message: "Hello.\nPlease select from one of the following prompts".green,
                choices: 
                [
                    " --> Check All Current Produce",
                    " --> Add New Produce",
                    " --> Remove Produce",
                    " --> See All Farmers",
                    " --> Add New Farmer",
                    " --> Remove Farmers",
                    " --> Exit"
                ]
            }
        ]).then(function(data) {
            if (data.menu === " --> Check All Current Produce") return checkProduce();
            if (data.menu === " --> Add New Produce") return addProduce();
            if (data.menu === " --> Remove Produce") return removeProduce();
            if (data.menu === " --> See All Farmers") return seeFarmers();
            if (data.menu === " --> Add New Farmer") return addFarmer();
            if (data.menu === " --> Remove Farmers") return removeFarmers();
            if (data.menu === " --> Exit") return exit();
        }).catch(err => {
            return err;
        });
    }

    // See table of all produce
    function checkProduce() {
        let queryString = "SELECT * FROM products";

        connection.query(queryString, function(err, res) {
            if (err) throw err;

            console.log(`** PRODUCT AVAILABILITY, 1 = available -- 0 = not available **`.magenta);
            console.table(res);
            
            return subMenu();
        })
        
    };
    
    // Add produce to product table
    function addProduce() {
        connection.query(`SELECT * FROM farmer`, function(err, res) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "newVeg",
                    message: "What would you like to add?"
                },
                {
                    type: "list",
                    name: "selectFarmer",
                    message: "Select your Farmer-ID",
                    choices: function() {
                        let farmerArray = [];
                        for (let i = 0; i < res.length; i++) {
                            console.log(res[i]);
                            farmerArray.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
                        }
                        return farmerArray;
                    }
                }
            ]).then(function(data) {
                let farmerID = data.selectFarmer;
                let updateID = farmerID.slice(0,2);

                let vegString = JSON.stringify(data.newVeg);
                let vegStringNoQuotes = vegString.replace(/['"]+/g, '');

                console.log(updateID);
                let updateString = `INSERT INTO products (product_name, product_availabilty, farmer_id) VALUES ('${vegStringNoQuotes}', true, ${updateID})`;
                connection.query(updateString, function(err, res) {
                    if (err) throw err;

                    // console.log(res);
                    console.log(`Great Success!! ${vegString} added to ${farmerID}`);

                    return subMenu();
                })
            }).catch(err => {
                return err;
            });
        });
    };

    // Remove produce From database (BE CAREFUL)
    function removeProduce() {
        let queryString = `SELECT id, product_name FROM products`;
        connection.query(queryString, function(err, res) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "veggies",
                    message: "Which product needs to be removed",
                    choices: function() {
                        let produceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            produceArray.push(`${res[i].id} ${res[i].product_name}`);
                        };
                        return produceArray;
                    }
                },
                {
                    type: "list",
                    name: "confirm",
                    message: "Are you sure?".red,
                    choices: ["Yes", "No"]
                }
            ]).then(function(data) {
                if (data.confirm === "No") return mainMenu();
                if (data.confirm === "Yes") {
                    let deleting = JSON.stringify(data.veggies);
                    let noMoreVeggies = deleting.replace(/[a-zA-Z'"]/g, '');

                    console.log(noMoreVeggies);

                    let removeString = `DELETE FROM products WHERE id = '${noMoreVeggies}'`;
                    connection.query(removeString, function(err, res) {
                        if (err) throw err;

                        console.log(`Success!! Removed ${noMoreVeggies} from database`);

                        return subMenu();
                    })
                }
            })
        })
    }

    // View table of farmers
    function seeFarmers() {
        let queryString = "SELECT * FROM farmer";

        connection.query(queryString, function(err, res) {
            if (err) throw err;

            console.table(res);
            
            return subMenu();
        })
    }

    // Add Farmers to database
    function addFarmer() {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is your first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is your last name?"
            }
        ]).then(function(data) {
            let queryString = `INSERT INTO farmer (first_name, last_name) VALUES ('${data.firstName}', '${data.lastName}')`;

            connection.query(queryString, function(err, res) {
                if (err) throw err;

                
                console.log(`${data.firstName} ${data.lastName} Added Successfully`);
                inquirer.prompt([
                            {
                                type: "list",
                                name: "mainMenu",
                                message: "Return to main menu or view produce",
                                choices: 
                                    [
                                        "View Produce",
                                        "Main Menu"
                                    ]
                            }
                ]).then(function(data) {
                    if (data.mainMenu === "View Produce") return checkProduce();
                    if (data.mainMenu === "Main Menu") return mainMenu();
                })
            })
        })
    }

    // Remove farmers from database (BE CAREFUL)
    function removeFarmers() {
        let removalString = `SELECT * FROM farmer`
        connection.query(removalString, function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    name: "farmers",
                    message: "Which farmer is being removed",
                    choices: function() {
                        let removalArray = [];
                        for (let i = 0; i < res.length; i++) {
                            removalArray.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
                        };
                        return removalArray;
                    }
                },
                {
                    type: "list",
                    name: "confirm",
                    message: "Are You Sure".red,
                    choices: ["Yes", "No"]
                }
            ]).then(function(data) {
                let farmer = JSON.stringify(data.farmers);
                let farmerID = farmer.replace(/[^0-9 ]/g, "");
                let farmerName = farmer.replace(/[^a-zA-Z ]/g, "");
                let deleteFarmerString = `DELETE FROM farmer WHERE id = ${farmerID}`;

                if (data.confirm === "No") return mainMenu();
                if (data.confirm === "Yes") {
                    connection.query(deleteFarmerString, function(err, res) {
                        if (err) throw err;

                        console.log(`Success! ${farmerName} from database`);

                        return mainMenu();
                    })
                }
            })
        })
    }

    // SUB FUNCTIONS //

    // Exit App
    function exit() {
        console.log("\nGoodBye\n".red)
        connection.end();
    };

    // Show menu after actions
    function subMenu() {
        inquirer.prompt([
            {
                type: "list",
                name: "subMenu",
                message: "Where to Next?.".green,
                choices: [
                    " --> Main Menu",
                    " --> Exit App"
                ]
            }
        ]).then(function(data) {
            if (data.subMenu === " --> Main Menu") return mainMenu();
            if (data.subMenu === " --> Exit App") return exit();
        }).catch(err => {
            return err;
        });
    };

    // Call main menu
    mainMenu();

};