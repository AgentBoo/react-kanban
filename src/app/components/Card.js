// react
import React, { Component } from 'react';
// dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../constants';


// ============================================================================ //
// Component
// ============================================================================ //
class Card extends Component{
  render(){
    const { connectDragSource, connectDropTarget } = this.props;
    const { text } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div className="card"> { text } </div>
      )
    )
  }
};



// ============================================================================ //
// React DnD stuff
// ============================================================================ //

// NOTE: DragSource() arguments
// ====================================== //
const cardSourceContract = {
  beginDrag(props, monitor){
    const dragSource = {
      id  : props.id,
      idx : props.idx
    }
    return dragSource
  }
};

function collectDragProps(connector, monitor){
  return {
    connectDragSource : connector.dragSource(),
    isDragging        : monitor.isDragging(),
    source            : monitor.getItem()
  }
};


// NOTE: DropTarget arguments
// ====================================== //
const cardTargetContract = {
  drop(props, monitor){
    const dropTarget = {
      id  : props.id,
      idx : props.idx
    }
    return dropTarget
  }
};

function collectDropProps(connector, monitor){
  return {
    connectDropTarget : connector.dropTarget()
  }
};


// DragSource(type, spec, collect)(Component);
// DropTarget(type, spec, collect)(Component);
Card = DragSource(itemType.CARD, cardSourceContract, collectDragProps)(Card);
Card = DropTarget(itemType.CARD, cardTargetContract, collectDropProps)(Card);

export default Card;
