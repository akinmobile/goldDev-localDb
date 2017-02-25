var React = require('react');

var ListHeader = React.createClass({
  
  handleSubmit: function (event) {
    event.preventDefault();

    this.props.removeAllListItems();
  },

  render: function () {
    var totalNumberOfListItems = this.props.totalNumberOfListItems;

    if (totalNumberOfListItems > 0) {
      return (
        <form className="text-center" onSubmit={this.handleSubmit}> 
          {this.props.totalNumberOfListItems} {totalNumberOfListItems === 1 ? 'item' : 'items'}
          {' '}
          <button className="btn btn-xs btn-default" type="submit">Remove all</button>
        </form>
      );
    }

    return (<header className="text-center">Order</header>);
  }
            
});

module.exports = ListHeader;