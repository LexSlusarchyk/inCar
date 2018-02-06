/**
 * Created by ivan.makarov@mev.com on 09.03.16.
 */
'use strict';

const fs = require('fs');

///////////////

module.exports = {
    decodeSafeQuery,
    isPathExist,
    requireFolderFiles,
    safeQuery,
    validate,
    filterProperties,
    valuesToString,
    propertiesToDBDataset,
    encodeDateToDb,
    resultsFieldToString,
    getTime
};

///////////////

/**
 * Require all files in folder
 * @param folderPath            folder path
 * @param [propertyObjectName]    sub-object's name
 */
function requireFolderFiles(folderPath, propertyObjectName) {
    var that = this;
    var isFolderExist;

    if (propertyObjectName) { that[propertyObjectName] = {}; }

    isFolderExist = isPathExist(folderPath);

    if (isFolderExist) {
        fs.readdirSync(folderPath).forEach(function(file) {
            if (file.match(/\.js$/) !== null && file !== 'index.js') {
                var name = file.replace('.js', '');

                if (propertyObjectName) {
                    that[propertyObjectName][name] = require(folderPath + '/' + file);
                } else {
                    that[name] = require(folderPath + '/' + file);
                }
            }
        });
    }

    return this;
}
/**
 * Check file/folder existing.
 * @param {String} path     File system path to file or folder
 * @returns {boolean}       Return true if exist, false if not
 */
function isPathExist(path) {
    var isFolderExist = true;

    try {
        fs.accessSync(path, fs.F_OK);
    } catch(e) {
        isFolderExist = false;
    }

    return isFolderExist;
}


/**
 * Escape the given input for use in a query.
 *
 * > NOTE: Because of a fun quirk in OrientDB's parser, this function can only be safely
 * used on SQL segments that are enclosed in DOUBLE QUOTES (") not single quotes (').
 *
 * @param  {String} input The input to escape.
 * @return {String}       The escaped input.
 */
function safeQuery (input) {
    var text = '' + input;
    var chars = new Array(text.length);
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i);
        if (char === '\r') {
            chars[i] = '\\r';
        }
        else if (char === '\n') {
            chars[i] = '\\n';
        }
        else if (char === '"') {
            chars[i] = '\\"';
        }
        else if (char === '\\') {
            chars[i] = '\\\\';
        }
        else {
            chars[i] = char;
        }
    }
    return chars.join('');
}

/**
 * Replace escaped symbols to original, for using safe queries on server
 *
 * @param {String} rawQuery query with escaped symbols
 * @returns {(String|*)}    ready for running query
 */
function decodeSafeQuery (rawQuery) {
    var pattern = /\\["\r\n\\]/g;
    if (_.isString(rawQuery)) {
        return rawQuery.replace(pattern, '$&');
    } else {
        return rawQuery;
    }
}

function isRID(testString) {
    return /^#[\d]+:[\d]+$/.test(testString);
}

function hasProperties(object, propertyList) {
    return _.difference(propertyList, _.keys(object)).length === 0;
}


/**
 * Validate any values list by rule list (based on validator.js library methods)
 * @param {Object} rules
 * @param {Object} inspectionData
 * @returns {*}
 */
function validate(rules, inspectionData) {
    var validationResults = generateResultSkeleton();

    _.each(inspectionData, function(inspectionValue, inspectionName) {
        if (rules[inspectionName]) {
            validateByValidatorList(rules[inspectionName].validators, inspectionName, inspectionValue);
        }

    });

    _.each(validationResults, function(validationResult, inspectionKey) {
        if (!validationResult.isValid) {
            validationResults.isValid = false;
        }
    });
    if (!_.has(validationResults, 'isValid')) {
        validationResults.isValid = true;
    }

    return validationResults;

    ///////////////

    function generateResultSkeleton() {
        return _.mapObject(inspectionData, function() {
            return { isValid: true };
        });
    }

    function validateByValidatorList(validators, property, value) {
        _.each(validators, function(args, validatorFnName) {
            if (validator[validatorFnName]) {
                if (validationResults[property].isValid) {
                    var isValid = !!args
                        ? validator[validatorFnName].apply(this, [value, args])
                        : validator[validatorFnName](value);

                    if (!isValid) {
                        validationResults[property].isValid = false;

                        if (rules[property].message) {
                            validationResults[property].message = rules[property].message;
                        }
                    }
                }
            } else {
                throw new Error('incorrect validator name');
            }
        })
    }
}

function filterProperties(obj, keysList) {
    var filtered = _.pick(obj, function(value, key, object) {
        return keysList.indexOf(key) !== -1 && (value || value === '' || value === 0);
    });

    return filtered;
}

function valuesToString(values) {

}

function propertiesToDBDataset(propObj) {
    var properties = [];

    _.each(propObj, function(value, key, list) {
        properties.push('`' + key + '`="' + value + '"');
    });

    return properties.join(', ');
}


function encodeDateToDb(datestring) {
        var date = new Date(datestring);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var min = date.getMinutes();
        var formatedDate;

        if (dd < 10){
            dd = '0' + dd;
        }

        if (mm < 10){
            mm = '0' + mm;
        }

        if (hh < 10){
            hh = '0' + hh;
        }

        if (min < 10){
            min = '0' + min;
        }

        formatedDate = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':00';
        return formatedDate;
}

function resultsFieldToString(data, fieldName, separator) {
    var fieldsArray = [];
     _.each(data, function(value, index) {
        if (value[fieldName] && fieldsArray.indexOf(value[fieldName]) === -1) {
            fieldsArray.push(value[fieldName])
        }
    });

    return fieldsArray.join(separator);
}


function getTime(dateString) {
    var date = new Date(dateString);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return hours + ':' + minutes;
}








