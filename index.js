import express from "express";
import cookieParser from "cookie-parser";
import axios from "axios";
import dotenv from "dotenv";

import salesmanRoutes from "./routes/salesman.routes.js"; // CJS default interop works

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

const baseUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard";
const credentials = { username: process.env.OPENCRX_USERNAME, password: process.env.OPENCRX_PASSWORD };
const config = { headers: { Accept: "application/json" }, auth: credentials };

// Example OpenCRX route (optional)
// app.get("/accounts", async (req, res) => {
//   try {
//     const { data } = await axios.get(`${baseUrl}/account`, config);
//     res.cookie("lastFetch", new Date().toISOString(), { httpOnly: true });
//     res.json(data.objects);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching accounts");
//   }
// });

// Salesmen API (in-memory)
app.use("/salesman", salesmanRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
