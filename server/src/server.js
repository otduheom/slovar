const path = require('path');
const express = require('express');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
  app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
});
