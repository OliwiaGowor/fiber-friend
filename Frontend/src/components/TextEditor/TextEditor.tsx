import React, { useMemo, useState } from 'react';
import { Transforms, createEditor, Editor, BaseEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import isHotkey from "is-hotkey";
import { withHistory } from 'slate-history';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import classes from './TextEditor.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "You can write your notes here!" },
    ]
  },
];

interface TextEditorProps {
  defaultValue?: any;
  getValue: any
}

export default function TextEditor(props: TextEditorProps) {
  const { defaultValue, getValue, ...other } = props;
  const isMobile = useMediaQuery('(max-width: 800px)');
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(defaultValue ? JSON.parse(defaultValue) : initialValue);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const renderElement = React.useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = React.useCallback((props: any) => <Leaf {...props} />, []);

  const getHotkey = (key: string): string => {
    switch (key) {
      case "mod+b":
        return "bold";
      case "mod+i":
        return "italic";
      case "mod+u":
        return "underline";
      default:
        return '';
    }
  }

  return (
    <div className={classes.textEditor}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value: any) => {
          setValue(value); getValue(JSON.stringify(value));
        }}
      >
        <div className={classes.toolbar}>
          <MarkButton format='bold' icon={<FormatBoldIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
          <MarkButton format='italic' icon={<FormatItalicIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
          <MarkButton format='underline' icon={<FormatUnderlinedIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
          <BlockButton format="heading-one" icon={<LooksOneIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
          {isMobile &&
            <>
              <button className={classes.formatButton} onClick={handleClick} ><MoreVertIcon sx={{ fontSize: 27 }}/></button>
              <div className={classes.optionsMenu}>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <MenuItem onClick={() => handleClose()}
                  >
                    <BlockButton format="heading-two" icon={<LooksTwoIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
                  </MenuItem>
                  <MenuItem onClick={() => handleClose()}
                  >
                    <BlockButton format="block-quote" icon={<FormatQuoteIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
                  </MenuItem>
                  <MenuItem onClick={() => handleClose()}>
                    <BlockButton format="numbered-list" icon={<FormatListNumberedIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
                  </MenuItem>
                  <MenuItem onClick={() => handleClose()}>
                    <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
                  </MenuItem>
                </Menu>
              </div>
            </>
          }
          {!isMobile &&
            <>
              <BlockButton format="heading-two" icon={<LooksTwoIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
              <BlockButton format="block-quote" icon={<FormatQuoteIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
              <BlockButton format="numbered-list" icon={<FormatListNumberedIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
              <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon sx={{ fontSize: 27 }} />} className={classes.formatButton} />
            </>
          }
        </div>
        <Editable
          className={classes.textField}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = getHotkey(hotkey);
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  for (const key in marks) {
    if (key && key == format) {
      return true;
    }
  }
  return false;
};

const isBlockActive = (editor: BaseEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => (n as any).type === format
  });

  return !!match;
};

const toggleMark = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  for (const key in marks) {
    if (key && key == format) {
      Editor.removeMark(editor, format);
      return;
    }
  }
  Editor.addMark(editor, format, true);

};

const toggleBlock = (editor: BaseEditor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes((n as any).type),
    split: true
  });

  const node = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, (node as any));

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon, className }: any) => {
  const editor = useSlate();
  return (
    <div
      className={className}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      style={{ color: isMarkActive(editor, format) ? 'black' : 'grey' }}
    >
      {icon}
    </div>
  );
};

const BlockButton = ({ format, icon, className }: any) => {
  const editor = useSlate();
  return (
    <div
      className={className}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      style={{ color: isBlockActive(editor, format) ? 'black' : 'grey' }}
    >
      {icon}
    </div>
  );
};
