declare namespace Api {}
/**
 * 业务接口类型声明
 */
declare namespace Model {
  interface dataType<T> {
    code: number
    data: T
    message: string
  }
  /** 通用接口返回对象 */
  interface IResponse<T = any> {
    /** 接口返回数据 */
    data: dataType<T>
    /** 接口返回状态码 */
    status: number
    /** 接口返回状态信息 */
    statusText: string
    /** 接口Response Header */
    headers?: any
    /** 接口Request请求总数据 */
    config: any
  }
  interface IError {
    /** 自定义错误码 */
    code: string
    /** 自定义错误信息 */
    message: string
  }
  /** 通用接口返回对象Promise */
  type IResponsePromise<T = any> = Promise<IResponse<T>>
}

/**
 * 通用接口返回对象Promiset 简称
 */
type MRP<T> = Model.IResponsePromise<T>
type MRPD<T> = Promise<T>
type AnyArray = any[]

declare let __wxConfig: any
