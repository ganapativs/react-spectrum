import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevious(value: any): any {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
