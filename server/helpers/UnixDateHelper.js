function timeConverter(UNIX_timestamp) {
  var sdate = new Date(UNIX_timestamp).toLocaleDateString("en-US");
  var stime = new Date(UNIX_timestamp).toLocaleTimeString("en-US");

  //   var a = new Date(UNIX_timestamp * 1000);
  //   var months = [
  //     "01",
  //     "02",
  //     "03",
  //     "04",
  //     "05",
  //     "06",
  //     "07",
  //     "08",
  //     "09",
  //     "10",
  //     "11",
  //     "12",
  //   ];
  //   var year = a.getFullYear();
  //   var month = months[a.getMonth()];
  //   var date = a.getDate();
  //   var hour = a.getHours();
  //   var min = a.getMinutes();
  //   var sec = a.getSeconds();
  var time = sdate + " | " + stime;
  return time;
}

module.exports = {
  timeConverter,
};
