import { colorHash } from "@ctfdio/ctfd-js/ui";
import { mergeObjects } from "../../objects";
import { cumulativeSum } from "../../math";
import dayjs from "dayjs";

export function getOption(mode, places, optionMerge) {
  // Palette visible on parchment/light background
  const pokemonPalette = ['#3B4CCA', '#E3350D', '#c47e00', '#2ca02c', '#9467bd', '#8c564b', '#0e7c86', '#d62728', '#ff7f0e', '#7f7f7f'];
  const inkDark = '#1e1608';
  const inkMid = 'rgba(30,22,8,0.4)';
  const inkFaint = 'rgba(30,22,8,0.07)';
  let option = {
    color: pokemonPalette,
    backgroundColor: 'transparent',
    textStyle: { color: inkDark, fontFamily: 'Lato, sans-serif' },
    title: {
      left: "center",
      text: "Top 10 " + (mode === "teams" ? "Teams" : "Users"),
      textStyle: {
        color: inkDark,
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        fontSize: 13,
      }
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(30,22,8,0.88)',
      borderColor: '#f0a800',
      textStyle: { color: '#f0a800', fontFamily: 'Lato, sans-serif' },
      axisPointer: { type: "cross" },
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      align: "left",
      bottom: 35,
      data: [],
      textStyle: { color: inkDark }
    },
    toolbox: {
      iconStyle: { borderColor: inkMid },
      emphasis: { iconStyle: { borderColor: inkDark } },
      feature: {
        dataZoom: { yAxisIndex: "none" },
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: "time",
        boundaryGap: false,
        data: [],
        axisLine: { lineStyle: { color: inkMid } },
        axisTick: { lineStyle: { color: inkMid } },
        axisLabel: { color: inkDark },
        splitLine: { show: false }
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: { show: true, lineStyle: { color: inkMid } },
        axisTick: { lineStyle: { color: inkMid } },
        axisLabel: { color: inkDark },
        splitLine: { lineStyle: { color: inkFaint } },
        min: 0,
        scale: true
      },
    ],
    dataZoom: [
      {
        id: "dataZoomX",
        type: "slider",
        xAxisIndex: [0],
        filterMode: "filter",
        height: 20,
        top: 35,
        fillerColor: 'rgba(240,168,0,0.2)',
        borderColor: inkMid,
        handleStyle: { color: inkDark },
        textStyle: { color: inkDark },
        dataBackground: {
          lineStyle: { color: inkMid },
          areaStyle: { color: 'rgba(30,22,8,0.04)' },
        },
        selectedDataBackground: {
          lineStyle: { color: '#f0a800' },
          areaStyle: { color: 'rgba(240,168,0,0.1)' },
        },
      },
    ],
    series: [],
  };

  const teams = Object.keys(places);
  for (let i = 0; i < teams.length; i++) {
    const team_score = [];
    const times = [];
    for (let j = 0; j < places[teams[i]]["solves"].length; j++) {
      team_score.push(places[teams[i]]["solves"][j].value);
      const date = dayjs(places[teams[i]]["solves"][j].date);
      times.push(date.toDate());
    }

    const total_scores = cumulativeSum(team_score);
    let scores = times.map(function (e, i) {
      return [e, total_scores[i]];
    });

    option.legend.data.push(places[teams[i]]["name"]);

    const data = {
      name: places[teams[i]]["name"],
      type: "line",
      label: {
        normal: {
          position: "top",
        },
      },

      lineStyle: { width: 3 },
      symbol: 'none',
      data: scores,
    };
    option.series.push(data);
  }

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
