import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  conponent() {

    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' render={HomePage} />
          <Route exact path='/aboutus' render={() => <About leaders={this.state.leaders} />} />
          <Route exact path='/menu'  render={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:dishId'  render={DishWithId} />
          <Route exact path='/contactus'  render={Contact} />
          <Redirect to='/home' />
        </Switch>

        <Footer />
      </div>
    );
    }}
    export default Main;