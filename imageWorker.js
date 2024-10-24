// imageWorker.js
const fs = require('fs');
const { parentPort,isMainThread } = require('worker_threads');
const path = require('path')

parentPort.on('message', ({ filePath, originalFilename }) => {

    if(!isMainThread){
        console.log("running on worker thread")
    }
    try {
        const data = fs.readFileSync(filePath);
        const outputFilePath = path.join('uploads', `processed_${originalFilename}`); // Save processed file with original name
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true }); // Ensure output directory exists
        fs.writeFileSync(outputFilePath, data); // Example of writing a processed file

        parentPort.postMessage('Image processed successfully');
    } catch (error) {
       throw new Error('Failed to process image.')
    }
});

