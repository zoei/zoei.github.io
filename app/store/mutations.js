
export function createApiMutations(types) {
  let mutationMap = {}
  types.forEach(type=>{
    mutationMap[type + '_request'] = function (state, data) {}
    mutationMap[type] = function (state, data) {}
    mutationMap[type + '_failure'] = function (state, data) {}
  })
  console.log('mutationMap', mutationMap)
  return mutationMap
}