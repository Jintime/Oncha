"use strict";

const { Router } = require('express');
const express = require('express');
const router = express.Router();
const jwt_va =require("../../utils/jwt/jwt_va");


const ctrl =require('./home.ctrl');



router.get('/',ctrl.output.home);
router.get('/login',ctrl.output.login);
router.get('/register',ctrl.output.register);
router.get('/mypage',jwt_va,ctrl.routeprocess.mypage);

router.get('/order',jwt_va,ctrl.output.order);
router.get('/reservation',jwt_va,ctrl.output.reservation);
router.get('/coupon',jwt_va,ctrl.output.coupon);
router.get('/intro',jwt_va,ctrl.output.intro);
router.get('/notification',jwt_va,ctrl.output.notification);
router.get('/faq',jwt_va,ctrl.output.faq);
router.get('/csc',jwt_va,ctrl.output.csc);
router.get('/inquiry',jwt_va,ctrl.output.inquiry);
router.get('/admin_page',jwt_va,ctrl.routeprocess.mypage);
router.get(`/order_test`,jwt_va,ctrl.output.test);

router.post('/login',ctrl.routeprocess.login);
router.post('/register',ctrl.routeprocess.register);
router.post('/write',jwt_va,ctrl.routeprocess.write);
router.get('/logout',jwt_va,ctrl.routeprocess.logout);
router.get('/comboard',jwt_va,ctrl.routeprocess.comboard);
router.get('/admin',jwt_va,ctrl.routeprocess.adminsite);
router.get('/onboard',jwt_va,ctrl.routeprocess.onboard);




module.exports =router;