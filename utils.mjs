globalThis.html = (raw, ...ars) => {
  return raw.reduce((reduce, string, index) => {
    let va = ars[index - 1] ?? "";
    if (va instanceof Function)
      va = `<script>
          (${va.toString()})(document.currentScript.parentElement);
          document.currentScript.remove();
        </script>`;
    if (/<\s*$/.test(reduce) && /^\s*\/>/.test(string)) {
      reduce = reduce.replace(/<\s*$/, "");
      string = string.replace(/^\s*\/>/, "");
    }
    return reduce + va + string;
  });
};

globalThis.css = (raw, ...ars) => {
  const id = "i" + crypto.randomUUID().slice(-4);
  const str = String.raw({ raw }, ...ars).replaceAll("&", "." + id);
  return `<script>
      document.currentScript.parentElement.classList.add("${id}");
      document.currentScript.remove();
      document.querySelector("style[${id}]") ||
        document.head.insertAdjacentHTML(
          "beforeend",
          \`<style ${id}>${str}</style>\`
        );
    </script>`;
};

Object.prototype.loop = function (i) {
  if (this instanceof Function || !(i instanceof Function)) return "";
  const r = this.valueOf();
  if (typeof r == "number") {
    if (isNaN(r)) return "";
    let n = "";
    for (let o = 1; o <= r; o++) n += i(o);
    return n;
  }
  return Object.entries(r)
    .map(([n, o], e) => i(o, n, e))
    .join("");
};
