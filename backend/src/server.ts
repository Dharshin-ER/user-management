import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

// app.get("/", (req, res) => {
//   res.send("Port running on 3001");
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.query;
//   if (true) {
//     res.json({ success: true, message: "Login Successful" });
//   } else {
//     res.json({ success: false, message: "Invalid username or password" });
//   }
// });

// app.post("/register", (req, res) => {
//   const { username, email, password } = req.query;
//   // Add registration logic here
// });

// app.get("/users", (req, res) => {
//   const users = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Johnson" },
//   ];
//   res.json(users);
// });

debugger;

console.log("SERVER STARTED");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
