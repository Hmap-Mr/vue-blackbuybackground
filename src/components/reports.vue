<template>
    <div>
        <!-- 面包屑 -->
        <my-bread _2title="数据统计" _3title="数据报表"></my-bread>
        <div ref="echartbox" style="width: 600px;height:400px;"></div>
    </div>    
</template>

<script>
export default {
    name:"reports",
    data() {
        return {
            option:{
                title: {
                    text: '用户来源'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
            
        }
    },
    async mounted() {
        var myChart = this.$echarts.init(this.$refs['echartbox']) ;
        // console.log(myChart);
        // 接口获取数据
        let res = await this.$axios.get("reports/type/1")
        // 合并数组
        for(const key in res.data.data){
            this.option[key] = res.data.data[key];
        }
        // 调整数据显示方式
        // 'value' 数值轴，适用于连续数据
        // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化
        // 'log' 对数轴。适用于对数数据。
        this.option.xAxis[0].type = 'category'; //默认为category分类
        // this.option.xAxis[0].type = 'value';
        this.option.xAxis[0].boundaryGap = false;
        myChart.setOption(this.option);
    },
}
</script>

<style>

</style>
