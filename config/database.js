require("dotenv").config();
module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
//   sequelize
//   .authenticate()
//   .then(()=> {
//     console.log('connection has been established');
//   })
//   .catch((error)=> {
//     console.log('unable to connect', error);
//   });
// module.exports ={sequelize};
