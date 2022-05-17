const { handleErrors, handleToast } = require('../../middleware/handler');

const Nominal = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message: alertMessage, status: alertStatus};
            const nominal = await Nominal.find()

            res.render('admin/nominal/view_nominal', {
                nominal,
                alert
            })
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/nominal/create')
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body

            let nominal = new Nominal({
                coinName, coinQuantity, price
            });

            await nominal.save();
            // res.status(200).json(nominal);
            handleToast(req, "success",  "Berhasil tambah nominal")
            res.redirect('/nominal');

        }catch(e){
            handleErrors(e, req, res, '/nominal');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params

            const nominal = await Nominal.findOne({_id: id});
            // console.log(nominal, 'nominal');
            res.render('admin/nominal/edit', {
                nominal
            })
        } catch(e){
            handleErrors(e, req, res, '/nominal');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinName, coinQuantity, price } = req.body;

            await Nominal.findOneAndUpdate({
                _id: id
            }, { coinName, coinQuantity, price })
            
            handleToast(req, "success",  "Berhasil ubah nominal")
            res.redirect('/nominal')
        } catch(e){
            handleErrors(e, req, res, '/nominal');
        }
    },
    actionDelete: async (req,res) => {
        try {
            const { id } = req.params;
            await Nominal.findOneAndRemove({
                _id: id
            });

            handleToast(req, "success",  "Berhasil hapus nominal")
            res.redirect('/nominal');

        }catch(e){
            handleErrors(e, req, res, '/nominal');
        }
    }
}