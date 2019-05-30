import { handleActions } from 'redux-actions';

import * as actions from '../actions/access';

const access = handleActions(
    {
        [actions.getAccessListRequest]: state => ({ ...state, processing: true }),
        [actions.getAccessListFailure]: state => ({ ...state, processing: false }),
        [actions.getAccessListSuccess]: (state, { payload }) => {
            const {
                allowed_clients,
                disallowed_clients,
                blocked_hosts,
            } = payload;
            const newState = {
                ...state,
                allowed_clients: allowed_clients.join('\n'),
                disallowed_clients: disallowed_clients.join('\n'),
                blocked_hosts: blocked_hosts.join('\n'),
            };
            return newState;
        },

        [actions.setAccessListRequest]: state => ({ ...state, processingSet: true }),
        [actions.setAccessListFailure]: state => ({ ...state, processingSet: false }),
        [actions.setAccessListSuccess]: (state) => {
            const newState = {
                ...state,
                processingSet: false,
            };
            return newState;
        },
    },
    {
        processing: true,
        processingSet: false,
        allowed_clients: null,
        disallowed_clients: null,
        blocked_hosts: null,
    },
);

export default access;
