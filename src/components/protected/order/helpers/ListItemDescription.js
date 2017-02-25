var React = require('react');

var ListItemDescription = function (props) {
    return (
      <h5 className="container">
        {props.description}
      </h5>
    );
};

module.exports = ListItemDescription;