import React, { useState, useEffect, useRef } from 'react';
import s from './UserScreen.module.scss';
import { ReactComponent as People } from './assets/svgs/users.svg';
import { ReactComponent as Hexagon } from './assets/svgs/hexagon.svg';
import { ReactComponent as Pedestrian } from './assets/svgs/walking.svg';
import { ReactComponent as Hand } from './assets/svgs/hand-paper.svg';
import { get } from '../../utils/requests';

const UserScreen = ({ apiData }) => {
  const [resp, setresp] = useState({});
  const [allowed, setallowed] = useState(false)
  let timeout;

  useEffect(() => {
    getCameraData();
    return () => clearTimeout(timeout);
  }, []);

  function getCameraData() {
    get('dahua', onSuccess, onError);
  }

  function onSuccess(res) {
    setresp(res);
    setallowed(res.PeopleIn < res.MaxPeople)
    timeout = setTimeout(() => getCameraData(), 1000);
  }

  function onError(err) {
    console.error(err);
    clearTimeout(timeout);
  }

  return (
    <div className={s.Screen} allowed={(allowed).toString()}>
      <div className={s.PeopleCount}>
        <People />
        <span>
          {resp.PeopleIn} / {resp.MaxPeople}
          <h1>{allowed}</h1>
        </span>
      </div>
      <div className={s.Body}>
        <div className={s.Icon}>
          {allowed ? (
            <Pedestrian />
          ) : (
            <>
              <Hexagon />
              <Hand className={s.Hand} />
            </>
          )}
        </div>
        <h1>{allowed ? 'IEEJA ATĻAUTA' : 'IEEJA AIZLIEGTA'}</h1>
      </div>
    </div>
  );
};

export default UserScreen;
