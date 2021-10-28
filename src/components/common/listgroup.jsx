import React from 'react';
import Movies from '../movies';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;

    return (
        <ul className="list-group">
            {items.map(item => <li
                key={item[valueProperty]}
                style={{ cursor: "pointer" }}
                className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                onClick={() => onItemSelect(item)}>
                {item[textProperty]}
            </li>)
            }
        </ul >
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;