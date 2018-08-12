/*eslint no-var: 0*/
import { includes } from 'lodash'

const filterPreferences = function(fullCollection, preferences) {
    
    const filteredData = fullCollection.filter(data => {
        return includes(preferences, data.name)
    })

    return filteredData
}

export { filterPreferences }
