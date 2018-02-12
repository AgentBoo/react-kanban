// react
import React, { Component } from 'react'
// redux
import { connect } from 'react-redux'
// dnd
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// components
import Column from './Column'
import List from './List'



// ============================================================================ //
class Board extends Component{
  // every column will have a fixed position/fixed id
  renderColumn(i){
    // console.log(this.props.lists)
    return (
      <Column key={ i } index={ i }>
        { this.renderList(i) }
      </Column>
    )
  }

  renderList(i){
    const { lists } = this.props

    if(lists[i]){
      return(
        <List index={ lists[i].id } label={ lists[i].label }/>
      )
    }
  }

  render(){
    const { lists } = this.props;
    const columns = lists.map((list, i) => this.renderColumn(i))

    return (
      <main className="board">
        { columns }
      </main>
    )
  }
}



const mapStateToProps = function(state){
  return { lists: state.lists }
}

// DragDropContext(backend)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component)
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps)(Board)
export default Board
