import { sanitizeHtmlString, sortByDate } from "./utils";

describe("sortByDate", () => {
  const items = [
    { id: 1, date: "2023-01-01" },
    { id: 2, date: "2022-12-31" },
    { id: 3, date: "2023-06-15" },
  ];

  it("should sort items by date in ascending order", () => {
    const sorted = sortByDate(items, (item) => item.date);

    expect(sorted).toEqual([
      { id: 2, date: "2022-12-31" },
      { id: 1, date: "2023-01-01" },
      { id: 3, date: "2023-06-15" },
    ]);
  });

  it("should sort items by date in descending order", () => {
    const sorted = sortByDate(items, (item) => item.date, "desc");

    expect(sorted).toEqual([
      { id: 3, date: "2023-06-15" },
      { id: 1, date: "2023-01-01" },
      { id: 2, date: "2022-12-31" },
    ]);
  });

  it("should handle items with null or undefined dates", () => {
    const itemsWithNulls = [
      ...items,
      { id: 4, date: null },
      { id: 5, date: undefined },
    ];

    const sorted = sortByDate(itemsWithNulls, (item) => item.date);

    expect(sorted).toEqual([
      { id: 4, date: null },
      { id: 5, date: undefined },
      { id: 2, date: "2022-12-31" },
      { id: 1, date: "2023-01-01" },
      { id: 3, date: "2023-06-15" },
    ]);
  });
});

describe("sanitizeHtmlString", () => {
  it("should remove script tags", () => {
    const input = '<div>Hello</div><script>alert("XSS")</script><p>World</p>';
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div>Hello</div><p>World</p></body></html>",
    );
  });

  it("should remove event handler attributes", () => {
    const input = '<button onclick="doSomething()">Click me</button>';
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><button>Click me</button></body></html>",
    );
  });

  it("should allow safe HTML tags", () => {
    const input =
      "<div><strong>Bold Text</strong> and <em>Italic Text</em></div>";
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div><strong>Bold Text</strong> and <em>Italic Text</em></div></body></html>",
    );
  });

  it("should remove dangerous attributes", () => {
    const input =
      '<a href="javascript:alert(\'XSS\')" style="color:red;" onmouseover="stealCookies()">Click me</a>';
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      '<html><head></head><body><a style="color:red;">Click me</a></body></html>',
    );
  });

  it("should handle empty strings", () => {
    const input = "";
    const output = sanitizeHtmlString(input);

    expect(output).toBe("<html><head></head><body></body></html>");
  });

  it("should remove HTML comments", () => {
    const input = "<div>Hello</div><!-- This is a comment --><p>World</p>";
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div>Hello</div><p>World</p></body></html>",
    );
  });

  it("should remove iframe, object, and embed tags", () => {
    const input =
      '<div>Hello</div><iframe src="malicious.html"></iframe><object></object><embed></embed><p>World</p>';
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div>Hello</div><p>World</p></body></html>",
    );
  });

  it("should remove multiple dangerous elements and attributes", () => {
    const input =
      '<div onclick="hack()">Click me</div><!-- comment --><script>alert("XSS")</script><iframe src="malicious.html"></iframe>';
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div>Click me</div></body></html>",
    );
  });

  it("should trim the output", () => {
    const input = "   <div>Hello World</div>   ";
    const output = sanitizeHtmlString(input);

    expect(output).toBe(
      "<html><head></head><body><div>Hello World</div></body></html>",
    );
  });
});
