import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import classes from './TextDisplay.module.scss';

const LIST_TYPES = ["numbered-list", "bulleted-list"];

interface TextEditorProps {
  defaultValue : any;
}

export default function TextEditor(props: TextEditorProps) {
  const { defaultValue, ...other } = props;
  const [formattedValue, setFormattedValue] = useState(defaultValue ? (typeof(defaultValue) !== "object" ?  JSON.parse(defaultValue) : defaultValue) : '');
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = React.useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = React.useCallback((props: any) => <Leaf {...props} />, []);

  return (
    <div className={classes.textEditor}>
     {Object.prototype.toString.call(formattedValue) === '[object Array]' && 
     <Slate editor={editor} value={formattedValue} >
        <Editable
        className={classes.textField}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly={true}
        />
      </Slate>}
      {Object.prototype.toString.call(formattedValue) !== '[object Array]' && 
      <div className={classes.standardNotes}>{formattedValue}</div>}
    </div>
  );
}

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

