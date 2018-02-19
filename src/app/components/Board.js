// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// components
import Supralist from './Supralist';
import Supracard from './Supracard';


// ============================================================================ //
// Component
// ============================================================================ //
class Board extends Component{
  renderCard(card, i, listIdx){
    const { id, text } = card;

    return(
      <Supracard key={ id } id={ id } idx={ i } list={ listIdx } text={ text }/>
    )
  }

  renderList(list, i){
    const { id, label } = list;

    const { cards } = list;
    const listIdx = i;
    const cardsload = cards.map((card, i) => this.renderCard(card, i, listIdx));

    // cannot use key={ i }, because react-dnd issue 748
    return (
      <Supralist key={ id } id={ id } idx={ i } label={ label }>
        { cardsload }
      </Supralist>
    )
  };


  render(){
    const { lists } = this.props
    // arrow syntax to retain context of -this-
    const listsload = lists.map((list, i) => this.renderList(list, i))

    return (
      <main className="board">
        { listsload }
      </main>
    )
  };
};



// ============================================================================ //
// Redux + React DnD stuff
// ============================================================================ //
const mapStateToProps = function(state){
  return { lists: state.lists }
};


// DragDropContext(backend)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component)
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps)(Board);

export default Board;
