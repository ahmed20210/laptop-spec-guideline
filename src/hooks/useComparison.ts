import { useMemo, useState } from 'react';
import { ComparisonConfig } from '@/types/domain';

/**
 * Custom hook to manage comparison selections and computed selected profiles.
 */
export function useComparison(options: ComparisonConfig[]) {
  const [first, setFirst] = useState(options[0]?.id ?? '');
  const [second, setSecond] = useState(options[1]?.id ?? '');
  const [third, setThird] = useState(options[2]?.id ?? '');

  const selected = useMemo(
    () =>
      [first, second, third]
        .map((id) => options.find((item) => item.id === id))
        .filter(Boolean) as ComparisonConfig[],
    [first, second, third, options]
  );

  return { selected, first, second, third, setFirst, setSecond, setThird };
}
