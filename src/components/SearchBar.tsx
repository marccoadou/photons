import React, { Dispatch, SetStateAction } from "react";
import { Button, Form } from "react-bootstrap";
import { Photo } from "./Card";
const auth = "563492ad6f91700001000001fe71dd52cf124b5d9bfc339a8ab40a38";

interface Props {
	searchInput: string;
	setSearchInput: Dispatch<SetStateAction<string>>;
	size: string;
	setSize: Dispatch<SetStateAction<string>>;
	number: number;
	setNumber: Dispatch<SetStateAction<number>>;
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
	setPhotos: Dispatch<SetStateAction<Photo[]>>;
}
export const SearchBar: React.FC<Props> = ({
	searchInput,
	setSearchInput,
	size,
	setSize,
	number,
	setNumber,
	color,
	setColor,
	setPhotos,
}) => {
	const handleNumberChange = (e: any) => {
		setNumber(e.target.value);
	};

	const handleSearchInput = (e: any) => {
		setSearchInput(e.target.value);
	};

	const handleColor = (e: any) => {
		setColor(e.target.value);
	};

	const handleSize = (e: any) => {
		setSize(e.target.value);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await fetchData(generateSearchUrl(searchInput, number, size, color));
		setPhotos(response.photos);
	};
	return (
		<div className="search-form">
			<Form.Group controlId="formSearch" onSubmit={handleSubmit}>
				<Form.Control
					type="text"
					placeholder="Search for a photo"
					value={searchInput}
					onChange={handleSearchInput}
					required={true}
				/>
				<Form.Control as="select" custom value={size} onChange={handleSize}>
					<option value="nosize">Select size</option>
					<option value="large">Large (24MP)</option>
					<option value="medium">Medium (12MP)</option>
					<option value="small">Small (4MP)</option>
				</Form.Control>
				<Form.Control as="select" custom value={color} onChange={handleColor}>
					<option value="nocolor">Select color</option>
					<option value="red">Red</option>
					<option value="orange">Orange</option>
					<option value="yellow">Yellow</option>
					<option value="green">Green</option>
					<option value="turquoise">Turquoise</option>
					<option value="blue">Blue</option>
					<option value="violet">Violet</option>
					<option value="pink">Pink</option>
					<option value="brown">Brown</option>
					<option value="black">Black</option>
					<option value="gray">Gray</option>
					<option value="white">White</option>
				</Form.Control>
				<Form.Group controlId="formBasicRange">
					<Form.Label>Number of photos : {number}</Form.Label>
					<Form.Control
						type="range"
						min={15}
						value={number}
						max={80}
						onChange={handleNumberChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Search
				</Button>
			</Form.Group>
		</div>
	);
};

export const fetchData = async (url: string) => {
	try {
		const dataFetch = await fetch(`${url}`, {
			method: "GET",
			headers: {
				accept: "application/json",
				authorization: auth,
			},
		}).then((data) => data.json());
		return dataFetch;
	} catch (error) {
		console.error(error);
	}
};

function generateSearchUrl(searchInput: string, number: number, size: string, color: string) {
	let searchURL = `https://api.pexels.com/v1/search?query=${searchInput}&per_page=${number}`;
	if (size) {
		searchURL += `&size=${size}`;
	}
	if (color) {
		searchURL += `&color=${color}`;
	}
	return searchURL;
}
