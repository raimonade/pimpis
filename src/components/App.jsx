import React, { useEffect, useState } from 'react';
import { get } from '../utils/requests';
import PeopleCounter from './PeopleCounter/PeopleCounter';
import s from './App.module.scss';

function App() {
  const [resp, setresp] = useState('');
  let timeout;

  useEffect(() => {getCameraData(); return () => clearTimeout(timeout)}, []);

  function getCameraData() {
    get('/dahua', onSuccess, onError);
  }

  function onSuccess(res) {
    setresp(res);
    timeout = setTimeout(() => getCameraData(), 1000);
  }

  function onError(err) {
    console.error(err);
    clearTimeout(timeout);
  }

  return (
    <div className={s.Wrapper}>
      <PeopleCounter apiData={resp} />
    </div>
  );
}

export default App;
