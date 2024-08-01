// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { get } from '../../reducers';
// import { FaRegSun, FaRegMoon } from "react-icons/fa";
// import { ActionTypes } from '../../constants/index';

// export default () => {
//     const { theme } = useSelector(get.options);
//     const dispatch = useDispatch();
//     const createClickHandler = theme => () => dispatch({ type: ActionTypes.UPDATE_OPTIONS, payload: { theme } });

//     return (
//         <div className='theme-switcher'>
//             <FaRegSun
//                 css={theme === 'light' ? 'active' : null}
//                 onClick={createClickHandler('light')}
//                 data-djvujs-id={'light_theme_button'}
//                 data-djvujs-class={theme === 'light' ? 'active' : null}
//             />
//             <FaRegMoon
//                 css={theme === 'dark' ? 'active' : null}
//                 onClick={createClickHandler('dark')}
//                 data-djvujs-id={'dark_theme_button'}
//                 data-djvujs-class={theme === 'dark' ? 'active' : null}
//             />
//         </div>
//     )
// };