import React from "react";
import Button from "../button";
import "./index.scss";



const DropDown = React.memo(
	({ btnText, dropDownMenu, buttonCss, setSearchBy }) => {
		const [open, setOpen] = React.useState(false);
		const handleClick = () => {
			setOpen(!open);
		};

		const handleListClick = (value) => {			
			setSearchBy(value);
			setOpen(!open);
		};

		const renderOption = (value, index) => (
			<div
				className="item"
				onClick={() => handleListClick(value)}
				key={index}
			>				
				{value}
			</div>
		);
		return (
			<div className="drop-down">
				<Button					
					btnText={btnText}
					onClick={handleClick}
					className={`${buttonCss} button-width`}
				/>
				{open && (
					<div className="drop-down-panel">
						<div className="panel">
							<div className="triangle"></div>
							<div className="search-by-text">Search By</div>
							{dropDownMenu.map(renderOption)}
						</div>
					</div>
				)}
			</div>
		);
	}
);

export default DropDown;
