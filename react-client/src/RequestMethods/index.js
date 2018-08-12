/*eslint no-var: 0*/

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const NO_MATCH_ROUTE = '/no-match';

const request = function(verb, endPoint, data) {
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(endPoint, {
    headers: headers,
    method: verb,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    body: JSON.stringify(data),
  }).then(getJSON);
};

const getRequest = function(endPoint, data) {
  if (data === undefined || data === null) {
    data = {};
  }

  var dataModified = data;

  var params = querystring.stringify(dataModified);
  if (params) {
    params = '?' + params;
  }

  return request('GET', endPoint + '' + params);
};

const postRequest = function(endPoint, data) {
  if (data === undefined || data === null) {
    data = {};
  }
  return request('POST', endPoint, data);
};

const putRequest = function(endPoint, data) {
  return request('PUT', endPoint, data);
};

const deleteRequest = function(endPoint, data) {
  return request('DELETE', endPoint, data);
};

function getJSON(response, endPoint) {
  return response.json().then(function(json) {
    if (response.status === 403 || response.status === 404) {
      window.location.href = NO_MATCH_ROUTE;
    }
    if (response.status === 503 || response.status === 502) {
      window.RaisalPubSub.publish('ERROR_500');
      throw Error(json.message); //Throw error
    } else if (response.status === 422) {
      throw Error(json.message);
    } else if (!response.ok) {
      if (json.message) {
        throw Error(json.message);
      } else {
        throw Error(response.statusText);
      }
    }
    return json;
  });
}

export { getRequest, postRequest, deleteRequest, putRequest };

