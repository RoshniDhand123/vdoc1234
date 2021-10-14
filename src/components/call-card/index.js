import "./style.scss";
import React from "react";

class CallCard extends React.PureComponent{
	state = { hr: "", min: "", sec: "" };
	timer;
	componentDidMount = () => {
		this.timer = setInterval(this.checkTime, 1000);
	};

	componentWillUnmount = () => {
		clearInterval(this.timer);
	};

	checkTime = () => {
		let date = new Date();
		//let hr, min,
		// time = this.props.time;
		//console.log("time", time);
		let current_hr = date.getHours();
		//console.log("check", current_hr);
		// let current_hr = 1;
		let current_min = date.getMinutes();
		let current_sec = 60 - date.getSeconds();
		// if (time.substring(5, 7) === "pm") {
		// 	if (time.substring(0, 2) === "12")
		// 		hr = parseInt(time.substring(0, 2));
		// 	else hr = parseInt(time.substring(0, 2)) + 12;
		// } else {
		// 	if (time.substring(0, 2) === "12")
		// 		hr = parseInt(time.substring(0, 2)) + 12;
		// 	else hr = parseInt(time.substring(0, 2));
		// }
		let hr = parseInt(this.props.time.substring(0, 2));
		let min = parseInt(this.props.time.substring(3, 5));
		let h = hr - current_hr;
		let m = min - current_min;
		if (h < 0) h = h * -1;
		if (m < 0) m = m * -1;
		if (!Number.isNaN(h) && !Number.isNaN(m) && !Number.isNaN(current_sec))
			this.setState({
				hr: h.toString(),
				min: m.toString(),
				sec: current_sec,
			});
		//return { h, m, current_sec };
	};

	render() {
		const { hr, min, sec } = this.state;
		return (
			<div className="call-card">
				{hr || min || sec ?
					<>
						<p className="heading">Next call in:</p>
						<div className="content-arrange">
							<h2>{hr}</h2>hr
							<h2>{min}</h2>min
							<h2>{sec}</h2>sec
						</div>
					</> :
					<div className="content-arrange">
						<h3>No appointments available</h3>
					</div>}
			</div>
		);
	}
}

export default CallCard;
