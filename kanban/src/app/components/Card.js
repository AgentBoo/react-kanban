// react
import React, { Component } from 'react';
// dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../constants';
// components


// ============================================================================ //
// Component
// ============================================================================ //
class Card extends Component{
  render(){
    // props injected by React DnD -- as specified in collect()
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const { text } = this.props;

    let cardStyle = isDragging ? 'card low-opacity' : 'card';


    return connectDragSource(
      connectDropTarget(
        <div className={ cardStyle }>
          { text }
          { this.props.children }
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
const cardSourceSpec = {
  beginDrag(props, monitor){
    // return object describing the draggable card, e.g card.id
    const dragSource = {
      id  : props.id,
      list: props.list
    }
    return dragSource
  },

  // not an issue, but fyi from DragSource docs or react-dnd issues 227 to make isDragging work as it should from UX standpoint
  isDragging(props, monitor){
    return props.id === monitor.getItem().id
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
const cardTargetSpec = {
  // NOTE: calling props.dragSource() is NOT the same as calling monitor.getItem()
  // hover() is called when a drag source is hovering over a drop target component
  // hover() is fired very often (...that would be an understatement)
  hover(props, monitor){
    const card = monitor.getItem()

    // am I hovering over self? Ok, stop right here
    if(card.id === props.id){
      return
    }

    // am I hovering over another card within the same list? Ok, dispatch shiftCard()
    // or am I hovering over another card in another list? Ok, dispatch transitCard()
    if(card.list === props.list){
      // shiftCard(source.id, origin.idx, target.idx)
      props.shiftCard(card.id, card.list, props.idx)
      return
    } else {
      // transitCard(source.id, origin.idx, target.idx, destination.idx)
      props.transitCard(card.id, card.list, props.idx, props.list)
      monitor.getItem().list = props.list
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



// ====================================== //

// DragSource(type, spec, collect)(Component);
// DropTarget(type, spec, collect)(Component);
Card = DragSource(itemType.CARD, cardSourceSpec, collectDragProps)(Card);
Card = DropTarget(itemType.CARD, cardTargetSpec, collectDropProps)(Card);

export default Card;
