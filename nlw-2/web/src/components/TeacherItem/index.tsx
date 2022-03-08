import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

 interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {user_id: teacher.id})
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
        <span>{teacher.subject}}</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada
        <br />
        <br />
        Apaixonado porexplodir coisas em laboratório e por mudar a vida das pessoas
        através de experiências.
      </p>

      <footer>
        <p>Preço/hora</p>
        <strong>R$ {teacher.cost}</strong>
        <a  target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
