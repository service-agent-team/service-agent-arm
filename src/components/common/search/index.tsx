import { useActions, useDebounce } from '@/common/hooks';
import * as S from './styled';
import { ReactNode, useState, useEffect } from 'react';

export const SearchInput = ({
  placeholder,
  children,
}: {
  placeholder?: string;
  children?: ReactNode;
}) => {
  const { setSearch } = useActions();
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <S.Block>
      <S.CustomInput
        placeholder={placeholder ? placeholder : 'Search'}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {children}
    </S.Block>
  );
};
