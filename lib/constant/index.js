//版本号
export const VERSION = '0.1.4'

//未知
export const UNKNOWN = 'Unknown'

//整数相关
export const INT_3B_MAX = 255; //3位最大整数值,tinyint(3)
export const INT_5B_MAX = 65535; //5位最大整数值,smallint(5)
export const INT_8B_MAX = 16777215; //8位最大整数值,mediumint(8)
export const INT_10B_MAX = 4294967295; //10位最大整数值,int(10)

//有效期时间
export const TTL_LONG = 0; //永久
export const TTL_DEFAULT = 1800; //默认时间30分钟
export const TTL_ONE_MONTH = 2592000; //时间1月
export const TTL_HALF_MONTH = 1296000; //时间0.5月
export const TTL_ONE_WEEK = 604800; //时间1周
export const TTL_ONE_DAY = 86400; //时间1天
export const TTL_HALF_DAY = 43200; //时间0.5天
export const TTL_ONE_HOUR = 3600; //时间1小时
export const TTL_HALF_HOUR = 1800; //时间半小时
export const TTL_FIF_MINUTE = 900; //时间15分钟
export const TTL_TEN_MINUTE = 600; //时间10分钟
export const TTL_FIV_MINUTE = 300; //时间5分钟
export const TTL_TWO_MINUTE = 120; //时间2分钟
export const TTL_ONE_MINUTE = 60; //时间1分钟

//本库自定义分隔符
export const DELIMITER = '$@#KSYSK#@$';

//动态密钥长度,须<32
export const DYNAMIC_KEY_LEN = 8;

export default {
    VERSION,
    UNKNOWN,
    INT_3B_MAX,
    INT_5B_MAX,
    INT_8B_MAX,
    INT_10B_MAX,
    TTL_LONG,
    TTL_DEFAULT,
    TTL_ONE_MONTH,
    TTL_HALF_MONTH,
    TTL_ONE_WEEK,
    TTL_ONE_DAY,
    TTL_HALF_DAY,
    TTL_ONE_HOUR,
    TTL_HALF_HOUR,
    TTL_FIF_MINUTE,
    TTL_TEN_MINUTE,
    TTL_FIV_MINUTE,
    TTL_TWO_MINUTE,
    TTL_ONE_MINUTE,
    DELIMITER,
    DYNAMIC_KEY_LEN,
}
