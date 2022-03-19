import React from 'react';
import {Link} from "react-router-dom";

import './index.scss';

type Props = {
  id: number,
  name?: string,
  address: {
    city: string,
  },
  company: {
    name: string,
  },
}

const Index = ({name, address, company, id}: Props) => {
  return (
    <div className="user__card">
      <ul className="user__list">
        <li><span>ФИО:</span> {name}</li>
        <li><span>Город:</span> {address.city}</li>
        <li><span>Компания:</span> {company.name}</li>
      </ul>
      <Link className="button button--link" to={`/edit/${id}`}>Подробнее</Link>
    </div>
  );
}

export default Index;