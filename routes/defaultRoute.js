// defaultRoute.js
import { Router } from "express";
import { apiCall } from "../helper/consoleLog.js";

const router = Router();

const defaultRoute = (req, res) => {
  res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f0f8ff;
              color: #333;
              text-align: center;
              padding: 50px;
            }
            h1 {
              color: #ff6347;
              font-size: 3em;
              animation: bounce 2s infinite;
            }
            p {
              font-size: 1.5em;
              margin-top: 20px;
              color: #4682b4;
            }
            @keyframes bounce {
              0% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0); }
            }
          </style>
        </head>
        <body>
          <h1>Welcome to the ShiftMe Server! 🚀</h1>
          <p>We’re up and running on port ${process.env.PORT || 5000} 🚀</p>
          <p>Feel free to explore the app and enjoy the ride! 🌟</p>
        </body>
      </html>
    `);
};

router.get("/", async (req, res) => {
  apiCall("Call Default Route");
  defaultRoute(req, res);
});

export default router;
