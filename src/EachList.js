import React, { Component } from 'react';
import EachItem from './EachItem';
import { AddItemSection, AddItemButton, ItemContainer } from './style';
import { DropTarget } from 'react-dnd';

class EachList extends Component {

  constructor(props) {
    super(props);

    this.state = { itemAdd: false, currentItem: ''};

    this.addItem = this.addItem.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.cancleItem = this.cancleItem.bind(this);
  }


  pushCard(card,id) {
    this.props.saveItem(card.value,id);
  }

  addItem() {
    this.setState({ itemAdd: true });
  }

  cancleItem() {
    this.setState({ itemAdd: false });
  }

  handleAction(e) {
    this.setState({ currentItem : e.target.value });

  }

  saveItem(e) {
    e.preventDefault();
    const { list } = this.props;
    this.props.saveItem(this.state.currentItem, list.id);
    this.setState({ itemAdd: false, currentItem : '' });

  }

  render() {
    const { itemList, list, connectDropTarget } = this.props;
    const { itemAdd, currentItem } = this.state;

    return connectDropTarget(
      <li className="eachCard">
        <h3 className="listTitle">{list.title}</h3>

        <ItemContainer>
          { itemList.map( (item,index) => { return (<EachItem key={index} listId={list.id}
          item={item} editItem={this.props.editItem} deleteItem={this.props.deleteItem}
          swapItem={this.props.swapItem} /> )}
          )}
        </ItemContainer>

        {itemAdd && (<AddItemSection>
          <form onSubmit={this.saveItem}>
            <textarea placeholder="Add Description" value={currentItem} onChange={this.handleAction} />


            <div className='action'>
            <input type="submit" className='add' value='Add Item' disabled={!currentItem.length}/>
            <i className="fa fa-times cancle-btn" onClick={this.cancleItem}></i>
            </div>
          </form>
        </AddItemSection>)}

        {!itemAdd && (<AddItemButton>
          <i className="fa fa-plus plus-icon"></i>
          <button className='addItem' onClick={this.addItem}> { itemList.length < 1 ? 'Add Item' : 'Add Another Item' } </button>
        </AddItemButton>
        )}

      </li>
    );
  }
}


const cardTarget = {
  drop(props, monitor, component ) {
    const { list } = props;
    const sourceObj = monitor.getItem();

    if ( list.id !== sourceObj.listId ) component.pushCard(sourceObj.card, list.id);
    return {
      listId: list.id
    };
  }
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(EachList);
