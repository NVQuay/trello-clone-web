import { React, useEffect, useState, useCallback } from "react";
import "./Column.scss";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utilities/constans";

import {
  saveContentAfterPressEnter,
  selectAllInLineText,
} from "utilities/contentEditable";

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const [columnTitle, setColumnTitle] = useState("");
  const onNewColumnTitleChange = useCallback((e) =>
    setColumnTitle(e.target.value)
  );

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const onConfirmModalACtion = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column!!
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const onNewColumnTitleBlur = () => {
    console.log(columnTitle);
    const newColumn = {
      ...column,
      _title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size='sm'
            type='text'
            placeholder='Enter column title...'
            className='tsebyuaqdev-content-editable'
            value={columnTitle}
            onChange={onNewColumnTitleChange}
            onBlur={onNewColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            spellCheck='false'
            onClick={selectAllInLineText}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle
              className='dropdown-btn'
              id='dropdown-basic'
              size='sm'
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item>
                Move all cards in this column (beta)...
              </Dropdown.Item>
              <Dropdown.Item>
                Archive all cards in this column (beta)...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list'>
        <Container
          orientation='vertical' //default
          groupName='tsebyuaqdev-column'
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className='footer-actions'>
          <i className='icon fa fa-plus'></i>Add another card
        </div>
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalACtion}
        title='Remove Column'
        content={`Are you sure you want to remove <strong>${column.title}</strong> <br/> All related cards will also be removed`}
      />
    </div>
  );
}

export default Column;
