const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

/**
 * Test suite for the sqlForPartialUpdate function.
 */
describe("sqlForPartialUpdate", () => {
  // Test case: valid input data
  it("returns the setCols and values for a valid input", () => {
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };
    const jsToSql = {
      firstName: "first_name",
    };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  // Test case: empty dataToUpdate object
  it("throws BadRequestError for empty dataToUpdate object", () => {
    const dataToUpdate = {};
    const jsToSql = {
      firstName: "first_name",
    };

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });
});
