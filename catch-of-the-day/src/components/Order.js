import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionsGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }
  renderOrder(key) {
    console.log("renderOrder", key);
    const fish = this.props.fishes[key];
    console.log("renderOrder fish", fish);
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'this fish'} is no longer available! {removeButton}</li>
    };

    return(
      <li key={key}>
        <span>
          <CSSTransitionsGroup
            component='span'
            className='count'
            transitionName='count'
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionsGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className='price'>{formatPrice(count * fish.price)}</span>
      </li>
    );
  }
  render() {
    console.log("Order.render", this.props);
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    }, 0);
    return (
      <div className='order-wrap'>
        <h2>Your Order</h2>
        <CSSTransitionsGroup
          className='order'
          component='ul'
          transitionName='order'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className='total'>
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionsGroup>
      </div>
    )
  }
}

export default Order;
