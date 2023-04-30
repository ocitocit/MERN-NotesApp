import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteModal from "./components/AddNoteModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

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

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        variant="light"
        className={`mb-4 ${styleUtils.borderList} ${styleUtils.blockCenter}`}
      >
        Add Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={`${styleUtils.borderList} ${styles.note}`}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteModal && (
        <AddNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteModal(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
