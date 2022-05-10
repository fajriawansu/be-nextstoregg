const handleErrors = (err, req, res) => {
    req.flash('alertMessage', `${err.message}`)
    req.flash('alertStatus', 'danger')
    res.redirect('/category')
}

const handleToast = (req, status, msg) => {
    req.flash('alertMessage', msg)
    req.flash('alertStatus', status)
}

module.exports = {
    handleErrors,
    handleToast
};