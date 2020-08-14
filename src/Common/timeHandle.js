const dateHandle = (oldTime) => {
  let subTime = oldTime.toString().substring(0, 10);
  const newTime = new Date(subTime);
  const year = newTime.getFullYear() + "年";
  const month = newTime.getMonth() + 1 + "月";
  const day = newTime.getDate() + "日";
  return year + month + day;
}
const removeTFromTime = (time) => {
  return time.toString().replace("T", " ");
}
export {
  dateHandle,
  removeTFromTime
}
