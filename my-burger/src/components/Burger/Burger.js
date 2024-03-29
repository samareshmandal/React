import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
	let ingreds = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return (
					<BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
				);
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (ingreds.length === 0) {
		ingreds = <p>Please start adding ingerdients</p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"></BurgerIngredient>
			{ingreds}
			<BurgerIngredient type="bread-bottom"></BurgerIngredient>
		</div>
	);
};

export default burger;
