import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => {
	return (
		<div className={classes.buildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button className={classes.Less} onClick={props.subtructed}>
				Less
			</button>
			<button className={classes.More} onClick={props.added}>
				More
			</button>
		</div>
	);
};
export default buildControl;
