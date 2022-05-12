import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onClickPassInput}) => {
    return (
		<div>
			<p className="f3">
				{"Please input image URL. We will detect a face for you!"}
			</p>
			<div className="center">
				<div className="center form pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
					<button onClick={onClickPassInput} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
				</div>
			</div>
		</div>
	)
}


export default ImageLinkForm;