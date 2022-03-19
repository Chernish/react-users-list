import React from 'react';
import {UserItem} from "../components";
import {LoadingBlock} from "../components/";

export type User = {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string,
    }
  },
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string,
  },
  "comment": string,
}

type Props = {
  users?: User[];
  isLoaded?: boolean;
}

const Home = ({users = [], isLoaded = false}: Props) => {
  return (
    <div className='main__wrapper'>
      <h2 className="main__title">Список пользователей</h2>
      <div className="main__wrapper">
        {isLoaded ? users.map((obg) => (
          <UserItem key={obg.id} {...obg} />
        )) : Array(10).fill(0).map((_, index: number) => <LoadingBlock key={index}/>)}
      </div>
      <p className="main__info">Найдено {Object.keys(users).length} пользователей</p>
    </div>
  );
}

export default Home;