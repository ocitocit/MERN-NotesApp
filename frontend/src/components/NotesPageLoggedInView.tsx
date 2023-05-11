import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/notes_api';
import styles from '../styles/NotesPage.module.css';
import styleUtils from '../styles/utils.module.css';
import AddEditNoteModal from './AddEditNoteModal';
import Note from './Note';

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((exitingNote) => exitingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`${styles.notesGrid} g-4`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={`${styleUtils.borderList} ${styles.note}`}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        variant="light"
        className={`mb-4 ${styleUtils.borderList} ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus /> Add Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Something went wrong. Please reload the page</p>}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}</>
      )}

      {showAddNoteModal && (
        <AddEditNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteModal(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteModal
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id ? updatedNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
