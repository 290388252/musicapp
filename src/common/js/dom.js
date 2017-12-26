/**
 *
 * Created by yanchao on 2017/12/26.
 */
export function addClass(el, className) {
  console.log(hasClass(el, className));
  if (!hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function hasClass(el, className) {
  let reg = new RegExp(`(^|\\s)` + className + `(\\s|$)`);
  return reg.test(el.className);
}
