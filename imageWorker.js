// imageWorker.js
const fs = require('fs');
const { parentPort,isMainThread } = require('worker_threads');
const path = require('path')

// Receive the file path from the main thread
// parentPort.on('message', (filePath) => {
//     try {
//         // Simulate image processing (you can replace this with actual image processing code)
//         const data = fs.readFileSync(filePath);
        
//         // Simulate processing (e.g., saving a processed file)
//         console.log(filePath,"llllllllllllllll")
//         const outputFilePath = filePath.replace('.jpg', '_processed.jpg');
//         console.log(outputFilePath,"ooooooooooooooooo")
//         fs.writeFileSync(outputFilePath, data); // Example of writing a processed file

//         parentPort.postMessage('Image processed successfully');
//     } catch (error) {
//         parentPort.postMessage('Error processing image: ' + error.message);
//     }
// });

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

