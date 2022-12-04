const toOxfordComma = (array) =>
  array.length === 2
    ? array.join(' and ')
    : array.length > 2
    ? array
        .slice(0, array.length - 1)
        .concat(`and ${array.slice(-1)}`)
        .join(', ')
    : array.join(', ');
const getProjectTechnology = (project) =>
  toOxfordComma(project['technologies'].map(function(technology){
    return '<a href="' + technology["url"] + '" class="hover:underline" target="_blank">' + technology["name"] + '</a>';
  }));
const zeroFilled = (n) =>
  ('0'+n).slice(-1);
