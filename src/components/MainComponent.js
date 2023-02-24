import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchPromotions, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromotions: () => { dispatch(fetchPromotions()) },
    resetFeedbackForm: () => { dispatch(actions.reset("feedback")) }
})

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((item) => item.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrorMessage={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.promotions.filter((item) => item.featured)[0]}
                    promotionsLoading={this.props.promotions.isLoading}
                    promotionsErrorMessage={this.props.promotions.errorMessage}
                    leader={this.props.leaders.filter((item) => item.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            const dishId = parseInt(match.params.dishId, 10);

            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter((item) => item.id === dishId)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter((item) => item.dishId === dishId)}
                    commentsErrorMessage={this.props.comments.errorMessage}
                    addComment={this.props.addComment}
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
