function getTimeText () {
  var now = new Date();
  var deadline = new Date(now.getFullYear() + 1, 0, 1);
  var diff = Math.floor((deadline - now) / 1000);

  var seconds = diff % 60;
  var minutes = Math.floor(diff / 60) % 60;
  var hours = Math.floor(diff / 60 / 60) % 24;
  var days = Math.floor(diff / 60 / 60 / 24) % 30; // 简化为每月30天
  var months = Math.floor(diff / 60 / 60 / 24 / 30) % 12;
  var years = Math.floor(diff / 60 / 60 / 24 / 30 / 12);

  return `还剩${years}年${months}月${days}天${hours}小时${minutes}分${seconds}秒`;
}

function main () {
  setInterval(() => {
    console.log(getTimeText());
  }, 1000);
}

main();
