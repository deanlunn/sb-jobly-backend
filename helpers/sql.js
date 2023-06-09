const { BadRequestError } = require("../expressError");

/**
 * Helper that generates the SET clause and corresponding values for an update SQL statement.
 * @param {object} dataToUpdate - The data object containing the columns to update and their new values.
 * @param {object} jsToSql - The mapping object to convert JavaScript property names to SQL column names (optional).
 * @returns {object} An object with setCols and values properties.
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
