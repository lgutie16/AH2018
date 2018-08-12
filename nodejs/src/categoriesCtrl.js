import { Router } from 'express'
import map from "lodash/fp/map";
import flatten from "lodash/fp/flatten";
import sortBy from "lodash/fp/sortBy";
import flow from "lodash/fp/flow";
import { includes } from 'lodash'
import { getRequest } from './requestMethods'
import { filterPreferences } from './utilities'

exports.geteventsCategories = function(req, res) {
    const preferences = req.body.preferences

    getRequest('https://www.eventbriteapi.com/v3/categories')
        .then(function(response) {
            
            const myFavouriteCategories =  filterPreferences(
                response.categories,
                preferences
            )

            /* flow(
                filter(data => {
                    return includes(preferences, data.name)
                }),
                //filter if an events owns to one of the fauvorite categories 
                filter(data => {
                    return includes(events, data.name)
                })
              )(response.categories); */

            
            res.send({
                preferences: myFavouriteCategories,
                fullCollection: response.categories
            })
        })
        .then(function(myJson) {
            console.log(myJson)
        })
}


exports.getEvents =  function(req, res) {
    getRequest('https://www.eventbriteapi.com/v3/events')
        .then(function(response) {            
            res.send(response)
        })
        .then(function(myJson) {
            console.log(myJson)
        })
}
