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
                message: "Where too Next?.".green,
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
                        console.log(produceArray);
                        console.log(currentProduce);
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
                            message: "What is the new amount?"
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

    mainMenu();
};