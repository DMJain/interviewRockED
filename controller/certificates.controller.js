const db = require('../database/db');

const {createQueryForSearch, createQueryForUpdate} = require('../lib/functions/queryFunctions')
const {modifySearchedQuerry, modifyUserSearchData} = require('../lib/functions/dataModifierFunction');


//@DESC get All certificates
const getAllCertificates = async (req, res) => {
    //create custom query to search
    const query = createQueryForSearch(req.query)

    try {
        //search query from MySQL
        const data = await db.query(query)

        if(data[0].lenght == 0) {
           return res.status(400).json({success: 'success', message: 'no Certificates created', certificates : []})
        }

        const returnData = modifySearchedQuerry(data[0]);

        res.status(200).json({success: 'success', certificates : returnData})

    } catch (err) {
        console.log('erorr : ', err);
        res.status(500).json({success: 'failure', message : 'Error in fetching data'})
    }
   
}

//@DESC Create certificate
const createCertificates = async (req, res) => {
    try{
        const {name, issuer, overview, start_Date, duration_month, status} = req.body;

        //create query for MySQL
        const createdCertificate = await db.query('INSERT INTO certificate (name, issuer, overview, start_Date, duration_month, status) VALUES (?,?,?,?,?,?)', [name, issuer, overview, start_Date, parseInt(duration_month), status]);
        
        res.status(201).json({success: 'success', message : 'created successfull', certificate : {id : createdCertificate[0].insertId, name, issuer, overview }})
    } catch (err) {
        console.log('erorr : ', err);
        res.status(500).json({success: 'failure', message : 'server error'})
    }
}


//@DESC Upadte Certificate
const updateCertificate = async (req, res) => {

    const query = createQueryForUpdate({body: req.body, id: req.params.id});

    console.log(query)

    try {

        await db.query(query);

        const data = await db.query('SELECT * FROM certificate WHERE id=?', [req.params.id]);

        console.log(data[0]);

        res.status(201).json({success: 'success', message : 'certificate updated successfull', certificate : data[0]})
    } catch (err) {
        console.log('erorr : ', err);
        res.status(500).json({success: 'failure', message : 'server error'})
    }
}


//@DESC Get Active Certificate
const getActiveCertificates = async (req, res) => {
    try{
        const status = 'PUBLISHED'
        let nowDate = new Date(); 
        let date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
        const data = await db.query('SELECT * FROM certificate WHERE status = ? && start_Date <= ?', [status, date]);
        res.status(200).json({success: 'success', certificates : modifyUserSearchData(data[0])})
    }catch (err) {
        console.log('erorr : ', err);
        res.status(500).json({success: 'failure', message : 'server error'})
    }
    
}

//@DESC ENROLL USER
const createUserEnrtollment = async (req, res) => {

    try{
        const certificateId = req.params.id;
    const userId = req.body.userId;

    await db.query('INSERT INTO enrolled_user (certificate_id, user_id) VALUES (?,?)', [certificateId, userId]);

    const data = await db.query('SELECT * FROM enrolled_user')

    console.log(data[0]);

    res.status(201).json({success : 'success', message : 'enrolled'})
    } catch (err) {
        console.log('erorr : ', err);
        res.status(500).json({success: 'failure', message : 'server error'})
    }

    
}

module.exports = {getAllCertificates, createCertificates, getActiveCertificates, updateCertificate, createUserEnrtollment}