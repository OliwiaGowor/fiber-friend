import React, { useState } from 'react';
// Import the Slate editor factory.
import { Transforms, createEditor, Editor } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import BoldMark from './BoldMark';
import isHotkey from "is-hotkey";

const initialValue = [
  {
    object: 'block',
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

export default function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState(initialValue);

  const renderElement = React.useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <p></p>
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = React.useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])


  return (
    <Slate editor={editor} value={value} onChange={(value: any) => setValue(value)}>
      <Editable
      renderElement={renderElement}
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = hotkey;
              toggleMark(editor, mark);
            }
          }
        }}
        />
    </Slate>
  );
}

const isMarkActive = (editor: any, format: string | number) => {
  const marks = Editor.marks(editor);
  return marks ? marks /*marks[index] <- throws error*/ === true : false;
};

const toggleMark = (editor: any, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}