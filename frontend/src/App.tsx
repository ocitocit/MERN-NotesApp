import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import { FaPlus } from "react-icons/fa";
import AddEditNoteModal from "./components/AddEditNoteModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        variant="light"
        className={`mb-4 ${styleUtils.borderList} ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus /> Add Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
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
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
