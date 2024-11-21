var addNewButton = document.getElementById('addNewButton');
var newItemInput = document.getElementById('newItemInput');
var completed = document.getElementById('completed');
var active = document.getElementById('active');
var all = document.getElementById('all');
var items = document.getElementById('items');

function createItem(text) {
    var li = document.createElement('li');

    var item = document.createElement('div');
    item.className = 'item';

    var itemStatus = document.createElement('input');
    itemStatus.className = 'itemStatus';
    itemStatus.type = 'checkbox';

    var itemText = document.createElement('div');
    itemText.className = 'itemText';
    itemText.textContent = text;

    var deleteItem = document.createElement('div');
    deleteItem.className = 'deleteItem';
    deleteItem.textContent = "X";

    itemStatus.addEventListener('click', function () {
        if (itemStatus.checked) {
            itemText.classList.add('itemDone')
        } else {
            itemText.classList.remove('itemDone');
        }
    });

    deleteItem.addEventListener('click', function () {
        item.remove();
    });

    item.appendChild(itemStatus);
    item.appendChild(itemText);
    item.appendChild(deleteItem);
    li.appendChild(item);

    return li;
}

addNewButton.addEventListener('click', function () {
    addNewItem();
});

newItemInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addNewItem();
    }
});

function addNewItem() {
    var value = newItemInput.value;
    if (!value.length) {
        console.log('Can not add an empty item');
        return;
    }
    var item = createItem(value);
    items.appendChild(item);
    newItemInput.value = '';
}

completed.addEventListener('click', function () {
    walkItems(function (item) {
        var cb = item.getElementsByClassName('itemStatus')[0];
        item.classList.remove('hidden')
        if (!cb.checked) {
            item.classList.add('hidden');
        }
    });
});

active.addEventListener('click', function () {
    walkItems(function (item) {
        var cb = item.getElementsByClassName('itemStatus')[0];
        item.classList.remove('hidden');
        if (cb.checked) {
            item.classList.add('hidden');
        }
    });
});

all.addEventListener('click', function () {
    walkItems(function (item) {
        item.classList.remove('hidden');
    });
});

function walkItems(callback) {
    var nodes = items.getElementsByClassName('item');
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (typeof callback === 'function') {
            callback(node);
        }
    }
}
