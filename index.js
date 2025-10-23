import express from "express";
import cookieParser from "cookie-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

const baseUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard";
const credentials = { username: "guest", password: "guest" };

const config = {
  headers: { Accept: "application/json" },
  auth: credentials,
};

// Set cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("user", "guest", {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
  });
  res.send("Cookie has been set!");
});

app.get("/get-cookie", (req, res) => {
  const user = req.cookies.user;
  if (user) {
    res.send(`Cookie value: ${user}`);
  } else {
    res.send("No cookie found!");
  }
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("user");
  res.send("Cookie deleted!");
});

app.get("/accounts", async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/account`, config);
    const accounts = response.data.objects;

    res.cookie("lastFetch", new Date().toISOString(), { httpOnly: true }); //save in cookie

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching accounts");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
