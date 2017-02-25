var React = require('react');
var ListItem = require('./ListItem');
var ListHeader = require('./ListHeader');
var EmptyList = require('./EmptyList');

var List = React.createClass({

  getListOfItemIds: function (items) {
    return Object.keys(items);
  },

  getTotalNumberOfListItems: function (items) {
    var totalNumberOfItems = 0;
    var item;

    this.getListOfItemIds(items).forEach(function (itemId) {
      item = items[itemId];
      totalNumberOfItems = totalNumberOfItems + parseInt(item.quantity, 10);
    });

    return totalNumberOfItems;
  },

  createListItemElements: function (items) {
    var item;

    return (
      this
      .getListOfItemIds(items)
      .map(function createListItemElement(itemId) {
        item = items[itemId];
        return (<ListItem item={item} removeListItem={this.props.removeListItem} key={item.id} />);
      }.bind(this))
      .reverse()
    );
  },

  render: function () {
    var items = this.props.items;
    var listItemElements = this.createListItemElements(items);

    return (
      <div>
        <h4 className="page-header">

          <ListHeader totalNumberOfListItems={this.getTotalNumberOfListItems(items)} removeAllListItems={this.props.removeAllListItems} />

        </h4>
             <h4 className="text-left"><a href="http://maps.apple.com/?q=labrum+ford+heber+city+ut"><span className="glyphicon glyphicon-map-marker"/> Directions</a></h4>

        

          {listItemElements.length > 0 ? listItemElements : <EmptyList />}

     
      </div>
    );
  }
});

module.exports = List;
