const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//Gets all members
router.get('/', (req, res) => {
    //returns json when called
    res.json(members);
})

//Get single member
router.get('/:id', (req, res) => {
    let member = members.find(member => member.id === parseInt(req.params.id));

    if(member) {
        res.json(member)
    } else {
        res.status(400).json({msg: `Member with id: ${req.params.id} not found`})
    }
});

//Create member
router.post('/', (req, res) => {
    let newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'})
    }

    members.push(newMember);

    //res.json(members);
    res.redirect('/');
});

//Update member
router.put('/:id', (req, res) => {
    //find the member
    let member = members.find(member => member.id === parseInt(req.params.id));

    if(member) {
        let updateMem = req.body;
        member.name = updateMem.name ? updateMem.name : member.name;
        member.email = updateMem.email ? updateMem.email : member.email;

        res.json({msg: 'Member was updated', member});
    } else {
        res.status(400).json({msg: `Member with id: ${req.params.id} not found`})
    }
});

//Delete member
router.delete('/:id', (req, res) => {
    let member = members.find(member => member.id === parseInt(req.params.id));

    if(member) {
        res.json({msg: 'Member deleted', members});
    } else {
        res.status(400).json({msg: `Member with id: ${req.params.id} not found`})
    }
});

module.exports = router;