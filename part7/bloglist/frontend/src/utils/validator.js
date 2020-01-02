const isEmptyString = (str) => !str || /^\s*$/.test(str);

const isCredentialValid = (value) => (!isEmptyString(value) && value.length > 2);

module.exports = { isEmptyString, isCredentialValid };