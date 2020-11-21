const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql");
const colors = require("colors");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "qwerty1234",
    database: "freshveg_db",
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
                    " --> See All Current Produce",
                    " --> Update Current Produce Levels",
                    " --> Add New Produce",
                    " --> Remove Obsolete or Depleted Produce",
                    " --> Exit"
                ]
            }
        ]).then(function(data) {
            if (data.menu === " --> See All Current Produce") return seeAll();
            if (data.menu === " --> Update Current Produce Levels") return updateLevels();
            if (data.menu === " --> Add New Produce") return addNew();
            if (data.menu === " --> Remove Obsolete or Depleted Produce") return removeDepleted();
            if (data.menu === " --> Exit") return exit();
        }).catch(err => {
            return err;
        });
    }

    function seeAll() {
        let queryString = "SELECT * FROM fresh_produce";
        connection.query(queryString, function(err, res) {
            if (err) throw err;

            console.table(`\n All Current Produce \n`.red, res)
            return subMenu();
        });
    };
    
    function exit() {
        console.log("\nGoodBye\n".red)
        connection.end();
    };

    function subMenu() {
        inquirer.prompt([
            {
                type: "list",
                name: "subMenu",
                message: "Where to Next?.".green,
                choices: [
                    " --> Main Menu",
                    " --> Filter Produce"
                ]
            }
        ]).then(function(data) {
            if (data.subMenu === " --> Main Menu") return mainMenu();
            if (data.subMenu === " --> Filter Produce") return filterMenu();
        }).catch(err => {
            return err;
        });
    };

    function updateLevels() {
        
        // let queryString = `UPDATE amount_kg FROM fresh_produce WHERE id = ${res}`
        connection.query(`SELECT * FROM fresh_produce`, function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    name: "produceSelection",
                    message: "What would you like to update".green,
                    choices: function() {
                        let produceArray = [];
                        let currentProduce = [];
                        for (let i = 0; i < res.length; i++) {
                            console.log(res[i]);
                            produceArray.push(`ID ${res[i].id} : ${res[i].produce_name.green}`);
                            currentProduce.push(res[i]);
                            
                        };
                        return produceArray;
                    }
                }
            ]).then(function(data) {
                let newAmount = JSON.stringify(data);
                let amountString = newAmount.slice(23,26).toLowerCase();

                if (data.produceSelection) {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "newAmount",
                            message: "What is the new amount(KG)?"
                        },
                        {
                            type: "list",
                            name: "confirm",
                            message: "Confirm?",
                            choices: ["Yes", "No", "Exit"]
                        }
                    ]).then(function(data) {
                        
                        if (data.confirm === "No") return updateLevels();
                        if (data.confirm === "Exit") return mainMenu();
                        if (data.confirm === "Yes") {
                            connection.query(`UPDATE fresh_produce SET amount_kg = ${data.newAmount} WHERE id = ${amountString}`, 
                            function(err, res) {
                                if (err) throw err;

                                console.log("Success");

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
                                    if (data.mainMenu === "View Produce") return seeAll();
                                    if (data.mainMenu === "Main Menu") return mainMenu();
                                })
                            })
                        }
                    })
                }
            })
        });  
    };

    function addNew() {
        let queryString = "SELECT id, produce_type FROM produce_type";
        connection.query(queryString, function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    name: "vegSelector",
                    message: "What type of veg are you adding",
                    choices: 
                        function() {
                            let produceArray = [];
                            for (let i = 0; i < res.length; i++) {
                                produceArray.push(`${res[i].id} ${res[i].produce_type}`);
                            };
                            return produceArray;
                        }
                },
                {
                    type: "input",
                    name: "vegName",
                    message: "What are you adding?" 
                },
                {
                    type: "input",
                    name: "vegFarm",
                    message: "Where is it From?"
                },
                {
                    type: "list",
                    name: "vegState",
                    message: "What state is your farm in?",
                    choices: [
                        "QLD",
                        "NSW",
                        "VIC",
                        "SA",
                        "NT",
                        "WA",
                        "TAS",
                        "ACT"
                    ]
                },
                {
                    type: "input",
                    name: "vegAmount",
                    message: "How much do you have available(KG)?"
                }
            ]).then(function(data) {

                let vegLocation = `${data.vegFarm} ${data.vegState}`;
                let vegType = JSON.stringify(data.vegSelector);
                let vegId = vegType.slice(1,3);
                
                if (data.vegSelector) {
                    let queryStringProduce = `INSERT INTO fresh_produce (produce_name, farm_location, Amount_kg, produce_type_id) VALUES ('${data.vegName}', '${vegLocation}', '${data.vegAmount}', ${vegId})`;

                    connection.query(queryStringProduce, function(err, res) {
                        if (err) throw err;

                        console.log("Success");

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
                            if (data.mainMenu === "View Produce") return seeAll();
                            if (data.mainMenu === "Main Menu") return mainMenu();
                        });
                    });
                };
            });
        });  
    };

    function removeDepleted() {
        let queryString = "SELECT id, produce_name FROM fresh_produce";
        connection.query(queryString, function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    name: "produce",
                    message: "What produce is to be removed?",
                    choices: 
                    function() {
                        let produceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            produceArray.push(`${res[i].id} ${res[i].produce_name}`);
                        };
                        return produceArray;
                    }
                }
            ]).then(function(data) {
                let produce = JSON.stringify(data.produce);
                let produceString = produce.replace(/[^a-zA-Z ]/g, "");
                let produceID = produce.replace(/[^0-9 ]/g, "");
                console.log(produceString);
                console.log(produceID);
                if (data.produce) {
                    connection.query(`DELETE FROM fresh_produce WHERE id = ${produceID}`,
                        function(err, res) {
                            if (err) throw err;

                            console.log(`Successfully removed ${res} from database`);

                        });
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
                            if (data.mainMenu === "View Produce") return seeAll();
                            if (data.mainMenu === "Main Menu") return mainMenu();
                        });
                };
            });
        });
    };

    mainMenu();
    
};