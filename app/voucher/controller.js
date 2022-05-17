const { handleErrors, handleToast } = require('../../middleware/handler');

const Voucher = require('./model');
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message: alertMessage, status: alertStatus};
            const voucher = await Voucher.find().populate('category').populate('nominals')
            // console.log(voucher, 'voucher')

            res.render('admin/voucher/view_voucher', {
                voucher,
                alert
            })
        } catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    viewCreate: async (req, res) => {
        const category = await Category.find();
        const nominal = await Nominal.find();
        try {
            res.render('admin/voucher/create', {
                category,
                nominal
            })
        } catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, category, nominals } = req.body

            if(req.file){
                let temp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootpath, `public/uploads/${filename}`)

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest)

                src.on('end', async () => {
                    try{
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        await voucher.save();
                        handleToast(req, "success",  "Berhasil tambah voucher")
                        res.redirect('/voucher');
                    } catch(e){

                    }
                })
            }else {
                const voucher = new Voucher({
                    name,
                    category,
                    nominals
                })

                await voucher.save();
                handleToast(req, "success",  "Berhasil tambah voucher")
                res.redirect('/voucher');
            }

        }catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const category = await Category.find();
            const nominal = await Nominal.find();
            const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals');
            res.render('admin/voucher/edit', {
                voucher,
                nominal,
                category
            })
            console.log(voucher, 'voucher')
        } catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, category, nominals } = req.body

            if(req.file){
                let temp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootpath, `public/uploads/${filename}`)

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest)

                src.on('end', async () => {
                    try{
                        const voucher = await Voucher.findOne({_id: id});

                        let currentImg = `${config.rootpath}/public/uploads/${voucher.thumbnail}`
                        if(fs.existsSync(currentImg)){
                            fs.unlinkSync(currentImg)
                            // kalau ada, dia akan dihapus
                        }

                        console.log(filename, 'filenameaes')

                        await Voucher.findOneAndUpdate({
                            _id: id
                        }, {
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })
                        
                        handleToast(req, "success",  "Berhasil ubah voucher")
                        res.redirect('/voucher');
                    } catch(e){
                        handleErrors(e, req, res, '/voucher');
                    }
                })
            } else {
                await Voucher.findOneAndUpdate({
                    _id: id
                }, {
                    name,
                    category,
                    nominals
                })

                handleToast(req, "success",  "Berhasil ubah voucher")
                res.redirect('/voucher');
            }
        } catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    actionDelete: async (req,res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOneAndRemove({
                _id: id
            });

            let currentImg = `${config.rootpath}/public/uploads/${voucher.thumbnail}`
            if(fs.existsSync(currentImg)){
                fs.unlinkSync(currentImg)
            }

            handleToast(req, "success",  "Berhasil hapus voucher")
            res.redirect('/voucher');

        }catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const voucher = await Voucher.findOne({ _id: id})

            let status = voucher.status === 'Y' ? 'N' : 'Y'

            await Voucher.findOneAndUpdate({
                _id: id
            }, {status})

            handleToast(req, "success",  "Berhasil ubah status voucher")
            res.redirect('/voucher');

        } catch(e){
            handleErrors(e, req, res, '/voucher');
        }
    }
}