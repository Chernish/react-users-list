import React, {useCallback, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";

import {Button} from './components';
import Home, {User} from "./pages/Home";
import EditUser from "./pages/EditUser";
import {ButtonProps} from "./components/Button/Button";


interface Filters {
  type?: string;
  order?: string;
}

type SortButton = {
  name: string,
  type: string,
  order: 'asc' | 'desc'
}

const useApp = () => {
  const [userCards, setUserCards] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(({data}) => {
      setUserCards(data);
      setIsLoaded(true);
    })
  }, []);


  const filters = useCallback(({type, order}: Filters) => {
    setIsLoaded(false);
    axios.get(`https://jsonplaceholder.typicode.com/users?_sort=${type}&_order=${order}`).then(({data}) => {
      setUserCards(data);
      setIsLoaded(true);
    })
  }, [isLoaded])

  return {
    isLoaded,
    filters,
    userCards
  }
}

const sortButton: SortButton[] = [
  {
    name: 'по городу',
    type: 'address.city',
    order: 'asc'
  },
  {
    name: 'по компании',
    type: 'company.name',
    order: 'asc'
  },
];

const Buttons = ({filters}: { filters: ButtonProps['onClickSort'] }) => (
  <>
    {sortButton.map((obg: SortButton, index: number) => (
      <Button
        key={`${obg.name}_${index}`}
        className="mb-10"
        primary
        onClickSort={filters}
        {...obg}
      >
        {obg.name}
      </Button>
    ))}
  </>
);

const App = () => {

  const {filters, isLoaded, userCards} = useApp();

  return (
    <div className="wrapper">
      <div className="sidebar">
        <h3 className="sidebar__title">Сортировка</h3>
        <Buttons filters={filters}/>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home users={userCards} isLoaded={isLoaded}/>}/>
          <Route path="/edit/:id" element={<EditUser/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
