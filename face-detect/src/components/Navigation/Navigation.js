import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
		if(isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'space-between'}}>
					<p className="tl f1 dim black pa2 b tracked-mega">Face Recognition App</p>
					<p onClick={ () => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
				</nav>
			);
		} else {
			return(
				<p style={{display: 'flex', justifyContent: 'space-between'}}>
					<p className="tl f1 dim black pa2 b tracked-mega">Face Recognition App</p>
					<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
						<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
						<p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
					</nav>
				</p>
			);
		}
}

export default Navigation;
