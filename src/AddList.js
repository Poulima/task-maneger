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

  editItem(newItem, listId) {
    const { listArray } = this.state;
    const listArrayCopy = listArray.slice();
    let currentListIndex = listArrayCopy.findIndex( list => list.id === listId);
    listArrayCopy[currentListIndex].itemList = newItem;

    this.setState(prevState => ({
      listArray : listArrayCopy
      })
    );
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
        { listArray.map( (list,index) => { return (<EachList list={list} key={index}
          saveItem={this.saveItem} editItem={this.editItem}  /> )}
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
