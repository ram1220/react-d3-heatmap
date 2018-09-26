import React, {
    Component
} from 'react';
import * as d3 from "d3";
import moment from "moment";

import json from './data.json';

class DayViewChart extends Component {

    componentDidMount() {
        
        this.drawChart(json);
    }

    drawChart(json) {
        const currentDate = "2017-12-15";
        
        const currentDateJson = json.filter(function(obj){
            return moment(obj.start).day() === moment(currentDate).day()
        });

        const jsonData = currentDateJson.map(function (obj) {
            return ({
                hour: moment(obj.start).utc().hours(),
                startMin: moment(obj.start).utc().minute(),
                endMin: moment(obj.end).utc().minute(),
                value: obj.sleepStatus
            });
        });
        console.log(jsonData);
        
        const margin = {
                top: 50,
                right: 0,
                bottom: 100,
                left: 60
            },
            width = 960 - margin.left - margin.right,
            height = 430 - margin.top - margin.bottom,
            gridSize = Math.floor(width / 24),
            legendElementWidth = gridSize * 2,
            buckets = 9,
            data = [],
            colors = {
                'DEFAULT': "#ffffd9",
                'ASLEEP': "#d83131",
                'AWAKE': "#2889e2"
            },
            mins = [],
            hours = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
        
        for(var i=0; i<=60; i=i+10) {
            mins.push(i);
        }

        hours.forEach(function (h, hi) {
            mins.forEach(function (m, mi) {
                if(m < 60) {
                    data.push({
                        min: m,
                        hour: hi + 1,
                        value: 'DEFAULT'
                    });
                }
                
            });
        })

        console.log(data);

        const svg = d3.select("#heat-map").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll(".dayLabel")
            .data(mins)
            .enter().append("text")
            .text(function (d) {
                return d + ' mins';
            })
            .attr("x", 0)
            .attr("y", function (d, i) {
                return i * gridSize;
            })
            .style("text-anchor", "end")
            .attr("transform", function (d, i) {
                return "translate(-6," + (5) + ")";
            })
            //.attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", 'dayLabel mono axis axis-workweek');

        svg.selectAll(".timeLabel")
            .data(hours)
            .enter().append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", function (d, i) {
                return i * gridSize;
            })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", 'timeLabel mono axis axis-worktime');

        const cards = svg.selectAll(".hour")
            .data(data, function (d) {
                return d.min + ':' + d.hour;
            });
                    
        cards.enter().append("rect")
            .attr("x", function (d) {
                return (d.hour - 1) * gridSize;
            })
            .attr("y", function (d) {
                return (d.min/10) * gridSize;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", function (d) {
                return colors[d.value]
            });



        const minCards = svg.selectAll(".status")
            .data(jsonData)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return (d.hour - 1) * gridSize;
            })
            .attr("y", function (d) {
                return (d.startMin/10) * gridSize;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "status")
            .attr("width", gridSize)
            .attr("height", function (d) {
                return (d.endMin - d.startMin) * (gridSize/10);
            })
            .style("fill", function (d) {
                return colors[d.value]
            });



    }

    render() {
        return <div id = "heat-map"> </div>
    }
}

export default DayViewChart;