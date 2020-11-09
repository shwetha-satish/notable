var ObjectID =require('mongodb').ObjectID

module.exports = function (app,database){
    app.get('/notes/:id', (req,res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id) };
        database.db('db_test_1').collection('notes').findOne(details, (err, item) =>{
            if (err) {
                res.send({ 'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        database.db('db_test_1').collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        database.db('db_test_1').collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req,res) => {
    console.log(req.body);
        const note = { text: req.body.body, title: req.body.title};
        console.log(note);

        database.db('db_test_1').collection('notes').insert(note,(err,result) =>{
            if(err){
                res.send({'error': 'An error has occured'});
            } else {
                res.send(result.ops[0])
            }

        });
    });
};