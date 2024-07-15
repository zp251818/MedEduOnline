import { number } from "echarts/core"

// 饼图
type doughnut_type = {
    value:number,
    name:string
}

type doughnut_props ={
    name:string,
    data:doughnut_type[]
}

// 柱状图

type bar_SeriesData = {
    value:number,
    groupId:string
}

type bar_DrilldownData_One = {
    type:string,
    value:number
}

type bar_DrilldownData = {
    dataGroupId:string,
    data:drilldownData_One[]
}

type barProps = {
    xAxisData:string[],
    seriesData:bar_SeriesData[],
    drilldownData:bar_DrilldownData[]
}