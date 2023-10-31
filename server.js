const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dữ liệu mẫu
const users = [
  {
    userId: 10,
    userName: "Nguyễn Văn A",
  },
  {
    userId: 2,
    userName: "David",
  },
];

// API lấy tất cả dữ liệu người dùng
app.get("/", (req, res) => {
  return res.json(users);
});

// API thêm mới người dùng
app.post("/", (req, res) => {
  const { userId, userName } = req.body;
  if (!userId || !userName) {
    return res.status(400).json({ error: "userId and userName are required." });
  }
  users.push({ userId, userName });
  return res.json({ message: "User added successfully." });
});

// API cập nhật thông tin người dùng theo userId
app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { userName } = req.body;
  const user = users.find((u) => u.userId === id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  user.userName = userName;
  return res.json({ message: "User updated successfully." });
});

// API lấy thông tin người dùng theo userId
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.userId === id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  return res.json(user);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
