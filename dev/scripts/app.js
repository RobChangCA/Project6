import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';


class App extends React.Component{
	constructor(){
		super();
		this.state = {
			initial__rotation: 0,
			initial__color: "red",
			initial__scale: 1,
			initial__shape: 1,
			final__rotation: 0,
			final__color: "red",
			final__scale: 1,
			final__shape: 1,
			duration: 1,
		};
		this.handleChange = this.handleChange.bind(this);
	}


	handleChange(event){
		console.log(event.target.value)
		this.setState({
			[event.target.id] : event.target.value
		})
	}
	render(){
		const styling = StyleSheet.create({  
			anime: {
				height: '250px',
				width: '250px',
				animationName: {
						'0%' : {
							transform: `scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg)`,
							background: this.state.initial__color,
							borderRadius: `${this.state.initial__shape}%`,
						},
						'100%' : {
							transform: `scale(${this.state.final__scale}) rotate(${this.state.final__rotation}deg)`,
							background: this.state.final__color,
							borderRadius: `${this.state.final__shape}%`,
						}
				},
				animationDuration: `${this.state.duration}s`,
				animationIterationCount: 'infinite',	
			}
		})
		
		
		return(
			<div className="wrapper">
				<section className="animationFrame">
					<div className={css(styling.anime)}></div>
				</section>
				<section className="inputControl">
					<form className="initial__input">
						<label htmlFor="duration"> Duration</label>
						<input 
							type="range" 
							id="duration" 
							min="0" 
							max="60" 
							onChange={this.handleChange}
						/>
						<label htmlFor="initial__rotation"> Rotation</label>
						<input 
							type="range" 
							id="initial__rotation" 
							min="0" 
							max="360" 
							onChange={this.handleChange}
						/>
						<label htmlFor="initial__color">Starting Color</label>
						<select name="initial__color" id="initial__color" onChange={this.handleChange}>
							<option value="red">Red</option>
							<option value="green">green</option>
							<option value="blue">blue</option>
						</select>
						<label htmlFor="initial__scale">Starting Scale</label>
						<input 
							type="range" 
							id="initial__scale" 
							min="0" 
							max="2"
							step=".1"
							onChange={this.handleChange} 
						/>
						<label htmlFor="initial__shape">Starting Shape</label>
						<input 
							type="range" 
							id="initial__shape" 
							min="0" 
							max="100"
							step="1"
							onChange={this.handleChange} 
						/>
					</form>
						<form className='final__input'>
							<label htmlFor="final__rotation">Final Rotation</label>
							<input 
								type="range" 
								id="final__rotation" 
								min="0" 
								max="360" 
								onChange={this.handleChange} 
							/>
							<label htmlFor="final__color">Final Color</label>
							<select name="final__color" id="final__color" onChange={this.handleChange}>
								<option value="red">Red</option>
								<option value="green">green</option>
								<option value="blue">blue</option>
							</select>
							<label htmlFor="final__scale">Final scale</label>
							<input 
								type="range" 
								id="final__scale" 
								min="0" 
								max="2"
								step=".1" 
								onChange={this.handleChange} 
							/>
							<label htmlFor="final__shape">Final Shape</label>
							<input 
								type="range" 
								id="final__shape" 
								min="0" 
								max="100"
								step="1"
								onChange={this.handleChange} 
							/>
						</form>
				</section>
			</div>
		)
	}

}

ReactDOM.render(<App />, document.getElementById('app'));
