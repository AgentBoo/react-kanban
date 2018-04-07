// react
import React, { Component } from 'react';
// components
import Card from './../containers/Card';
import { Button, Glyphicon } from 'react-bootstrap';
import { EditableLine } from './../toolbox/EditableLine';


// ============================================================================ //
// List component
// ============================================================================ //
class List extends Component {
  renderCard = (card) => (
    <Card
       key={ card.id }
       id= { card.id }
       luid={ card.luid }
       { ...card } />
  );

  // pass down
  editList = (value) => this.props.editList({ id: this.props.id, label: value  });
  removeList = () => this.props.removeList({ id: this.props.id });


  render(){
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const { cards, label } = this.props;
    // arrow syntax to retain -this- context
    const cardsload = cards.length ? cards.map((card) => this.renderCard(card)) : null;
    const draggingStyle = isDragging ? 'board-list shadow-in is-dragging' : 'board-list shadow-in';

    return connectDragSource(
      connectDropTarget(
        <div className={ draggingStyle }>
          <div className='board-list-header'>
            <EditableLine
               altdecor='board-list-title pointsor'
               decor='board-list-title editable'
               value= { label }
               submitFn = { this.editList } />
          </div>
          <div className='board-list-main'>
            <p className="board-list-main-summary"> 20/20 </p>
            { cardsload }

          </div>
        </div>
      )
    )
  };
// component end
};

export default List;
