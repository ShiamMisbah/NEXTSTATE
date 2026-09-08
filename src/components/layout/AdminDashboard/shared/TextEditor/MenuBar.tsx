import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "./MenuBarState";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Pilcrow,
  Code2,
  CornerDownLeft,
} from "lucide-react";

type Props = {
  editor: Editor;
};

type ToolbarButton = {
  label: string;
  icon: React.ElementType;
  action: () => void;
  active?: boolean;
  disabled?: boolean;
};

const MenuBar = ({ editor }: Props) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) return null;

  const textButtons: ToolbarButton[] = [
    {
      label: "Bold",
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editorState.isBold,
      disabled: !editorState.canBold,
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editorState.isItalic,
      disabled: !editorState.canItalic,
    },
    {
      label: "Strike",
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editorState.isStrike,
      disabled: !editorState.canStrike,
    },
    {
      label: "Inline code",
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      active: editorState.isCode,
      disabled: !editorState.canCode,
    },
  ];

  const blockButtons: ToolbarButton[] = [
    {
      label: "Bullet list",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editorState.isBulletList,
    },
    {
      label: "Ordered list",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editorState.isOrderedList,
    },
    {
      label: "Blockquote",
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editorState.isBlockquote,
    },
    {
      label: "Code block",
      icon: Code2,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editorState.isCodeBlock,
    },
  ];

  const utilityButtons: ToolbarButton[] = [
    {
      label: "Horizontal rule",
      icon: Minus,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Hard break",
      icon: CornerDownLeft,
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      label: "Clear formatting",
      icon: RemoveFormatting,
      action: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
    },
  ];

  const historyButtons: ToolbarButton[] = [
    {
      label: "Undo",
      icon: Undo2,
      action: () => editor.chain().focus().undo().run(),
      disabled: !editorState.canUndo,
    },
    {
      label: "Redo",
      icon: Redo2,
      action: () => editor.chain().focus().redo().run(),
      disabled: !editorState.canRedo,
    },
  ];

  const renderButtons = (buttons: ToolbarButton[]) =>
    buttons.map(
      ({ label, icon: Icon, action, active = false, disabled = false }) => (
        <button
          key={label}
          type="button"
          title={label}
          onClick={action}
          disabled={disabled}
          className={`
            flex h-9 w-9 items-center justify-center rounded-md
            transition-all duration-150
            ${
              active
                ? "bg-emerald-bright text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }
            disabled:pointer-events-none disabled:opacity-30
          `}
        >
          <Icon className="h-4 w-4" />
        </button>
      ),
    );

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/95 px-3 py-2 backdrop-blur">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text type */}
        <select
          value={
            editorState.isHeading1
              ? "1"
              : editorState.isHeading2
                ? "2"
                : editorState.isHeading3
                  ? "3"
                  : editorState.isHeading4
                    ? "4"
                    : editorState.isHeading5
                      ? "5"
                      : editorState.isHeading6
                        ? "6"
                        : "paragraph"
          }
          onChange={(e) => {
            const value = e.target.value;

            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
              return;
            }

            editor
              .chain()
              .focus()
              .toggleHeading({
                level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6,
              })
              .run();
          }}
          className="
            h-9 rounded-md border border-slate-200
            bg-white px-3 pr-8 text-sm font-medium
            text-slate-700 outline-none transition
            hover:border-slate-300
            focus:border-slate-400 focus:ring-2 focus:ring-slate-200
          "
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <Separator />

        {/* Text formatting */}
        <div className="flex items-center gap-0.5">
          {renderButtons(textButtons)}
        </div>

        <Separator />

        {/* Lists / blocks */}
        <div className="flex items-center gap-0.5">
          {renderButtons(blockButtons)}
        </div>

        <Separator />

        {/* Color */}
        <label
          title="Text color"
          className="
            relative flex h-9 w-9 cursor-pointer items-center
            justify-center rounded-md text-slate-600
            transition hover:bg-slate-200 hover:text-slate-900
          "
        >
          <span className="text-sm font-semibold">A</span>

          <span
            className="absolute bottom-1 h-[3px] w-4 rounded-full"
            style={{
              backgroundColor:
                editor.getAttributes("textStyle").color ?? "#0f172a",
            }}
          />

          <input
            type="color"
            className="absolute inset-0 cursor-pointer opacity-0"
            value={editor.getAttributes("textStyle").color ?? "#0f172a"}
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
          />
        </label>

        <button
          type="button"
          title="Reset text color"
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="
            h-9 rounded-md px-2 text-xs font-medium text-slate-500
            transition hover:bg-slate-200 hover:text-slate-900
          "
        >
          Reset
        </button>

        <Separator />

        {/* Utilities */}
        <div className="flex items-center gap-0.5">
          {renderButtons(utilityButtons)}
        </div>

        {/* Push undo/redo right on larger screens */}
        <div className="hidden flex-1 sm:block" />

        <Separator className="hidden sm:block" />

        <div className="flex items-center gap-0.5">
          {renderButtons(historyButtons)}
        </div>
      </div>
    </div>
  );
};

const Separator = ({ className = "" }: { className?: string }) => {
  return <div className={`mx-1 h-6 w-px bg-slate-200 ${className}`} />;
};

export default MenuBar;
