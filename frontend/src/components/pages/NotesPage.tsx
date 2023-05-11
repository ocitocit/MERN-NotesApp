import { Container } from 'react-bootstrap';
import { User } from '../../models/user';
import styles from '../../styles/NotesPage.module.css';
import NoteLoggedOutView from '../NoteLoggedOutView';
import NotesPageLoggedInView from '../NotesPageLoggedInView';

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>{loggedInUser ? <NotesPageLoggedInView /> : <NoteLoggedOutView />}</>
    </Container>
  );
};

export default NotesPage;
