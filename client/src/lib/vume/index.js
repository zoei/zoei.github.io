
export function createApiAction(defaultActionType, func = ()=>{}, defaultTransformer) {
  return async (
    { commit, state },
    params = {},
    { actionType = defaultActionType, transformer = defaultTransformer } = {},
  ) => {
    try {
      commit(actionType + '_request', { params: params });
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

export default {
  function module({ name, state, getters, actions, mutations }) {
    return {
      state,
      getters,
      actions,
      mutations
    }
  }
}