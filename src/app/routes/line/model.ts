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
 * 经纬度模型
 *
 * @export
 * @interface lngLat
 */
export interface LocationType {
  Logintude: number;
  Latitude: number;
}
