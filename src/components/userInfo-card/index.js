import "./style.scss";

const UserInfoCard = (order) => {
	const renderData = (key, i) => (
		<div key={i} className="flex-width">			
			<p>
				{key} : {order.order[key]}
			</p>
		</div>
	);
	return (
		<div className="userInfo-card">			
			{Object.keys(order.order).map(renderData)}
		</div>
	);
};

export default UserInfoCard;
