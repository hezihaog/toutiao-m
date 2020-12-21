/**
 * 本地存储封装模块
 */

/**
 * 获取一个键值对数据
 * @param name key
 */
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    //如果不是json字符串，则直接原样返回
    return data
  }
}

/**
 * 保存一个键值对数据
 */
export const setItem = (name, value) => {
  //如果value是对象，就将value转为JSON
  if (typeof value === 'object') {
    window.localStorage.setItem(name, JSON.stringify(value))
  } else {
    window.localStorage.setItem(name, value)
  }
}

/**
 * 删除一个键值对
 */
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
