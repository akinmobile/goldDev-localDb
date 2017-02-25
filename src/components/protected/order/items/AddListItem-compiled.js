'use strict';

var React = require('react');
var uuid = require('node-uuid');
var firebaseDb = require('../../../../helpers/db');

// firebaseDb.fetchItems(function (data) {
//     console.log(data.val());
//
// });

var AddListItem = React.createClass({
    handleSubmitEvent: function handleSubmitEvent(event) {
        event.preventDefault();
        var item = {
            date: new Date(),
            product: this.refs.name.value.trim(),
            description: this.refs.description.value.trim(),
            quantity: parseInt(this.refs.quantity.value),
            price: this.refs.price.value
        };
        this.props.addListItem(item);
    },
    render: function render() {
        console.log("I was here");
        firebaseDb.fetchItems(function (data) {
            console.log(data.val());
        });
    }
});

module.exports = AddListItem;

//# sourceMappingURL=AddListItem-compiled.js.map