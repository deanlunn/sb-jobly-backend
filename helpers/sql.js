const { BadRequestError } = require("../expressError");

/**
 * Generates an SQL query for a partial update operation
 * @param {object} dataToUpdate - An object containing the data to update.
 * @param {object} jsToSql - An object mapping Javascript object property names to their corresponding column names in the database.
 * @returns {object} An object with two properties setCols and values.
 *                   `setCols` represents the "SET" part of the update query.
 *                   `values` contains the values to be used in the update query.
 * @throws {BadRequestError} Throws an error if the dataToUpdate object is empty.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
