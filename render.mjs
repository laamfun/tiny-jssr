import "./utils.mjs";

const navs = ["HOME", "POSTS", "GALLERY", "MUSIC", "FRIENDS", "ABOUT"];

const style = css`
  & {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  & > div:hover {
    cursor: pointer;
    background-color: lightblue;
  }
`;

const handle = (that) => {
  that.addEventListener("click", ({ target }) =>
    alert(target.closest("[link]")?.textContent || "Not Found")
  );
};

const item = (e) => html`<div link>${e}</div>`;

const Header = () =>
  html`<header>
    <${style} />
    <${navs.loop(item)} />
    <${handle} />
  </header>`;

export default () => html`<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <${Header()} />
  </body>
</html>`;
