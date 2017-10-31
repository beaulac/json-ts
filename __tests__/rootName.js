const json2ts = require('../').json2ts;

const json = `
{
  "id": 15
}
`;

const expected = `
interface MyRoot {
    id: number;
}
`;

it('works with prefix=blank string', function() {
    expect(json2ts(json, {rootName: "MyRoot", prefix: ""})).toEqual(expected.slice(1));
});

const prefixNoRootExpected = `
interface Prefix {
    id: number;
}
`;

it('works with prefix and rootName=blank string', function() {
    expect(json2ts(json, {rootName: "", prefix: "Prefix"})).toEqual(prefixNoRootExpected.slice(1));
});
