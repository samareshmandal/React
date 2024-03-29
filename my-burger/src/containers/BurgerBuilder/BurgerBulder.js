import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
	salad: 10,
	bacon: 15,
	cheese: 20,
	meat: 25
};

class BurgerBuilder extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {..}
	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 40,
		purchasable: false,
		purchasing: false
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((key) => {
				return ingredients[key];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		alert("You continue..");
	};

	render() {
		const disableInfo = {
			...this.state.ingredients
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}
					></OrderSummary>
				</Modal>
				<Burger ingredients={this.state.ingredients}></Burger>
				<BuildControls
					ingerdientAdded={this.addIngredientsHandler}
					ingredientRemoved={this.removeIngredientsHandler}
					disabled={disableInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
					price={this.state.totalPrice}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
