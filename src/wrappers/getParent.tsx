function getParent(e: EventTarget, typeNode: string) {
  let elem = e as HTMLElement;
  let parentElem: HTMLElement | null = null;
  let temporary: HTMLElement | null;
  while (parentElem === null) {
    temporary = elem.parentElement;
    if (temporary === null) break;
    if (temporary.nodeName === typeNode) parentElem = temporary;
  }
  return parentElem;
}
export default getParent;
