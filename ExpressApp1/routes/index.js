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
    const event = new Date(req.params.year, req.params.month -1, req.params.day, req.params.hour, req.params.minut, 7);
    console.log(req.params.month);
    console.log(event.toString());
    console.log(event.toDateString());
    //console.log(de);
    let match = [req.params.Venue, event];
    let sql = 'INSERT INTO EPL_match (venue_id,match_date) values (?,?)';
    let query = db.query(sql, match, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        var id = { ID: result.insertId}
        res.send(id);
    });
});



//router.post('/matchEvent', (req, res) => {//---------------------------------------------post
//    //STR_TO_DATE(req.params.day + "/" + req.params.month + "/" + req.params.year + " " + req.params.hour + ":" + req.params.minut + ":00", '%d/%m/%Y %H:%i:%s');
//    //let de = req.params.day + "/" + req.params.month + "/" + req.params.year + " " + req.params.hour + ":" + req.params.minut + ":00";
//    console(req.body);
//    const event = new Date(req.body.year, req.body.month, req.body.day, req.body.hour, req.body.minut, 7);
//    console.log(event.toString());
//    console.log(event.toDateString());
//    //console.log(de);
//    let match = [req.body.Venue, event];
//    let sql = 'INSERT INTO EPL_match (venue_id,match_date) values (?,?)';
//    let query = db.query(sql, match, (err, result) => {
//        if (err) throw err;
//        console.log(result.insertId);
//        res.send(result);
//    });
//});

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
    console.log(match_team);
    let sql = 'INSERT INTO match_team (team, match_id, state) values ?';
    let query = db.query(sql, [match_team], (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.put('/updatematchTeamsB/:id/:Team1/:state1/:Team2/:state2', (req, res) => {//---------------------------------------------put

    let match_team = [
        [req.params.Team1, req.params.state1, req.params.id],
        [req.params.Team2, req.params.state2, req.params.id]
    ];
    let sql = 'UPDATE match_team SET team = ?, state = ? WHERE match_id = ?';
    let query = db.query(sql, match_team, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

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

router.put('/matchEventrefeB/:ref/:id/:oldref', (req, res) => {//---------------------------------------------put

    let match_refe = [
        req.params.ref, req.params.id, req.params.oldref
    ];
    let sql = 'UPDATE refe SET ref = ? WHERE match_id = ? and ref = ?';
    let query = db.query(sql, match_refe, (err, result) => {
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


router.post('/registeruser/:user_name/:user_type/:first_name/:last_name/:pass/:mail/:gender/:address/:city/:day/:month/:year', (req, res) => {
    //let user_info = {
    //    user_name: req.params.user_name, user_type: req.params.user_type, first_name: req.params.first_name,
    //    last_name: req.params.last_name, pass: req.params.pass, mail: req.params.mail, gender: req.params.gender,
    //    address: req.params.address, city: req.params.city, birth: req.params.year + "-" + req.params.month + "-" + req.params.day
    //};
    let user_info = [
        req.params.user_name, req.params.user_type, req.params.first_name,
        req.params.last_name, req.params.pass, req.params.mail, req.params.gender,
        req.params.address, req.params.city, req.params.year + "-" + req.params.month + "-" + req.params.day
    ];
    let sql = 'insert into app_user (user_name,user_type,first_name,last_name,pass,mail,gender,address,city,birth) values (?,?,?,?,?,?,?,?,?,?)';
    let query = db.query(sql, user_info, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.post('/getuser/:user_name/:pass', (req, res) => {
    let credentials = [req.params.user_name, req.params.pass];
    let sql = 'select* from app_user where user_name = ? and pass = ?';
    console.log(sql, credentials);
    let query = db.query(sql, credentials, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});


//router.get('/getmatchdeets/:match_id', (req, res) => {
//    // m match / r ref<->match / re ref / v venue / mt match<->team / t team
//    //select* can be changed to specific requirements
//    let sql = 'SELECT* from EPL_match m ON m.ID = ? INNER JOIN refe r ON m.ID = r.match_id INNER JOIN referee re ON r.ref = re.ID INNER JOIN venue v ON m.ID = v.ID INNER JOIN match_team mt ON m.ID = mt.match_id INNER JOIN team t ON mt.team =t.ID';
//    let query = db.query(sql, req.params.match_id, (err, result) => {
//        if (err) throw err;
//        console.log(result.insertId);
//        res.send(result);
//    });
//});

router.get('/getmatchdeets/:match_id', (req, res) => {
    // m match / r ref<->match / re ref / v venue / mt match<->team / t team
    //select* can be changed to specific requirements
    let sql = 'SELECT * from EPL_match where ID = ?';
    let query = db.query(sql, req.params.match_id, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});


router.put('/updateuser/:first_name/:last_name/:pass/:gender/:address/:city/:day/:month/:year/:user_name', (req, res) => {
    let updated_info = [req.params.first_name, req.params.last_name, req.params.pass, req.params.gender, req.params.address, req.params.city, req.params.year + "-" + req.params.month + "-" + req.params.day, req.params.user_name];
    let sql = 'UPDATE app_user SET first_name = ?, last_name = ?, pass = ?, gender = ?, address = ? , city = ?, birth = ? WHERE user_name = ?';
    let query = db.query(sql, updated_info, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

//reserve ticket given match the IDs of match seat and user
router.post('/reserveticket/:match_id/:seat_id/:user_id', (req, res) => {
    let data = [req.params.match_id, req.params.seat_id, req.params.user_id];
    let sql = 'insert into match_seats (match_ID,seat_id,user_id) values (?,?,?)';
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});


//delete a reservation given time before match > 3 days 
router.delete('/deletereservation/:seat_id/:user_name', (req, res) => {               //---------------------------------------------delete

    //let venue_info = { location: req.params.loc, shape: req.params.shape, no_seats: req.params.seats };
    let data = [req.params.seat_id, req.params.user_name];
    let sql = 'delete from match_seats where seat_id =? and user_id = ?';
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

//add new ref by type and name
router.post('/addref/:referee_type/:first_name', (req, res) => {
    let data = [req.params.referee_type, req.params.first_name];
    let sql = 'insert into referee (referee_type,first_name) values (?,?)';
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});

router.post('/addteam/:team_name/:team_town', (req, res) => {
    let data = [req.params.team_name, req.params.team_town];
    let sql = 'insert into team (team_name,team_town) values (?,?)';
    let query = db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result.insertId);
        res.send(result);
    });
});


module.exports = router;
