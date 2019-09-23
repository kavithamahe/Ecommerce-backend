var Product = require('../models/product.model');
var Customer = require('../models/customer.model');
var OrderDetails = require('../models/order.model');
var cartDetails = require('../models/cartdetails.model');
var Master = require('../models/master.model');
var Subcategory = require('../models/subcategory.model');
var Subsubcategory = require('../models/subsubcategory.model');
var User = require('../models/user.model');
var Review = require('../models/review.model');
var Sequelize = require('sequelize');

var nodemailer = require('nodemailer');

var db = require('../shared/config') ;

var randomId = require('random-id');

const Op = Sequelize.Op;
var config = db.config; 

    exports.addproduct = async function (params,uploading) {
        if(params.subsubcategory_id == ''){
            params.subsubcategory_id = null;
        }
        if(params.subcategory_id == ''){
            params.subcategory_id = null;
        }
      
        var data = Product.build({
            product_name: params.product_name,
            category_id:params.category_id,
            subcategory_id:params.subcategory_id,
            subsubcategory_id:params.subsubcategory_id,
            product_description: params.product_description,
            price:params.price,
            quantity:params.quantity,
            existing_quantity:params.quantity,
            status: 0,
            product_image:uploading.file.originalname
        })
        try{
            var savedRecord = await data.save();
            return savedRecord;
        }
        catch (e) {
            throw Error(e)
        }

    }
    
    exports.categoryactivestatusservice = async function (params,uploading) {
        try{
            var category = await Master.findOne({
                where: {
                    category_id:params.category_id
                }
             
            }); 
            if(category.dataValues.status == "2"){
                var status = false;
                return status;
            }
            else{
                var status = 1;
                return true;
            }
        }
        catch (e) {
            throw Error(e)
        }
       
        }
        exports.subcategoryactivestatusservice = async function (params,uploading) {
            try{
                var category = await Subcategory.findOne({
                    where: {
                        id:params.id
                    }
                 
                }); 
                if(category.dataValues.status == "2"){
                    var status =false;
                    return status;
                }
                else{
                    var status = true;
                    return status;
                }
            }
            catch (e) {
                throw Error(e)
            }
           
            }
            exports.subsubcategoryactivestatusservice = async function (params,uploading) {
                try{
                var category = await Subsubcategory.findOne({
                    where: {
                        id:params.id
                    }
                 
                }); 
                if(category.dataValues.status == "2"){
                    var status = false;
                    return status;
                }
                else{
                    var status = true;
                    return status;
                }
            }
            catch (e) {
                throw Error(e)
            }
                }
exports.editsingleproductservice =async function (params,uploading) {

    if(params.subsubcategory_id == '' || params.subsubcategory_id == 'null'){
        params.subsubcategory_id = null;
    }
    if(params.subcategory_id == '' || params.subcategory_id == 'null'){
        params.subcategory_id = null;
    }
    try{
        if(uploading.file != undefined){
            originalimage = uploading.file.originalname;
           }
           else{
            originalimage = params.productimage;
           }
        var data = await Product.update({
            product_name: params.product_name,
            category_id:params.category_id,
            subcategory_id:params.subcategory_id,
            subsubcategory_id:params.subsubcategory_id,
            product_description: params.product_description,
            price:params.price,
            quantity:params.quantity,
            existing_quantity:params.quantity,
            status: 0,
            product_image:originalimage
        },
        { where:{
            id:params.id,
        }
    });
    
        return data;
    }
    catch (e) {
        throw Error(e)
    }

}
exports.removesingleproductservice = async function (params){
         
    try {  
        var removeproduct = Product.destroy({
       
            where: {
                id:params.id
            },

        })
       
        return removeproduct;
        
    }
    catch (e) {
       console.log(e);
    throw Error(e);
       
   }
}
        
        exports.getproductlistsearchservice = async function (params){
            try { 
                //         var productList = await Product.findAll({
                      
                //             where: {
                //                 [Op.or]: {
                //                     product_name: {
                //                       [Op.like]: '%'+params.search+'%'
                //                     },
                //                     product_description: {
                //                       [Op.like]: '%'+params.search+'%'
                //                     },
                //                     price: {
                //                         [Op.like]: '%'+params.search+'%'
                //                     },
                //                       category_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                       subcategory_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                       subsubcategory_id: {
                //                         [Op.like]: '%'+params.search+'%'
                //                       },
                //                 // '$Product.body$':{ [Op.like]: '%'+params.search+'%'  }
                //                 }
                //             },
                //                 order: [
                //                     ['id', 'DESC']
                //                 ]
                            
                        
                //        });   
       
                // return productList;
                var productlists = {};
         
                if(params.category_id)
                    productlists.category_id = params.category_id;
                if(params.subcategory_id)
                    productlists.subcategory_id= params.subcategory_id;
                if(params.subsubcategory_id)
                    productlists.subsubcategory_id= params.subsubcategory_id;
                if(params.category_id && params.subcategory_id && params.subsubcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.category_id && params.subcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                }
                if(params.subcategory_id && params.subsubcategory_id){
                    productlists.subcategory_id = params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.category_id && params.subsubcategory_id){
                    productlists.category_id = params.category_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id && params.subcategory_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                }
                if(params.search && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.subsubcategory_id = params.subsubcategory_id;
                }
                if(params.search && params.subcategory_id){
                    productlists.product_name = params.search;
                    productlists.subcategory_id = params.subcategory_id;
                }
                if(params.search && params.category_id && params.subcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subcategory_id= params.subcategory_id;
                }
                if(params.search && params.subcategory_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.subcategory_id= params.subcategory_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                if(params.search && params.category_id && params.subsubcategory_id){
                    productlists.product_name = params.search;
                    productlists.category_id = params.category_id;
                    productlists.subsubcategory_id= params.subsubcategory_id;
                }
                
                else if(params.price == "high to low"){
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['price', 'DESC']
                        ]
                     
                    }); 
                }
                else if(params.price == "low to high"){
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['price', 'ASC']
                        ]
                     
                    }); 
                }
                else if(params.search){
                             var productList = await Product.findAll({
                      
                            where: {
                                [Op.or]: {
                                    product_name: {
                                      [Op.like]: '%'+params.search+'%'
                                    },
                                    product_description: {
                                      [Op.like]: '%'+params.search+'%'
                                    },
                                    price: {
                                        [Op.like]: '%'+params.search+'%'
                                    },
                                }
                            },
                                order: [
                                    ['id', 'DESC']
                                ]
                            
                        
                       });   
                }
                else{
                var productList = await Product.findAll({
                    where: productlists,
                    order: [
                        ['id', 'DESC']
                    ]
                 
                });   
            }
            return productList;
            
                }
                catch (e) {
                   console.log(e);
                throw Error(e);
                   
               }
        }
        exports.getproductlistservice = async function (params){
            try { 
                    var productlists = {};
         
                    if(params.category_id)
                        productlists.category_id = params.category_id;
                    if(params.subcategory_id)
                        productlists.subcategory_id= params.subcategory_id;
                    if(params.subsubcategory_id)
                        productlists.subsubcategory_id= params.subsubcategory_id;
                    if(params.search)
                        productlists.product_name= params.search;
                    
                    else if(params.price == "high to low"){
                        var productList = await Product.findAll({
                            where: productlists,
                            order: [
                                ['price', 'DESC']
                            ]
                         
                        }); 
                    }
                    else if(params.price == "low to high"){
                        var productList = await Product.findAll({
                            where: productlists,
                            order: [
                                ['price', 'ASC']
                            ]
                         
                        }); 
                    }
                    else{
                    var productList = await Product.findAll({
                        where: productlists,
                        order: [
                            ['id', 'DESC']
                        ]
                     
                    });   
                }
                return productList;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleproductservice = async function (params){
            try {       
                var singleproduct = await Product.findAll({
            
                where:{id:params.id}
        
                });
        
                return singleproduct;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.productcheckoutservice = async function (params){  
           
            var len = 6;
            var pattern = 'A0'
            var date = new Date();
            var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var id = randomId(len, pattern);
                var singleproduct = await Product.findAll({
            
                where:{id:params.product_id}
        
                });
                var customerDetails = await Customer.findAll({
            
                    where:{id:params.customer_id}
            
                    });
                    var userDetails = await User.findAll({
            
                        where:{id:params.user_id}
                
                        });
                
                var data = await Customer.update({
                    status:1
                },
                   { where:{
                        id:params.customer_id,
                    }
                })
                var productquantity = await Product.update({
                    existing_quantity:singleproduct[0].existing_quantity - params.quantity
                },
                   { where:{
                       id:params.product_id
                    }
                })
               
                try{
                 
                        var orderdata = OrderDetails.build({
                            user_id:params.user_id,
                            customer_id:params.customer_id,
                            order_id: id,
                            product_id:params.product_id,
                            product_name:singleproduct[0].product_name,
                            product_image:singleproduct[0].product_image,
                            priceperproduct:singleproduct[0].price,
                            totalamount:params.amount,
                            ordered_date: date,
                            ordered_time: time,
                            quantity:params.quantity,
                            payment_type:params.payment_type,
                            status:0,
                            username:userDetails[0].firstname + ' ' + userDetails[0].lastname,
                            useremail:userDetails[0].email,
                            usermobile:userDetails[0].usermobile,
                            
                        })
                        var ordersavedRecord = await orderdata.save();
                        
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            host:'smtp.gmail.com',
                            auth: {
                              user: 'kavithamahe2@gmail.com',
                              pass: 'kavitha094'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                          });
                          
                          var mailOptions = {
                            from: 'kavithamahe2@gmail.com',
                            to: customerDetails[0].email,
                            subject: 'Your Order Placed Succeesfully',
                            // text: 'That was easy!',
                            html: "Hello <b>"+ customerDetails[0].first_name +"</b> <br> <br>Your order for "+ singleproduct[0].product_name +" with order ID "+ id +""
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                          return ordersavedRecord;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }
        exports.productcheckoutformcartservice = async function (params){  
           
            var len = 6;
            var pattern = 'A0'
            var date = new Date();
            var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var id = randomId(len, pattern);
           
                var customerDetails = await Customer.findAll({
            
                    where:{id:params.customer_id}
            
                    });
                    var userDetails = await User.findAll({
            
                        where:{id:params.user_id}
                
                        });
                
                var data = await Customer.update({
                    status:1
                },
                   { where:{
                        id:params.customer_id,
                    }
                })
                var productquantity = await Product.update({
                    existing_quantity:singleproduct[0].existing_quantity - params.quantity
                },
                   { where:{
                       id:params.product_id
                    }
                })
               
                try{
                    if(params.productListsfromcart != undefined){
                      
                        for(var i=0;i<params.productListsfromcart.length;i++){
                            var singleproduct = await Product.findAll({
            
                                where:{id:params.productListsfromcart[i].id}
                        
                                });
                            var cart = cartDetails.destroy({
                                where: {
                                    [Op.and]: [{
                                        user_id: params.id
                                    }, {
                                        product_id: params.productListsfromcart[i].id
                                    }]
                                }
                             
                            }); 
                            console.log(singleproduct)
                            for(var j= 0;j<singleproduct.length;j++){
                            var productquantity = await Product.update({
                                existing_quantity:singleproduct[j].existing_quantity - params.productListsfromcart[i].quantityperproduct
                            },
                               { where:{
                                   id:params.productListsfromcart[i].id
                                }
                            })
                            }
                          
                            var orderdata = OrderDetails.build({
                                user_id:params.user_id,
                                customer_id:params.customer_id,
                                order_id: id,
                                product_id:params.productListsfromcart[i].id,
                                product_name:params.productListsfromcart[i].product_name,
                                product_image:params.productListsfromcart[i].product_image,
                                priceperproduct:params.productListsfromcart[i].price,
                                totalamount:params.totalpricecart,
                                ordered_date: date,
                                ordered_time: time,
                                quantity:params.productListsfromcart[i].quantityperproduct,
                                payment_type:params.payment_type,
                                status:0,
                                username:userDetails[0].firstname + ' ' + userDetails[0].lastname,
                                useremail:userDetails[0].email,
                                usermobile:userDetails[0].usermobile,
                            })
                            var ordersavedRecord = await orderdata.save();
                        }
                    }
                
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host:'smtp.gmail.com',
                        auth: {
                          user: 'kavithamahe2@gmail.com',
                          pass: 'kavitha094'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                      });
                      
                      var mailOptions = {
                        from: 'kavithamahe2@gmail.com',
                        to: customerDetails[0].email,
                        subject: 'Your Order Placed Succeesfully',
                        // text: 'That was easy!',
                        html: "Hello <b>"+ customerDetails[0].first_name +"</b> <br> <br>Your order with order ID "+ id +""
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      return ordersavedRecord;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }
        exports.addaddressservice = async function (params){  
           
 
                var data = Customer.build({
                    user_id:params.user_id,
                    name:params.name,
                    mobile:params.mobile,
                    address:params.address,
                    landmark:params.landmark,
                    city:params.city,
                    state:params.state,
                    // country:params.country,
                    zipcode: params.zipcode,
                    address_type:params.address_type,
                    status:0
                })
               
                try{
                    var savedRecord = await data.save();
                   
                      return savedRecord;
                }
                catch (e) {
                    throw Error(e)
                }
        
               
        }

        exports.getaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.findAll({
                        where: {
                            user_id:params.user_id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.findOne({
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.editaddressservice = async function (params){
            try { 
                   
                    var address = await Customer.update({
                    name:params.name,
                    mobile:params.mobile,
                    address:params.address,
                    landmark:params.landmark,
                    city:params.city,
                    state:params.state,
                    // country:params.country,
                    zipcode: params.zipcode,
                    address_type:params.address_type
                    },
                    {
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.removeaddressservice = async function (params){
            try { 
                   
                    var address = Customer.destroy({
                        where: {
                            id:params.id
                        }
                     
                    });   
       
                return address;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.getmyordersservice = async function (params){
            try { 
                if(params.user_id){
                    var productList = await OrderDetails.findAll({
                        where: {
                            user_id:params.user_id
                        },
                        // include: [{
                        //     model: User,
                        //     required: false,
                        //     attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                        order: [
                            ['id', 'DESC']
                        ]

                    });  
                 
                    const sorted = productList.reduce((result, items) => {
                        const a = result.find(({order_id}) => order_id === items.order_id);
                        a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                            cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                            delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                            processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                            product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                            status:items.status,updated_at:items.updated_at,user_id:items.user_id,useremail:items.useremail,username:items.username,usermobile:items.usermobile,
                            items: [items]});
                          
                        return result;
                    }, []);
                 
                return sorted;
                }
                else{
                    var productList = await OrderDetails.findAll({
                        // include: [{
                        //     model: User,
                        //     required: false,
                        //     attributes: ['id','firstname','lastname','email','mobile']
                            
                        // }],
                        order: [
                            ['id', 'DESC']
                        ]
                    });  
                    const sorted = productList.reduce((result, items) => {
                        const a = result.find(({order_id}) => order_id === items.order_id);
                        a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                            cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                            delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                            processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                            product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                            status:items.status,updated_at:items.updated_at,user_id:items.user_id,useremail:items.useremail,username:items.username,usermobile:items.usermobile,
                            items: [items]});
                          
                        return result;
                    }, []);
                 
                return sorted;
                
                }
                  
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.viewsingleorderservice = async function (params){
            productlist = [];
            try { 
                   if(params.status){
                    var singleproductList = await OrderDetails.findAll({
                        where: {
                            order_id:params.order_id,
                            status:params.status,
                        },
                        include: [{
                            model: User,
                            required: false,
                            attributes: ['id','firstname','lastname','email','mobile']
                            
                        }],
                     
                    }); 
                }
                else{
                    var singleproductList = await OrderDetails.findAll({
                        where: {
                            order_id:params.order_id,
                        },
                        include: [{
                            model: User,
                            required: false,
                            attributes: ['id','firstname','lastname','email','mobile']
                            
                        }],
                     
                    }); 
                }
                //   console.log(singleproductList)
                      if(singleproductList != ''){
                        var singleaddress = await Customer.findOne({
                            where: {
                                id:singleproductList[0].dataValues.customer_id
                            }
                         
                        }); 
                        if(singleaddress){
                        singleproductList[0].dataValues.address = singleaddress.dataValues.address;
                        singleproductList[0].dataValues.city = singleaddress.dataValues.city;
                        singleproductList[0].dataValues.state = singleaddress.dataValues.state;
                        singleproductList[0].dataValues.zipcode = singleaddress.dataValues.zipcode;
                        }
                        else{
                        singleproductList[0].dataValues.address = "";
                        singleproductList[0].dataValues.city = "";
                        singleproductList[0].dataValues.state = "";
                        singleproductList[0].dataValues.zipcode = "";
                        }
                      const sorted = singleproductList.reduce((result, items) => {
                        const a = result.find(({order_id}) => order_id === items.order_id);
                        a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                            cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,shipped_date:items.shipped_date,shipped_time:items.shipped_time,created_at:items.created_at,customer_id:items.customer_id,
                            delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,payment_type:items.payment_type,
                            product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                            status:items.status,updated_at:items.updated_at,user_id:items.user_id,address:singleproductList[0].dataValues.address,
                            city:singleproductList[0].dataValues.city,state:singleproductList[0].dataValues.state,zipcode:singleproductList[0].dataValues.zipcode,
                            items: [items]});
                        return result;
                    }, []);
                
                if(singleproductList != undefined){
                    return sorted;
                }
                  else{
                      return "ads"
                  }
                }
                }
                catch (e) {
                   console.log(e);
                throw Error(e);
                   
               }
        }
        exports.addtocartservice = async function (params){
        
           
                try {  
                    if(typeof params.productDetails != undefined){
                      
                        for(var i=0;i<params.productDetails.length;i++){
                            var cartproductList = await Product.findAll({
                                where: {
                                    id:params.productDetails[i].product_id
                                }
                            })
                            if(typeof cartproductList != undefined){
                                for(var j=0;j<cartproductList.length;j++){
                                    var cartList = cartDetails.build({
                                        user_id:params.user_id,
                                        product_id:params.productDetails[i].product_id,
                                        product_name:cartproductList[j].product_name,
                                        price:cartproductList[j].price,
                                        quantity:params.productDetails[i].quantity,
                                        product_image:cartproductList[j].product_image
                                 
                                    }); 
                                }
                            }
                           
                            var savedRecord = await cartList.save(); 
                        }
                }
                return savedRecord;
                }
                catch (e) {
                   console.log(e);
                throw Error('Server Error');
                   
               }
        }
        exports.getcartproductservice = async function (params){
         
           
            try {  
                var cartproductList = await cartDetails.findAll({
                    where: {
                        user_id:params.user_id

                    }
                })
                let total = 0;
                for (var i = 0; i < cartproductList.length; i++) {
                    if (cartproductList[i].price) {
                        total +=((+(cartproductList[i].price)) * cartproductList[i].quantity);
                    }
                }
                var cartproductlength = cartproductList.length;
                // return total;
                var totalprice = {totalamount:total,count:cartproductlength};
                cartproductList.push(totalprice);
                return cartproductList;
                
            }
            catch (e) {
               console.log(e);
            throw Error('Server Error');
               
           }
    }
    exports.searchmyorderproductservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:1,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchdeliveredservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:2,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchcancelledservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            user_id:params.user_id,
                            status:3,
                            [Op.or]: {
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                totalamount: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                            }}
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.searchorderhistoryservice = async function (params){
        try { 
                    var productList = await OrderDetails.findAll({
                  
                        where: {
                            [Op.and]: {
                                [Op.or]:{
                                product_name: {
                                  [Op.like]: '%'+params.search+'%'
                                },
                                username: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  useremail: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  order_id: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  ordered_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  delivered_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  },
                                  cancelled_date: {
                                    [Op.like]: '%'+params.search+'%'
                                  }
                                },
                                [Op.and]:{
                                  status: {
                                    [Op.like]: '%'+params.status+'%'
                                  }
                                },

                            }},
                        
                    
                   });   
   
            return productList;
            }
            catch (e) {
               console.log(e);
            throw Error(e);
               
           }
    }
    exports.removecartproductservice = async function (params){
         
        try {  
            var removecartproductList  = cartDetails.destroy({
           
                where: {
                    // $and: [{
                    //     user_id:params.user_id
                    // }, {
                        product_id:params.product_id
                    // }]
                },

        // truncate: true
    })
           
            return removecartproductList;
            
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.updatecartquantityservice = async function (params){
         
    try {  
        var updatecartproductList  = await cartDetails.update({
            quantity:params.quantity,
        },
        {
            where: {
                    id:params.id
            },

})
       
        return updatecartproductList;
        
    }
    catch (e) {
       console.log(e);
    throw Error(e);
       
   }
}
exports.statuschangefororderservice = async function (params){
         
    try {  
        // status = 1 --->processing
         // status = 2 --->shipped
          // status = 3 --->delivered

          // status = 4 --->cancelled
          if(params.status == "1"){
            var processing_date = new Date();
            var processing_time = processing_date.getHours() + ":" + processing_date.getMinutes() + ":" + processing_date.getSeconds();
          }
          else if(params.status == "2"){
            var shipped_date = new Date();
            var shipped_time = shipped_date.getHours() + ":" + shipped_date.getMinutes() + ":" + shipped_date.getSeconds();
          }
          else if(params.status == "3"){
            var delivered_date = new Date();
            var delivered_time = delivered_date.getHours() + ":" + delivered_date.getMinutes() + ":" + delivered_date.getSeconds();
          }
          else if(params.status == "4"){
            var cancelled_date = new Date();
            var cancelled_time = cancelled_date.getHours() + ":" + cancelled_date.getMinutes() + ":" + cancelled_date.getSeconds();
          }
          else{
            var completed_date = new Date();
            var completed_time = completed_date.getHours() + ":" + completed_date.getMinutes() + ":" + completed_date.getSeconds();
          }
        
        var updatecartproductList  = await OrderDetails.update({
            status:params.status,
            processing_date:processing_date,
            processing_time:processing_time,
            shipped_date:shipped_date,
            shipped_time:shipped_time,
            delivered_date:delivered_date,
            delivered_time:delivered_time,
            cancelled_date:cancelled_date,
            cancelled_time:cancelled_time,
            completed_date:completed_date,
            notes:params.notes
        },
        {
            where: {
                    id:params.id
            },

})
       
        return updatecartproductList;
        
    }
    catch (e) {
       console.log(e);
    throw Error(e);
       
   }
}

exports.ordercancelbyuserservice = async function (params){
    var cancelled_date = new Date();
    var cancelled_time = cancelled_date.getHours() + ":" + cancelled_date.getMinutes() + ":" + cancelled_date.getSeconds();
    try { 
        var updatecartproductList  = await OrderDetails.update({
            status:4,
            cancelled_date:cancelled_date,
            cancelled_time:cancelled_time
        },
        {
            where: {
                    id:params.id
            },

        })
       
        return updatecartproductList;
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}

exports.getprocessingorderservice = async function (params){
    try { 
           if(params.user_id){
            var productList = await OrderDetails.findAll({
                where: {
                    user_id:params.user_id,
                    status:[0,1,2]
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   

            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                  
                return result;
            }, []);

        return sorted;
           }
           else{
            var productList = await OrderDetails.findAll({
                where: {
                    status:[0,1,2]
            },
                order: [
                    ['id', 'DESC']
                ]
             
            });   

            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                  
                return result;
            }, []);
        return sorted;
           }
         
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getdeliveredorderservice = async function (params){
    try { 
           if(params.user_id){
            var productList = await OrderDetails.findAll({
                where: {
                        user_id: params.user_id,
                        status:3,
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   
            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                return result;
            }, []);

        return sorted;
           }
           else{
            var productList = await OrderDetails.findAll({
                where: {
                        status:3,
                },
                order: [
                    ['id', 'DESC']
                ]
             
            });   
            const sorted = productList.reduce((result, items) => {
                const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
                return result;
            }, []);

        return sorted;
           }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getcancelledorderservice = async function (params){
    try { 
           
    if(params.user_id){
        var productList = await OrderDetails.findAll({
            where: {
                    user_id: params.user_id,
                    status:4
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
    else{
        var productList = await OrderDetails.findAll({
            where: {
                    status:4
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
                a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                    cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                    delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_date:items.ordered_date,ordered_time:items.ordered_time,
                    processing_date:items.processing_date,processing_time:items.processing_time,payment_type:items.payment_type,
                    product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                    status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                    items: [items]});
            return result;
        }, []);

    return sorted;
    }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.getcompletedorderservice = async function (params){
    try { 
           
    if(params.user_id){
        var productList = await OrderDetails.findAll({
            where: {
                    user_id: params.user_id,
                    status:5
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_time:items.ordered_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
    else{
        var productList = await OrderDetails.findAll({
            where: {
                    status:5
            },
            order: [
                ['id', 'DESC']
            ]
         
        });   

        const sorted = productList.reduce((result, items) => {
            const a = result.find(({order_id}) => order_id === items.order_id);
            a ? a.items.push(items) : result.push({order_id: items.order_id,priceperproduct:items.priceperproduct,totalamount:items.totalamount,
                cancelled_date:items.cancelled_date,cancelled_time:items.cancelled_time,created_at:items.created_at,customer_id:items.customer_id,
                delivered_date:items.delivered_date,delivered_time:items.delivered_time,id:items.id,ordered_time:items.ordered_time,payment_type:items.payment_type,
                product_id:items.product_id,product_image:items.product_image,product_name:items.product_name,quantity:items.quantity,
                status:items.status,updated_at:items.updated_at,user_id:items.user_id,
                items: [items]});
            return result;
        }, []);

    return sorted;
    }
        }
        catch (e) {
           console.log(e);
        throw Error(e);
           
       }
}
exports.productreviewservice = async function (params) {
    var data = Review.build({
        product_id: params.product_id,
        user_id:params.user_id,
        rating:params.rating,
        ratingcomments:params.ratingcomments,
        status: 0,
    })
    try{
        var savedRecord = await data.save();
        return savedRecord;
    }
    catch (e) {
        throw Error(e)
    }

}
exports.quantityavailcheckservice = async function (params) {
    var singleproduct = await Product.findAll({
            
        where:{id:params.id}

        });
        //    var incomingquantity = parseInt(singleproduct[0].existing_quantity);  
    try{
        console.log(params.quantity)
        console.log(singleproduct[0].existing_quantity)
        if(params.quantity > singleproduct[0].existing_quantity){
           throw Error("Your selected quantity is more than available quantity...");
        }
        else{
            return "true";
        }
    }
    catch (e) {
        throw Error(e)
    }

}