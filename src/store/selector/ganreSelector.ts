import { IGanresState } from '../reducers/ganresReducer';

export const ganresSelector = ({ ganresReducer:  {ganres}  }: { ganresReducer: IGanresState }) => ganres;

