import React, { Component } from 'react';
import { ActionButton } from './style';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';

const style = {
  margin: '.5rem',
  cursor: 'move'
};

class EachItem extends Component {

  constructor(props) {
    super(props);
    this.state = { editItem: false, currentItem: ''};
    this.saveEditItem = this.saveEditItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  startEdit() {
    this.setState({editItem: true, currentItem: this.props.item.value});
  }

  saveEditItem(e) {
    e.preventDefault();
    const { item, listId } = this.props;
    const { currentItem } = this.state;
    this.props.editItem(currentItem, listId, item.id);
    this.setState({ editItem: false, currentItem: '' });
  }

  deleteItem() {
    const { item, listId } = this.props;
    const { currentItem } = this.state;
    this.props.deleteItem(currentItem, listId, item.id);
  }

  handleAction(e) {
    this.setState({currentItem: e.target.value});
  }

  render() {

    const { isDragging, connectDragSource, connectDropTarget, item } = this.props;
    const opacity = isDragging ? 0 : 1;
    const { editItem, currentItem } = this.state;

    return connectDragSource(connectDropTarget(
      <li className='eachItem'>
      {!editItem &&(
        <span style={{ ...style, opacity }}>
          {item.value}
        <ActionButton>
          <i className="fa fa-times" onClick={this.deleteItem}></i>
          <i className="fa fa-edit" onClick={this.startEdit}></i>
        </ActionButton>
        </span>
      )}
      {editItem && (
        <form onSubmit={this.saveEditItem}>
          <textarea  value={currentItem} className='editItem' onChange={this.handleAction} />
          <input type="submit" className='add' value='Save' disabled={!currentItem.length} />
        </form>
      )}
      </li>
    ));
  }
}

const cardSource = {

  beginDrag(props) {
    return {
      index: props.item.id,
      listId: props.listId,
      card: props.item
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if ( dropResult && dropResult.listId !== item.listId ) {
      props.deleteItem(props.item, props.listId, props.item.id);
    }
  }
};

const cardTarget = {

  hover(props, monitor, component) {
    const dragItemId = monitor.getItem().index;
    const hoverItemId = props.item.id;
    const sourceListId = monitor.getItem().listId;

    // Don't replace items with themselves
    if (dragItemId === hoverItemId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragItemId < hoverItemId && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragItemId > hoverItemId && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if ( props.listId === sourceListId ) {
      props.swapItem(dragItemId, hoverItemId, props.listId);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverItemId;
    }
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(EachItem);
