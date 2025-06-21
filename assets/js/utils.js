const toOxfordComma = (array) =>
  array.length === 2
    ? array.join(" and ")
    : array.length > 2
      ? array
          .slice(0, array.length - 1)
          .concat(`and ${array.slice(-1)}`)
          .join(", ")
      : array.join(", ");
// biome-ignore lint/correctness/noUnusedVariables: getProjectTechnology is used in HTML via Alpine.js
const getProjectTechnology = (project) =>
  toOxfordComma(
    project.technologies.map(
      (technology) =>
        `<a href="${technology.url}" class="hover:underline" target="_blank">${technology.name}</a>`,
    ),
  );
// biome-ignore lint/correctness/noUnusedVariables: zeroFilled is used in HTML via Alpine.js
const zeroFilled = (n) => `0${n}`.slice(-1);
