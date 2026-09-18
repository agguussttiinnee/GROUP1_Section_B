// Package imports
const express = require('express')

const app = express()

app.use('/', require('./routes/users.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/me', require('./routes/users.routes'))

app.listen(1234, () => {
	console.log('Server is running on http://localhost:1234')
})