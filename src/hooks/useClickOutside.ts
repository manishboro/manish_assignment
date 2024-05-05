import { RefObject, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(ref: RefObject<T>[], onClickOutside: () => void): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.every((el) => el.current && !el.current.contains(event.target as Node))) {
        onClickOutside();
      }
    }

    // Bind
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // dispose
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [...ref, onClickOutside]);
}

export default useClickOutside;
