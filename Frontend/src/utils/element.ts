const selection = document.getSelection();

export const scollToElement = (ref: HTMLElement) => {
  ref.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
};
export const handleSelectEnd = (element: Node) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false); // Tắt select

  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
};

export function insertTextAtCaret(text: string) {
  let sel, range;
  if (window.getSelection) {
    sel = window.getSelection();

    if (sel && sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  }
}

export const cursorPosition = () => {
  return selection?.focusOffset;
};

export function getCurrentCaretRange(): [Node, number] {
  return [selection?.focusNode, selection?.focusOffset] as [Node, number];
}

export function restoreCaretRange(ele: HTMLElement, range: [Node, number]) {
  ele.focus();
  //sel.extend(saved[0], saved[1]);
  selection?.collapse(range[0], range[1]);
}

export const scrollBottom = (ele?: HTMLElement | null) => {
  ele?.scrollBy({ top: ele.scrollHeight, behavior: 'smooth' });
};
