import Logger from '../core/logger'
const logger = new Logger('Actions')
import * as types from './mutation-types'

export const actions = {

}

/**
 * 创建Action
 *
 * @export
 * @param actionType Action类型
 */
export function createAction(actionType) {
  return (payload) => {
    return {
      type: actionType,
      payload
    }
  }
}

/**
 * 创建API Action
 *
 * @export
 * @param actionType Action类型
 * @param [func] 请求API方法，返回Promise
 * @param {any} defaultTransformer 数据转换器
 * @returns 请求之前dispatch { type: ${actionType}_request }
 *          请求成功dispatch { type: ${actionType}, payload: ${resolveData} }
 *          请求失败dispatch { type: ${actionType}_failure, payload: ${rejectData} }
 */
export function createApiAction(defaultActionType, func = ()=>{}, defaultTransformer) {
  return async (
    { commit, state },
    params = {},
    { actionType = defaultActionType, transformer = defaultTransformer } = {},
  ) => {
    try {
      commit(actionType + '_request', { params: params });
      console.log(1, params)
      let data = await func(params)
      // 数据转换器
      if (typeof transformer === 'function') data = transformer(data, params)
      commit(actionType, { params: params, payload: data })
      return Promise.resolve(data)
    } catch (e) {
      logger.error('createApiAction error', e)
      commit(actionType + '_failure', { params: params, payload: e })
      return Promise.reject(e)
    }
  }
}

/**
 * 创建API Action的三种ActionType
 *
 * @export
 * @param actionTypes ActionType列表
 * @returns API Action三种ActionType的集合, { GET_USER_REQUEST, GET_USER, GET_USER_FAILURE }
 *
 */
export function createApiActionTypes(actionTypes, initial = {}) {
  if (Array.isArray(actionTypes)) {
    return actionTypes.reduce((previous, current, index, array) => {
      let actionTypeValue = current.toLowerCase()
      previous[current + '_REQUEST'] = actionTypeValue + '_request'
      previous[current] = actionTypeValue
      previous[current + '_FAILURE'] = actionTypeValue + '_failure'
      return previous
		}, initial)
	} else if (actionTypes && typeof actionTypes === 'object') {
    return Object.keys(actionTypes).reduce((previous, current, index, array) => {
      let actionTypeValue = actionTypes[current].toLowerCase()
      previous[current + '_REQUEST'] = actionTypeValue + '_request'
      previous[current] = actionTypeValue
      previous[current + '_FAILURE'] = actionTypeValue + '_failure'
      return previous
    }, initial)
	}
}

function isFunction(val) {
  return typeof val === 'function';
}

function ownKeys(object) {
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object);
  }
  let keys = Object.getOwnPropertyNames(object);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(object));
  }
  return keys;
}
