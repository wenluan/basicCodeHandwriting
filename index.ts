// 获取当前本地时间，如果在 0点到 8点，返回 good morning, 8点到12点 中午好，12点到下午6点 下午好，
// 18点到 24点 晚上好

enum TimeRange {
  Morning,
  Zhongwu,
  Afternoon,
  Evening,
}

const Hello = {
  [TimeRange.Morning]: '早上好',
  [TimeRange.Zhongwu]: '中午好',
  [TimeRange.Afternoon]: '下午好',
  [TimeRange.Evening]: '晚上好',
}

const morningContition = (hour: number) => {
  if (hour >= 0 && hour < 8) {
    return TimeRange.Morning;
  }
  if (hour >= 8 && hour < 12) {
    return TimeRange.Zhongwu;
  }
  if (hour >= 12 && hour < 18) {
    return TimeRange.Afternoon;
  }
  if (hour >= 18 && hour < 24) {
    return TimeRange.Evening;
  }
}

const morningHello = () => {
  return TimeRange.Morning;
}

const zhongwuHello = () => {
  return TimeRange.Zhongwu;
}

const afternoomHello = () => {
  return TimeRange.Afternoon;
}

const eveningHello = () => {
  return TimeRange.Evening;
}

// const map = {
//   []: morningHello,
//   []: zhongwuHello,
//   []: afternoomHello,
//   []: eveningHello,
// }

// const getTimeRange = (hour: number): TimeRange => {
//   return map[getHelloType(hour)]();
// }

// export const sayHello = (): string => {
//   const hour = new Date().getHours();
//   return Hello[getTimeRange(hour)];
// }