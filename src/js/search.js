export default (props, {$, $f7, $on}) => {
  const fruits = 'Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple'.split(' ');

  let searchbar;
  let autocompleteDropdownSimple;

  $on('pageInit', () => {
    autocompleteDropdownSimple = $f7.autocomplete.create({
      inputEl: '#autocomplete-dropdown',
      openIn: 'dropdown',
      source: function(query, render) {
        console.log(query);
        const results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Find matched items
        for (let i = 0; i < fruits.length; i++) {
          if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
        }
        // Render items by passing array with result items
        render(results);
      },
    });
  });
  console.log(searchbar);
  console.log(autocompleteDropdownSimple);
  return $render;
};
