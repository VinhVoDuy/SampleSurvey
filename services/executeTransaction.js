const { sequelize } = require('../models');

const wrapNextLevelQuery = (queries, params, level, results) => {
  console.log("Level: " + level);
  if (level < queries.length + 1)
    return queries[level].call(this, ...params[level]).then((result) => {
      results[level] = result;
      wrapNextLevelQuery(queries, level + 1);
    });
}

module.exports = executeTransaction = (queries, params) => {
  let results = [];

  const p = new Promise((resolve, reject) => {
    wrapNextLevelQuery(queries, params, 1, results)
      .then(() => { resolve(results) })
      .catch((err) => { reject(err) });
  });

  return sequelize.transaction((t) => { return p });
}