import BaseService from '../BaseService';

import { getUrl } from '../UrlManager'
import uploader from 'core/uploader'

import Logger from 'core/logger'
const logger = new Logger('UploaderService')

/**
 * 上传组件的相关服务
 *
 * @export
 * @class UploaderService
 * @extends {BaseService}
 */
export class UploaderService extends BaseService {

  MODULE = 'uploader'

  constructor(optional = {
    multiple: true
  }) {
    super()
    let me = this
    uploader.init({
      uploadUrl: getUrl('uploadImg'),
      maxUploads: 10,
      multiple: optional.multiple,
      selected(data) {
        me.onSelected(data)
      },
      progress(data) {
        me.onProgress(data)
      },
      fail(data) {
        me.onFail(data)
      },
      success(data) {
        me.onSuccess(data)
      }
    })
  }

  onSelected(data) {
    logger.debug('onSelected', data)
    if (this.selectedCallback) this.selectedCallback(data)
    this.emit('selected', data)
  }

  onProgress(data) {
    logger.debug('onProgress', data)
    if (this.progressCallback) this.progressCallback(data)
    this.emit('progress', data)
  }

  onFail(data) {
    logger.debug('onFail', data)
    if (this.failCallback) this.failCallback(data)
    this.emit('fail', data)
  }

  onSuccess(data) {
    logger.debug('onSuccess', data)
    if (this.successCallback) this.successCallback(data)
    this.emit('success', data)
  }

  chooseFiles() {
    logger.debug('chooseFiles')
    uploader.chooseFiles()
  }

  uploadFiles(files) {
    logger.debug('uploadFiles', files)
    uploader.uploadFiles(files)
  }

  reset() {
    logger.debug('reset')
    uploader.reset()
  }

  registerCallback({ selected, progress, success, fail } = {}) {
    logger.debug('registerCallback')
    this.selectedCallback = selected
    this.progressCallback = progress
    this.successCallback = success
    this.failCallback = fail
  }

  init({ selected, progress, success, fail } = {}) {
    this.registerCallback({ selected, progress, success, fail })
  }
}

export default new UploaderService()

export const SingleUploadService = new UploaderService({ multiple: false })