const httpError = (res, err) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
}

module.exports = {httpError}