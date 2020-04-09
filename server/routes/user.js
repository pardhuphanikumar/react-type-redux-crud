const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
})

router.route('/add').post((req, res) => {
    const localized_name = req.body.localized_name;
    const primary_attr = req.body.primary_attr;
    const newUser = new User({ localized_name, primary_attr });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:' + err));
});


router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user)
            .catch(err => res.status(400).json('Error' + err))
        );
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User delted.')
            .catch(err => res.status(400).json('Error' + err))
        )
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.localized_name = req.body.localized_name;
            user.primary_attr = req.body.primary_attr;
            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;
