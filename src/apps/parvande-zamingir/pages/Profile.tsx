import FSM from 'apps/fsm/pages/FSM';
import React from 'react';
import Profile from '../components/organisms/UserInfo';

const CodesPage = () => {
	const fsmId = process.env.NODE_ENV === 'development' ? 26 : 312;

	return (
		<FSM
			fsmId={fsmId}
			dynamicObjects={{
				'parvande-zamingir-profile': Profile,
			}}
		/>
	);
};

export default CodesPage;