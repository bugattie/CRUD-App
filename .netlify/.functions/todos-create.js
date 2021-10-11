const faunadb = require("faunadb");
const chalk = require("jest-matcher-utils/node_modules/chalk");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(data);
  console.log("Function 'todo-create' invoked");

  const todoItem = {
    data,
  };

  try {
    const res = await client.query(q.Create(q.Ref("classes/todos"), todoItem));

    console.log(chalk.green("Success", res));

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    console.log(chalk.red("error", err));

    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
};
