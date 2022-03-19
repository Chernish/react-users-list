import React, {useState} from 'react';
import {Button, Form} from '../components';
import {useParams} from "react-router-dom";

const EditUser = () => {

  const {id} = useParams();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const clickReadOnly = () => {
    setReadOnly(false);
    setButtonDisabled(false);
  }

  return (
    <div className='main__wrapper'>
      <div className='main__header'>
        <h2 className='main__title'>Профиль пользователя</h2>
        <Button primary onClickReadOnly={clickReadOnly}>Редактировать</Button>
      </div>
      {id &&
        <Form id={id} readOnly={readOnly} buttonDisabled={buttonDisabled}/>
      }
    </div>
  );
}

export default EditUser;