// app/routes.js


var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session')
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var http = require('http');
var soap = require('soap');
var parseString = require('xml2js').parseString;

var crypto = require('crypto');
var User       		= require('../app/models/user');
var Profile       	= require('../app/models/profile');
var Portfolio       = require('../app/models/portfolio');
var Payment 		= require('../app/models/schemepayment');
var wellknown = require('nodemailer-wellknown');
var useragent = require('express-useragent');
//create the model for profile and expose it our app
/*module.exports = mongoose.model('profiledata', profileSchema);*/


module.exports = function(app, passport) {


	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	var Schema = mongoose.Schema;


// create a schema
var assetSchema = new Schema({
    from: Number,
    to: Number,
    risk_profile:String,
    allocation:String,
    asset_value:String
       
});

// the schema is useless so far
// we need to create a model using it
var Asset = mongoose.model('Asset', assetSchema);

// make this available to our users in our Node applications
module.exports = Asset;
  
// create a new user called chris





// Schema for Schemes master
var FundmapingSchema = new Schema({
    time:String,
    sip_from: Number,
    sip_to:Number,
    risk_profile:String,
    scheme_code:String,
    scheme_name:String,
    category:String,
    subcategory:String,
    rating:Number

});



	
	
	
	function checkPan(req){
		
		
		if(req.session.panMessage){
			return true;
		}else{
			
			return false;
		}
	}
	

function checkLoginStatus(req){
	
	
	if(req.session.loggedIn){
	
	return true;
	
	
}else {
	
	return false;
	
}
	
}
	
	function checkPaymentStatus(req){
		
		console.log(req.session.payment+"checkStatus");
		
		if(req.session.payment){
			return true;
		}
		else{
			return false;
		}
		
	}

var currentPage;

var mood = [
	{ name: 'Broke'},
	{ name: 'Nerdy'},
	{ name: 'Rich'},
	{ name: 'Responsible'},
	{ name: 'Loved'},
	{ name: 'Social'}
];

var navActive = [
	
	{ mStoryAct: ''},
	{ reportsAct: ''},
	{ myProfileAct: ''},
	{ accountAct: ''},
	{ messagesAct: ''}
	
	
]

app.get('/',isLoggedIn, function(req, res){
	
loginStatus = checkLoginStatus(req);	
currentPage = req.session.activePage = "/";
    
//    console.log(Json.strigify(req.useragent))
 //console.log('User-Agent: ' + req.headers['user-agent']);
    
    
    
	async.waterfall([
  function(callback){
	   
///*ID: 109401
//Member : 10940
//Password :123456 or 123$*/
//
////&getPassword?UserId=10940&Password=123456&PassKey=test
// 
//  var url = 'http://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc?singleWsdl';
//
//  var args = {
//	  UserId: '109401',
//	  Password: '123$',
//	  PassKey: 'test'
//  };
//	  
//  soap.createClient(url, function(err, client) {
//	  console.log(client.describe().MFOrder.WSHttpBinding_MFOrderEntry.getPassword);
//	   //console.log(client.getPassword);
//	  
//	   var soapHeader = {
//    'Content-Type':'application/soap+xml;charset="UTF-8"',
//		   'action':'http://bsestarmf.in/MFOrderEntry/getPassword'
//  };
//  client.addSoapHeader(soapHeader);
//	  
//      client.getPassword(args, function(err, result,raw, body) {
//		  
//		  
//		   console.log(raw);
///*		  parseString(body, function(err, results){
//    // Get The Result From The Soap API and Parse it to JSON
//			 // console.log(results);
//    //var requestResult = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].getPasswordResponse[0].getPasswordResult[0];
//    //console.log(requestResult);
//   })
//	*/	  
//          //console.log(result);
//      });
//  });
	  
	  
	  var ws = require('ws.js')
  , Http = ws.Http
  , Security = ws.Security
  , UsernameToken = ws.UsernameToken

 var request ='<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"'+'xmlns:bses="http://bsestarmf.in/">'+'<soap:Header/>'+'<soap:Body>'+'<bses:getPassword>'+'<bses:UserId>109401</bses:UserId>'+'<bses:Password>123$</bses:Password>'+'<bses:PassKey>test</bses:PassKey>'+'</bses:getPassword>'+'</soap:Body>'+'</soap:Envelope>';
	  

var ctx =  { request: request,
			url : "http://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc?singleWsdl",
			action: "http://bsestarmf.in/MFOrderEntry/getPassword"
           , ContentType:'application/soap+xml;charset="UTF-8"'
           }

var handlers =  [ new Security({}, [new UsernameToken({username: "109401", password: "123$"})])
                , new Http()
                ]

ws.send(handlers, ctx, function(ctx) {                    
  console.log("response: " + ctx.response);
})  
	  
	  callback(null)
  }, function(callback){
	  
	  var data='<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">'+'<soap:Header/>'+'<soap:Body>'+'<bses:getPassword>'+'<bses:UserId>109401</bses:UserId>'+'<bses:Password>123$</bses:Password>'+'<bses:PassKey>test</bses:PassKey>'+'</bses:getPassword>'+'</soap:Body>'+'</soap:Envelope>';
	  
	  var options = {    
  host:'bsestarmfdemo.bseindia.com',
  port:'80',
  path:'/MFOrderEntry/MFOrder.svc?singleWsdl',
  connection:'keep-alive',
  accept:'*/*',
  method:'POST',
  headers: {
       'Content-Type':'application/soap+xml;charset="UTF-8"',
      'Content-Length':data.length,
      'Accept':'*/*',
      'SOAPAction':'http://bsestarmf.in/MFOrderEntry/getPassword'
  }
};


var req=http.request(options, function(res) {
    console.log(res.statusCode+"code");
    var body = '';
    res.on('data', function(data) {
        body += data;
    });
    res.on('end', function() {
        console.log(body+"body");
    });
    res.on('error', function(error) {
        console.log(error);
    });
});
	req.write(data);
req.end();  
	  
  }], function (err, result) {
   
		 if (err)
             throw err;
		
		console.log(result+"result");
			//res.send(result);
		//return done(null, result);
  }
)		
	
 mobile = req.useragent["isMobile"]
 bot = req.useragent["isBot"]
 desktop =req.useragent["isDesktop"]
 myBrowser = req.useragent["browser"]
myVesrion = req.useragent["version"]
 myOs = req.useragent["os"]
myPlatform = req.useragent["platform"]
 mySource = req.useragent["source"]
 
 
 
 
   console.log(mobile);
    console.log(bot); 
   console.log(desktop); 
   console.log(JSON.stringify(req.useragent))
 if(mobile){
  
  res.render('mobile.ejs',{
  user : req.user ,
    smessage: req.flash('signupMessage'),
  lmessage: req.flash('loginMessage'),
   selectorDisplay: "hide",
    loggedIn: loginStatus,
   footerDisplay: "show",
   footerData1: "Blog",
   footerData2: "FAQs",
   moods: mood
   
  });
 }
   else if(bot){
        res.render('bot.ejs',{
  user : req.user ,
    smessage: req.flash('signupMessage'),
  lmessage: req.flash('loginMessage'),
   selectorDisplay: "hide",
    loggedIn: loginStatus,
   footerDisplay: "show",
   footerData1: "Blog",
   footerData2: "FAQs",
   moods: mood
   
  });
    }
 else{
	res.render('index.ejs',{
		user : req.user ,
	   smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  selectorDisplay: "hide",
	  	loggedIn: loginStatus,
	  footerDisplay: "show",
	  footerData1: "Blog",
	  footerData2: "FAQs",
	  moods: mood
	  
  });
	
 }
   
     console.log( myBrowser);
     console.log(myVesrion);
     console.log( myOs);
     console.log(myPlatform);
     console.log(mySource);   
});

app.get('/FAQs', isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/FAQs";
		
	loginStatus = checkLoginStatus(req);
    
   mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('faqMobile.ejs',{
//	  	  selectorDisplay: "show",
//	  smessage: req.flash('signupMessage'),
//		lmessage: req.flash('loginMessage'),
//	  	loggedIn: loginStatus,
//	  user : req.user ,
//	  	  footerDisplay: "show",
//	  footerData1: "Blog",
//	  footerData2: "FAQs"
	  
  });
    }else{
  res.render('faqs.ejs',{
	  	  selectorDisplay: "show",
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	loggedIn: loginStatus,
	  user : req.user ,
	  	  footerDisplay: "show",
	  footerData1: "Blog",
	  footerData2: "FAQs"
	  
  });
        }
});


	app.get('/Pricing',isLoggedIn,  function(req, res){
	
		currentPage = req.session.activePage = "/Pricing";
		
	loginStatus = checkLoginStatus(req);
		
		if(req.session.ForPayment){
		
		schemeAsked =true;
	}else{
		schemeAsked=false;
	}	
				if(loginStatus){
			

			
				Payment.findOne({email:req.session.userEmail},function(err, datapaid ){
				var	tunny = "yes";
		var paidtest = datapaid.paid;
					
		
		if(paidtest == tunny){
			
		paymentStatus =	req.session.payment = true;
			schemeAsked =true;
			
		}else {
		paymentStatus =	req.session.payment = false;	
		schemeAsked =false;
		}
					console.log(schemeAsked+"toPay");
	console.log(paymentStatus+"statusPricing");
					
                    
                    
                    
                    mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('howItWorksMobile.ejs',{
 
  });
    }else {res.render('howItWorks.ejs', {
	  user : req.user ,
	  	  selectorDisplay: "show",
						smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	loggedIn: loginStatus,
	  		paid:paymentStatus,
			scheme: schemeAsked,			
	  	  footerDisplay: "show",
	  footerData1: "Video Tour",
	  footerData2: "FAQs"
  });
                }
	
					
	});
		
		}else{
			
			paymentStatus=false;
			console.log(paymentStatus+"statusPricingelse");
            
            mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('howItWorksMobile.ejs',{
 
  });
    }else {res.render('howItWorks.ejs', {
	  user : req.user ,
	  	  selectorDisplay: "show",
				smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	loggedIn: loginStatus,
	  		paid:paymentStatus,
	  	  footerDisplay: "show",
	  footerData1: "Video Tour",
	  footerData2: "FAQs"
  });
          }
		}
		

	
		
 
		
		
});
	
	
	
		app.post('/Pricing',isLoggedIn,  function(req, res){
	
	loginStatus = checkLoginStatus(req);
	currentPage = req.session.activePage = "/Pricing";
	
			if(loginStatus){
						Payment.findOneAndUpdate({email:req.session.userEmail}, {$set:{
			plan: req.body.plan,
			plan_price: req.body.planPrice,
			paid: "yes"
		}},function(err, datapaid ){
		
		 if(err){
			 throw err;
			 console.log("redirect to pricing");
			 res.redirect("/Pricing");	
		 }else{
		 req.session.payment = true;
			  console.log("redirect to goalSelection");
             mobile = req.useragent["isMobile"]
	if(mobile){
        res.render('knowUsMobile.ejs')
    }
    
    else
    {
			 res.redirect("/GoalSelection");
    }
		 } 
		
			
	
	});
			}
	

});

app.get('/KnowUs',isLoggedIn, function(req, res){
	
		currentPage = req.session.activePage = "/KnowUs";
	
	loginStatus = checkLoginStatus(req);
     mobile = req.useragent["isMobile"]
	if(mobile){
        res.render('knowUsMobile.ejs')
    }
    
    else
    {res.render('knowUs.ejs',{
	  user : req.user ,
	  selectorDisplay: "show",
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	loggedIn: loginStatus,
	  	  footerDisplay: "show",
	  footerData1: "Blog",
	  footerData2: "FAQs"
    
	  
  });}
});

	
app.post("/PANStatus", function(req, res){
	
	currentPage = req.session.activePage = "/PANStatus";


	loginStatus = checkLoginStatus(req);
	
	if(loginStatus){
	
	}else {
		
		console.log("end");
		
	}

	
});	
	
	
app.get("/GoalSelectionScheme",isLoggedIn, function(req, res){
	
	currentPage = req.session.activePage = "/GoalSelectionScheme";


	loginStatus = checkLoginStatus(req);
	
				panS= checkPan(req);
	 
	if(panS){
	
		panMsg = req.session.panMessage;
		
	}else{
		panMsg = "";
	}

	console.log(panMsg+"in getGSScheme");
	if(loginStatus){
		mailId= req.session.userEmail;
		
}else{
	mailId=null;
	
}
	if(req.session.ForPayment){
		
		testMe= true;
	}else{
		testMe=false;
	}
	
	if(loginStatus){
		var amount1, amount2, amount3, sip, riskp, time;
		Portfolio.findOne({email:mailId},function(err, AssetAgain){
			

			
         amount1 = AssetAgain.amt1;
		 amount2 = AssetAgain.amt2;
		 amount3 = AssetAgain.amt3;
		 sip = AssetAgain.sip;
		 riskp = AssetAgain.risk_profile;
		 time=AssetAgain.years;
		
		
     
			//console.log(amount1,amount2,amount3,sip,riskp,time);
	
				
				var Fundmapings_new = mongoose.model('Fundmapings_new', FundmapingSchema);
module.exports = Fundmapings_new;
			var schemecamntde=0,schemecamnteq=0,schemecamnthy=0;
  var schememamntde=0,schememamnteq=0,schememamnthy=0;
  var schemeagamnthy=0,schemeagamnteq=0,schemeagamnteq=0;

                var query = {};
			//console.log(sip+"sip");
query.risk_profile=riskp;
		//console.log(time);


  if(time==2)
                {
                    query.time="0,2";
                    query.sip_from="";
                      query.sip_to="";

                    }
    else if(time==1)
            {
                query.time="0,1";
                    query.sip_from="";
                      query.sip_to="";

                 }

         else if (time>2 && time<3)
    {
         query.time="3,3";
                    query.sip_from="";
                      query.sip_to="";

         }


    else if(time>=3){

         if(sip>=1000 && sip<=2000 && time>=3)
                 {
                     query.sip_from=1000;
                      query.sip_to=2000;
                     query.time="3,20";

                 }
             else if(sip>=3000 && sip<=4000 && time>=3)
             {
                      query.sip_from=3000;
                     query.sip_to=4000;
                 query.time="3,20";

             }
             else if(sip>=5000 && sip<=10000 && time>=3){
                   query.sip_from=5000;
                      query.sip_to=10000;
                 query.time="3,20";

             }
             else if(sip>=11000 && sip<=20000 && time>=3){
                  query.sip_from=11000;
                      query.sip_to=20000;
                 query.time="3,20";

             }
             else{
                  query.sip_from=20000;
                 query.sip_to="";
                 query.time="3,20";
               }
    }


Fundmapings_new.find(query, function (err, docs) {

  var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;


  var schemecamntde=0,schemecamnteq=0,schemecamnteq1=0,schemecamnteq2=0,schemecamnthy=0;

  docs.forEach( function( docs ){
//Conservative
       if((docs.risk_profile)==riskp){

    if((docs.category)=="Equity"){
    j=j+1;

      }
      if((docs.category)=="Hybrid"){
  k=k+1;
  }
  if((docs.category)=="Debt"){
    l=l+1;
  }

  }

	  });


docs.forEach( function( docs ){

  if((docs.risk_profile)==riskp){

if(j==0 || j==1){
    schemecamnteq=amount1;
}
else{
      schemecamnteq=amount1/2;
     }
  if(k==0 || k==1){
   schemecamnthy=amount2;
  }
  else{
    schemecamnthy=amount2/2;
    }
    if(l==0 || l==1){
          schemecamntde=amount3;
      }else{
        schemecamntde=amount3/2;
    }
        }




});
	
Payment.findOne({email:req.session.userEmail},function(err, datapaid ){
				var	paidYes = "yes";
		var paidtest = datapaid.paid;
					
		
		if(paidtest == paidYes){
			
		paymentStatus =	req.session.payment = true;
			schemeAsked =true;
			
		}else {
		paymentStatus =	req.session.payment = false;	
		schemeAsked =false;
		}
	

	if(loginStatus && paymentStatus){
		showScheme = true;
		
}else{
	showScheme = false;
}
	
	
	
	//console.log(showScheme+"scheme"+req.session.restartAlloc+"restart");
	if(req.body.askScheme){
		showScheme =true;
		req.session.restartAlloc =false;
	}
	
	

	
	Portfolio.find({email:mailId},function(err, AssetAgain){
		Asset.find({}, function(err, Assetlist){
		if(Assetlist.length > 1){
			console.log(req.session.panMessage);
         		 mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('howItWorksMobile.ejs',{
 
  }); }
        else    {
            
	    res.render('mood', {
			data: Assetlist,
			user : req.user,
                firslist :  docs,
        amtre:schemecamnteq,
        amtrh:schemecamnthy,
        amtrd:schemecamntde,
			smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
			 selectorDisplay: "show",
	  	loggedIn: loginStatus,
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs",
			panMessage: panMsg,
			scheme:showScheme,
			abcd: testMe,
			paid : paymentStatus,
			assetFromDb: AssetAgain[0],
			  showPage5: "show"
            });}
		}
			 });
		if(err) throw err;
	});
	if(err) throw err;
	});
		 

	});
			
	});	
		
				 }
	
});

app.get('/GoalSelection',isLoggedIn, function(req, res){
	
	currentPage = req.session.activePage = "/GoalSelection";


	loginStatus = checkLoginStatus(req);
	
	panS= checkPan(req);
	 
	if(panS){
	
		panMsg = req.session.panMessage;
		
	}else{
		panMsg = "";
	}

	console.log(panMsg+"in getGS");
	if(loginStatus){
		mailId= req.session.userEmail;
		
}else{
	mailId=null;
	
}
		
	
	
	
		if(req.session.ForPayment){
		
		testMe= true;
	}else{
		testMe=false;
	}
	
	if(loginStatus){
		var amount1, amount2, amount3, sip, riskp, time;
		Portfolio.findOne({email:mailId},function(err, AssetAgain){
			

			
			 amount1 = AssetAgain.amt1;
		 amount2 = AssetAgain.amt2;
		 amount3 = AssetAgain.amt3;
		 sip = AssetAgain.sip;
		 riskp = AssetAgain.risk_profile;
		 time=AssetAgain.years;
		
		
     
			//console.log(amount1,amount2,amount3,sip,riskp,time);
	
				
				var Fundmapings_new = mongoose.model('Fundmapings_new', FundmapingSchema);
module.exports = Fundmapings_new;
			var schemecamntde=0,schemecamnteq=0,schemecamnthy=0;
  var schememamntde=0,schememamnteq=0,schememamnthy=0;
  var schemeagamnthy=0,schemeagamnteq=0,schemeagamnteq=0;

                var query = {};
			//console.log(sip+"sip");
query.risk_profile=riskp;
		//console.log(time);


  if(time==2)
                {
                    query.time="0,2";
                    query.sip_from="";
                      query.sip_to="";

                    }
    else if(time==1)
            {
                query.time="0,1";
                    query.sip_from="";
                      query.sip_to="";

                 }

         else if (time>2 && time<3)
    {
         query.time="3,3";
                    query.sip_from="";
                      query.sip_to="";

         }


    else if(time>=3){

         if(sip>=1000 && sip<=2000 && time>=3)
                 {
                     query.sip_from=1000;
                      query.sip_to=2000;
                     query.time="3,20";

                 }
             else if(sip>=3000 && sip<=4000 && time>=3)
             {
                      query.sip_from=3000;
                     query.sip_to=4000;
                 query.time="3,20";

             }
             else if(sip>=5000 && sip<=10000 && time>=3){
                   query.sip_from=5000;
                      query.sip_to=10000;
                 query.time="3,20";

             }
             else if(sip>=11000 && sip<=20000 && time>=3){
                  query.sip_from=11000;
                      query.sip_to=20000;
                 query.time="3,20";

             }
             else{
                  query.sip_from=20000;
                 query.sip_to="";
                 query.time="3,20";
               }
    }


Fundmapings_new.find(query, function (err, docs) {

  var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;


  var schemecamntde=0,schemecamnteq=0,schemecamnteq1=0,schemecamnteq2=0,schemecamnthy=0;

  docs.forEach( function( docs ){
//Conservative
       if((docs.risk_profile)==riskp){

    if((docs.category)=="Equity"){
    j=j+1;

      }
      if((docs.category)=="Hybrid"){
  k=k+1;
  }
  if((docs.category)=="Debt"){
    l=l+1;
  }

  }

	  });


docs.forEach( function( docs ){

  if((docs.risk_profile)==riskp){

if(j==0 || j==1){
    schemecamnteq=amount1;
}
else{
      schemecamnteq=amount1/2;
     }
  if(k==0 || k==1){
   schemecamnthy=amount2;
  }
  else{
    schemecamnthy=amount2/2;
    }
    if(l==0 || l==1){
          schemecamntde=amount3;
      }else{
        schemecamntde=amount3/2;
    }
        }




});
	
Payment.findOne({email:req.session.userEmail},function(err, datapaid ){
				var	paidYes = "yes";
		var paidtest = datapaid.paid;
					
		
		if(paidtest == paidYes){
			
		paymentStatus =	req.session.payment = true;
			schemeAsked =true;
			
		}else {
		paymentStatus =	req.session.payment = false;	
		schemeAsked =false;
		}
	

	if(loginStatus && paymentStatus){
		showScheme = true;
		
}else{
	showScheme = false;
}
	
	
	
	//console.log(showScheme+"scheme"+req.session.restartAlloc+"restart");
	if(req.body.askScheme){
		showScheme =true;
		req.session.restartAlloc =false;
	}
	
	

	
	Portfolio.find({email:mailId},function(err, AssetAgain){
		Asset.find({}, function(err, Assetlist){
		if(Assetlist.length > 1){
//				 mobile = req.useragent["isMobile"]
//    if(mobile){
//      res.render('howItWorksMobile.ejs',{
// 
//  });else{
	    res.render('mood', {
			data: Assetlist,
			user : req.user,
                firslist :  docs,
        amtre:schemecamnteq,
        amtrh:schemecamnthy,
        amtrd:schemecamntde,
			smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
			 selectorDisplay: "show",
	  	loggedIn: loginStatus,
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs",
			scheme:showScheme,
			panMessage:panMsg,
			abcd: testMe,
			paid : paymentStatus,
			assetFromDb: AssetAgain[0],
			  showPage5: "show"
            });
        }
		
			 });
		if(err) throw err;
	});
	if(err) throw err;
	});
		 

	});
			
	});	
		
				 }
	else {
		
		Asset.find({}, function(err, Assetlist){
		if(Assetlist.length > 1){
			//req.session.panMessage = "";
		/*	Portfolio.find({email:mailId},function(err, AssetAgain){*/
            
        mobile = req.useragent["isMobile"]     
  if(mobile){
        res.render("mobileMood.ejs",{
             data: Assetlist, 
		  user : req.user,
		  selectorDisplay: "show",
	  	loggedIn: loginStatus,
		firslist :  false,
		  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
		  panMessage: panMsg,
	  footerData1: "Blog",
	  footerData2: "FAQs",
		scheme:false,
		paid : false,
						  abcd: false,
						  assetFromDb: false,
						   showPage5: "hide",
	  hideAll: "show"
        });
    }
    
  
            else
            {res.render("mood", {
		  data: Assetlist, 
		  user : req.user,
		  selectorDisplay: "show",
	  	loggedIn: loginStatus,
		firslist :  false,
		  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
		  panMessage: panMsg,
	  footerData1: "Blog",
	  footerData2: "FAQs",
		scheme:false,
		paid : false,
						  abcd: false,
						  assetFromDb: false,
						   showPage5: "hide",
	  hideAll: "show"
						 
						 });
                }
				
/*		if(err) throw err;
	});
		*/	
		}
		 if(err) throw err;
		  });
 
                   }


});
	
	
	

	app.get('/GoalSelectionRefresh', isLoggedIn, function(req, res){
		
		currentPage = req.session.activePage = "/GoalSelectionRefresh";
		
		loginStatus = checkLoginStatus(req);
		

		
		if(req.param('restart')){
		req.session.restartAlloc = true;
	}

			if(req.session.restartAlloc){
		showScheme = false;
		testMe = false;
	}
		
		paymentStatus = true;
		
				Asset.find({}, function(err, Assetlist){
		if(Assetlist.length > 1){
					 
	    mobile = req.useragent["isMobile"]     
  if(mobile){
        res.render("mobileMood.ejs",{
             data: Assetlist, 
		  user : req.user,
		  selectorDisplay: "show",
	  	loggedIn: loginStatus,
		firslist :  false,
		  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
		  panMessage: panMsg,
	  footerData1: "Blog",
	  footerData2: "FAQs",
		scheme:false,
		paid : false,
						  abcd: false,
						  assetFromDb: false,
						   showPage5: "hide",
	  hideAll: "show"
        });
    }
    
  
            else
            {res.render('mood', {
			data: Assetlist,
			user : req.user,
                firslist :  false,
     
			smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
			 selectorDisplay: "show",
	  	loggedIn: loginStatus,
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs",
			scheme:showScheme,
			abcd: testMe,
			paid : paymentStatus,
			assetFromDb: false,
			  showPage5: "show"
            });}
		}
			 });
		
		
		
	});
	
	
	
	
	
	
	app.post('/GoalSelection',isLoggedIn, function(req, res){
		
		currentPage = req.session.activePage = "/GoalSelection";
		
	loginStatus = checkLoginStatus(req);
		
				panS= checkPan(req);
	 
	/*if(panS){
	
		panMsg = req.session.panMessage;
		
	}else{
		panMsg = " ";
		console.log(panMsg+"in postGS in else");
	}
	*/
		console.log(panMsg+"in postGS");
		//console.log(req.body);
	//get Passord API Pull. for every request
	
		
		
		if(loginStatus){
		mailId= req.session.userEmail;
		paymentStatus =req.session.payment;
}else{
	mailId=null;
	paymentStatus =false;
}


	if(req.session.restartAlloc){
		showScheme = true;
		
	}
	
	
if(req.body.storeData){
		
		testMe= true;
	}else{
		testMe=false;
	}

	if(loginStatus && paymentStatus){
		showScheme = true;
}else{
	showScheme = false;
}
	
	if(req.body.storeData){
		
		
		
				req.session.ForPayment = true;
		
		  Portfolio.findOne({ 'email' :  mailId }, function(err, portfolio) {
			  if (err)
                return done(err);
			  
			  if(!portfolio){
				   var data=new Portfolio();
              		
				  data.email=mailId,
					  data.goal = req.body.setGoal,
					data.risk_profile=req.body.riskp,
					data.years=req.body.year,
					data.master_amount=req.body.amountMaster,
					data.sip=req.body.sip,  
					 data.amt1=req.body.amnt1,
			 		data.amt2=req.body.amnt2,
					  data.amt3=req.body.amnt3,
			 
					  data.save(function(err) {
                        if (err)
                            throw err;
					  console.log("Saved sucess");            
								return done(null, data);
						
				  		});
			  }

			  if(portfolio){
		       Portfolio.findOneAndUpdate(
				   {email:mailId}, 
				   {$set:{goal:req.body.setGoal, risk_profile:req.body.riskp,years:req.body.year,master_amount:req.body.amountMaster,sip:req.body.sip,amt1:req.body.amnt1,amt2:req.body.amnt2,amt3:req.body.amnt3}},
				   function(err, doc){
			  });
			  
			  
		
	}
			  if(req.session.restartAlloc){
				  console.log("come");
				  //doNothing
			  }else if(!paymentStatus){
				  
				  
			  
			 mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('howItWorksMobile.ejs',{
 
  });
    }else {res.render('howItWorks.ejs', {
	  user : req.user,
	  	  selectorDisplay: "show",
	  	loggedIn: loginStatus,
	  		paid:paymentStatus,
			scheme: true,			
				 smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
				
	  	  footerDisplay: "show",
	  footerData1: "Video Tour",
	  footerData2: "FAQs"
  });
          }
			  
		  }
			      });
		
	
	}
		if(showScheme){
		
		if(req.body.pan){
password = 	"web@12345";
passKey = "test";
//PAN = "AABCD2345E";
			PAN = req.body.pan;
username = "WEBINTMM";
POSCODE = "MONEYMATTER";
var ePass = ""; //= "FjFMCDg4YPtsxrGRtJmeVQ%3d%3d";
	
	async.waterfall([
  function(callback){
	   
  	var optionsForPassword = {
        hostname: "test.cvlkra.com",
        path: '/PANInquiry.asmx/GetPassword?password='+password+'&PassKey='+passKey
    };

    var getPassword = http.get(optionsForPassword, function (response) {
        var encryptedPassword = '';
        response.on('data', function (chunk) {
            encryptedPassword += chunk;
        });
        response.on('end', function() {
           // console.log(encryptedPassword);
			parseString(encryptedPassword, function (err, result) {
			//tot = 	JSON.stringify(result)
   // console.log(result["string"]["_"]);
			ePass =result["string"]["_"];
				callback(null, ePass)
					});
        })
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
		 callback(false)
    });
  
  },
  function(ePass, callback){
	  
	  	// get the PAN Status
		var optionsForPANStaus = {
        hostname: "test.cvlkra.com",
        path: '/PANInquiry.asmx/GetPanStatus?panNo='+PAN+'&userName='+username+'&PosCode='+POSCODE+'&password='+ePass+'&PassKey='+passKey
			//path: '/PANInquiry.asmx/GetPanStatus?panNo=BDKPS1141N&userName=WEBINTMM&PosCode=MONEYMATTER&password='+ePass+'&PassKey='+passKey
    };

    var getPANStatus = http.get(optionsForPANStaus, function (response) {
        var statusPAN = '';
        response.on('data', function (chunk) {
            statusPAN += chunk;
        });
        response.on('end', function() {
           // console.log(statusPAN);
				parseString(statusPAN, function (err, result1) {
    //console.log(result1.APP_RES_ROOT.APP_PAN_INQ[0].APP_PAN_NO[0]);
					//console.log(result1.APP_RES_ROOT);
				appStatus =	result1.APP_RES_ROOT.APP_PAN_INQ[0].APP_STATUS[0];
					//console.log(appStatus);
		//callback()
					
					panData = result1.APP_RES_ROOT.APP_PAN_INQ[0].APP_NAME[0];
					panNo = result1.APP_RES_ROOT.APP_PAN_INQ[0].APP_PAN_NO[0];
					
					 msg="" ;
		   switch(appStatus){
				   
			   case "000": msg = "Not Checked with respective KRA";
							break;
			   case "001": msg = "Submitted";
				   break;
			   case "002": msg = "KRA Verified";
				   break;
		   	   case "003": msg = "Hold";
				   break;
				   
			   case "004": msg = "Rejected";
							break;
			   case "005": msg = "Not available";
				   break;
			   case "006": msg = "Deactivated";
				   break;
			 case "011": msg = "Existing KYC Submitted";
				   break;
		   	   case "012": msg = "Existing KYC Verified";
				   break;
				 case "013": msg = "Existing KYC hold";
				   break;   
				 case "014": msg = "Existing KYC Rejected";
				   break; 
			case "022": msg = "KYC REGISTERED WITH CVLMF";
				   break;
		case "888": msg = " Not Checked with Multiple KRA";
				   break;
				   case "999": msg = "Invalid PAN NO Format";
				   break;
		   }
					
					data = {
						"statusCode":appStatus,
						"msg": msg,
						"pan":panNo,
						"name":panData
					}
					
				var panJSON = JSON.stringify(data);	
					//console.log(panJSON+"dad")
					callback(null, panJSON)
	
	});
        })
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
	  
	  
	   }/*, function(status, data, callback){
		   
		   
		  msg="" ;
		   switch(status){
				   
			   case "000": msg = "Not Checked with respective KRA";
							break;
			   case "001": msg = "Submitted";
				   break;
			   case "002": msg = "KRA Verified";
				   break;
		   	   case "003": msg = "Hold";
				   break;
				   
			   case "004": msg = "Rejected";
							break;
			   case "005": msg = "Not available";
				   break;
			   case "006": msg = "Deactivated";
				   break;
			 case "011": msg = "Existing KYC Submitted";
				   break;
		   	   case "012": msg = "Existing KYC Verified";
				   break;
				 case "013": msg = "Existing KYC hold";
				   break;   
				 case "014": msg = "Existing KYC Rejected";
				   break; 
			case "022": msg = "KYC REGISTERED WITH CVLMF";
				   break;
		case "888": msg = " Not Checked with Multiple KRA";
				   break;
				   case "999": msg = "Invalid PAN NO Format";
				   break;
		   }
		  
		  // console.log(msg)
		   callback(null,msg)
	   }*/], function (err, result) {
   // result is 'd'  
		 if (err)
             throw err;
		
		//console.log(result+"inside ur");
	
	panMsg=	req.session.panMessage=result;
		//console.log(panMsg+"assigned");
        
        mobile = req.useragent["isMobile"]
	if(mobile){
        res.render('knowUsMobile.ejs')
    }
    
    else
    {
		res.redirect("/GoalSelectionScheme");
    }
  }
)		}	
			
			
		

			
		
		//req.session.restartAlloc = false;
				 }
	else {
		
		Asset.find({}, function(err, Assetlist){
		if(Assetlist.length > 1){
			
			Portfolio.find({email:mailId},function(err, AssetAgain){
      res.render("mood", {
		  data: Assetlist, 
		  user : req.user,
		  selectorDisplay: "show",
	  	loggedIn: loginStatus,
		firslist :  false,
		  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
		  panMessage: panMsg,
	  footerData1: "Blog",
	  footerData2: "FAQs",
		scheme:showScheme,
		paid : paymentStatus,
						  abcd: testMe,
						  assetFromDb: AssetAgain[0],
						   showPage5: "hide",
	  hideAll: "show"
						 
						 });
				
		if(err) throw err;
	});
			
		}
		 if(err) throw err;
		  });
	}
	

	});

app.get('/YourStory',isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/YourStory";
	
	loginStatus = checkLoginStatus(req);

	     mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('yourStoryMobile.ejs',{
  	 
  });
    }else{
  res.render('yourStory.ejs',{
	  
	  user : req.user,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  path:'profileData',
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
    }
    });

app.get('/profile',isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/profile";
	
	
	
	loginStatus = checkLoginStatus(req);
	
	Profile.find({email:req.session.userEmail}, function(err, profileData){
		
		if(err)
			throw err;
		
		if(profileData.length >= 1){
			  mobile = req.useragent["isMobile"]
        if(mobile){
      res.render('profileMobile.ejs',{
  	 
  });
    }else{res.render('yourStory.ejs',{
	  
	  	user : req.user ,
				profile: profileData[0],
            message: 'updated',
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	path:'profileData',
	 
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
        }
		}
		
	});
  
});
	
		app.post('/signup', askForPayment, passport.authenticate('local-signup', {
			successRedirect : '/tocurrent', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.post('/login', askForPayment, passport.authenticate('local-login', {
		successRedirect : '/tocurrent', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	})
			 
			);

	
	   app.post('/profile', isLoggedIn, function(req, res) {
		   currentPage = req.session.activePage = "/profile";
	
	loginStatus = checkLoginStatus(req);

            
		    Profile.findOneAndUpdate(
				   {email:req.session.userEmail}, 
				   {$set:{
					   name:req.body.username,
                    email:req.body.email,
                    mobile:req.body.mnumber,
                    dob:req.body.calendar,
                    age:req.body.age,
                    gender:req.body.gender, 
                    marital_status:req.body.maritalstatus,
                    address:req.body.address,
                    pincode:req.body.pincode,
                    city:req.body.city,
                    pan:req.body.pan,
                    bank_details:req.body.bankdetails     
				   }},
				   function(err, doc){
					    if (err)
                        throw err;
					  res.redirect("/profile");
			  });
		
	});
    
	
	
app.get('/myStory',isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/myStory";
	
	loginStatus = checkLoginStatus(req);
    
    
     mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('yourStoryMobile.ejs')
    }
    else{
  res.render('yourStory.ejs',{
	  
	  user : req.user ,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	   smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  path:'myStoryData',
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
    }
});

app.get('/reports',isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/reports";
	
	loginStatus = checkLoginStatus(req);
    
     mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('reportsMobile.ejs',{
  	 
  });
    }else{
    
    
  res.render('yourStory.ejs',{
	  
	  user : req.user ,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  path:'reportsData',
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
    }
});


app.get('/Accounts',isLoggedIn, function(req, res){
	currentPage = req.session.activePage = "/Accounts";
	
	loginStatus = checkLoginStatus(req);
	
      mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('accountsMobile.ejs',{
  	 
  });
    }else{ res.render('yourStory.ejs',{
	  
	  user : req.user ,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  path:'accountData',
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  path1: 'accountInvoicesData',
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
         }
});

app.get('/Invoices',isLoggedIn, function(req, res){
	
	currentPage = req.session.activePage = "/Invoices";
	
	loginStatus = checkLoginStatus(req);
	     mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('myInvoicesMobile.ejs',{
  	 
  });
    }else{
  res.render('yourStory.ejs',{
	  
	  user : req.user ,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  path:'accountData',
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  path1: 'accountInvoicesData',
	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
    }
});

app.get('/Settings',isLoggedIn, function(req, res){
	
	currentPage = req.session.activePage = "/Settings";
	
	loginStatus = checkLoginStatus(req);
         mobile = req.useragent["isMobile"]
    if(mobile){
      res.render('settingsMobile.ejs',{
  	 
  });
    }else{
  res.render('yourStory.ejs',{
	  
	  user : req.user ,
	  	  selectorDisplay: "show",
	  		loggedIn: loginStatus,
	  path:'accountData',
	  smessage: req.flash('signupMessage'),
		lmessage: req.flash('loginMessage'),
	  path1: 'accountSettingsData',

	  	  footerDisplay: "hide",
	  footerData1: "Blog",
	  footerData2: "FAQs"
  });
    }
});


app.get('/tocurrent', function(req, res){
	

		res.redirect(req.session.activePage);
	

	
});
	
    //Permissions fo facebook
   
    
    // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/tocurrent',
    failureRedirect: '/',
    scope:['email']
}), function(req, res,next) {
	
	
	
}
       );
   
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
    

    
    
    app.get('/forgot', function(req, res) {
  res.render('forgot', {
    user: req.user
  });
});

     
   //forgot password module handler
    
  app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({'user.local.email': req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
           //console.log(user.local.email);
                 var newUser=new User();
        
        newUser.resetPasswordToken = token;
        newUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        newUser.save(function(err) {
          done(err, token, newUser);
        });
      });
    },
    function(token, user, done) {
     
var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'nishant143n@gmail.com',
        pass: 'nishant0092'
    }
};
 
var transporter = nodemailer.createTransport(smtpConfig);

      
var mailOptions = {
    from: 'nishant143n@gmail.com', 
    to:user.local.email,
    subject: 'Node.js Password Reset',
      html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/:' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
        
        
    }
  ], function(err) {
    if (err) return next(err);
    
      
      else res.redirect('/');
      
  });
});

    
    
    app.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/');
    }
    res.render('reset', {
      user: req.user
    });
  });
});
    
    
    app.post('/reset/:token', function(req, res,done) {
  async.waterfall([
    function(done) {
        
       // console.log("Hi");
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/back');
        }
        var newUser=new User();
         newUser.local.password = req.body.password;
         newUser.local.resetPasswordToken = undefined;
         newUser.local.resetPasswordExpires = undefined;
          
        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
        
     var mailOptions = {
    
    from: 'nishant143n@gmail.com', 
    to: newUser.local.email,
    subject:'Your password has been changed',
      html: 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
        
        
    }
    
  ], function(err) {
    res.redirect('/');
  });
        console.log("end of token route");
});
    
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.session.destroy();
		req.logout();
		res.redirect('/');
	});
};





function askForPayment(req, res, next){
	
if(req.body.askScheme || req.session.ForPayment)
		req.session.ForPayment = true;
	else
	req.session.ForPayment = false;
	
	return next();
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	
	
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		req.session.loggedIn = true;
		
		//console.log(req.session.userEmail);
		return next();
	}
		
req.session.loggedIn = false;
	// if they aren't redirect them to the home page
	return next();
}

