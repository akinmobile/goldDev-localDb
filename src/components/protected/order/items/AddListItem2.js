var React = require('react');
var uuid = require('node-uuid');





var addListItem2 = React.createClass({
        handleSubmitEvent: function (event) {
        event.preventDefault();
        var item = {
        date: new Date()
        , product: this.refs.name.value.trim()
        , description: this.refs.description.value.trim()
        , quantity: this.refs.quantity.value
        ,price: this.refs.price.value

        };
        this.props.addListItem2(item);
        }
        , render: function () {
        return (
                < form className="project" onClick = { this.handleSubmitEvent  } >
                < input type = "hidden"  value="Item 2"  id = "listItemName"  required ref = "name" / >
                < input  type = "hidden" id = "listItemDescription"  value="Item2" ref = "description" / >
                < input type = "hidden"  defaultValue = "1"  id = "listItemQuantity" required ref = "quantity" / >
                < input type = "hidden"  defaultValue = "1"  id = "listItemPrice" required ref = "price"/>

                <a className="project-image" data-toggle="modal" data-target="#payModal"  type="submit"> <div className="overlay">
                <div className="info">
                <img className="avatar" src="https://cdna.artstation.com/p/users/avatars/000/013/114/medium/a084be188b879c48d9fa5dcd19dd5ac4.jpg?1447086667"/><div>Product</div><div class="name">Description</div></div></div>
                <img className="image" src="https://cdna.artstation.com/p/assets/images/images/004/263/362/smaller_square/yuri-shwedoff-sale-50.jpg?1481819564" /></a>



                < /form>);
        }
        });
module.exports = addListItem2;
