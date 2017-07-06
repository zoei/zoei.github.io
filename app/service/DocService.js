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

  create = ({ title, author, content }) => {
    return this.fetch('CreateDoc', {}, { method: 'POST', body: { title, author, content } })
  }

  update = ({ id, title, author, content }) => {
    return this.fetch('UpdateDoc', {}, { method: 'PUT', body: { id, title, author, content } })
  }

  delete = ({ id }) => {
    return this.fetch('DeleteDoc', { id }, { method: 'DELETE' })
  }

  getList = ({ start, limit, last }) => {
    return this.fetch('GetDocs', { start, limit, last })
  }

  get = ({ id }) => {
    return this.fetch('GetDoc', { id })
  }
}

export default new DocService()
