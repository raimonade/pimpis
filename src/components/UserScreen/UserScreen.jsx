import React, { useState } from 'react';
import s from './UserScreen.module.scss';
import {ReactComponent as People} from './assets/svgs/users.svg';
import {ReactComponent as Hexagon} from './assets/svgs/hexagon.svg';
import {ReactComponent as Pedestrian} from './assets/svgs/walking.svg';
import {ReactComponent as Hand} from './assets/svgs/hand-paper.svg';

const UserScreen = ({ limit, entered, exited, inside }) => {
  const allowed = limit - inside > 0;

  return (
    <div className={s.Screen} allowed={allowed.toString()}>
      <div className={s.PeopleCount}>
	  	<People/>
        <span>
          {entered} / {limit}
        </span>
      </div>
      <div className={s.Body}>
        <div className={s.Icon}>
          {allowed ? (
            <Pedestrian/>
          ) : (
            <>
			<Hexagon/>
              {/* <img src={} className={s.Hand} /> */}
			  <Hand className={s.Hand} />
            </>
          )}
        </div>
        <h1>
          {allowed
            ? 'IEEJA ATĻAUTA'
            : !allowed && entered && exited && inside
            ? 'IEEJA AIZLIEGTA'
            : 'KĻŪME IEGŪSTOT DATUS'}{' '}
        </h1>
      </div>
    </div>
  );
};

export default UserScreen;
