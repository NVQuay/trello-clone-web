import { React, useEffect, useRef, useState } from "react";
import "./Column.scss";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { Button, Dropdown, Form } from "react-bootstrap";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utilities/constants";
import { cloneDeep } from "lodash";

import {
  saveContentAfterPressEnter,
  selectAllInLineText,
} from "utilities/contentEditable";

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "_id");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const [columnTitle, setColumnTitle] = useState("");
  const onNewColumnTitleChange = (e) => setColumnTitle(e.target.value);

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const ToggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const newCardTextareaRef = useRef(null);

  const [newCardTitle, setNewCardTitle] = useState("");
  const onNewCardTitleChange = (e) => {
    setNewCardTitle(e.target.value);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
      newCardTextareaRef.current.select();
    }
  }, [openNewCardForm]);

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

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus();
      return;
    }

    const newCardToAdd = {
      id: Math.random().toString(36).substring(2, 5), // 5 random characters, will remove when we implement code api
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
      cover: null,
    };

    let newColumn = cloneDeep(column);
    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd._id);

    onUpdateColumn(newColumn);
    setNewCardTitle("");
    ToggleOpenNewCardForm();
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
              <Dropdown.Item onClick={ToggleOpenNewCardForm}>
                Add card...
              </Dropdown.Item>
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
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
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
        {openNewCardForm && (
          <div className='add-new-card-area'>
            <Form.Control
              size='sm'
              as='textarea'
              rows='3'
              placeholder='Enter a title for this card...'
              className='textarea-enter-new-card'
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(event) => event.key === "Enter" && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className='add-new-card-actions'>
            <Button variant='success' size='sm' onClick={addNewCard}>
              Add card
            </Button>
            <span className='cancle-icon' onClick={ToggleOpenNewCardForm}>
              <i className='fa fa-trash icon'></i>
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className='footer-actions' onClick={ToggleOpenNewCardForm}>
            <i className='icon fa fa-plus'></i>Add another card
          </div>
        )}
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
