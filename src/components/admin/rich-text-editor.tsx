"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BetweenHorizontalEnd,
  BetweenHorizontalStart,
  BetweenVerticalEnd,
  BetweenVerticalStart,
  Bold,
  Heading,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Table2,
  TableCellsMerge,
  TableCellsSplit,
  Trash2,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useImageUpload } from "@/lib/use-image-upload";

export function RichTextEditor({
  value,
  onChange,
  postTitle,
}: {
  value: string;
  onChange: (html: string) => void;
  postTitle: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"view" | "html">("view");
  const [uploading, setUploading] = useState(false);
  const { upload } = useImageUpload();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
      Table.configure({ resizable: false, HTMLAttributes: { class: "post-table" } }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "post-content min-h-[240px] px-3 py-3 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  // Re-sync the WYSIWYG doc with whatever HTML is current whenever we switch back to it
  // (covers hand-edits made while in HTML mode).
  useEffect(() => {
    if (mode === "view" && editor) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    setUploading(true);
    const result = await upload(file, postTitle || "post");
    setUploading(false);
    if (result) {
      editor.chain().focus().setImage({ src: result.url, alt: "" }).run();
      // Select the new image so the alt-text bar opens right away.
      let imagePos: number | null = null;
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "image" && node.attrs.src === result.url) imagePos = pos;
      });
      if (imagePos !== null) editor.commands.setNodeSelection(imagePos);
    }
  }

  function addLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  if (!editor) return null;

  const toolbarButtons: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
  }[] = [
    {
      icon: <Bold className="size-4" />,
      label: "Bold",
      active: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic className="size-4" />,
      label: "Italic",
      active: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <UnderlineIcon className="size-4" />,
      label: "Underline",
      active: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <Heading2 className="size-4" />,
      label: "Heading 2",
      active: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 className="size-4" />,
      label: "Heading 3",
      active: editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <List className="size-4" />,
      label: "Bullet list",
      active: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered className="size-4" />,
      label: "Numbered list",
      active: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <Quote className="size-4" />,
      label: "Quote",
      active: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: <LinkIcon className="size-4" />,
      label: "Link",
      active: editor.isActive("link"),
      onClick: addLink,
    },
    {
      icon: <ImageIcon className="size-4" />,
      label: uploading ? "Uploading…" : "Image",
      disabled: uploading,
      onClick: () => fileInputRef.current?.click(),
    },
    {
      icon: <Undo className="size-4" />,
      label: "Undo",
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo className="size-4" />,
      label: "Redo",
      onClick: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="rounded-md border border-neutral-200 bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-1 rounded-t-md border-b border-neutral-200 bg-white p-1.5">
        <div className="flex flex-wrap items-center gap-1">
          {mode === "view" && <TablePicker editor={editor} />}
          {mode === "view" &&
            toolbarButtons.map((btn) => (
              <Button
                key={btn.label}
                type="button"
                variant="ghost"
                size="sm"
                aria-label={btn.label}
                title={btn.label}
                disabled={btn.disabled}
                className={btn.active ? "bg-neutral-200" : ""}
                onClick={btn.onClick}
              >
                {btn.icon}
              </Button>
            ))}
        </div>
        <div className="flex shrink-0 gap-1 rounded-md bg-neutral-100 p-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={mode === "view" ? "bg-white shadow-sm" : "text-neutral-500"}
            onClick={() => setMode("view")}
          >
            View
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={mode === "html" ? "bg-white shadow-sm" : "text-neutral-500"}
            onClick={() => setMode("html")}
          >
            HTML
          </Button>
        </div>
      </div>
      {mode === "view" && <ContextBar editor={editor} />}
      {mode === "view" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="min-h-[240px] w-full px-3 py-3 font-mono text-sm text-neutral-900 focus:outline-none"
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleImageSelected}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Table generator                                                            */
/* -------------------------------------------------------------------------- */

const GRID_ROWS = 8;
const GRID_COLS = 8;

function TablePicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState({ rows: 0, cols: 0 });
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [header, setHeader] = useState(true);

  function insert(r: number, c: number) {
    editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: header }).run();
    setOpen(false);
    setHover({ rows: 0, cols: 0 });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Insert table"
          title="Insert table"
        >
          <Table2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-auto bg-white p-3 text-neutral-900"
      >
        <p className="text-sm font-semibold">Insert table</p>
        <div
          className="mt-2 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1.25rem)` }}
          onMouseLeave={() => setHover({ rows: 0, cols: 0 })}
        >
          {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => {
            const r = Math.floor(i / GRID_COLS) + 1;
            const c = (i % GRID_COLS) + 1;
            const on = r <= hover.rows && c <= hover.cols;
            return (
              <button
                key={i}
                type="button"
                aria-label={`${r} by ${c} table`}
                onMouseEnter={() => setHover({ rows: r, cols: c })}
                onFocus={() => setHover({ rows: r, cols: c })}
                onClick={() => insert(r, c)}
                className={`size-5 rounded-sm border ${
                  on ? "border-blue-500 bg-blue-100" : "border-neutral-300 bg-white"
                }`}
              />
            );
          })}
        </div>
        <p className="mt-2 h-4 text-center text-xs text-neutral-500">
          {hover.rows ? `${hover.rows} × ${hover.cols}` : "Hover to pick a size"}
        </p>
        <div className="mt-3 flex items-end gap-2 border-t border-neutral-200 pt-3 text-xs">
          <label className="grid gap-1">
            Rows
            <input
              type="number"
              min={1}
              max={50}
              value={rows}
              onChange={(e) => setRows(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className="h-8 w-16 rounded border border-neutral-300 px-2"
            />
          </label>
          <label className="grid gap-1">
            Columns
            <input
              type="number"
              min={1}
              max={12}
              value={cols}
              onChange={(e) => setCols(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
              className="h-8 w-16 rounded border border-neutral-300 px-2"
            />
          </label>
          <Button type="button" size="sm" className="h-8" onClick={() => insert(rows, cols)}>
            Insert
          </Button>
        </div>
        <label className="mt-3 flex items-center gap-2 text-xs">
          <input type="checkbox" checked={header} onChange={(e) => setHeader(e.target.checked)} />
          First row is a header
        </label>
      </PopoverContent>
    </Popover>
  );
}

/* -------------------------------------------------------------------------- */
/* Context bar: table tools when the cursor is in a table, alt text for images */
/* -------------------------------------------------------------------------- */

function ContextBar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      inTable: e.isActive("table"),
      isImage: e.isActive("image"),
      alt: (e.getAttributes("image").alt as string | undefined) ?? "",
      src: (e.getAttributes("image").src as string | undefined) ?? "",
      pos: e.state.selection.from,
      canMerge: e.can().mergeCells(),
      canSplit: e.can().splitCell(),
    }),
  });

  if (state.isImage)
    return (
      <ImageAltBar
        key={`${state.pos}:${state.src}`}
        editor={editor}
        alt={state.alt}
        pos={state.pos}
      />
    );
  if (!state.inTable) return null;

  const chain = () => editor.chain().focus();
  const tools: {
    label: string;
    icon: React.ReactNode;
    run: () => void;
    disabled?: boolean;
    danger?: boolean;
  }[] = [
    {
      label: "Row above",
      icon: <BetweenHorizontalStart className="size-4" />,
      run: () => chain().addRowBefore().run(),
    },
    {
      label: "Row below",
      icon: <BetweenHorizontalEnd className="size-4" />,
      run: () => chain().addRowAfter().run(),
    },
    {
      label: "Column left",
      icon: <BetweenVerticalStart className="size-4" />,
      run: () => chain().addColumnBefore().run(),
    },
    {
      label: "Column right",
      icon: <BetweenVerticalEnd className="size-4" />,
      run: () => chain().addColumnAfter().run(),
    },
    {
      label: "Header row",
      icon: <Heading className="size-4" />,
      run: () => chain().toggleHeaderRow().run(),
    },
    {
      label: "Merge cells",
      icon: <TableCellsMerge className="size-4" />,
      run: () => chain().mergeCells().run(),
      disabled: !state.canMerge,
    },
    {
      label: "Split cell",
      icon: <TableCellsSplit className="size-4" />,
      run: () => chain().splitCell().run(),
      disabled: !state.canSplit,
    },
    {
      label: "Delete row",
      icon: <Trash2 className="size-4" />,
      run: () => chain().deleteRow().run(),
      danger: true,
    },
    {
      label: "Delete column",
      icon: <Trash2 className="size-4" />,
      run: () => chain().deleteColumn().run(),
      danger: true,
    },
    {
      label: "Delete table",
      icon: <Trash2 className="size-4" />,
      run: () => chain().deleteTable().run(),
      danger: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 bg-blue-50/60 px-1.5 py-1">
      <span className="px-1.5 text-xs font-semibold text-blue-900">Table</span>
      {tools.map((t) => (
        <Button
          key={t.label}
          type="button"
          variant="ghost"
          size="sm"
          disabled={t.disabled}
          onClick={t.run}
          className={`h-7 gap-1.5 px-2 text-xs ${t.danger ? "text-red-600 hover:text-red-700" : ""}`}
        >
          {t.icon}
          {t.label}
        </Button>
      ))}
    </div>
  );
}

function ImageAltBar({ editor, alt, pos }: { editor: Editor; alt: string; pos: number }) {
  const [value, setValue] = useState(alt);

  // Update the image at its own position, so it works even after the cursor has moved on.
  function save() {
    const node = editor.state.doc.nodeAt(pos);
    if (!node || node.type.name !== "image") return;
    editor.view.dispatch(
      editor.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, alt: value.trim() }),
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-amber-50/70 px-3 py-2">
      <label htmlFor="image-alt" className="text-xs font-semibold text-amber-900">
        Image alt text
      </label>
      <input
        id="image-alt"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            save();
          }
        }}
        onBlur={() => value.trim() !== alt && save()}
        placeholder="Describe the image — e.g. “Flutter app cost breakdown chart”"
        className="h-8 min-w-0 flex-1 rounded border border-neutral-300 bg-white px-2 text-sm"
      />
      {!alt && (
        <span className="text-xs text-amber-800">Missing — add one for SEO and accessibility</span>
      )}
    </div>
  );
}
