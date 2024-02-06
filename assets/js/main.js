/* side bar menu btn */

function showSideBar() {
  let sideBar = document.getElementById("sideBar");
  sideBar.classList.toggle("show-menu");
}

/*Progress Bar */
if (document.querySelector(".progress-bar-outside")) {
  let progressBar = document.querySelector(".progress-bar-outside");
  let value = 75;
  let value360 = value * 3.6;
  progressBar.style.background =
    "conic-gradient(#5700E9 " + value360 + "deg, #E9ECEF " + value360 + "deg)";
}

if (document.querySelector(".progress-bar-inside")) {
  let progressBar = document.querySelector(".progress-bar-inside");
  let value = 60;
  let value360 = value * 3.6;
  progressBar.style.background =
    "conic-gradient(#4FF9FD " + value360 + "deg, #E9ECEF " + value360 + "deg)";
}

if (document.getElementsByClassName("sale-stats-bar")) {
  let progressBar = document.getElementsByClassName("sale-stats-bar");
  let value = 90;
  let value360 = value * 3.6;
  for (let index = 0; index < progressBar.length; index++) {
    progressBar[index].style.background =
      "conic-gradient(#001AFF " +
      value360 +
      "deg, #E9ECEF " +
      value360 +
      "deg)";
  }
}

/* Conversions Chart*/
if (document.getElementById("conversions-chart")) {
  var dom = document.getElementById("conversions-chart");
  var myChart = echarts.init(dom, null, {
    renderer: "svg",
    useDirtyRect: false,
  });
  var app = {};

  var option;

  var series = [
    {
      data: [80, 100, 50, 80, 50, 70, 100],
      type: "bar",
      stack: "a",
      name: "a",
      barWidth: 10,
      color: "#5700E9",
    },
    {
      data: [70, 96, 64, "70", 40, "80", 100],
      type: "bar",
      stack: "a",
      name: "b",
      color: "#4FF9FD",
    },
  ];
  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: [],
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== "-") {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i].stack];
    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 99 : 0;
      const bottomBorder = 0;
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
        },
      };
    }
  }
  option = {
    xAxis: {
      type: "category",
      data: ["S", "M", "T", "W", "S", "M", "T"],
    },
    yAxis: {
      type: "value",
    },
    series: series,
  };

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }

  window.addEventListener("resize", myChart.resize);
}

new DataTable("#subsDataTable", {});
