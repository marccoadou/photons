import React, { useState, useEffect } from "react";
import { fetchData, SearchBar } from "./components/SearchBar";
import { Card, Photo } from "./components/Card";

function App() {
	const [number, setNumber] = useState(20);
	const [searchInput, setSearchInput] = useState("");
	const [size, setSize] = useState("nosize");
	const [color, setColor] = useState("nocolor");
	const [photos, setPhotos] = useState<Photo[]>([]);

	useEffect(() => {
		const fetchDataAsync = async () => {
			const response = await fetchData("https://api.pexels.com/v1/curated?per_page=20");
			setPhotos(response.photos);
			console.log(response);
		};
		fetchDataAsync();
	}, []);

	return (
		<div className="App">
			<div className="container fluid">
				<h1 className="title">Photon</h1>
				<SearchBar
					color={color}
					setColor={setColor}
					number={number}
					setNumber={setNumber}
					size={size}
					setSize={setSize}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
					setPhotos={setPhotos}
				/>
				<div className="gallery-grid">
					{photos
						? photos.map((photo, index) => (
								<Card
									key={index}
									url={photo.url}
									average_color={photo.average_color}
									src={photo.src}
									photographer={photo.photographer}
									photographer_url={photo.photographer_url}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
}

export default App;
