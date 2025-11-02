import express from "express";
import cookieParser from "cookie-parser";
import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT;
// Enable middleware for parsing cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

const baseUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard";
const credentials = { username: process.env.OPENCRX_USERNAME, password: process.env.OPENCRX_PASSWORD};

const config = {
  headers: { Accept: "application/json" },
  auth: credentials,
};

// -------------------- ASYNC/AWAIT + AXIOS + REST INTERFACE --------------------

// Example of providing a simple REST-based interface and consuming another REST API (OpenCRX) using Axios.
// async/await is used for handling asynchronous HTTP requests in a clean way (instead of Callbacks)
// app.get("/accounts", async (req, res) => {
//   try {
//     // Await: Pauses until Axios finishes fetching data
//     const response = await axios.get(`${baseUrl}/account`, config);
//     const accounts = response.data.objects;

//     // Store last fetch timestamp in a cookie
//     res.cookie("lastFetch", new Date().toISOString(), { httpOnly: true });

//     // Send fetched account data as JSON
//     res.json(accounts);
//   } catch (error) {
//     // Error handling for failed async operation
//     console.error(error);
//     res.status(500).send("Error fetching accounts");
//   }
// });

// Start Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
