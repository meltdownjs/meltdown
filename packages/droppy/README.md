# @meltdownjs/droppy

`@meltdownjs/droppy` is a react library which provides hooks for creating virtualized `Select`-, `MultiSelect`-, `ComboBox`- & `MultiComboBox`-Components easily. Furthermore it is possible to handle API-Data with TanStacks [react-query](https://tanstack.com/query/latest/docs/framework/react/overview).

## Installation

You can install `@meltdownjs/droppy` via npm or yarn or bun:

```bash
npm install @meltdownjs/droppy
```

```bash
yarn add @meltdownjs/droppy
```

```bash
bun add @meltdownjs/droppy
```

## useDropdownList

A custom react hook for managing the base functionality of a dropdown list. States like open/close or active index will be handled internally. The navigation throw the option is possible by using the keyboard. The library [floating-ui](https://floating-ui.com/docs/react) serves as the basis for this hook.

### Usage

Look at our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useDropdownList.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `onClose`: Optional function called when the dropdown list is closed.
- `ariaRole`: A string specifying the ARIA role of the dropdown list, which can be either 'select' or 'combobox'.

#### Return

An object with the following properties:
- `isOpen`: Indicates if the dropdown is open.
- `setIsOpen`: Function to set the state of the dropdown.
- `refs`: References related to the dropdown.
- `listRef`: Reference to the list of dropdown items.
- `activeIndex`: Index of the currently active item.
- `getFloatingProps`: Function to get props for the floating element.
- `getReferenceProps`: Function to get props for the reference element.
- `getItemProps`: Function to get props for each item in the dropdown.
- `floatingStyles`: CSS properties for the floating element.

## useSelect

A custom react hook for managing the state of a select input.

### Usage

Look at the component `UserSelect` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useSelect.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `options`: An array of options for the select input.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOption`: Optional field for the initial selected option.
- `onClose`: Optional callback function when the select closes.
- `onSelectedOptionChange`: Optional callback function when the selected option changes.

#### Return

An object with the following properties:
- `virtualizer`: Provides virtualized items for the select component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOption`: Represents the currently selected option or undefined.
- `setSelectedOption`: Updates the selected option state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the select component.

## useInfiniteSelect

A custom react hook for managing the state of a select input with options from a paginated api request as infinite query result.

### Usage

Look at the component `UserInfiniteSelect` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useInfiniteSelect.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `infiniteQueryOptions`: Specifies the options for infinite query.
- `ariaRole`: Optional role attribute for accessibility.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOption`: Optional field for the initial selected option.
- `onClose`: Optional callback function when the select closes.
- `onSelectedOptionChange`: Optional callback function when the selected option changes.

#### Return

An object with the following properties:
- `options`: An array of options (result of the executed infinite query) of the select input.
- `virtualizer`: Provides virtualized items for the select component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOption`: Represents the currently selected option or undefined.
- `setSelectedOption`: Updates the selected option state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the select component.

## useInfiniteComboBox

A custom react hook for managing the state of a combo box with options from a paginated api request as infinite query result.

### Usage

Look at the component `UserInfiniteComboBox` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useInfiniteComboBox.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `getInfiniteQueryOptions`: A field that holds a function to get the infinite query options.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOption`: Optional field for the initial selected option.
- `onClose`: Optional callback function when the select closes.
- `onSelectedOptionChange`: Optional callback function when the selected option changes.

#### Return

An object with the following properties:
- `options`: An array of options (result of the executed infinite query) of the combo box.
- `virtualizer`: Provides virtualized items for the combo box component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOption`: Represents the currently selected option or undefined.
- `setSelectedOption`: Updates the selected option state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the combo box component.
- `searchTerm`: Holds the current search term string.
- `setSearchTerm`: A function that sets the search term string.
- `clearSearch`: A function that clears the search term.
- `searchInputValue`: Holds the current search input value string.
- `setSearchInputValue`: A function that sets the search input value string.
- `setSearchTermDebounced`: A debounced function to set the search term string.
- `getSerchInputProps`: Returns props for a search input element.

## useMultiSelect

A custom react hook for managing the state of a MultiSelect input.

### Usage
Look at the component `UserMultiSelect` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useMultiSelect.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `options`: An array of options for the multi select input.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOptions`: Optional field for the initial selected options.
- `onClose`: Optional callback function when the multi select closes.
- `onSelectedOptionsChange`: Optional callback function when the selected options changes.

#### Return

An object with the following properties:
- `virtualizer`: Provides virtualized items for the multi select component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOptions`: Represents the currently selected options.
- `setSelectedOption`: Updates the selected option state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the multi select component.

## useInfiniteMultiSelect

A custom react hook for managing the state of a mulit select input with options from a paginated api request as infinite query result.

### Usage

Look at the component `UserInfiniteMultiSelect` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useInfiniteMultiSelect.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `infiniteQueryOptions`: Specifies the options for infinite query.
- `ariaRole`: Optional role attribute for accessibility.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOptions`: Optional field for the initial selected options.
- `onClose`: Optional callback function when the select closes.
- `onSelectedOptionsChange`: Optional callback function when the selected options changes.

#### Return

An object with the following properties:
- `options`: An array of options (result of the executed infinite query) of the multi select input.
- `virtualizer`: Provides virtualized items for the multi select component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOptions`: Represents the currently selected options.
- `setSelectedOptions`: Updates the selected options state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the select component.

## useInfiniteMultiComboBox

A custom react hook for managing the state of a multi combo box with options from a paginated api request as infinite query result.

### Usage

Look at the component `UserInfiniteMultiComboBox` in our [test](https://github.com/meltdownjs/meltdown/blob/main/packages/droppy/hooks/useInfiniteMultiComboBox.test.ts).

### API

#### Arguments

An object (called `args`) with the following properties:
- `getInfiniteQueryOptions`: A field that holds a function to get the infinite query options.
- `virtualizerOptions`: Optional field for virtualization options.
- `initialSelectedOptions`: Optional field for the initial selected options.
- `onClose`: Optional callback function when the select closes.
- `onSelectedOptionsChange`: Optional callback function when the selected options changes.

#### Return

An object with the following properties:
- `options`: An array of options (result of the executed infinite query) of the multi combo box.
- `virtualizer`: Provides virtualized items for the multi combo box component.
- `dropdownList`: Manages the dropdown list functionality.
- `selectedOptions`: Represents the currently selected options.
- `setSelectedOptions`: Updates the selected options state.
- `getReferenceProps`: Returns props for the reference element.
- `getFloatingProps`: Returns props for the floating element.
- `getItemProps`: Returns props for each item in the multi combo box component.
- `searchTerm`: Holds the current search term string.
- `setSearchTerm`: A function that sets the search term string.
- `clearSearch`: A function that clears the search term.
- `searchInputValue`: Holds the current search input value string.
- `setSearchInputValue`: A function that sets the search input value string.
- `setSearchTermDebounced`: A debounced function to set the search term string.
- `getSerchInputProps`: Returns props for a search input element.

## License

`MIT`