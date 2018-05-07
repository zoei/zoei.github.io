import enumerate from './enum'
// import { localStorage } from './storage'
// const loggerStore = localStorage('logger')
const loggerStore = {
  get() {
    return 1
  },
  set() {

  }
}
const levelConfig = loggerStore.get('level')

export const LEVEL_DEBUG = 1
export const LEVEL_LOG = 2
export const LEVEL_INFO = 4
export const LEVEL_WARN = 8
export const LEVEL_ERROR = 16

export const LEVELS = enumerate({
  log: LEVEL_LOG,
  debug: LEVEL_DEBUG,
  info: LEVEL_INFO,
  warn: LEVEL_WARN,
  error: LEVEL_ERROR
})

const consoleMock = console

export default class Logger {

  static LEVEL_DEBUG = LEVEL_DEBUG
  static LEVEL_LOG = LEVEL_LOG
  static LEVEL_INFO = LEVEL_INFO
  static LEVEL_WARN = LEVEL_WARN
  static LEVEL_ERROR = LEVEL_ERROR

  static level = typeof levelConfig === 'undefined' ? LEVEL_DEBUG + LEVEL_LOG + LEVEL_INFO + LEVEL_WARN + LEVEL_ERROR : levelConfig
  static isOut = true

  static output = consoleMock

  /**
   * 关闭LOG
   *
   * @static
   */
  static switchOff() {
    Logger.isOut = false
  }

  /**
   * 打开LOG
   *
   * @static
   */
  static switchOn() {
    Logger.isOut = true
  }

  /**
   * 打开全部LOG
   *
   * @static
   */
  static enableAll() {
    Logger.level = Logger.LEVEL_DEBUG + LEVEL_LOG + LEVEL_INFO + LEVEL_WARN + LEVEL_ERROR
    loggerStore.set('level', Logger.level)
  }

  /**
   * 打开某些LOG
   *
   * @static
   * @param levels 某些LOG
   */
  static enable(...levels) {
    Logger.level = levels.reduce((prev, cur)=>prev & cur ? prev : prev + cur, Logger.level)
    loggerStore.set('level', Logger.level)
  }

  /**
   * 关闭某些LOG
   *
   * @static
   * @param levels 某些LOG
   */
  static disable(...levels) {
    Logger.level = levels.reduce((prev, cur)=>prev & cur ? prev - cur : prev, Logger.level)
    loggerStore.set('level', Logger.level)
  }

  /**
   * 切换某些LOG
   *
   * @static
   * @param {any} level
   */
  static toggle(...levels) {
    Logger.level = levels.reduce((prev, cur)=>prev & cur ? prev - cur : prev + cur, Logger.level)
    loggerStore.set('level', Logger.level)
  }

  /**
   * 设置LOG
   *
   * @static
   * @param level LOG
   */
  static setLevel(level) {
    Logger.level = typeof level === 'number' ? level : Logger.level
    loggerStore.set('level', Logger.level)
  }

  static setOutput(output = consoleMock) {
    Logger.output = output
  }

  constructor(schema = '') {
    this.schema = schema
  }

  /**
   * debug
   *
   * @param args (description)
   */
  debug(...args) {
    this.out(LEVEL_DEBUG, ...args)
  }

  /**
   * log
   *
   * @param args (description)
   */
  log(...args) {
    this.out(LEVEL_LOG, ...args)
  }

  /**
   * info
   *
   * @param args (description)
   */
  info(...args) {
    this.out(LEVEL_INFO, ...args)
  }

  /**
   * warn
   *
   * @param args (description)
   */
  warn(...args) {
    this.out(LEVEL_WARN, ...args)
  }

  /**
   * error
   *
   * @param args (description)
   */
  error(...args) {
    this.out(LEVEL_ERROR, ...args)
  }

  out(level, ...args) {
    if (Logger.isOut && Logger.level & level) {
      let schema = this.schema
      try {
        if (schema) {
          Logger.output[LEVELS[level]](`[${schema}]`, ...args)
        } else {
          Logger.output[LEVELS[level]](...args)
        }
      } catch (e) {
        if (schema) {
          Logger.output[LEVELS[level]](`[${schema}]`, args)
        } else {
          Logger.output[LEVELS[level]](args)
        }
      }
    }
  }
}

/**
 * 获取实例
 *
 * @export
 * @param schema schema
 * @returns Logger实例
 */
export function createLogger(schema) {
  return new Logger(schema)
}

// window.Logger = Logger
// window.console = new Logger('')