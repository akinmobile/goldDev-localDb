import { ref, firebaseAuth } from '../config/constants'

export function writeUserData(cid, ccname, expiry, ccv, name, address, city, state, zip) {
    var userId = firebaseAuth().currentUser.uid;
    return ref.child('users/' + userId).child('cc1')
    .update({
            cid: cid,
            ccname: ccname,
            expiry: expiry,
            ccv: ccv,
            name: name,
            address: address,
            city: city,
            state: state,
            zip: zip,
         })
    }

export function saveUserOrder(item){

    var userId = firebaseAuth().currentUser.uid;

    var ordersNode = ref.child('users').child(userId).child('orders');

    var newOrderKey = ordersNode.push().key;

    var itemsKey = ordersNode.child(newOrderKey).child('items').push().key;

    ordersNode.child(newOrderKey).child('items').child(itemsKey).set(item,function (status) {
        console.log(status);
    });


    //updateTotalAmount(ordersNode.child(newOrderKey).child('total_amount'),item.price);

    ordersNode.child(newOrderKey).child('tax').set(2);
}


export function createDummyItems(item) {
    var itemKey =  ref.child('items').push().key;
    ref.child('items').child(itemKey).set(item,function (error) {
        if(error == null){
            console.log("Item Successfully added");
        }
    });
}


function updateTotalAmount(amountRef, price) {
    amountRef.transaction(function(oldValue) {
        if (oldValue) {
            if (oldValue == 0 || oldValue == null) {
                oldValue = price
            } else {
                oldValue = oldValue + price
            }
        }else{
            oldValue = oldValue + price
        }
        return oldValue;
    });
}


export function fetchItems(itemsFromDatabase) {
    ref.child('items').on('value',function (snapshot) {
        console.log(snapshot);
        itemsFromDatabase(snapshot);
    })
}