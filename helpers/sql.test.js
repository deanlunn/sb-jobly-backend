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

describe("sqlForPartialUpdate", () => {
  it("should generate correct SQL query components", () => {
    // Test input data
    const dataToUpdate = {
      firstName: "Aliya",
      age: 32,
    };
    const jsToSql = {
      firstName: "first_name",
    };

    // Expected output
    const expectedSetCols = `"first_name"=$1, "age"=$2`;
    const expectedValues = ["Aliya", 32];

    // Call the function to generate SQL query components
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    // Assert the generated SQL components match the expected values
    expect(result.setCols).toEqual(expectedSetCols);
    expect(result.values).toEqual(expectedValues);
  });

  it("should throw BadRequestError when dataToUpdate is an empty object", () => {
    // Test input data
    const dataToUpdate = {};
    const jsToSql = {
      firstName: "first_name",
    };

    // Call the function and expect it to throw a BadRequestError
    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrow(BadRequestError);
  });
});
