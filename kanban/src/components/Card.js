// react
import React, { Component } from 'react';
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../constants';
// redux
import { connect } from 'react-redux';
import { shiftCard, transitCard } from './../actions';
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


// NOTE: React-DnD
// DRAG SOURCE
const dragSourceSpec = {
  beginDrag(props, monitor){
    const dragSource = {
      id     : props.id,
      luid   : props.luid
    }
    // return object describing the draggable card, e.g card.id
    return dragSource
  },
  // without explicitely specifying isDragging(), opacity changes will not work during transitCard()
  isDragging(props, monitor){
    return props.id === monitor.getItem().id
  }
};

// collect() tells DragSource()() or DropTarget()(), which props to inject into your component
// collect() called inside DragSource() uses DragSourceMonitor as monitor
const collectDragProps = (connector, monitor) => ({
  connectDragSource : connector.dragSource(),
  isDragging        : monitor.isDragging()
});


// DROP TARGET
const dropTargetSpec = {
  canDrop(props, monitor){
    const card = monitor.getItem()
    return card.status === 'suggested' || props.status !== 'suggested' || props.luid !== 'default'
  },

  hover(props, monitor){
    const card = monitor.getItem()

    if(card.id === props.id || !monitor.canDrop()){
      return
    }

    if(card.luid === props.luid){
      props.displaceCard(card.luid, card.id, props.id)
      return
    } else {
      props.transitCard(card.luid, card.id, props.id, props.luid)
      props.editCard({ luid: card.luid, id: card.id, to: props.luid })
      monitor.getItem().luid = props.luid
      return
    }
  }
};

const collectDropProps = (connector, monitor) => ({
  connectDropTarget : connector.dropTarget()
});


// NOTE: Redux
const mapDispatchToProps = {
  displaceCard,
  editCard,
  removeCard,
  transitCard
};

// ============================================================================ //
// DragSource(type, spec, collect)(Component);
// DropTarget(type, spec, collect)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component);
Card = DragSource(itemType.CARD, dragSourceSpec, collectDragProps)(Card);
Card = DropTarget(itemType.CARD, dropTargetSpec, collectDropProps)(Card);
Card = connect(null, mapDispatchToProps)(Card);

export default Card;
