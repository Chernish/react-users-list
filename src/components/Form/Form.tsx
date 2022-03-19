import React, {ChangeEventHandler, useEffect, useState} from 'react';
import {Button} from "../index";
import {User} from "../../pages/Home";
import axios from "axios";

import './Form.scss'


type Errors = {
  city?: string,
  name?: string,
  phone?: string,
  street?: string,
  username?: string,
  website?: string,
  zipcode?: string,
  email?: string,
}

type Form = {
  id: string,
  readOnly: boolean,
  buttonDisabled: boolean
}


const Form = ({id, readOnly, buttonDisabled}: Form) => {

  const initialState: User = {
    id: 0,
    address: {
      city: "",
      geo: {
        lat: "",
        lng: ""
      },
      street: "",
      suite: "",
      zipcode: ""
    },
    comment: "",
    company: {
      bs: "",
      catchPhrase: "",
      name: ""
    },
    email: "",
    name: "",
    phone: "",
    username: "",
    website: ""
  }
  const [formValues, setFormValues] = useState<User>(initialState);
  const [formErrors, setFormErrors] = useState<Errors>({})
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(({data}) => {
      setFormValues(data);
    })
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const sendValues = JSON.stringify(formValues, undefined, 2);
      console.log(sendValues);
    }
  }, [formErrors]);


  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const {name, value} = e.target;
    const formData = {...formValues};
    if (name === 'street' || name === 'city' || name === 'zipcode') {
      setFormValues({...formData, address: {...formData.address, [name]: value}});
    } else {
      setFormValues({...formData, [name]: value});
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values: User) => {
    const errors: Errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexNumber = /^\d+(-\d+)*$/;
    if (values.name.length == 0) {
      errors.name = 'Поле пустое';
    }
    if (values.username.length == 0) {
      errors.username = 'Поле пустое';
    }
    if (!regexEmail.test(values.email)) {
      errors.email = 'Введен не правильниый Email';
    }
    if (values.address.street.length == 0) {
      errors.street = 'Поле пустое';
    }
    if (values.address.city.length == 0) {
      errors.city = 'Поле пустое';
    }
    if (values.address.zipcode.length == 0) {
      errors.zipcode = 'Поле пустое';
    } else if (!regexNumber.test(values.address.zipcode)) {
      errors.zipcode = 'Поле Zipcode должно содержать только числа и тире';
    }
    if (values.phone.length == 0) {
      errors.phone = 'Поле пустое';
    }
    if (values.website.length == 0) {
      errors.website = 'Поле пустое';
    }
    return errors;
  }


  return (
    <form className='main__form form' onSubmit={handleSubmit}>
      <div className='form__wrapper'>
        <div className='form__group'>
          <label className="form__label" htmlFor='name'>Name</label>
          <input type='text'
                 id='name'
                 name='name'
                 className={formErrors.name ? 'form__input form__input--errors' : 'form__input'}
                 onChange={handleChange}
                 readOnly={readOnly}
                 value={formValues.name || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='userName'>User name</label>
          <input type='text'
                 id='userName'
                 name='username'
                 className={formErrors.username ? 'form__input form__input--errors' : 'form__input'}
                 onChange={handleChange}
                 readOnly={readOnly}
                 value={formValues.username || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='email'>Email</label>
          <input type='email'
                 id='email'
                 name='email'
                 className={formErrors.email ? 'form__input form__input--errors' : 'form__input'}
                 onChange={handleChange}
                 readOnly={readOnly}
                 value={formValues.email || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='street'>Street</label>
          <input
            type='text'
            id='street'
            name='street'
            className={formErrors.street ? 'form__input form__input--errors' : 'form__input'}
            onChange={handleChange}
            readOnly={readOnly}
            value={formValues.address?.street || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='city'>City</label>
          <input
            type='text'
            id='city'
            name='city'
            onChange={handleChange}
            className={formErrors.city ? 'form__input form__input--errors' : 'form__input'}
            readOnly={readOnly}
            value={formValues.address?.city || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='zipCode'>Zip code</label>
          <input
            type='text'
            id='zipCode'
            name='zipcode'
            onChange={handleChange}
            className={formErrors.zipcode ? 'form__input form__input--errors' : 'form__input'}
            readOnly={readOnly}
            value={formValues.address?.zipcode || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='phone'>Phone</label>
          <input
            type='text'
            id='phone'
            name='phone'
            onChange={handleChange}
            className={formErrors.phone ? 'form__input form__input--errors' : 'form__input'}
            readOnly={readOnly}
            value={formValues.phone || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='website'>Website</label>
          <input
            type='text'
            id='website'
            name='website'
            onChange={handleChange}
            className={formErrors.website ? 'form__input form__input--errors' : 'form__input'}
            readOnly={readOnly}
            value={formValues.website || ''}/>
        </div>
        <div className='form__group'>
          <label className="form__label" htmlFor='comment'>Comment</label>
          <textarea
            id='comment'
            name='comment'
            className='form__textarea'
            readOnly={readOnly}
            onChange={handleChange}/>
        </div>
      </div>
      <div className='form__btn'>
        <Button primary success disabled={buttonDisabled}>Отправить</Button>
      </div>
    </form>
  );
};

export default Form;