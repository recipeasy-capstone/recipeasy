const path = require('path');
const express = require('express');
const morgan = require('morgan');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  projectId: 'receipt-detection-app',
  keyFilename: 'secrets/cloudKey.json',
});
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', '/public')));

app.use('/textDetect', async (req, res, next) => {
  try {
    const [result] = await client.textDetection(
      path.join(__dirname, '../public/receipt.jpg')
    );
    const detections = result.textAnnotations;
    console.log('Text: ');
    res.json(detections);
  } catch (err) {
    next(err);
  }
});

app.use('/labelDetect', async (req, res, next) => {
  try {
    const [result] = await client.labelDetection(
      path.join(__dirname, '../public/receipt.jpg')
    );
    const labels = result.labelAnnotations;
    console.log('Labels: ');
    res.json(labels);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
