// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
// dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// components
import List from './List';
import Card from './Card';


// ============================================================================ //
// Component
// ============================================================================ //
class Board extends Component{
  renderCard(card, i, listIndex){
    const { id, text } = card;

    return(
      <Supracard key={ id } id={ id } idx={ i } list={ listIndex } text={ text } />
    )
  };

  renderList(list, i){
    const { id, label } = list;

    const listIndex = i;
    const { cards } = list;
    // arrow syntax to retain context of -this-
    const cardsload = cards.map((card, i) => this.renderCard(card, i, listIndex));

    // cannot use key={ i }, because react-dnd issue 748
    return (
      <Supralist key={ id } id={ id } idx={ i } label={ label }>
        { cardsload }
      </Supralist>
    )
  };


  render(){
    const { cardlists } = this.props
    // arrow syntax to retain context of -this-
    const listsload = cardlists.map((list, i) => this.renderList(list, i))


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
  return { cardlists: state.cardlists }
};


// ====================================== //

// DragDropContext(backend)(Component);
// connect(mapStateToProps, mapDispatchToProps)(Component)
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps)(Board);

export default Board;
