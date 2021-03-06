import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs.react";
import MainContext from '../../MainContext'
import { render } from "react-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var CanvasJS = CanvasJSReact.CanvasJS;

CanvasJS.addColorSet("colorset1",

	[

		'#082454',
		'#092a60',
		'#0a2f6d',
		'#0d3a85',
		'#0f459f',
		'#1352b9',
		'#225db9',
		'#3368ba',
		'#4673b9',
		'#587eba',
		'#6b8bba',
		'#7e95b8',
		'#91A1BA',
		'#a3abba',
		'#B6B8BA',
		

	]);

	CanvasJS.addColorSet("colorset2",

	[

		'#0f459f',
		'#1352b9',
		'#225db9',
		'#3368ba',
		'#4673b9',
		'#587eba',
		'#6b8bba',

	]);


class PieChart extends Component {

	/** @param {Record<string, any>} props */
	constructor(props) {
		super(props);
	}

	static contextType = MainContext;

	state = {
		options: {}
	}


	render() {

		const onSelect = (event) => {
			var dataSeries = event.dataSeries;
			var dataPointIndex = event.dataPointIndex;

			for (var i = 0; i < dataSeries.dataPoints.length; i++) {
				if (i === dataPointIndex) {

					if (!dataSeries.dataPoints[i].exploded == false) {
						dataSeries.dataPoints[i].exploded = true;
					} else {
						dataSeries.dataPoints[i].exploded = false;
					}

				} else
					dataSeries.dataPoints[i].exploded = false;
			}

			this.props.onSliceSelected(event)
		}

		const options = {
			colorSet: this.props.data.length > 6 ? "colorset1" : "colorset2",
			backgroundColor: "black",
			animationEnabled: true,
			fontColor: "white",


			toolTip: {
				enabled: false
			},

			title: {
				text: "",
				fontSize: 22,
				padding: 20,
				fontColor: 'white'

			},
	
			data: [{
				type: "pie",
				click: onSelect,
				startAngle: 75,
				toolTipContent: "",
				showInLegend: false,
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabelFontColor: "white",
				indexLabel: "{label}",
				dataPoints: this.props.data.sort(function (a, b) {
					return a.y - b.y;
				})


			}]
		}

		return (

			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
			</div>

		);
	}
}


export default PieChart;                      