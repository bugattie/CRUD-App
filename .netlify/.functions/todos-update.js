const faunadb = require("faunadb");
const chalk = require("jest-matcher-utils/node_modules/chalk");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log(`Function 'todo-update' invoked. Update id: ${"document id"}`);

  try {
    const res = await client.query(
      q.Update(q.Ref(`classes/todos/${id}`), { data })
    );

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
