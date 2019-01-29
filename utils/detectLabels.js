'use strict'

module.exports = async function detectLabels(fileName) {
  const vision = require('@google-cloud/vision')

  const client = new vision.ImageAnnotatorClient({
    projectId: 'receipt-detection-app',
    keyFilename: '../secrets/cloudKey.json'
  })

  const [result] = await client.labelDetection(fileName)
  const labels = result.labelAnnotations
  return labels.filter(label =>
    label.description === 'Receipt'
    && label.score > 0.5)
}
