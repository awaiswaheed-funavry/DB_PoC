const Sequelize = require("sequelize");
const sequelize = new Sequelize("testdb", "root", "root", {
        host: "localhost",
        dialect: "mysql",
        // operatorsAliases: false,
        pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        }
});

const person = sequelize.define("person", {
        id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER
        },
        firstname: {
                type: Sequelize.STRING
        },
        lastname: {
                type: Sequelize.STRING
        }
}, {
        timestamps: false,
        tableName: 'person'
});

const size = 10000;
// sequelize.sync({
//         force: true
// });

// console.log("person Table", person === sequelize.models.perosn);

function insert() {
        var counter = 0;
        var t0 = new Date().getTime();
        for (var i = 0; i < size; i++) {
                var obj = {
                        firstname: `jimmy${i}`,
                        lastname: `hendrix${i}`
                }

                person.create(obj).then(data => {
                        console.log("Row ID: " + data.dataValues.id);
                        counter++;
                        if (counter == size) {
                                var t1 = new Date().getTime();
                                console.log("Insert Time: ", t1 - t0);
                                sequelize.close();
                        }
                });
        }

}

function fetch() {
        var t0 = new Date().getTime();
        person.findAll().then(data => {
                // console.log(data);
                var t1 = new Date().getTime();
                console.log("fetch Time: ", t1 - t0);
                sequelize.close();
        });
}

module.exports = {
        insert,
        fetch
};