import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCategoryType, removeBooklist } from '../../stores/allActions';
import { withRouter } from 'react-router-dom';
import './BookList.scss';
const ButtonElememt = ({categories, selectCateGory, removeList}) => {
    const listItems = categories.map((item, i) =>
        <button key= {i} className={`item ${item}`} onClick={() => selectCateGory(item)}>{item.toUpperCase()}</button>
    );
    return (
        <ul className="group-btn">
            {listItems}
            <button className={`item remove-all`} onClick={() => removeList()}>REMOVE</button>
        </ul>
    );
};

const ListElememt = ({list}) => {
    const listItems = list.map((item, i) => {
        return (
            <li className="book-tiem" key={i}>
                <h4>{item.title}</h4>
                <p>Author: <strong>{item.author}</strong></p>
                <p>Subreddit: {item.subreddit}</p>
            </li>
        );
    });

    return (
        <ul className="listElement">{listItems}</ul>
    );
};

class ReduxBookList extends Component {
    constructor(props) {
        super(props);
    }
    selectCateName = (catName) => {
        this.props.dispatch(selectCategoryType(catName));
    }
    onRemoveList = () => {
        this.props.dispatch(removeBooklist());
    }
    categories = () => {
        return ['javascript', 'angular', 'php', 'nodejs', 'reactjs'];
    }
    render() {
        return (
            <div className="book-container">
                <ButtonElememt categories={this.categories()} selectCateGory={(e) => this.selectCateName(e)} removeList={this.onRemoveList}/>
                <div className="list-books">
                    <ListElememt list={this.props.bookList}/>
                </div>
            </div>
        );
    }
    componentDidMount = () => {
        if(this.props.isLoadInit) {
            this.selectCateName('javascript');
        }
    }
}
ReduxBookList.propTypes = {
    bookList: PropTypes.array,
    dispatch: PropTypes.func,
    isLoadInit: PropTypes.bool

};
ButtonElememt.propTypes = {
    categories: PropTypes.array,
    list: PropTypes.array,
    removeList: PropTypes.func,
    selectCateGory: PropTypes.func

};
ListElememt.propTypes = {
    list: PropTypes.array,
};
ReduxBookList.defaulProps = {
    bookList: [],
    isLoadInit: false
}
const mapStateToProps = (state) => {
    return {
        bookList: state.bookList && state.bookList.list && state.bookList.list.length ? state.bookList.list : []
    };
};

export default withRouter(connect(mapStateToProps)(ReduxBookList));
