import React, { useMemo, useState } from 'react';
// Import the Slate editor factory.
import { Transforms, createEditor, Editor } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import BoldMark from './BoldMark';
import isHotkey from "is-hotkey";
import { withHistory } from 'slate-history';

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

export default function TextEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);
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
      case "mod+`":
        return "code";
      default:
        return '';
    }
  }

  return (
    <Slate editor={editor} value={value} onChange={(value: any) => setValue(value)}>
      <Editable
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
  );
}

const toggleMark = (editor: any, format: string) => {
  const marks = Editor.marks(editor);
  for (const key in marks) {
    if (key && key == format) {
      Editor.removeMark(editor, format);
      return;
    } else {
      Editor.addMark(editor, format, true);
      return;
    }
  }
  Editor.addMark(editor, format, true);

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

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:"
      }
    ]
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }]
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }]
  }
];
