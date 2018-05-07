import BaseApiService, { instanceFactory } from './BaseApiService'
/**
 * 认证相关的服务
 *
 * @export
 * @class DocService
 * @extends {BaseApiService}
 */
export class DocService extends BaseApiService {

  MODULE = 'doc';
  API_VERSION = 'v1';

  create = ({ title, author, tags, content }) => {
    console.log('create',tags)
    return this.fetch('CreateDoc', {}, { method: 'POST', body: { title, author, tags, content } })
  }

  update = ({ id, title, author, tags, content }) => {
    return this.fetch('UpdateDoc', {}, { method: 'PUT', body: { id, title, author, tags, content } })
  }

  delete = ({ id }) => {
    return this.fetch('DeleteDoc', { id }, { method: 'DELETE' })
  }

  getList = ({ start, limit, tag, keyword }) => {
    return this.fetch('GetDocs', { start, limit, tag, keyword })
  }

  get = ({ id }) => {
    return this.fetch('GetDoc', { id })
  }
}

export default new DocService()
