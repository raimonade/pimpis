import React, { useState, useEffect } from 'react';
import s from './PeopleCounter.module.scss';
import UserScreen from '../UserScreen/UserScreen';

const PeopleCounter = ({apiData}) => {
	return (
		<div className={s.Wrapper}>
			<UserScreen
				limit={apiData.MaxPeople}
				entered={apiData.PeopleIn}
				exited={apiData.PeopleOut}
				inside={apiData.PeopleCount}
			/>
		</div>
	);
};

export default PeopleCounter;
