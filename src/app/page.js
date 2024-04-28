// pages/index.js

import pool from "../utils/postgres";

const fetchDatafromDB = async () => {
  try {
    const client = await pool.connect();
    console.log("connected to pg");

    const result = await client.query("SELECT quotes_text FROM quotes");
    const data = result.rows;
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return [];
  }
};

const Page = () => {
  let data;

  if (process.env.DB_URL) {
    // If DB_URL is provided, use it to connect
    console.log("Using DB_URL to connect to the database.");
    data = fetchDatafromDB(process.env.DB_URL);
  } else {
    // Otherwise, fallback to the local database configuration
    console.log("DB_URL not found");
  }

  return (
    <div>
      <h1>Quotes Data</h1>
      {data.length > 0 && ( // Check if data exists before rendering
        <ul>
          {data.map((quote) => (
            <li key={quote.id}> {/* Assuming a unique ID for each quote */}
              {quote.text} {/* Replace with quote.quotes_text if column name is different */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;





















