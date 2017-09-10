import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import firebase from './firebase.js';
import { 
    BrowserRouter as Router, 
    Route, Link, NavLink } from 'react-router-dom';

const dbRef = firebase.database().ref('/animations');

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			duration: 20,
			initial__width: 300,
			initial__height: 300,
			initial__rotation: 0,
			initial__color: "#C44D58",
			initial__scale: 1,
			initial__shape: 1,
			final__width: 300,
			final__height: 300,
			final__rotation: 0,
			final__color: "#C44D58",
			final__scale: 1,
			final__shape: 1,
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({
			[event.target.id] : event.target.value
		})
	}
	cssOutputString(){

	}
	fbUpload(e) {
			e.preventDefault();
			const newAnimation = this.state;
			// dbRef.push(newAnimation);
			//do i need to put in a variable?

			dbRef.push(this.state);
		}
	render(){
		const styling = StyleSheet.create({  
			anime: {
				transition: 'all 1s',
				animationName: {
						'0%' : {
							height: `${this.state.initial__height}px`,
							width: `${this.state.initial__width}px`,
							transform: `scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg)`,
							background: `${this.state.initial__color}`,
							borderRadius: `${this.state.initial__shape}%`,
						},
						'50%' : {
							height: `${this.state.final__height}px`,
							width: `${this.state.final__width}px`,
							transform: `scale(${this.state.final__scale}) rotate(${this.state.final__rotation}deg)`,
							background: `${this.state.final__color}`,
							borderRadius: `${this.state.final__shape}%`,
						},
						'100%' : {
							height: `${this.state.initial__height}px`,
							width: `${this.state.initial__width}px`,
							transform: `scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg)`,
							background: `${this.state.initial__color}`,
							borderRadius: `${this.state.initial__shape}%`,
						},
				},
				animationDuration: `${this.state.duration}s`,
				animationIterationCount: 'infinite',	
			}
		})

		return(
			<div>
				<div className="wrapper">
					<section className="animationFrame">
						<div className={css(styling.anime)}></div>
					</section>
					<section className="inputControl">
						<form className="initial__input">
							<label htmlFor="duration">Duration</label>
							<input 
								type="range" 
								id="duration" 
								min="1" 
								max="20" 
								onChange={this.handleChange}
							/>
							<label htmlFor="initial__height">Starting Height</label>
							<input 
								type="range"
								id='initial__height'
								min='1'
								max='300'
								onChange={this.handleChange}
							/>
							<label htmlFor="initial__width">Starting Width</label>
							<input 
								type="range"
								id='initial__width'
								min='1'
								max='300'
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
								<option value="#C44D58">Red</option>
								<option value="#C7F464">green</option>
								<option value="#4ECDC4">blue</option>
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
							<label htmlFor="final__height"> Final Height</label>
							<input 
								type="range"
								id='final__height'
								min='1'
								max='300'
								onChange={this.handleChange}
							/>
							<label htmlFor="final__width">Final Width</label>
							<input 
								type="range"
								id='final__width'
								min='1'
								max='300'
								onChange={this.handleChange}
							/>
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
								<option value="#C44D58">Red</option>
								<option value="#C7F464">green</option>
								<option value="#4ECDC4">blue</option>
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
						<button onClick={this.fbUpload.bind(this)}>Click me</button>
					</section>
				</div>
				<section className='cssOutput'>
					<p className='cssOutput__field'>
							{`@keyframes AnimationName '0%' : {
							height: ${this.state.initial__height}px,
							width: ${this.state.initial__width}px,
							transform: scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg),
							background: ${this.state.initial__color},
							borderRadius: ${this.state.initial__shape}%,
						},
						'50%' : {
							height: ${this.state.final__height}px,
							width: ${this.state.final__width}px,
							transform: scale(${this.state.final__scale}) rotate(${this.state.final__rotation}deg),
							background: ${this.state.final__color},
							borderRadius: ${this.state.final__shape}%,
						},
						'100%' : {
							height: ${this.state.initial__height}px,
							width: ${this.state.initial__width}px,
							transform: scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg),
							background: ${this.state.initial__color},
							borderRadius: ${this.state.initial__shape}%,
						},`}
					</p>
				</section>
			</div>
		)
	}

}

ReactDOM.render(<App />, document.getElementById('app'));
