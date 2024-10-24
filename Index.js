const express = require('express');
const multer = require('multer');
const path = require('path');
const {Worker,isMainThread}=require('worker_threads')
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        // Use original filename
        cb(null, file.originalname); // Save file with its original name
    }
});

const upload = multer({ storage });

app.post('/image-process', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    const originalFilename = req.file.originalname;
    // Create a worker to process the file
    const worker = new Worker(path.resolve(__dirname, 'imageWorker.js'));

    // Send the file path and original filename to the worker for processing
    worker.postMessage({ filePath, originalFilename });

    // Listen for messages from the worker
    worker.on('message', (message) => {
        res.send(message);

        //  delete the uploaded file after processing
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting the file:', err);
        });
    });

    // Handle any errors from the worker
    worker.on('error', (err) => {
        res.status(500).send('Error processing image: ' + err.message);
    });

    // Terminate the worker after it's done
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(new Error(`Worker stopped with exit code ${code}`));
        }
    
    });

// calling random to show main thread is not blocked 
//console from random will log first than image process
    random()
});

const random=()=>{
    if(isMainThread){
        console.log("running on main thread")
    }
let sum=0
    for (let i=0;i<=100000000;i++){
sum=sum+1
    }
    console.log(sum)
}

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
