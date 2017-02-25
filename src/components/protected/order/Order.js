var React = require('react');
var List = require('./helpers/List');
var AddListItem = require('./items/AddListItem');
var AddListItem2 = require('./items/AddListItem2');
var firebaseDb = require('../../../helpers/db');


var ShoppingList = React.createClass({

  getInitialState: function () {
    return {
      list: {}
    };
  },

  updateList: function (newList) {
    this.setState({
      list: newList
    });
  },

  addListItem: function (item) {
    var list = this.state.list;
      

    list[item.id] = item;

    this.updateList(list);
      //console.log(firebaseDb);
      firebaseDb.saveUserOrder(item);

  },

  removeListItem: function (itemId) {
    var list = this.state.list;

    delete list[itemId];

    this.updateList(list);
  },

  removeAllListItems: function () {
    this.updateList({});
  },

  render: function () {
    var items = this.state.list;
    var itemsData = [];
    firebaseDb.fetchItems(function (data) {
        console.log(data.val());
        itemsData = data.val();
    });


    return (<div className="page">
        <div className="page-title"><h2>Order</h2></div>
        
        
        
         <div className="modal fade" id="payModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
               
                <div className="modal-footer">  
       
        
        <button type="button" className="close"  data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>  
                 <List
              items={items}
              removeListItem={this.removeListItem} 
              removeAllListItems={this.removeAllListItems} />
      <hr/>
                   <button className="btn btn-block btn-lg btn-success" type="submit">CONTINUE</button>
                               </div>

                </div>
                </div>
                </div>
                
        
        
        
        
       <div className="btn-group btn-group-justified" role="group" aria-label="Justified">
                <div className="btn-group" role="group">
                <button type="button" data-toggle="modal" data-target="#payModal" className="btn btn-default">Menu</button>
                </div>
                <div className="btn-group" role="group">
                <button type="button" className="btn btn-default">Featured</button>
                </div>
           <div className="btn-group" role="group">
                <button type="button" className="btn btn-success">Previous</button>
                </div>
                <div className="btn-group" role="group">
                <button type="button" data-toggle="modal" data-target="#manageModal" className="btn btn-default">Favorites</button>
                </div>
                </div>
                     
               <hr/>   
        
            <div className="gallery-container">
                <div className="gallery">

                    {itemsData}
                    {itemsData.map(function(item, index){
                        console.log("---------");

                        console.log(item,index);

                        console.log("---------");

                        return <AddListItem  addListItem={this.addListItem} />

                    })}
            </div>
            </div>
            
            </div>

        
            
    );
  }
});

module.exports = ShoppingList;


