/**
 * 搜索类型
 *
 * @export
 * @enum {number}
 */
export enum SearchType {
  /**
   * 开始
   */
  start,

  /**
   * 结束
   */
  end,
}

/**
 * 添加线路类型
 *
 * @export
 * @enum {number}
 */
export enum AddType {
  /**
   * 自动规划
   */
  auto,

  /**
   * 手动规划
   */
  semiautomatic,

  /**
   * 手动基准点
   */
  manual,
}

/**
 * 经纬度模型
 *
 * @export
 * @interface lngLat
 */
export interface LocationType {
  Order: number;
  Logintude: number;
  Latitude: number;
}
