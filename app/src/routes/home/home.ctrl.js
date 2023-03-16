"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const Board = require("../../models/Board");
const { check_board, push_board } = require("../../utils/jwt/check_re");

const output={
  home : async (req,res)=>{
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    const board = new Board(req.body);
    const data = await board.main_board();

    const user = new User(req.body);
    if(!user.tag){
      res.render('home/index',{"data":data});
    }else{
      res.render('login/login',{"data":data});
    }  
    },
  login : (req,res)=>{
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render('login/login');
    },
  register : (req,res)=>{
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render('login/register');
        
    },order:(req,res)=>{
      logger.info(`GET /order 304 "주문페이지로 이동"`);
      res.render('menu/order');
    },reservation:(req,res)=>{
      logger.info(`GET /reservation 304 "예약페이지로 이동"`);
      res.render('category/reservation');
    },coupon:(req,res)=>{
      logger.info(`GET /coupon 304 "쿠폰페이지로 이동"`);
      res.render('menu/coupon');
    },intro:(req,res)=>{
      logger.info(`GET /intro 304 "온차소개페이지로 이동"`);
      res.render('category/oncha-info');
    },notification:(req,res)=>{
      logger.info(`GET /notification 304 "공지사항으로 이동"`);
      res.render('menu/notification');
    },faq:(req,res)=>{
      logger.info(`GET /faq 304 "자주찾는질문으로 이동"`);
      res.render('menu/faq');
    },csc:(req,res)=>{
      logger.info(`GET /csc 304 "주문페이지로 이동"`);
      res.render('menu/csc');
    },inquiry:(req,res)=>{
      logger.info(`GET /inquiry 304 "주문페이지로 이동"`);
      res.render('menu/inquiry');
    },test:(req,res)=>{
      res.render(`order/order`);
    },write :async (req,res)=>{
      const data =await check_board(req);
      return   res.render('board/write',{"data":data});
    }

  
}


const routeprocess={

    login: async (req,res)=>{
    const user =  new User(req.body);
    const response = await user.login();
    

    const url ={
        method :"POST",
        path: "/login",
        status : response.err ? 400:200,
    };


    log(response,url);

    res.cookie("accessToken",response.accessToken,{
        secure : false,
        httpOnly : true,
    });
    res.cookie("refreshToken",response.refreshToken,{
        secure : false,
        httpOnly : true,
    });
    return res.status(url.status).json(response);
    },
    register: async (req,res)=>{
    const user =  new User(req.body);
    const response = await user.register();

    const url ={
        method :"POST",
        path: "/register",
        status : response.err ? 409:201,
    };

    log(response,url);
    return res.status(url.status).json(response);
    },
    logout : (req,res)=>{
      try {
        res.cookie('accessToken', '');
        res.status(200).json("Logout Success");
      } catch (error) {
        res.status(500).json(error);
      }
    },admin_re: async (req, res) => {
      const page = parseInt(req.params.page); // 페이지 번호
      const user = new User(req.body);
  
      const data = await user.adminGetInfo(page);
 
      console.log(data+"1111");
      res.render('board', { "data": data.user ,"pageCount":data.pageCount});
    },
      // 데이터베이스 연결 및 쿼리 실행
      /*connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('board', { posts: results });
      });
    }),
    /*accessToken : async (req,res)=>{
      const token = req.cookies.accessToken;
      const user =  new User(req.body);
      const response = await user.accessToken(token);
    
      return res.status(200).json(response.others);

    },
    refreshToken : async(req,res)=>{
      const token = req.cookies.refreshToken;
      const user =  new User(req.body);
      const response = await user.refreshToken(token);
      
      res.cookie("accessToken",response,{
        secure : false,
        httpOnly : true,
    });

    return res.status(200).json("Access Token Recreated");
    },*/
    mypage :async (req,res)=>{
     
      const user = new User(req.body);
      const response = await user.accessToken(req.cookies.accessToken);

      if(response.tag ===`"member"`){
        const ne = new User(response);
        const data = await ne.getinfo();
        return res.render("mypage/mypage",{"data":data});
      }else if(response.tag === `"company"`){
        const ne = new User(response);
        const data = await ne.getinfo();
        return res.render("mypage/mypage",{"data":data});
      }else if(response.tag ===`"admin"`){
        const ne = new User(response);
        const page = req.query.page || 1;
        const data= await ne.adminGetInfo();

        const postsPerPage = 15;
        const totalPageCount = Math.ceil(data.length / postsPerPage);
        const startIdx = (page - 1) * postsPerPage;
        const endIdx = startIdx + postsPerPage;
        const posts = data.slice(startIdx, endIdx);
     
        console.log(page);
        //console.log(user, pageCount);
        return res.render("mypage/admin_page",{"data":posts,"totalPageCount":totalPageCount,"currentPage":page});
      }else {
        console.log(response.tag);
      }


    },
      comboard: async (req,res)=>{
        const data =await check_board(req);
      return   res.render('board/write',{"data":data});
      
      },
      write : async(req,res)=>{
        const board = new Board(req.body);

        const rel = await board.board_push();

        const url ={
          method : "POST",
          path : "/write",
          status : rel.err ? 409:201
        }


        return res.status(url.status).json(rel);
      },
      adminsite : async(req,res)=>{
        const user = new User(req.body);
        const response = await user.accessToken(req.cookies.accessToken);
        if(response.tag ===`"admin"`){
          const board = new Board(req.body);
        const data = await board.adminboard_check();
        return res.render('board/admin_board',{"data":data});
      }else if(response.tag ===`"company"`){
        const data = await check_board(req);
        return res.render('board/board',{"data":data});
      }else{
        return res.render('error/accesserror');
      }
        //else return res.status(400);
      },
      onboard : async(req,res)=>{

      },
    
    
}

module.exports={
    output,routeprocess,
}

const log =(response,url)=>{
    if(response.err){
     logger.error(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.err}`
     );
    }else{
    logger.info(
        `${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.msg||""}`
        );
    }
}