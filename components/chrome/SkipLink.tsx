// Direct port of the existing `.skip-link` anchor that lives just inside <body>
// in every legacy page. Same target id ("main") so existing CSS in main.css
// styles it without change.
export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Skip to main content
    </a>
  );
}
