const faunadb = require("faunadb");
const chalk = require("jest-matcher-utils/node_modules/chalk");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  console.log("Function `todo-read-all` invoked");

  try {
    const response = await client.query(
      q.Paginate(q.Match(q.Ref("indexes/all_todos")))
    );

    console.log(chalk.green("Success", response));

    const todoRefs = response.data;
    console.log("Todo refs", todoRefs);
    console.log(`${todoRefs.length} todos found`);

    const getAllTodoDataQuery = todoRefs.map((ref) => {
      return q.Get(ref);
    });

    const ret = client.query(getAllTodoDataQuery);

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
