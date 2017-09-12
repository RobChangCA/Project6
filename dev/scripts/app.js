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
			initial__color: "#3399FF",
			initial__scale: 1,
			initial__shape: 1,
			final__width: 300,
			final__height: 300,
			final__rotation: 0,
			final__color: "#3399FF",
			final__scale: 1,
			final__shape: 1,
			storedKeyframes: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	componentDidMount(){
		dbRef.on('value', (snapshot) => {
			const newKeyframeArray=[];
			const firebaseItems = snapshot.val();
			for (let key in firebaseItems) {
				const firebaseItem = (firebaseItems[key]);
				firebaseItem.id=key;
				let newKeyframe = {
					transition: 'all 1s',
					animationName: {
							'0%' : {
								height: `${firebaseItem.initial__height}px`,
								width: `${firebaseItem.initial__width}px`,
								transform: `scale(${firebaseItem.initial__scale}) rotate(${firebaseItem.initial__rotation}deg)`,
								background: `${firebaseItem.initial__color}`,
								borderRadius: `${firebaseItem.initial__shape}%`,
							},
							'50%' : {
								height: `${firebaseItem.final__height}px`,
								width: `${firebaseItem.final__width}px`,
								transform: `scale(${firebaseItem.final__scale}) rotate(${firebaseItem.final__rotation}deg)`,
								background: `${firebaseItem.final__color}`,
								borderRadius: `${firebaseItem.final__shape}%`,
							},
							'100%' : {
								height: `${firebaseItem.initial__height}px`,
								width: `${firebaseItem.initial__width}px`,
								transform: `scale(${firebaseItem.initial__scale}) rotate(${firebaseItem.initial__rotation}deg)`,
								background: `${firebaseItem.initial__color}`,
								borderRadius: `${firebaseItem.initial__shape}%`,
							},
					},
					animationDuration: `${firebaseItem.duration}s`,
					animationIterationCount: 'infinite',
					duration: `${firebaseItem.duration}`,
					initial__width: `${firebaseItem.initial__width}`,
					initial__height: `${firebaseItem.initial__height}`,
					initial__rotation: `${firebaseItem.initial__rotation}`,
					initial__color: `${firebaseItem.initial__color}`,
					initial__scale: `${firebaseItem.initial__scale}`,
					initial__shape: `${firebaseItem.initial__shape}`,
					final__width: `${firebaseItem.final__width}`,
					final__height: `${firebaseItem.final__height}`,
					final__rotation: `${firebaseItem.final__rotation}`,
					final__color: `${firebaseItem.final__color}`,
					final__scale: `${firebaseItem.final__scale}`,
					final__shape: `${firebaseItem.final__shape}`,
				}
				newKeyframe.id=key;
				newKeyframeArray.push(newKeyframe);
			}
			this.setState({
				storedKeyframes: newKeyframeArray,
			})
		})
	}
	handleChange(event){
		this.setState({
			[event.target.id] : event.target.value
		})
	}
	fbUpload(e) {
			e.preventDefault();
			const newAnimation = this.state;
			// dbRef.push(newAnimation);
			//do i need to put in a variable?

			dbRef.push(this.state);
		}
	removeItem(key) {
		console.log(key._definition);
		const itemRef = firebase.database().ref(`/animations/${key._definition.id}`);
		itemRef.remove();
	}
	onScreen(key){
		const e = key._definition;
		console.log(key);
		this.setState({
			duration: e.duration,
			initial__width: e.initial__width,
			initial__height: e.initial__height,
			initial__rotation: e.initial__rotation,
			initial__color: e.initial__color,
			initial__scale: e.initial__scale,
			initial__shape: e.initial__shape,
			final__width: e.final__width,
			final__height: e.final__height,
			final__rotation: e.final__rotation,
			final__color: e.final__color,
			final__scale: e.final__scale,
			final__shape: e.final__shape,
		})
		
		
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
				<h1 className='title'>Animation Playground</h1>
				<div className="wrapper mainFlex">
					<div className='cssWrap'>
						<section className="animationFrame">
							<div className={css(styling.anime)}></div>
						</section>
						<p className='cssOutput__field'>
							<h2 className="cssTitle">CSS:</h2>
							{`@keyframes AnimationName{ 0%{
							height: ${this.state.initial__height}px;
							width: ${this.state.initial__width}px;
							transform: scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg);
							background: ${this.state.initial__color};
							border-radius: ${this.state.initial__shape}%;
							}
							50%{
								height: ${this.state.final__height}px;
								width: ${this.state.final__width}px;
								transform: scale(${this.state.final__scale}) rotate(${this.state.final__rotation}deg);
								background: ${this.state.final__color};
								border-radius: ${this.state.final__shape}%;
							},
							100%{
								height: ${this.state.initial__height}px;
								width: ${this.state.initial__width}px;
								transform: scale(${this.state.initial__scale}) rotate(${this.state.initial__rotation}deg);
								background: ${this.state.initial__color};
								border-radius: ${this.state.initial__shape}%;
							}}`}
						</p>
					</div>
					<section className="inputControl">
						<form className="initial__input">
							<label htmlFor="duration">Duration</label>
							<input 
								type="range" 
								id="duration" 
								min="1" 
								max="20"
								value={this.state.duration} 
								onChange={this.handleChange}
							/>
							<label htmlFor="initial__height">Starting Height</label>
							<input 
								type="range"
								id='initial__height'
								min='1'
								max='300'
								value={this.state.initial__height}
								onChange={this.handleChange}
							/>
							<label htmlFor="initial__width">Starting Width</label>
							<input 
								type="range"
								id='initial__width'
								min='1'
								max='300'
								value={this.state.initial__width}
								onChange={this.handleChange}
							/>
							<label htmlFor="initial__rotation"> Rotation</label>
							<input 
								type="range" 
								id="initial__rotation" 
								min="0" 
								max="360" 
								onChange={this.handleChange}
								value={this.state.initial__rotation}
								value={this.state.initial__rotation}
							/>
							<label htmlFor="initial__color">Starting Color</label>
							<select name="initial__color" id="initial__color" className="colors" onChange={this.handleChange}>
								<option value="#3399FF">blue</option>
								<option value="#FEAE2D">yellow</option>
								<option value="#FF3333">red</option>
								<option value="#00CC99">green</option>
								<option value="#9A12B3">purple</option>
							</select>
							<label htmlFor="initial__scale">Starting Scale</label>
							<input 
								type="range" 
								id="initial__scale" 
								min="0" 
								max="2"
								step=".1"
								value={this.state.initial__scale}
								onChange={this.handleChange} 
							/>
							<label htmlFor="initial__shape">Starting Shape</label>
							<input 
								type="range" 
								id="initial__shape" 
								min="0" 
								max="100"
								step="1"
								value={this.state.initial__shape}
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
								value={this.state.final__height}
								onChange={this.handleChange}
							/>
							<label htmlFor="final__width">Final Width</label>
							<input 
								type="range"
								id='final__width'
								min='1'
								max='300'
								value={this.state.final__width}
								onChange={this.handleChange}
							/>
							<label htmlFor="final__rotation">Final Rotation</label>
							<input 
								type="range" 
								id="final__rotation" 
								min="0" 
								max="360" 
								value={this.state.final__rotation}
								onChange={this.handleChange} 
							/>
							<label htmlFor="final__color">Final Color</label>
							<select name="final__color" id="final__color" className="colors" onChange={this.handleChange}>
								<option value="#3399FF">blue</option>
								<option value="#FEAE2D">yellow</option>
								<option value="#FF3333">red</option>
								<option value="#00CC99">green</option>
								<option value="#9A12B3">purple</option>
								
							</select>
							<label htmlFor="final__scale">Final scale</label>
							<input 
								type="range" 
								id="final__scale" 
								min="0" 
								max="2"
								step=".1" 
								value={this.state.final__scale}
								onChange={this.handleChange} 
							/>
							<label htmlFor="final__shape">Final Shape</label>
							<input 
								type="range" 
								id="final__shape" 
								min="0" 
								max="100"
								step="1"
								value={this.state.final__shape}
								onChange={this.handleChange} 
							/>
							<button className='save' onClick={this.fbUpload.bind(this)}>Save Animation</button> 
						</form>
					</section>
				</div>
					

				<section className="gallery wrapper">
					<h2 className="gallery__title">Gallery</h2>
					<section className="animationGallery">
					
							{this.state.storedKeyframes.map(keyframe=>{
								const style =  StyleSheet.create({ 
									keyframe
								})
								return(
									<div className="animationGallery__container">
										<div className={css(style.keyframe)}></div>
										<button className='animationGallery__delete' onClick={() => this.removeItem(style.keyframe)}>Delete</button>
										<button className="animationGallery__onScreen" onClick={()=> this.onScreen(style.keyframe)}>On screen</button>
									</div>
								)
							})}
					</section>
				</section>
			</div>
		)
	}

}

ReactDOM.render(<App />, document.getElementById('app'));

// <button className='animationGallery__delete' onClick={() => this.removeItem(this.state.storedKeyframes), console.log(this.state.storedKeyframes)}>Delete</button>