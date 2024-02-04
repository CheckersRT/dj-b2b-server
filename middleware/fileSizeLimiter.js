const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (request, response, next) => {
    const files = request.files

    const filesOverLimit = []
    // which files are over limit?

    if(typeof(files) === "array") {
        files.forEach(file => {
            if(file.size > FILE_SIZE_LIMIT) {
                filesOverLimit.push(file.name)
            }
        });
    } else if (typeof(files) === "object") {
        if(files.file.size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files.file.name)
        }
    }

    if(filesOverLimit.length) {
        response.status(413).json({message: `A file is over the filesize limit (${FILE_SIZE_LIMIT}) `})
    }
    next();
}

export default fileSizeLimiter