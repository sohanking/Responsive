// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy   = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var session = require('express-session')
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

// load up the user model
var User       		= require('../app/models/user');
var Profile       	= require('../app/models/profile');
var Portfolio= require('../app/models/portfolio');
var Payment= require('../app/models/schemepayment');
var emailID,paymentKya;
//var config=require('../config/auth.js');
// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and de-serialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		console.log('serializeUser: ' + user._id)
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUser=new User();

                // set the user's local credentials
            
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                newUser.local.name = req.body.username;
                newUser.local.mobile=req.body.mnumber;
				newUser.local.creation_date=new Date;
				newUser.local.modified_date=new Date;
				
                
				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
					
					//portfolio
				 var data=new Portfolio();
              		
				  data.email=email,
					  data.goal = '',
					  data.mood='',
					data.risk_profile='',
					data.years='',
					data.master_amount='',
					data.sip='',  
					 data.amt1='',
			 		data.amt2='',
					  data.amt3='',
					  data.modified_date=new Date;
			 
					  data.save(function(err) {
                        if (err)
                            throw err;
					           
								//return done(null, data);
				  });
					
					
				req.session.userEmail = email;
				
					  //Payment - scheme
					  var dataPay=new Payment();
              		
				  dataPay.email=email,
					   dataPay.plan="",
					  dataPay.plan_price="",
			 			dataPay.paid="no"
				  		dataPay.modified_date=new Date;
				
					  dataPay.save(function(err) {
                        if (err)
                            throw err;
					          
								//return done(null, dataPay);
						
				  		});	
					
					
					
							
				 var dataP=new Profile({
              
                   name:req.body.username,
                    email:email,
                    mobile:'',
                    dob:'',
                    age:'',
                    gender:'' ,
                    marital_status:'',
                    address:'',
                    pincode:'',
                    city:'',
                    pan:'',
                    bank_details:''      
                 }).save(function(err) {
                    if (err)
                        throw err;
				//return done(null, dataP);
					});
					
                    return done(null, newUser);
                });
				
				
				
		
            }

        });

    }));
      
    passport.use(new FacebookStrategy({
    clientID: '1620502528254783',
    clientSecret: '724b87f6243da3bae2f2e5ddcc7e729d',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
         profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        
  },
  function(accessToken, refreshToken, profile, done) {
   process.nextTick(function(){
               User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                
              return done(null, user);
                
            } else {

				// if there is no user with that email
                // create the user
                var newUser=new User();

          
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                 newUser.facebook.email =(profile.emails[0].value || '').toLowerCase();
                 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; 
                 
                    newUser.local.name=profile.name.givenName + ' ' + profile.name.familyName; ;
                    newUser.local.email = profile.emails[0].value;     
                
				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
                 console.log(JSON.stringify(profile));
            }

        });

       
       
   });
  }
));
    passport.use(new GoogleStrategy({

        clientID        : '87658927996-i8ovbtoljd8tir2e9pki4i8uagshb38c.apps.googleusercontent.com',
        clientSecret    : 'vUjKOhsz8f1_ovtzN4weOT7u',
        callbackURL     : 'http://localhost:3000/auth/google/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email
                    
                    newUser.local.name=profile.displayName;
                    newUser.local.email = profile.emails[0].value;     
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

    
   
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
req.session.payment =false;
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
				//req.session.destroy();
				delete req.session.ForPayment;
				delete req.session.UserEmail;
				delete req.session.payment;
				delete req.session.restartAlloc;
				return done(null, false, req.flash('loginMessage', 'No user found.'));

			}
                 // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
				//req.session.destroy();
					delete req.session.ForPayment;
				delete req.session.UserEmail;
				delete req.session.payment;
				delete req.session.restartAlloc;
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			}
if(req.body.askScheme)
	{
		

		  Portfolio.findOne({ 'email' :  email }, function(err, portfolio) {
			  if (err)
                return done(err);
			  
			  if(!portfolio){
				   var data=new Portfolio();
              		
				  data.email=email,
					  data.goal = req.body.setGoal,
					  data.mood= req.body.getMoodG,
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
				   {email:email}, 
				   {$set:{goal:req.body.setGoal,mood:req.body.getMoodG, risk_profile:req.body.riskp,years:req.body.year,master_amount:req.body.amountMaster,sip:req.body.sip,amt1:req.body.amnt1,amt2:req.body.amnt2,amt3:req.body.amnt3}},
				   function(err, doc){
			  });
			  
			  
		
	}
			      });
	}
		
						 
			
			req.session.userEmail = email;
	
			 
            // all is well, return successful user
            return done(null, user,emailID);
        });

	}));
     
  
    
};