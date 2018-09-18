import React, { Component } from 'react';
import { AddListButton, EachListContainer, AddListSection } from './style';
import EachList from './EachList';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class AddList extends Component {

  constructor(props) {
    super(props);
    this.state= {
      listTitle: '',
      listArray : [],
      listAdd: false,
    };

    this.addList = this.addList.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.swapItem = this.swapItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.cancleList = this.cancleList.bind(this);
  }

  addList() {
    this.setState({ listAdd: true });
  }

  cancleList() {
    this.setState({ listAdd: false });
  }

  handleAction(e) {
    this.setState({ listTitle : e.target.value });

  }

  saveItem(item, listId) {
    const { listArray } = this.state;
    const listArrayCopy = listArray.slice();
    let currentListIndex = listArrayCopy.findIndex( list => list.id === listId);
    const itemDetails = { id: Date.now(), value: item};
    listArrayCopy[currentListIndex].itemList.push(itemDetails);
    this.setState(prevState => ({
      listArray : listArrayCopy
      })
    );
  }

  deleteItem(item, listId, itemId) {
    const { listArray } = this.state;
    var listArrayCopy = listArray.slice();
    var listArrayIndex = listArrayCopy.findIndex(list => list.id === listId);
    let itemList = listArray[listArrayIndex].itemList.slice();
    var index = itemList.findIndex(item => item.id === itemId);
    itemList.splice(index,1);
    let newListObject = Object.assign({},listArray[listArrayIndex], {itemList: itemList} );
    listArrayCopy.splice(listArrayIndex,1,newListObject);
    this.setState({listArray: listArrayCopy});
  }

  editItem(item, listId, itemId) {
    const { listArray } = this.state;
    var listArrayCopy = listArray.slice();
    var listArrayIndex = listArrayCopy.findIndex(list => list.id === listId);
    let itemList = listArray[listArrayIndex].itemList.slice();
    var index = itemList.findIndex(item => item.id === itemId);
    let newItem = Object.assign({},itemList[index], {value: item} );
    itemList.splice(index,1,newItem);
    let newListObject = Object.assign({},listArray[listArrayIndex], {itemList: itemList} );
    listArrayCopy.splice(listArrayIndex,1,newListObject);
    this.setState({listArray: listArrayCopy});
  }

  swapItem(dragItemId, hoverItemId, listId) {
     const { listArray } = this.state;
     const listArrayCopy = listArray.slice();
     let currentListIndex = listArrayCopy.findIndex( list => list.id === listId);
     let itemList = listArrayCopy[currentListIndex].itemList.slice();
     const dragItemIndex = itemList.findIndex( item => item.id === dragItemId);
     const hoverItemIndex = itemList.findIndex( item => item.id === hoverItemId);
     var swapV = itemList[dragItemIndex];
     itemList[dragItemIndex] = itemList[hoverItemIndex];
     itemList[hoverItemIndex] = swapV;
     let newListObject = Object.assign({},listArray[currentListIndex], {itemList: itemList} );
     listArrayCopy.splice(currentListIndex,1,newListObject);
     this.setState({listArray: listArrayCopy});
   }

  saveTitle(e) {
    e.preventDefault();
    var listDetails = { id: Date.now(), title: this.state.listTitle, itemList: []};
    this.setState(prevState => ({
    listAdd: false,
    listTitle : '',
    listArray : prevState.listArray.concat(listDetails)}));
  }

  render() {
    const { listArray, listAdd, listTitle } = this.state;

    return (
      <div className="listContainer">
        <EachListContainer>
        { listArray.map( (list,index) => { return (<EachList list={list} itemList={list.itemList}  key={index}
          saveItem={this.saveItem} editItem={this.editItem} deleteItem={this.deleteItem} swapItem={this.swapItem} /> )}
        )}
        </EachListContainer>

        {listAdd && (<AddListSection>
          <form onSubmit={this.saveTitle}>
            <input type="text" value={listTitle} placeholder="Add List Title" onChange={this.handleAction} />

            <div className='action'>
              <input type="submit" className='add' value='Add List' disabled={!listTitle.length} />
              <i className="fa fa-times cancle-btn" onClick={this.cancleList}></i>
            </div>
          </form>
        </AddListSection>)}

        {!listAdd && (<AddListButton>
          <i className="fa fa-plus plus-icon"></i>
          <button className='addList' onClick={this.addList}> {listArray.length < 1 ? 'Add List': 'Add Another List'} </button>
        </AddListButton>)}
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(AddList);
