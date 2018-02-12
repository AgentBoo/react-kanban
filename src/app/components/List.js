// react
import React, { Component } from 'react'
// redux
// import { connect } from 'react-redux'
// dnd
import { DragSource } from 'react-dnd'
import { itemTypes } from './../constants'
// components



// ============================================================================ //
class List extends Component{
  render(){
    // props injected by React DnD as defined by collect()
    const { connectDragSource } = this.props;
    const { label } = this.props;

    // true || (non-bool) returns true, ignores (non-bool)
    // aka to return the .list component, isDragging must be false ...
    return connectDragSource(
      <div>
        <div className="list"> { label } </div>
      </div>
    )
  }
}



// specifies the Drag Source contract specification
// only .beginDrag(props, monitor) method is required for drag sources
const dragSourceContract = {
  beginDrag(props){

    // return the data describing the draggable item => list index
    const dragSource = {
      index: props.index
    }
    return dragSource
  },
  endDrag(props){
    console.log('end drag')
  }
}

// collect() tells DragSource()() which props to inject into your component
// collect() called inside DragSource() is using DragSourceMonitor as monitor param
function collect(connector, monitor){
  return {
    // connectDragSource() will be called inside render(), to let React DnD handle the drag events
    connectDragSource : connector.dragSource(),
    // ask the monitor about the current drag state
    isDragging        : monitor.isDragging()
  }
}


// DragSource(type, spec, collect)(Component);
List = DragSource(itemTypes.LIST, dragSourceContract, collect)(List);
export default List;
