export default function enumerate(config) {
  let enums = {}

  if (Array.isArray(config)) {
    config.forEach((value, index) => {
      enums[value] = index
      enums[index] = value
    });
  } else {
    Object.keys(config).forEach(key => {
      enums[key] = config[key]
      enums[enums[key]] = key
    })
  }
  return enums;
}