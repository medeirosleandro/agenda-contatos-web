import React from "react";

export function TestComponent() {
  const badVariable = "using single quotes and var";

  const unused = "this will trigger warning";

  return <div>{badVariable}</div>;
}
