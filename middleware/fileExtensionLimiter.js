import path from "path"

const fileExtentionLimiter = (allowedExtArray) => {
    return (request, response, next) => {
        const files = request.files

        const fileExtentions = []

        console.log(typeof(files))

        if(typeof(files) === "array") {

            files.forEach(file => {
                fileExtentions.push(path.extname(file.name))
            });
        } else if (typeof(files) === "object") {
            fileExtentions.push(path.extname(files.file.name))
        }

        console.log("FileExtentions array: ", fileExtentions)

        //are the extentions allowed?
        const allowed = fileExtentions.every(ext => allowedExtArray.includes(ext))

        if(!allowed) {
            return response.status(422).json({status: "error", message: `Wrong file extention. Only ${allowedExtArray} allowed.`})
        }

        next()
    }
}

export default fileExtentionLimiter