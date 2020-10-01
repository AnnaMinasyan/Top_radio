import { IThemeState } from '../reducers/themeReducer';

export const backgroundColorSelector = ({ theme:  {backgroundColor}  }: { theme: IThemeState }) => backgroundColor;