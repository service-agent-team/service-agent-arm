import { useActions, useTypedSelector } from '@/common/hooks';
import { Sidebar } from './styled';
import { Dropdown, Input, Menu } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';

export const ProcessPayload = () => {
  const { setProcess } = useActions();
  const { process } = useTypedSelector((s) => s.app);

  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = ['participant', '->', '-->', '{id: number, orderId: number}', '/url'];

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setProcess(inputValue);

    // Extract the last word to use for filtering suggestions
    const lastWord = inputValue.split(/\s+/).pop() || '';

    // Filter suggestions based on last word
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(lastWord.toLowerCase()),
    );

    // Update suggestions
    setFilteredSuggestions(filtered);

    // Show dropdown if there are any filtered suggestions
    setShowDropdown(filtered.length > 0);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    // Replace the last word with the selected suggestion
    const words = value.split(/\s+/);
    words.pop();
    const newValue = `${words.join(' ')} ${suggestion} `;
    setValue(newValue);
    setShowDropdown(false);
  };

  const suggestionMenu = (
    <Menu>
      {filteredSuggestions.map((suggestion) => (
        <Menu.Item key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
          {suggestion}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Sidebar>
        <div>ProcessPayload</div>

        <Dropdown
          overlay={suggestionMenu}
          trigger={['click']}
          visible={showDropdown}
          placement="bottomLeft"
        >
          <Input.TextArea
            value={value}
            onChange={handleInputChange}
            rows={8}
            placeholder="Start typing..."
          />
        </Dropdown>
      </Sidebar>
    </>
  );
};
