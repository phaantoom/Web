'use strict';
var express = require('express');
var router = express.Router();

const db = require("../db/db.js");

/* GET home page. */
router.get('/', function (req, res) {
    res.json({ title: 'Express' });
});


router.post('/matchEvent/:Venue/:day/:month/:year/:hour/:minut', (req, res) => {//---------------------------------------------post
    //STR_TO_DATE(req.params.day + "/" + req.params.month + "/" + req.params.year + " " + req.params.hour + ":" + req.params.minut + ":00", '%d/%m/%Y %H:%i:%s');
    //let de = req.params.day + "/" + req.params.month + "/" + req.params.year + " " + req.params.hour + ":" + req.params.minut + ":00";
    const event = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minut, 7);
    console.log(event.toString());
    console.log(event.toDateString());
    //console.log(de);
    let match = [req.params.Venue, event];
    let sql = 'INSERT INTO EPL_match (venue_id,match_date) values (?,?)';
    let query = db.query(sql, match, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.put('/updatematch/:id/:Venue/:day/:month/:year/:hour/:minut', (req, res) => {//---------------------------------------------put
    //let match = [req.params.Venue, req.params.year + "-" + req.params.month + "-" + req.params.day + " " + req.params.hour + ":" + req.params.minut + ":00", req.params.id];
    const event = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minut, 7);
    console.log(event.toString());
    console.log(event.toDateString());
    //console.log(de);
    let match = [req.params.Venue, event , req.params.id];
    let sql = 'UPDATE EPL_match SET venue_id = ?, match_date = ? WHERE ID = ?';
    let query = db.query(sql, match, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

router.post('/matchEventTeamsB/:id/:Team1/:state1/:Team2/:state2', (req, res) => {//---------------------------------------------post

    let match_team = [
        [req.params.Team1, req.params.id, req.params.state1],
        [req.params.Team2, req.params.id, req.params.state2]
    ];
    let sql = 'INSERT INTO match_team (team, match_id, state) values ?';
    let query = db.query(sql, [match_team], (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

//router.put('/updatematchTeamsB/:id/:Team1/:state1/:Team2/:state2', (req, res) => {//---------------------------------------------put

//    let match_team = [
//        [req.params.Team1, req.params.state1, req.params.id],
//        [req.params.Team2, req.params.state2, req.params.id]
//    ];
//    let sql = 'UPDATE match_team SET team = ?, state = ? WHERE match_id = ?';
//    let query = db.query(sql, match_team, (err, result) => {
//        if (err) throw err;
//        console.log(result.insertId);
//        res.send(result);
//    });
//});

router.put('/updatematchTeamsB/:id/:Team1/:state1/:oldTeam', (req, res) => {//---------------------------------------------put

    let match_team = [
        req.params.Team1, req.params.state1, req.params.id, req.params.oldTeam
    ];
    let sql = 'UPDATE match_team SET team = ?, state = ? WHERE match_id = ? and team = ?';
    let query = db.query(sql, match_team, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});


router.post('/matchEventTeams/:Team/:state/:id', (req, res) => {      //---------------------------------------------post

    let match_team = [ req.params.state, req.params.Team, req.params.id ];
    let sql = 'INSERT INTO match_team (state, team, match_id) values (?,?,?)';
    let query = db.query(sql, match_team, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.put('/matchEventrefeB/:ref/:id/:line1/:line2', (req, res) => {//---------------------------------------------put

    let match_refe = [
        [req.params.ref, req.params.id],
        [req.params.line1, req.params.id],
        [req.params.line2, req.params.id]
    ];
    let sql = 'UPDATE match_team SET ref = ? WHERE match_id = ?';
    let query = db.query(sql, [match_refe], (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.post('/updatematchrefeB/:ref/:id/:line1/:line2', (req, res) => {//---------------------------------------------post

    let match_refe = [
        [req.params.ref, req.params.id],
        [req.params.line1, req.params.id],
        [req.params.line2, req.params.id]
    ];
    let sql = 'INSERT INTO refe values (?,?)';
    let query = db.query(sql, [match_refe], (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.post('/matchEventrefe/:ref/:id', (req, res) => {               //---------------------------------------------post

    let match_refe = [req.params.ref, req.params.id ];
    let sql = 'INSERT INTO refe (ref,match_id) values (?,?)';
    let query = db.query(sql, match_refe, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.post('/addStadium/:loc/:shape/:width/:length', (req, res) => {        //---------------------------------------------post

    //let venue_info = { location: req.params.loc, shape: req.params.shape, width: req.params.width, length: req.params.length };
    let venue_info = [ req.params.loc, req.params.shape, req.params.width, req.params.length ];
    let sql = 'INSERT INTO venue (location, shape, width, length) values (?,?,?,?)';
    console.log(sql, venue_info);
    let query = db.query(sql, venue_info, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getmatchVenue/:id', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select * from EPL_match, venue where EPL_match.venue_id = venue.ID and  EPL_match.ID = ?';
    let info = [req.params.id]
    let query = db.query(sql, info, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getmatchteams/:id', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select * from team, match_team where team.ID = match_team.team and  match_id = ?';
    let query = db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getmatchrefe/:id', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from refe, referee where referee.ID = refe.ref and  match_id = ?';
    let query = db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getmatchs', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from EPL_match';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getvenues', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from venue';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getreferee', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from referee';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getteam', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from team';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.get('/getmachSeat/:id', (req, res) => {

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'select* from match_seats where match_id =?';
    let query = db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.delete('/deleteuser/:id', (req, res) => {               //---------------------------------------------delete

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let sql = 'delete from app_user where user_name =?';
    let query = db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});



module.exports = router;
