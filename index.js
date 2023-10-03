const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const spesies = require('./routes/spesies');
const periode = require('./routes/periode');
const habitat = require('./routes/habitat');
const klasifikasi = require('./routes/klasifikasi');
const ciri = require('./routes/ciri');
const fosil = require('./routes/fosil');
const temuan = require('./routes/temuan');

app.use('/spesies', spesies);
app.use('/periode', periode);
app.use('/habitat', habitat);
app.use('/klasifikasi', klasifikasi);
app.use('/ciri', ciri);
app.use('/fosil', fosil);
app.use('/temuan', temuan);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
