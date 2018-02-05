'use strict'
module.exports = {
  ERRORCODE: {
    SUCCESS: '0000', // 运行成功
    ERROR: '1001'// 运行失败
  },
  RESULTCODE: {
    SUCCESS: '0000', // 业务处理正确标志
    DEFEATED: '1001'// 业务处理失败
  },
  makeSuccess: function (data = null, desc = '业务运行成功', msg = '成功') {
    return { error: this.ERRORCODE.SUCCESS, msg: msg, result: { error: this.RESULTCODE.SUCCESS, data: data, desc: desc } }
  },
  makeError: function (data = null, desc = '业务功能未能成功完成', msg = '系统异常退出') {
    return { error: this.ERRORCODE.ERROR, msg: msg, result: { error: this.RESULTCODE.DEFEATED, data: data, desc: desc } }
  },
  makeDefeated: function (data = null, desc = '业务功能未能成功完成', msg = '成功') {
    return { error: this.ERRORCODE.SUCCESS, msg: msg, result: { error: this.RESULTCODE.DEFEATED, data: data, desc: desc } }
  }
}
