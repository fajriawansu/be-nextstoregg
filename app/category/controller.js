const { handleErrors, handleToast } = require('../../middleware/handler');

const Category = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message: alertMessage, status: alertStatus};
            const category = await Category.find()

            res.render('admin/category/view_category', {
                category,
                alert
            })
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category/create')
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name } = req.body

            let category = new Category({
                name
            });

            await category.save();
            // res.status(200).json(category);
            handleToast(req, "success",  "Berhasil tambah kategori")
            res.redirect('/category');

        }catch(e){
            handleErrors(e, req, res);
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params

            const category = await Category.findOne({_id: id});
            // console.log(category);
            res.render('admin/category/edit', {
                category
            })
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.findOneAndUpdate({
                _id: id
            }, { name })
            
            handleToast(req, "success",  "Berhasil ubah kategori")
            res.redirect('/category')
        } catch(e){
            handleErrors(e, req, res);
        }
    },
    actionDelete: async (req,res) => {
        try {
            const { id } = req.params;
            await Category.findOneAndRemove({
                _id: id
            });

            handleToast(req, "success",  "Berhasil hapus kategori")
            res.redirect('/category');

        }catch(e){
            handleErrors(e, req, res);
        }
    }
}