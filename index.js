import pg from "pg";
import fs from "fs";
import { Parser } from "json2csv";
import YAML from "json-to-pretty-yaml";

const fields = ["name", "owner", "description", "topic", "language", "stars"];
const opts = { fields };

const { Pool } = pg;

const user = "postgres";
const password = "123456";
const host = "localhost";
const port = 5432;
const database = "boasPraticas";

const connection = new Pool({
  user,
  password,
  host,
  port,
  database,
});

let data;
const query = connection.query(`SELECT * FROM repositories where language=$1`, [
  "TypeScript",
]);

query.then((result) => {
  data = result.rows;
  const newData = data.filter((elem) => {
    return elem.tags.includes("react");
  });

  const toJson = JSON.stringify(newData);
  const jsonLegal = fs.readFileSync("./typescriptReact.json", {
    encoding: "utf8",
    flag: "r",
  });
  console.log(jsonLegal);
  const toYaml = YAML.stringify(jsonLegal);

  fs.writeFileSync("react-typescript-repos.yaml", toYaml);
});

/*   try {
    const parser = new Parser(opts);
    const csv = parser.parse(toJson);
    console.log("csv: ", csv);
    fs.writeFileSync("toCsv.csv", csv);
  } catch (err) {
    console.log(err);
  } */
