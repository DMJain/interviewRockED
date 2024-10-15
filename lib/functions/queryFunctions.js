const createQueryForSearch = (query) => {

    const {status = null,filterDate = null ,name = null, orderDate = null, limit = null, page = 1} = query
    let seacrhQuery = 'SELECT * FROM certificate';

    if(status) {
        seacrhQuery = seacrhQuery + ` WHERE status='${status}'`
    }

    if(filterDate) {
        if(status){seacrhQuery = seacrhQuery + ` AND start_Date >= '${filterDate}'`}
        else {
            seacrhQuery = seacrhQuery + ` WHERE start_Date >= '${filterDate}'`
        }
    }
    if(name) {
        seacrhQuery = seacrhQuery + ` ORDER BY name ${name}` 
    }
    if(orderDate) {
        if(name){
            seacrhQuery = seacrhQuery + `, start_Date ${orderDate}`
        }else {
            seacrhQuery = seacrhQuery + ` ORDER BY start_Date ${orderDate}`
        }
    }

    if(limit) {
        seacrhQuery = seacrhQuery + `LIMIT ${limit}`
        if(page && page > 1) {
            seacrhQuery = seacrhQuery + ` OFFSET ${limit*(page-1)}`
        }
    }

    return seacrhQuery

}

const createQueryForUpdate = (query) => {

    let updateQuery = 'UPDATE certificate SET'

    if(query.body.name) {
        updateQuery = updateQuery + ` name='${query.body.name}'`;
    }

    if(query.body.issuer) {
        if(query.body.name) {
            updateQuery = updateQuery + `, issuer='${query.body.issuer}'`;
        }else {
            updateQuery = updateQuery + ` issuer='${query.body.issuer}'`;
        }
    }

    if(query.body.overview) {
        if(query.body.name || query.body.name) {
            updateQuery = updateQuery + `, overview='${query.body.overview}'`;
        }else {
            updateQuery = updateQuery + ` overview='${query.body.overview}'`;
        }
    }

    if(query.body.start_Date) {
        if(query.body.name || query.body.name || query.body.overview) {
            updateQuery = updateQuery + `, start_Date='${query.body.start_Date}'`;
        }else {
            updateQuery = updateQuery + ` start_Date='${query.body.start_Date}'`;
        }
    }

    if(query.body.duration_month) {
        if(query.body.name || query.body.name || query.body.overview || query.body.start_Date) {
            updateQuery = updateQuery + `, duration_month='${query.body.duration_month}'`;
        }else {
            updateQuery = updateQuery + ` duration_month='${query.body.duration_month}'`;
        }
    }

    if(query.body.status) {
        if(query.body.name || query.body.name || query.body.overview || query.body.start_Date || query.body.duration_month) {
            updateQuery = updateQuery + `, status='${query.body.status}'`;
        }else {
            updateQuery = updateQuery + ` status='${query.body.status}'`;
        }
    }


    updateQuery = updateQuery + ` WHERE id=${query.id}`

    return updateQuery
}


module.exports = {createQueryForSearch, createQueryForUpdate}