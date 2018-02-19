// react
import React, { Component } from 'react';
// dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../constants';
// components


// ============================================================================ //
// Component
// ============================================================================ //
class List extends Component{
  render(){
    // props injected by React DnD -- as specified in collect()
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const { label } = this.props;

    let listStyle = isDragging ? 'list decor-opacity' : 'list';


    return connectDragSource(
      connectDropTarget(
        <div>
          <div className={ listStyle }>
            <h5 className="list-label"> { label } </h5>
            <div className="list-cards">
              { this.props.children }
            </div>
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
const listSourceContract = {
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
const listTargetContract = {
  drop(props, monitor){
    const dropTarget = {
      id  : props.id,
      idx : props.idx
    }
    return dropTarget
  },

  hover(props, monitor){
    if(monitor.getItem().id === props.id){
      return
    }

    if(monitor.getItemType() === itemType.CARD && monitor.getItem().list !== props.idx){
      props.transitCard(monitor.getItem().id, monitor.getItem().list, 0, props.idx);
      monitor.getItem().list = props.idx;
      return
    }

    if(monitor.getItemType() === itemType.LIST){
      return props.shiftList(monitor.getItem().id, props.idx);
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


// DragSource(type, spec, collect)(Component);
// DropTarget(type, spec, collect)(Component);
List = DragSource(itemType.LIST, listSourceContract, collectDragProps)(List);
List = DropTarget([itemType.LIST, itemType.CARD], listTargetContract, collectDropProps)(List);

export default List;
