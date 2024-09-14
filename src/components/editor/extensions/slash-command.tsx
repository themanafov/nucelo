import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { Extension } from "@tiptap/core";
import { type Editor, ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { useCallback, useEffect, useRef, useState } from "react";
import tippy from "tippy.js";
import getSuggestions from "./suggestions";

interface SlashCommandExtensionProps {
  editor: Editor;
  range: Range;
  props: any;
}
interface CommandItemProps {
  name: string;
  description: string;
  icon: keyof typeof Icons;
}

const Command = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: SlashCommandExtensionProps) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 10;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 10;
  }
};

const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[];
  command: any;
  editor?: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandList = useRef<HTMLDivElement>(null);
  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      command(item);
    },
    [command, items],
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  return (
    <div
      id="slash-command"
      ref={commandList}
      className="z-50 flex  min-w-[250px] no-scrollbar flex-col gap-1 overflow-auto rounded-lg  bg-gray-3 p-1"
    >
      {items.map((item: CommandItemProps, index: number) => {
        const ItemIcon = Icons[item.icon];
        return (
          <button
            onClick={() => selectItem(index)}
            className={cn(
              "flex flex-row items-center outline-0 select-none  text-sm gap-2 rounded-md px-2 py-1 transition-colors hover:bg-gray-2 focus:bg-gray-3",
              selectedIndex === index ? "bg-gray-2 " : "",
            )}
            key={index}
          >
            <ItemIcon size={15} /> {item.name}
          </button>
        );
      })}
      {!items.length && (
        <b className="text-xs px-2 py-1 text-gray-1">No results</b>
      )}
    </div>
  );
};

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup?.[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }
      if (props.event.key === "Enter") {
        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

export const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestions,
    render: renderItems,
  },
});
