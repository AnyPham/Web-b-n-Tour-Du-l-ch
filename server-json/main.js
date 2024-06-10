const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()
const { v4: uuidv4 } = require('uuid');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {

if (req.method === 'POST' && req.path.startsWith('/api/subComments')) {
    const { idComment, commenter, content } = req.body;
    // Tạo id ngẫu nhiên
    const id = uuidv4();
    const newRecord = { id ,idComment, commenter, content };
    // Thêm bản ghi mới vào cơ sở dữ liệu
    router.db.get('subComments').push(newRecord).write();
    res.status(201).json(newRecord);
  }

  if (req.method === 'POST' && req.path.startsWith('/api/users')) {
    const { username, fullname, email, phone, password } = req.body;
    // Tạo id ngẫu nhiên
    const id = uuidv4();
    const newRecord = { id, username, fullname, email, phone, password };
    // Thêm bản ghi mới vào cơ sở dữ liệu
    router.db.get('users').push(newRecord).write();
    res.status(201).json(newRecord);
  } else {
    // Continue to JSON Server router
    next();
  }
});




// Use default router
server.use("/api",router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})