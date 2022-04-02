import React from "react";
import Info from "../components/Info";
import Shops from "../components/Shops";
const shopper = sessionStorage.getItem("isLunchShopper");
console.log(shopper);

const Shopper = () => {
    return (
			<div>
				{shopper === "true" ? (
					<div>
						<Info />
						<Shops />
					</div>
				) : null}
			</div>
		);
};

export default Shopper;