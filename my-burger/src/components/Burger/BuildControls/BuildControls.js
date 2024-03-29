import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: {props.price.toFixed(2)}</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingerdientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			></BuildControl>
		))}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}
		>
			Order Now
		</button>
	</div>
);

export default buildControls;
