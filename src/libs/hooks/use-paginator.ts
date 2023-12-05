import { getPaginationParams } from '@/libs/utils';
import { useState } from 'react';

export function usePaginator(total: number) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleShowSizeChange = (current: number, size: number) => {
    setLimit(size);
    setPage(current);
  };

  return {
    onShowSizeChange: handleShowSizeChange,
    onChange: handlePageChange,
    total,
    current: page,
    pageSize: limit,
    showSizeChanger: true,
    ...getPaginationParams(total),
  };
}
