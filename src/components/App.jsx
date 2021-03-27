import React, { useEffect, useState } from 'react';

import PeopleCounter from './PeopleCounter/PeopleCounter';
import s from './App.module.scss';

function App() {
  return (
    <div className={s.Wrapper}>
      <PeopleCounter  />
    </div>
  );
}

export default App;
