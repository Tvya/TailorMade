const router = require ("express").Router()
const db = require("../db")
const bcrypt = require ("bcrypt")
const nodemailer = require ('nodemailer')
const jwtGenerator = require("../utils/jwtGenerator")

//Connect to DB
db.on('connect', (client) => {
    client.query("SET search_path TO 'TailorMade' "); // Set to the Schema
  });


//ROUTES
//INSERT - CREATE SHOP
router.post("/SignUp", async(req, res) =>{
    try{
        console.log(req.body)

        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptPassword = await bcrypt.hash(req.body.password, salt)


        const values = [req.body.sname, req.body.sadd, req.body.sno, req.body.oname, req.body.ono, req.body.email, encryptPassword]

        const verifyShop = await db.query(`SELECT * FROM "Shop" WHERE "ShopName" = $1`, [req.body.sname] )

        if(verifyShop.rows.length > 0){
            return res.status(401).json("Shop Name already exist")
        }

        const verifyEmail = await db.query(`SELECT * FROM "Tailor" WHERE "Email" = $1`, [req.body.email] )

        if(verifyEmail.rows.length > 0){
            return res.status(401).json("Email already exist, Kindly login")
        }


        const newShop = await db.query(
            `WITH Shops AS (
                INSERT INTO "Shop" (
                "ShopName", "ShopAddress", "ShopPhoneNumber", "OwnerName", "OwnerPhoneNumber")
                VALUES ($1,$2,$3,$4,$5)
                RETURNING "S_ID", "OwnerName", "OwnerPhoneNumber"
                )      
                INSERT INTO "Tailor" ("Shop", "TailorName", "PhoneNumber", "Email", "Password", "isOwner")
                SELECT "S_ID", "OwnerName", "OwnerPhoneNumber", $6, $7, 'T'
                FROM   Shops
                RETURNING *`,values

            )

        const token = jwtGenerator(newShop.rows[0].email)

        res.json({token})

    } catch(err) {
        console.error(err.message)
    }
})


//INSERT - CREATE  EMPLOYEE 
router.post("/AddEmployee", async(req, res) =>{
    try{
        console.log(req.body)
        const values = [req.body.ename, req.body.eno, req.body.email, req.body.password]
        const newEmployee = await db.query(
            `INSERT INTO "Tailor"
            ("TailorName", "PhoneNumber", "Email", "Password", "Shop", "isOwner")
            VALUES ($1,$2,$3,$4,'7','F')
            RETURNING *`, values
            )

        res.json(newEmployee.rows[0])
        try{
                sendEmail(values[0],values[2],values[3])
               
        }catch(err){
            console.error(err.message)
        }

    } catch(err) {
        console.error(err.message)
    }
})


//SELECT - SIGNIN
router.post("/SignIn", async(req, res) => {
    try{

        console.log(req.body)
        const values = [req.body.email, req.body.password]

        //Check if user doesn't exist 
        const getUserVerify = await db.query(
            `SELECT * FROM "Tailor"
             WHERE "Email" = $1`, [req.body.email]
        )

        if(getUserVerify.rows.length === 0){
            return res.status(401).json("User doesn't exist, Kindly Signup or Check with your team")
        }


        const verifyPassword = await bcrypt.compare (req.body.password,getUserVerify.rows[0].Password)

        console.log(verifyPassword)

        if(verifyPassword ===  false){
            return res.status(401).json("Password incorrect")
        }

        res.json(getUserVerify.rows[0]);
        
    }
    catch(err){
        console.error(err.message)
    }
});

//SELECT - GET ALL EMPLOYEES OF THE SHOP

router.get("/ManageTeam", async(req, res) => {
    try{
        const getEmployees = await db.query(
            `SELECT "T_ID","TailorName", "PhoneNumber", "Email" FROM "Tailor"
            WHERE "isOwner" = 'T' `
        )
        const employeeList = res.json(getEmployees.rows);
        console.log(employeeList)
    }
    catch(err){
        console.error(err.message)
    }
});





//UPDATE










//Send Mail function

function sendEmail(name, recipient_email, password){
    return new Promise ((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service : "gmail",
            auth:{ 
                user:'cluelesslylost@gmail.com',
                pass:'ilqakptcrahpqdcs'
            }
        })

        const mail_configs ={
            from : 'cluelesslylost@gmail.com',
            to: recipient_email,
            subject: "Welcome to the ShopName",
            text:`Hi ${name}, 
                
            Thanks for joining our team of tailors at ShopName

            Your credentials are
            username : ${recipient_email}
            password: ${password}

            Thank You, 
            ShopName`            

        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error)
                return reject({message: "An error occured"})
            }
            return resolve ({message:"Email sent successfully"})
        })

    })
}



module.exports = router;