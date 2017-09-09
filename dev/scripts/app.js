import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';


class App extends React.Component{
	constructor(){
		super();
		this.state = {
			initial__rotation: 0,
			initial__color: "blue",
			initial__scale: 1,
			final__rotation: 0,
			final__color: "red",
			final__scale: 1,
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(event){
		console.log(event.target)
		this.setState({
			[event.target.id] : event.target.value
		})
	}
	render(){
		const styling = { 
				width: 100px;
				height: 100px;
				animation: anime 5s linear infinite;
				@keyframes anime{
					0%{
						transform: scale(this.state.initial__rotation), rotate(this.state.initial__rotation);
						color: this.state.initial__color;
					}
					100%{
						transform: scale(this.state.final__rotation), rotate(this.state.final__rotation);
						color: this.state.final__color;
					}
				}		
		}
		
		return(
			<div>
				<section className="animationFrame">
					<div className="animation" style={styling}></div>
				</section>
				<section className="inputControl">
					<div className="inputControl__initial">
						<form>
							<input 
								type="range" 
								id="initial__rotation" 
								min="0" 
								max="360" 
								onChange={this.handleChange}
							/>
							<input 
								type="text" 
								id="initial__color"  
								onChange={this.handleChange} 
							/>
							<input 
								type="range" 
								id="initial__scale" 
								min="0" 
								max="2"
								step=".1"
								onChange={this.handleChange} 
							/>
						</form>
					</div>
					<div className="inputControl__final">
						<form>
							<input 
								type="range" 
								id="final__rotation" 
								min="0" 
								max="360" 
								onChange={this.handleChange} 
							/>
							<input 
								type="text" 
								id="final__color" 
								onChange={this.handleChange} 
							/>
							<input 
								type="range" 
								id="final__scale" 
								min="0" 
								max="2"
								step=".1" 
								onChange={this.handleChange} 
							/>
						</form>
					</div>
				</section>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
