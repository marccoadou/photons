import React from "react";

export interface Photo {
	url: string;
	photographer: string;
	photographer_url: string;
	average_color: string;
	src: {
		original: string;
		large2x: string;
		large: string;
		medium: string;
		small: string;
		portrait: string;
		landscape: string;
		tiny: string;
	};
}

export const Card: React.FC<Photo> = (props) => {
	return (
		<div className="card">
			<a href={`${props.url}`} target="_blank" rel="noopener noreferrer">
				<img src={`${props.src.large2x}`} alt="" />
			</a>
			<a href={`${props.photographer_url}`} target="_blank" rel="noopener noreferrer">
				<p className="photographer">{props.photographer}</p>
			</a>
		</div>
	);
};
