"use strict";

module.exports = function detectLabels(fileName) {
  const vision = require("@google-cloud/vision");

  const client = new vision.ImageAnnotatorClient({
    projectId: "receipt-detection-app",
    keyFilename: "googleSecret/cloudKey.json"
  });

  return client
    .labelDetection(fileName)
    .then(result => {
      const labels = result.labelAnnotations;
      const isReceipt = labels.filter(
        label => label.description === "Receipt" && label.score > 0.8
      );
      if (isReceipt) {
        return true;
      }
      return false;
    })
    .catch(error => console.error(error));
};
