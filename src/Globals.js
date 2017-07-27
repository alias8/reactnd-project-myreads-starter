export const CURRENTLY_READING = "Currently Reading";
export const WANT_TO_READ = "Want to Read";
export const READ = "Read";
export const CATEGORIES = [CURRENTLY_READING, WANT_TO_READ, READ];

export const CURRENTLY_READING_CAMELCASE = "currentlyReading";
export const WANT_TO_READ_CAMELCASE = "wantToRead";
export const READ_CAMELCASE = "read";
export const CATEGORIES_CAMELCASE = [CURRENTLY_READING_CAMELCASE, WANT_TO_READ_CAMELCASE, READ_CAMELCASE];

export let MAP_CAMELCASE_TO_NORMAL = {};
CATEGORIES_CAMELCASE.forEach((item, index) => {
	MAP_CAMELCASE_TO_NORMAL[item] = CATEGORIES[index]
});

export let MAP_NORMAL_TO_CAMELCASE = {};
CATEGORIES.forEach((item, index) => {
	MAP_NORMAL_TO_CAMELCASE[item] = CATEGORIES_CAMELCASE[index]
});