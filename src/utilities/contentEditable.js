/**
 *  Created by tsebyuaqdev author on 18/08/2022
 */

//OnKeyDown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
};
// Select all input value when click
export const selectAllInLineText = (e) => {
  e.target.focus();
  e.target.select();
  // document.execCommand("selectAll", false, null);
};
