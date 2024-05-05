import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box, MenuItem, MenuList, Paper, useTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import Close from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Chip from 'components/Chip';
import MessageBox from 'components/MessageBox';
import useClickOutside from 'hooks/useClickOutside';
import { FilterDataItemType } from 'libs/types/jobDescription';

interface CustomMenuProps {
  label?: string;
  // value?: string | number;
  placeholder?: string;
  menuItems?: FilterDataItemType[] | null;
  multiple?: boolean;
  onMenuItemSelect?: () => void;
}

const CustomMenu = ({ label, placeholder, menuItems, multiple = false, onMenuItemSelect }: CustomMenuProps) => {
  const theme = useTheme();

  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const [_value, _setValue] = useState('');
  const [_menuItems, _setMenuItems] = useState(menuItems);
  const [selectedValues, setSelectedValues] = useState<{
    [key: string | number]: FilterDataItemType;
  } | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(2);
  const [containerWidth, setContainerWidth] = useState<number>(containerRef.current?.clientWidth ?? 0);

  // To handle the menu state
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<DOMRect | null | undefined>(null);

  const handleChange = (value: string) => {
    _setValue(value);
    setOpen(true);
    !multiple && setSelectedValues(null);
    _setMenuItems(menuItems?.filter((menuItem) => !selectedValues?.[menuItem.id] && menuItem.displayText.toLowerCase().includes(value.toLowerCase())));
  };

  // Use to open/close menu
  const handleToggleMenu = () => {
    setIsFocused(true);
    setOpen((prev) => !prev);
    inputRef.current?.focus();
    setMenuPosition(containerRef.current?.getBoundingClientRect());
  };

  // Use to select an item from the menu
  const handleMenuItemSelect = (menuItem: FilterDataItemType, multiple: boolean) => {
    _setValue('');
    inputRef.current?.focus();

    multiple
      ? setSelectedValues((prev) => (prev ? { ...prev, [menuItem.id]: menuItem } : { [menuItem.id]: menuItem }))
      : setSelectedValues({ [menuItem.id]: menuItem });

    _setMenuItems(menuItems?.filter((_menuItem) => _menuItem.id !== menuItem.id && !selectedValues?.[_menuItem.id]));

    setOpen(false);

    // onMenuItemSelect?.();
  };

  // Use to remove selected values
  const handleChipDelete = (id: string | number) => {
    const selectedValuesCopy = { ...selectedValues };

    if (selectedValuesCopy.hasOwnProperty(id)) {
      _setMenuItems((prev) => {
        let newMenuItems = prev ? [selectedValuesCopy[id], ...prev] : [selectedValuesCopy[id]];
        delete selectedValuesCopy[id];
        setSelectedValues(selectedValuesCopy);
        return newMenuItems;
      });
    }

    // onMenuItemSelect?.();
  };

  // Use to clear all selected values
  const handleClearSelectedValues = (e: any) => {
    e.stopPropagation();
    setSelectedValues(null);
    _setMenuItems(menuItems);
    inputRef.current?.focus();
  };

  useEffect(() => {
    setInputWidth(spanRef.current?.offsetWidth ?? 0);
  }, [_value]);

  useEffect(() => {
    setContainerWidth(containerRef.current?.clientWidth ?? 0);
    setMenuPosition(containerRef.current?.getBoundingClientRect());
  }, [inputWidth, selectedValues && Object.keys(selectedValues).length]);

  useClickOutside([containerRef, menuRef], () => {
    setOpen(false);
    setIsFocused(false);
    _setValue('');
    _setMenuItems(menuItems?.filter((_menuItem) => !selectedValues?.[_menuItem.id]));
  });

  return (
    <Box>
      {label ? (
        <Box component="label" sx={{ typography: 'subtitle2', color: 'custom.grey_1' }}>
          {label}
        </Box>
      ) : null}

      <Box
        ref={containerRef}
        onClick={handleToggleMenu}
        sx={{
          border: `1px solid ${theme.palette.custom.grey_3}`,
          width: 'max-content',
          borderRadius: '.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
          minWidth: '12rem',

          ...(isFocused === true && { border: `2px solid ${blue[500]}` }),
        }}
      >
        <Box
          sx={{
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '0 .5rem',
          }}
        >
          {selectedValues && Object.keys(selectedValues).length ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginRight: '.5rem', typography: 'subtitle2', color: 'custom.grey_2' }}>
              {Object.keys(selectedValues).map((key) =>
                multiple ? (
                  <Chip
                    key={selectedValues[key].id}
                    displayText={selectedValues[key].displayText}
                    handleDelete={() => handleChipDelete(selectedValues[key].id)}
                  />
                ) : (
                  <Box>{selectedValues[key].displayText}</Box>
                )
              )}
            </Box>
          ) : null}

          {placeholder && !_value && (!selectedValues || (selectedValues && !Object.keys(selectedValues).length)) ? (
            <Box sx={{ fontSize: '1.3rem', color: 'custom.grey_2', userSelect: 'none' }}>{placeholder}</Box>
          ) : null}

          <Box>
            <Box
              component="span"
              ref={spanRef}
              sx={{
                typography: 'subtitle2',
                color: 'custom.grey_2',
                userSelect: 'none',
                position: 'absolute',
                opacity: 0,
                zIndex: -100,
                whiteSpace: 'pre',
              }}
            >
              {_value}
            </Box>

            <Box
              component="input"
              ref={inputRef}
              value={_value}
              onChange={(e) => handleChange(e.target.value)}
              sx={{
                width: inputWidth,
                minWidth: '1px',
                border: 'none',
                outline: 'none',
                typography: 'subtitle2',

                ...(!_value &&
                  (!selectedValues || !multiple || (selectedValues && !Object.keys(selectedValues).length)) && {
                    position: 'absolute',
                    left: '.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }),
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {selectedValues && Object.keys(selectedValues).length ? (
            <Close sx={{ fontSize: '1.75rem', cursor: 'pointer', '&:hover': { color: 'red' } }} onClick={handleClearSelectedValues} />
          ) : null}

          <Box
            sx={{
              padding: '0 .5rem',
              pointerEvents: 'none',
              borderLeft: `1px solid ${theme.palette.custom.grey_3}`,
            }}
          >
            <KeyboardArrowDownIcon sx={{ color: 'custom.grey_3' }} />
          </Box>
        </Box>
      </Box>

      {createPortal(
        <Box
          ref={menuRef}
          sx={{
            zIndex: 9999,
            position: 'absolute',
            left: `${menuPosition?.left}px`,
            top: `${(menuPosition?.top ?? 0) + (menuPosition?.height ?? 0)}px`,
            width: containerWidth,
          }}
        >
          {open && (
            <Paper>
              <MenuList sx={{ borderRadius: '.5rem', maxHeight: '30rem', overflow: 'auto' }}>
                {_menuItems?.length ? (
                  _menuItems.map((menuItem) => (
                    <MenuItem
                      key={menuItem.id}
                      onClick={() => handleMenuItemSelect(menuItem, multiple)}
                      sx={{ padding: '.5rem 1rem', typography: 'subtitle2', color: 'custom.grey_1' }}
                    >
                      {menuItem.displayText}
                    </MenuItem>
                  ))
                ) : (
                  <MessageBox
                    message="No options"
                    rootStyles={{
                      padding: '1rem',
                      color: 'custom.grey_2',
                      typography: 'subtitle2',
                    }}
                  />
                )}
              </MenuList>
            </Paper>
          )}
        </Box>,
        document.body
      )}
    </Box>
  );
};

export default CustomMenu;
