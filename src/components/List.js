// react
import React, { Component } from 'react';
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../constants';
// redux
import { connect } from 'react-redux';
import { shiftList, transitCard } from './../actions';
// components
import List from './List';


// ============================================================================ //
// Component
// ============================================================================ //
class List extends Component{
  render(){
    // props injected by React DnD -- as specified in collect()
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const { label } = this.props;

    let listStyle = isDragging ? 'list low-opacity' : 'list';


    return connectDragSource(
      connectDropTarget(
        <div className={ listStyle }>
          <h5 className="list-label"> { label } </h5>
          <div className="list-cards">
            { this.props.children }
          </div>
        </div>
      )
    )
  };
};



// ============================================================================ //
// React DnD stuff
// ============================================================================ //

// NOTE: DragSource() arguments
// ====================================== //
// Drag Source contract SPECIFICATION -- only .beginDrag(props, monitor) method is required for drag source contracts
const listSourceSpec = {
  beginDrag(props, monitor){
    // return object describing the draggable list, e.g list.id
    const dragSource = {
      id  : props.id,
      idx : props.idx
    }
    return dragSource
  }
};


// collect() tells DragSource()() or DropTarget()(), which props to inject into your component
// collect() called inside DragSource() uses DragSourceMonitor as monitor
function collectDragProps(connector, monitor){
  return {
    // connectDragSource() will be called inside render(), to let React DnD handle the drag events
    connectDragSource : connector.dragSource(),
    // ask the monitor about the current drag state
    isDragging        : monitor.isDragging(),
    // what is being dragged
    dragSource        : monitor.getItem()
  }
};



// NOTE: DropTarget arguments
// ====================================== //

// Drop Target contract SPECIFICATION -- nothing is required for drop target contracts
const listTargetSpec = {
  // hover() is called when a drag source is hovering over a drop target component
  // hover() is fired very often (...that would be an understatement)
  hover(props, monitor){
    // NOTE: calling props.dragSource() is NOT the same as calling monitor.getItem()
    // if a drag source is a list, id will point to list.id
    // if a drag source is a card, id will point to card.id
    const dragSource = monitor.getItem();

    // am I hovering over self? Ok, stop right here
    if(monitor.getItemType() === itemType.LIST && dragSource.id === props.id){
      return
    }

    // am I a list hovering over another list? Ok, dispatch shiftList()
    if(monitor.getItemType() === itemType.LIST){
      // shiftList(origin.id, destination.idx)
      props.shiftList(dragSource.id, props.idx)
      return
    }

    // am I a card hovering over an empty area of another list? Ok, dispatch transitCard()
    if(monitor.getItemType() === itemType.CARD && dragSource.list !== props.idx){
      // REVIEW: There are issues with hovering a card.id = 1 over empty list.id = 1, or 2 over 2 ...
      // transitCard(source.id, origin.idx, target.idx, destination.idx)
      props.transitCard(dragSource.id, dragSource.list, 0, props.idx);
      monitor.getItem().list = props.idx;
      return
    }

  }
};


// collect() called inside DragSource() uses DropTargetMonitor as monitor
function collectDropProps(connector, monitor){
  return {
    // connectDropTarget() will be called inside render(), to let React DnD handle the drag events
    connectDropTarget  : connector.dropTarget(),
    // is anything hovering over the drop target + this enables the use of componentWillReceiveProps()
    isOver             : monitor.isOver()
  }
};



// ============================================================================ //
// DragSource(type, spec, collect)(Component);
// DropTarget(type, spec, collect)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component);
List = DragSource(itemType.LIST, listSourceSpec, collectDragProps)(List);
List = DropTarget([itemType.LIST, itemType.CARD], listTargetSpec, collectDropProps)(List);
List = connect(null, { shiftList, transitCard })(List);

export default List;
