globalThis.html = (raw, ...ars) => {
  return raw.reduce((reduce, string, index) => {
    let va = ars[index - 1] ?? "";
    if (va instanceof Array) va = va.join("");
    if (va instanceof Function)
      va = `<script>
          (${va.toString()})(document.currentScript.parentElement);
          document.currentScript.remove();
        </script>`;
    if (
      /<\s*$/.test(reduce) &&
      /^\s*\/>/.test(string) &&
      (va === "" || /^\s*<[\S\s]+\/[\S\s]*>\s*$/.test(va))
    ) {
      reduce = reduce.replace(/<\s*$/, "");
      string = string.replace(/^\s*\/>/, "");
    }
    return reduce + va + string;
  });
};

globalThis.css = (raw, ...ars) => {
  const id = "i" + Math.random().toString().slice(2, 6);
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
