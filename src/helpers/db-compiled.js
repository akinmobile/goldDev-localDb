'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeUserData = writeUserData;
exports.saveUserOrder = saveUserOrder;
exports.createDummyItems = createDummyItems;
exports.fetchItems = fetchItems;

var _constants = require('../config/constants');

function writeUserData(cid, ccname, expiry, ccv, name, address, city, state, zip) {
    var userId = (0, _constants.firebaseAuth)().currentUser.uid;
    return _constants.ref.child('users/' + userId).child('cc1').update({
        cid: cid,
        ccname: ccname,
        expiry: expiry,
        ccv: ccv,
        name: name,
        address: address,
        city: city,
        state: state,
        zip: zip
    });
}

function saveUserOrder(item) {

    var userId = (0, _constants.firebaseAuth)().currentUser.uid;

    var ordersNode = _constants.ref.child('users').child(userId).child('orders');

    var newOrderKey = ordersNode.push().key;

    var itemsKey = ordersNode.child(newOrderKey).child('items').push().key;

    ordersNode.child(newOrderKey).child('items').child(itemsKey).set(item, function (status) {
        console.log(status);
    });

    //updateTotalAmount(ordersNode.child(newOrderKey).child('total_amount'),item.price);

    ordersNode.child(newOrderKey).child('tax').set(2);
}

function createDummyItems(item) {
    var itemKey = _constants.ref.child('items').push().key;
    _constants.ref.child('items').child(itemKey).set(item, function (error) {
        if (error == null) {
            console.log("Item Successfully added");
        }
    });
}

function updateTotalAmount(amountRef, price) {
    amountRef.transaction(function (oldValue) {
        if (oldValue) {
            if (oldValue == 0 || oldValue == null) {
                oldValue = price;
            } else {
                oldValue = oldValue + price;
            }
        } else {
            oldValue = oldValue + price;
        }
        return oldValue;
    });
}

function fetchItems(itemsFromDatabase) {
    _constants.ref.child('items').on('value', function (snapshot) {
        console.log(snapshot);
        itemsFromDatabase(snapshot);
    });
}

//# sourceMappingURL=db-compiled.js.map