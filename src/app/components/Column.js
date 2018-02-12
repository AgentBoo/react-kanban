// react
import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
import { reorder } from './../actions/actions'
// dnd
import { DropTarget } from 'react-dnd'
import { itemTypes } from './../constants'
// components



// ============================================================================ //
class Column extends Component{
  componentWillReceiveProps(nextProps){
    const { dragSource, reorder } = this.props;

    // enter handler
    if (!this.props.isOver && nextProps.isOver) {
      return reorder(dragSource.index, this.props.index)
    }
  }

  render(){
    // props injected by React DnD as defined by collect()
    const { connectDropTarget } = this.props;

    // false && (non-bool) returns false, ignores (non-bool)
    // aka to return the this.props.id, isOver must be true ...
    return connectDropTarget(
      <div className="column">
        { this.props.children }
      </div>
    )
  }
}



// specifies the Drop Target contract specification
// nothing is really required inside this spec
const dropTargetContract = {
  drop(props, monitor){
    // return the data describing the droppable item => column index
    const dropTarget = { index: props.index }
    return dropTarget
  }
}

// collect() tells DropTarget()() which props to inject into your component
// collect() called inside DropTarget()() is using DropTargetMonitor as monitor param
function collect(connector, monitor){
  return {
    // connectDropTarget() will be called inside render(), to let React DnD handle the drop events
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    dragSource: monitor.getItem()
  }
}

const mapStateToProps = function(state){
  return { lists: state.lists }
}

// DropTarget(type, spec, collect)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component);
Column = DropTarget(itemTypes.LIST, dropTargetContract, collect)(Column)
Column = connect(mapStateToProps, { reorder })(Column)
export default Column;
