import { useActions } from '@/common/hooks';
import { Sidebar } from './styled';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextArea } from '@/components';
import { Dropdown, Menu } from 'antd';

export const ProcessPayload = () => {
  const { setProcess } = useActions();

  const [value, setValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const suggestions = [
    'actor A -> B: message1',
    'actor B -> C: message2',
    'note left of A: note text',
    'loop 3 times',
    'alt condition',
  ];

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const lines = inputValue.split('\n');
    const lastLine = lines[lines.length - 1];

    const matchingSuggestions = suggestions.filter((s) =>
      s.toLowerCase().includes(lastLine.toLowerCase()),
    );

    setFilteredSuggestions(matchingSuggestions);
    setDropdownVisible(matchingSuggestions.length > 0);
  };

  const handleSelect = (suggestion: string) => {
    const lines = value.split('\n');
    lines[lines.length - 1] = suggestion;
    setValue(lines.join('\n'));
    setDropdownVisible(false);
  };

  useEffect(() => {
    setProcess(value);
  }, [value]);

  const menu = (
    <Menu>
      {filteredSuggestions.map((suggestion) => (
        <Menu.Item key={suggestion} onClick={() => handleSelect(suggestion)}>
          {suggestion}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Sidebar>
        <div>ProcessPayload</div>
        <Dropdown overlay={menu} visible={dropdownVisible} trigger={['click']}>
          <TextArea
            rows={10}
            value={value}
            onChange={handleInputChange}
            placeholder="Write your sequence diagram here..."
          />
        </Dropdown>
      </Sidebar>
    </>
  );
};
