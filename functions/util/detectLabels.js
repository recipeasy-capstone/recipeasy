"use strict";

module.exports = async function detectLabels(fileName) {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient({
    projectId: "receipt-detection-app",
    keyFilename: "googleSecret/cloudKey.json"
  });

  const [result] = await client.labelDetection(fileName)
  const labels = result.labelAnnotations;
  const isReceipt = labels.filter(
    label => label.description === "Receipt" && label.score > 0.80
  );
  if (isReceipt) {
    return true
  }
  return false
};
