import React, { Component } from 'react';
import './App.css';

import HeatMapChart from './HeatMapChart';
import DayViewChart from './DayViewChart';
import WeeKViewChart from './WeekViewChart';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartType: 'dates'
		};
		this.onClick_setActiveChart = this.onClick_setActiveChart.bind(this);
	}
  
	onClick_setActiveChart(event) {
		const chartType = event.currentTarget.getAttribute('data-chart');
		this.setState({
			chartType: chartType
		});
	}

	render() {
		const {chartType} = this.state;
		return (
			<div className="App">
				<div className="chart-buttons">
					<button className={(chartType === 'dates') ? 'active' : ''} data-chart="dates" onClick={this.onClick_setActiveChart}>DatesViewChart</button>
					<button className={(chartType === 'week') ? 'active' : ''} data-chart="week" onClick={this.onClick_setActiveChart}>WeekViewChart</button>
					<button className={(chartType === 'day') ? 'active' : ''} data-chart="day" onClick={this.onClick_setActiveChart}>DayViewChart</button>
				</div>

				{chartType === 'dates' && <HeatMapChart />}
				{chartType === 'week' && <WeeKViewChart />}
				{chartType === 'day' && <DayViewChart />}    
			</div>
		);  
	}
}

export default App;
