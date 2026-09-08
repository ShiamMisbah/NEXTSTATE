import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "min-h-[320px] px-5 py-4 text-[15px] leading-7 text-slate-800 outline-none",
      },
    },
  });

   useEffect(() => {
     if (!editor) return;

     const currentContent = editor.getHTML();

     if (value !== currentContent) {
       editor.commands.setContent(value || "", {
         emitUpdate: false,
       });
     }
   }, [editor, value]);

   if (!editor) return null;

  return (
    <div
      className="
        overflow-hidden rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        transition
        focus-within:border-slate-400
        focus-within:ring-4
        focus-within:ring-slate-100
      "
    >
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
