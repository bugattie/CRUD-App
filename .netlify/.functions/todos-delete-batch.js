const faunadb = require("faunadb");
const chalk = require("jest-matcher-utils/node_modules/chalk");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log("data", data);

  console.log("Function `todo-delete-batch` invoked", data.ids);

  const deleteAllCompletedTodoQuery = data.ids.map((id) => {
    return q.Delete(q.Ref(`classes/todos/${id}`));
  });

  try {
    const res = await client.query(deleteAllCompletedTodoQuery);

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
