const path = require('path')
const Formidable = require('formidable')

const generalForm = new Formidable.IncomingForm({
  uploadDir: path.resolve(__dirname, '../../public/general'),
  keepExtensions: true,
  maxFieldsSize: 2 * 1024 * 1024,
  maxFields: 1000,
  hash: false // sha1, md5
})

const imageForm = new Formidable.IncomingForm({
  uploadDir: path.resolve(__dirname, '../../public/image'),
  keepExtensions: true,
  maxFieldsSize: 2 * 1024 * 1024,
  maxFields: 1000,
  hash: false // sha1, md5
})

const mediaForm = new Formidable.IncomingForm({
  uploadDir: path.resolve(__dirname, '../../public/media'),
  keepExtensions: true,
  maxFieldsSize: 2 * 1024 * 1024,
  maxFields: 1000,
  hash: false // sha1, md5
})

module.exports = {
  upload: async (ctx) => {
    let files = []
    let message = '上传成功'
    generalForm.on('file', (field, file)=>{
      const { name, path: filePath } = file
      let filename = path.basename(filePath)
      files.push({
        originName: name,
        name: filename,
        url: `http://r2.zoei.cc/${filename}`
      })
    })
    generalForm.on('error', function(err) {
      console.log('upload error', err)
      message = err.message
    })
    generalForm.on('aborted', function() {
      console.log('upload aborted')
    })
    generalForm.parse(ctx.req)
    await new Promise((resolve, reject) => {
      generalForm.on('end', resolve)
    })
    ctx.body = {
      status: 0,
      files,
      message
    }
  },
  image: async (ctx) => {
    let files = []
    let message = '上传成功'
    imageForm.on('file', (field, file)=>{
      const { name, path: filePath } = file
      let filename = path.basename(filePath)
      files.push({
        originName: name,
        name: filename,
        url: `http://r1.zoei.cc/${filename}`
      })
    })
    imageForm.on('error', function(err) {
      console.log('upload error', err)
      message = err.message
    })
    imageForm.on('aborted', function() {
      console.log('upload aborted')
    })
    imageForm.parse(ctx.req)
    await new Promise((resolve, reject) => {
      imageForm.on('end', resolve)
    })
    ctx.body = {
      status: 0,
      files,
      message
    }
  },
  media: async (ctx) => {
    let files = []
    let message = '上传成功'
    mediaForm.on('file', (field, file)=>{
      const { name, path: filePath } = file
      let filename = path.basename(filePath)
      files.push({
        originName: name,
        name: filename,
        url: `http://r3.zoei.cc/${filename}`
      })
    })
    mediaForm.on('error', function(err) {
      console.log('upload error', err)
      message = err.message
    })
    mediaForm.on('aborted', function() {
      console.log('upload aborted')
    })
    mediaForm.parse(ctx.req)
    await new Promise((resolve, reject) => {
      mediaForm.on('end', resolve)
    })
    ctx.body = {
      status: 0,
      files,
      message
    }
  }
}