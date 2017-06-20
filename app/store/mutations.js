
export function createApiMutations(types) {
  let mutationMap = {}
  types.forEach(type=>{
    mutationMap[types + '_request'] = function (state, data) {}
    mutationMap[types] = function (state, data) {}
    mutationMap[types + '_failure'] = function (state, data) {}
  })
  return mutationMap
}