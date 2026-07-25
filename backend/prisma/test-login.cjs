const http = require('http')

const req = http.request(
  {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  (res) => {
    let body = ''
    res.on('data', (chunk) => (body += chunk))
    res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body))
  }
)

req.write(
  JSON.stringify({
    email: 'admin@ottopia.vn',
    password: 'super_secret_admin_password_123',
  })
)
req.end()
