import BaseService from '../BaseService';

import { getUrl } from '../UrlManager'

import Logger from 'core/logger'
const logger = new Logger('UploaderService')

const urllib = OSS.urllib;
const Buffer = OSS.Buffer;
const OSS = OSS.Wrapper;
const STS = OSS.STS;
/**
 * 上传组件的相关服务
 *
 * @export
 * @class UploaderService
 * @extends {BaseService}
 */
export class OSSUploaderService extends BaseService {

  MODULE = 'ossuploader'

  constructor(options = {
    multiple: true,
    url: 'http://localhost:3000',
    bucket: '<bucket-name>',
    region: 'oss-cn-hangzhou'
  }) {
    super()
    this.opts = options
    this.init()
  }

  init = async () => {
    this.client = await this.getToken()
  }

  getToken = async () => {
    const { url, region, bucket } = this.opts
    try {
      let result = await urllib.request(url, {
        method: 'GET'
      })
      let creds = JSON.parse(result.data)
      let client = new OSS({
        region: region,
        accessKeyId: creds.AccessKeyId,
        accessKeySecret: creds.AccessKeySecret,
        stsToken: creds.SecurityToken,
        bucket: bucket
      })
      return Promise.resolve(client)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  uploadFile(file, key, { onSuccess, onProgress } = {}) {
    if (!this.client) {
      this.client = await this.getToken()
    }
    // var file = document.getElementById('file').files[0]
    // var key = document.getElementById('object-key-file').value.trim() || 'object'
    console.log(file.name + ' => ' + key);

    return this.client.multipartUpload(key, file, {
      progress: onProgress
    }).then(function (res) {
      console.log('upload success: %j', res)
      onSuccess(res)
    });
  }
}

export default new OSSUploaderService()