import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import TableComponent from "./table";
import Form from "./form";
import "./style.scss";

const EnhancedTable = ({
	tableData,
	primaryKey,
	ignoreCell,
	searchData,
	...props
}) => {
	const [data, setData] = React.useState(tableData || []);
	const [filteredData, setFilteredData] = React.useState([]);
	const [selected, setSelected] = React.useState([]);
	const [search, setSearch] = React.useState(false);
	const uniqueId = primaryKey || "id";

	useEffect(() => {
		if (tableData) setData([...tableData]);
	}, [tableData]);

	useEffect(() => {
		if (props.valueSearchBy !== "searchBy" && searchData) {
			setSearch(true);
			searchBy(props.valueSearchBy, searchData);
		} else if (searchData) {
			setSearch(true);
			onSearch(searchData);
		} else {
			setSearch(false);
		}
	}, [searchData, props.valueSearchBy]);

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = data.map((n) => n[uniqueId]);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, key) => {
		if (
			props.selectable &&
			event.target.id != "elloEditIconId" &&
			event.target.id != "elloInput"
		) {
			const selectedIndex = selected.indexOf(key);
			let newSelected = [];
			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, key);
			} else {
				newSelected = selected.filter((el) => el != key);
			}
			setSelected(newSelected);
		}
	};

	const isSelected = (key) => selected.indexOf(key) !== -1;

	const handleDeleteRow = () => {
		let remainingData = data.filter(
			(el) =>
				el[uniqueId] != selected.find((e) => e === el[uniqueId])
		);
		setData(remainingData);
		setSelected([]);
	};

	const onSave = (values) => {
		let previousData = data;
		if (selected.length === 1) {
			let obj = previousData.find(
				(obj) => obj[uniqueId] === selected[0]
			);
			values.id = obj.id;
			previousData[previousData.indexOf(obj)] = values;
		} else {
			if (previousData.length > 0) {
				values.id = previousData[previousData.length - 1].id + 1;
			} else {
				values.id = 1;
			}
			previousData.push(values);
		}
		setData(previousData);
	};

	const formData = () => {
		if (selected.length === 1) {
			return data.find((obj) => obj[uniqueId] === selected[0]);
		} else {
			return tableData && tableData.length > 0 && tableData[0];
		}
	};

	const toogleSearch = (e) => {
		if (search && e.target.name !== "input") {
			setSearch(false);
		} else if (e.target.id === "searchIcon") {
			setSearch(true);
			setFilteredData(data);
		}
	};

	const searchBy = (searchBy, searchValue) => {
		if (searchValue) {
			let filterData = [];
			data.map((object) => {
				Object.entries(object).map(([key, value]) => {
					let data = value;
					if (key === searchBy) {
						if (
							data
								.toString()
								.toLowerCase()
								.includes(searchValue.toLowerCase())
						) {
							if (filterData.indexOf(object) < 0) {
								filterData.push(object);
							}
						}
					}
				});
			});
			setFilteredData(filterData);
		} else {
			setFilteredData(data);
		}
	};
	const onSearch = (searchData) => {
		if (searchData) {
			let filterData = [];
			data.map((value) => {
				Object.values(value).map((key) => {
					if (
						key
							.toString()
							.toLowerCase()
							.includes(searchData.toLowerCase())
					) {
						if (filterData.indexOf(value) < 0) {
							filterData.push(value);
						}
					}
				});
			});
			setFilteredData(filterData);
		} else {
			setFilteredData(data);
		}
	};

	const onEdit = (object) => {
		const { key, value, id } = object;
		if (value) {
			let p = data;
			p.map((row) => {
				if (row[uniqueId] === id) {
					row[key] = value;
				}
			});
			setData(p);
		}
	};

	return (
		<Router>
			<Switch>
				<Route exact path="/form">
					<Form
						data={formData()}
						update={selected.length === 1}
						onSave={onSave}
						btnText={
							selected.length === 1 ? "Update Data" : "Add row"
						}
						ignoreCell={ignoreCell || []}
					/>
				</Route>
				<Route path="/">
					<TableComponent
						tableData={tableData}
						onSearch={onSearch}
						handleDeleteRow={handleDeleteRow}
						selected={selected}
						handleSelectAllClick={handleSelectAllClick}
						isSelected={isSelected}
						handleClick={handleClick}
						toogleSearch={toogleSearch}
						search={search}
						data={search ? filteredData : data}
						uniqueId={uniqueId}
						ignoreCell={ignoreCell || []}
						onSave={onEdit}
						button={props.button}
						button1={props.buttton1}
						{...props}
					/>
				</Route>
			</Switch>
		</Router>
	);
};

export default EnhancedTable;
