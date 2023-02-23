require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const nodemailer = require ('nodemailer')
const db = require("./db")
const route = require("./routes/Dashboard")
const jwtGenerator = require("./utils/jwtGenerator")
const bcrypt = require ("bcrypt")
const Auth = require("./middleware/auth")

const PORT = process.env.PORT

//Connect DB
db.on('connect', (client) => {
  client.query("SET search_path TO 'TailorMade' ");
});

const corsConfig = {
    credentials: true,
    origin: true,
};

//MIDDLEWARE
app.use(cors(corsConfig))
app.use(express.json()) //to access the req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}));


//ROUTES

// //INSERT - CREATE SHOP
// app.use("/SignUp", route)

// //INSERT - CREATE  EMPLOYEE 
// app.use("/AddEmployee", route)

// //SELECT - SIGNIN
// app.use("/SignIn", route)

// //SELECT - GET ALL EMPLOYEES OF THE SHOP
// app.use("/ManageTeam", route)


// app.use("/Dashboard", route)

//ROUTES
//INSERT - CREATE SHOP
app.post("/SignUp", async(req, res) =>{
    try{
        console.log(req.body)

        const signUpValues = req.body.signUp
        console.log(signUpValues)

        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptPassword = await bcrypt.hash(signUpValues.password, salt)
        
        const shopName = signUpValues.sname.toLowerCase()

        const values = [shopName,signUpValues.sname, signUpValues.sadd, signUpValues.sno, signUpValues.oname, signUpValues.ono, signUpValues.email, encryptPassword]

        const verifyShop = await db.query(`SELECT * FROM "Shop" WHERE "ShopName" = $1`, [shopName] )

        if(verifyShop.rows.length > 0){
            return res.status(401).json("Shop Name already exist")
        }

        const verifyEmail = await db.query(`SELECT * FROM "Tailor" WHERE "Email" = $1`, [signUpValues.email] )

        if(verifyEmail.rows.length > 0){
            return res.status(401).json("Email already exist, Kindly login")
        }


        const newShop = await db.query(
            `WITH Shops AS (
                INSERT INTO "Shop" (
                "ShopName", "ActualShopName", "ShopAddress", "ShopPhoneNumber", "OwnerName", "OwnerPhoneNumber")
                VALUES ($1,$2,$3,$4,$5,$6)
                RETURNING "S_ID", "OwnerName", "OwnerPhoneNumber", "ActualShopName"
                ), 
                Tailor AS (  
                INSERT INTO "Tailor" ("Shop", "TailorName", "PhoneNumber", "Email", "Password", "isOwner")
                SELECT "S_ID", "OwnerName", "OwnerPhoneNumber", $7, $8, 'T'
                FROM   Shops
                RETURNING * 
                )
                SELECT * FROM Shops, Tailor`,values

            )

        const token = jwtGenerator(newShop.rows[0].email)

        res.json(newShop.rows[0])
        console.log(newShop.rows[0])

    } catch(err) {
        console.error(err.message)
    }
})


//SELECT - SIGNIN
app.post("/SignIn", async(req, res) => {

    console.log(req.body)
    

    try{
        const values = req.body.signIn
        console.log(values) 
        //Check if user doesn't exist 
        const getUser = await db.query(
            `SELECT t.*, s."ActualShopName" AS "ShopName"
             FROM "Tailor" t, "Shop" s
             WHERE t."Email" = $1
             AND t."Shop" = s."S_ID"`, [values.email]
             
        )

        if(getUser.rows.length === 0){
            return res.status(401).json("User doesn't exist, Kindly Signup or Check with your team")
        }


        const verifyPassword = await bcrypt.compare (values.password,getUser.rows[0].Password)

        console.log(verifyPassword)

        if(!verifyPassword){
            return res.status(401).json("Password incorrect")
        }

        const token = jwtGenerator(getUser.rows[0].email)

        res.json(getUser.rows[0])
       
        
    }
    catch(err){
        console.error(err.message)
    }
});





//INSERT - CREATE  ORDER 
app.post("/AddOrder/:id/:shop", async(req, res) =>{
    try{
        console.log(req.body)
        console.log(req.params)

        let data = {...req.body.order,...req.body.date ,...req.params}

        let values = Object.values(data) 

        console.log(data)
        console.log(values)
     

        const newOrder = await db.query(
            `INSERT INTO "Order"
            ("CustomerName", "Gender", "CustomerMobile", "CustomerEmail", 
            "Comments","Design","RemainingAmt","DepositAmt","TotalAmt","AssignTo",
            "Waist","Chest","UpperChest","LowerChest","NeckC","ThighC","KneeC","AnkleC","CalfC","Crotch",
            "HighHip", "Hip", "ArmHole","ArmGrith", "Wrist",
            "ShoulderWidth", "ChestWidth", "BustDist","ShoulderSlope", "BackWidth", 
            "S2W", "ChestHeight", "F_NeckDepth", "B_NeckDepth", "BDS_Length", "S_SleeveLength", "L_SleeveLength", "PS_Length", "Inseam",
            "CollectionDate", "PaymentStatus", "OrderStatus", "createdBy", "Shop")
            VALUES ($1,$2,$3,$4,
                    $5,$6,$7,$8,$9,$10,
                    $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
                    $21,$22,$23,$24,$25,
                    $26,$27,$28,$29,$30,
                    $31,$32,$33,$34,$35,$36,$37,$38,$39,
                    DATE($40),'1','1',$41,$42
                    )
            RETURNING *`, values
            )

            // res.json(newOrder.rows[0])

        if(res.json(newOrder.rows[0])){
            const newOrderEmail = await db.query(
                `SELECT o."O_ID", TO_CHAR(o."CollectionDate", \'DD/MM/YYYY\') AS "CollectionDate", o."CustomerName", o."CustomerEmail", ps."PaymentCode" AS "PaymentStatus" , o."RemainingAmt", o."TotalAmt", o."DepositAmt", s."ActualShopName", s."ShopPhoneNumber"
                FROM "Order" o , "PaymentStatusCode" ps, "Shop" s
                WHERE o."O_ID"= $1
                AND o."PaymentStatus" = ps."P_ID"
                AND o."Shop" = s."S_ID"`, [newOrder.rows[0].O_ID]
            )
            sendOrderEmail(newOrderEmail.rows[0].O_ID, newOrderEmail.rows[0].CustomerEmail, newOrderEmail.rows[0].CustomerName,
                           newOrderEmail.rows[0].ActualShopName, newOrderEmail.rows[0].ShopPhoneNumber,
                           newOrderEmail.rows[0].CollectionDate, newOrderEmail.rows[0].PaymentStatus, 
                           newOrderEmail.rows[0].TotalAmt, newOrderEmail.rows[0].DepositAmt, newOrderEmail.rows[0].RemainingAmt )
        }
          
            

    } catch(err) {
        // res.json(err)
        console.error(err.message)
    }
})




//SELECT - GET ALL ORDERS OF THE SHOP


app.get("/ManageOrders/:shop", async(req, res) => {
    try{
        
        const getOrders = await db.query(
            `SELECT o."O_ID", TO_CHAR(o."CollectionDate", \'DD/MM/YYYY\') AS "CollectionDate", t."TailorName", os."OrderCode" AS "OrderStatus", o."CustomerName", o."CustomerMobile", ps."PaymentCode" AS "PaymentStatus" , o."RemainingAmt"
             FROM "Order" o , "Tailor" t , "OrderStatusCode" os, "PaymentStatusCode" ps
             WHERE o."Shop"=$1
             AND o."OrderStatus" = os."OS_ID"
             AND o."PaymentStatus" = ps."P_ID"
             AND o."AssignTo" = t."T_ID"`, [req.params.shop]
        )
        const OrderList = res.json(getOrders.rows);
        console.log(OrderList)
    }
    catch(err){
        console.error(err.message)
    }
});



//SELECT - GET SHOP's ORDERS FOR COLLECTION DATE = Today

app.get("/Dashboard/:id/:shop", async(req, res) => {
    try{
        
        const getTodayOrdersDue = await db.query(
            `WITH Today AS (
                SELECT count("O_ID") AS "TodayDueOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE 
                AND "Shop"=$1
                ),
                ToDo AS  (
                SELECT count("O_ID") AS "ToDoOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE
                AND "Shop"=$1
                AND "OrderStatus" = 1              
               ),
                InProgress AS  (
                SELECT count("O_ID") AS "ProgressOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE
                AND "Shop"=$1
                AND "OrderStatus" = 2
               ),
                ReadytoCollect AS  (
                SELECT count("O_ID") AS "ReadyOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE
                AND "Shop"=$1
                AND "OrderStatus" = 3
               ),
                Completed AS  (
                SELECT count("O_ID") AS "CompleteOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE
                AND "Shop"=$1
                AND "OrderStatus" = 4
               )
                        
               Select * FROM Today, ToDo, InProgress, ReadytoCollect, Completed`, [req.params.shop]
        )

        const getTomorrowOrdersDue = await db.query(
            `WITH Tomorrow AS (
                SELECT count("O_ID") AS "TomorrowDueOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE + INTERVAL '1 day'
                AND "Shop"=$1
                ),
                TomToDo AS  (
                SELECT count("O_ID") AS "TomToDoOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE + INTERVAL '1 day'
                AND "Shop"=$1
                AND "OrderStatus" = 1              
               ),
                TomInProgress AS  (
                SELECT count("O_ID") AS "TomProgressOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE + INTERVAL '1 day'
                AND "Shop"=$1
                AND "OrderStatus" = 2
               ),
                TomReadytoCollect AS  (
                SELECT count("O_ID") AS "TomReadyOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE + INTERVAL '1 day'
                AND "Shop"=$1
                AND "OrderStatus" = 3
               ),
                TomCompleted AS  (
                SELECT count("O_ID") AS "TomCompleteOrder" FROM "TailorMade"."Order"
                WHERE "CollectionDate" = CURRENT_DATE + INTERVAL '1 day'
                AND "Shop"=$1
                AND "OrderStatus" = 4
               )
                        
               Select * FROM Tomorrow, TomToDo, TomInProgress, TomReadytoCollect, TomCompleted`, [req.params.shop]
        )

        const getAssignOrdersDue = await db.query(
            `WITH AssignTo AS (
                SELECT count("O_ID") AS "TotalAssignOrder" FROM "TailorMade"."Order"
                WHERE "AssignTo" = $1
                AND "Shop"=$2
                ),
                AssignToDo AS  (
                SELECT count("O_ID") AS "AssignToDoOrder" FROM "TailorMade"."Order"
                WHERE "AssignTo" = $1
                AND "Shop"=$2
                AND "OrderStatus" = 1              
               ),
                AssignInProgress AS  (
                SELECT count("O_ID") AS "AssignProgressOrder" FROM "TailorMade"."Order"
                WHERE "AssignTo" = $1
                AND "Shop"=$2
                AND "OrderStatus" = 2
               ),
                AssignReadytoCollect AS  (
                SELECT count("O_ID") AS "AssignReadyOrder" FROM "TailorMade"."Order"
                WHERE "AssignTo" = $1
                AND "Shop"=$2
                AND "OrderStatus" = 3
               ),
                AssignCompleted AS  (
                SELECT count("O_ID") AS "AssignCompleteOrder" FROM "TailorMade"."Order"
                WHERE "AssignTo" = $1
                AND "Shop"=$2
                AND "OrderStatus" = 4
               )
                        
               Select * FROM AssignTo, AssignToDo, AssignInProgress, AssignReadytoCollect, AssignCompleted`, [req.params.id,req.params.shop]
        )

        
    const TodayOrderDue = getTodayOrdersDue.rows[0]
    const TomorrowOrderDue = getTomorrowOrdersDue.rows[0]
    const AssignToOrderDue = getAssignOrdersDue.rows[0]
    
    const Dashboard = [TodayOrderDue, TomorrowOrderDue, AssignToOrderDue]


        const OrderDue = res.json(Dashboard);
        console.log(OrderDue)
    }
    catch(err){
        console.error(err.message)
    }
});

 

// app.get("/ManageOrders/:shop?oid", async(req, res) => {
//     try{
        
//         const getOrders = await db.query(
//             `SELECT o."O_ID", TO_CHAR(o."CollectionDate", \'DD/MM/YYYY\') AS "CollectionDate", t."TailorName", os."OrderCode" AS "OrderStatus", o."CustomerName", o."CustomerMobile", ps."PaymentCode" AS "PaymentStatus" , o."RemainingAmt"
//              FROM "Order" o , "Tailor" t , "OrderStatusCode" os, "PaymentStatusCode" ps
//              WHERE o."Shop"=$1
//              AND o."OrderStatus" = os."OS_ID"
//              AND o."PaymentStatus" = ps."P_ID"
//              AND o."AssignTo" = t."T_ID"`, [req.params.shop]
//         )
//         const OrderList = res.json(getOrders.rows);
//         console.log(OrderList)
//     }
//     catch(err){
//         console.error(err.message)
//     }
// });



//INSERT - CREATE  EMPLOYEE 
app.post("/AddEmployee/:shop", async(req, res) =>{
    try{
        console.log(req.body)

        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);
        const encryptPassword = await bcrypt.hash(req.body.password, salt)

        const values = [req.body.ename, req.body.eno, req.body.email, encryptPassword, req.params.shop]

        const verifyEmail = await db.query(`SELECT * FROM "Tailor" WHERE "Email" = $1`, [req.body.email] )

        if(verifyEmail.rows.length > 0){
            return res.status(401).json("Email already exist, Kindly login")
        }

        const newEmployee = await db.query(
            `WITH Tailor AS
             (INSERT INTO "Tailor"
            ("TailorName", "PhoneNumber", "Email", "Password", "Shop", "isOwner")
            VALUES ($1,$2,$3,$4,$5,'F')
            RETURNING *
            )       
            SELECT s."ActualShopName" AS "ShopName"
            FROM Tailor t, "Shop" s
            WHERE s."S_ID" = t."Shop"`, values
            )

        if(newEmployee.rows.length > 0){ 
            sendEmployeeEmail(values[0], values[2], req.body.password, newEmployee.rows[0].ShopName)
           return res.status(200).json(newEmployee.rows[0])
        }

    } catch(err) {
        console.error(err.message)
       return res.json(err.message)
       
    }
})



//SELECT - GET ALL EMPLOYEES OF THE SHOP

app.get("/ManageTeam/:shop", async(req, res) => {
    try{
        
        const getEmployees = await db.query(
            `SELECT "T_ID","TailorName", "PhoneNumber", "Email" 
             FROM "Tailor"
             WHERE "Shop"=$1` , [req.params.shop]
        )
        const employeeList = res.json(getEmployees.rows);
        console.log(employeeList)
    }
    catch(err){
        console.error(err.message)
    }
});



//UPDATE - FORGET PASSWORD
app.post("/ForgetPassword", async(req, res) => {
    try{

        console.log(req.body)
        const getValues = req.body.ForgetP
        console.log(getValues)

        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);

        const encryptPassword = await bcrypt.hash(getValues.password, salt)

        const values = [getValues.email, encryptPassword]

        //Check if user doesn't exist 
        const getUser = await db.query(
            `SELECT *
             FROM "Tailor" 
             WHERE "Email" = $1`, [getValues.email]
             
        )

        if(getUser.rows.length === 0){
            return res.status(401).json("User doesn't exist, Kindly Signup or Check with your team")
        }

        //Update password 
        const updatePassword = await db.query(
            `UPDATE "Tailor"
             SET "Password" = $2 
             WHERE "Email" = $1
             RETURNING *`, values
             
        )

        if(updatePassword.rows.length != 1){
            return res.status(401).json("Password not updated")
        }
        else{
            return res.status(200).json((updatePassword.rows[0]))
        }        
        
        
    }
    catch(err){
        res.json(err)
        console.error(err.message)
    }
});






let transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{ 
        user:'cluelesslylost@gmail.com',
        pass:'ilqakptcrahpqdcs'
   }
})


//Send Mail function

function sendEmployeeEmail(name, recipient_email, password, shopName){
    return new Promise ((resolve, reject) => {
       transporter

        const mail_configs ={
            from : process.env.FROMEMAIL,
            to: recipient_email,
            subject: `Welcome to ${shopName}`,
            text:`Hi ${name}, 
                
            Thanks for joining our team of tailors at ${shopName}

            Your credentials are
            username : ${recipient_email}
            password: ${password}

            You can chose to reset your password thru the Forget Password link at the Sign In Page.

            Thank You, 
            ${shopName}`            

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


function sendOrderEmail(order, recipient_email, cname, shopName, shopNumber, collection, payment, total, deposit, remaining){
    return new Promise ((resolve, reject) => {
       transporter

        const mail_configs ={
            from : process.env.FROMEMAIL,
            to: recipient_email,
            subject: `${shopName} : Order ${order}`,
            text:`Hi ${cname}, 
                
            Thanks for placing your order at ${shopName}

            Your order details are
            OrderID : ${order}
            Collection Date: ${collection}
            Payment: ${payment}
            Total Amt: ${total}
            Paid: ${deposit}
            Remaining Amt: ${remaining}

            If order is not fully paid , remaining amount is to be paid on the date of collection.

            Thank You, 
            ${shopName}
            ${shopNumber}`            

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


app.get("/", async(req, res) => {
    try{
        
        // const getOrders = await db.query(
        //     `SELECT o."O_ID", TO_CHAR(o."CollectionDate", \'DD/MM/YYYY\') AS "CollectionDate", t."TailorName", os."OrderCode" AS "OrderStatus", o."CustomerName", o."CustomerMobile", ps."PaymentCode" AS "PaymentStatus" , o."RemainingAmt"
        //      FROM "Order" o , "Tailor" t , "OrderStatusCode" os, "PaymentStatusCode" ps
        //      WHERE o."Shop"=$1
        //      AND o."OrderStatus" = os."OS_ID"
        //      AND o."PaymentStatus" = ps."P_ID"
        //      AND o."AssignTo" = t."T_ID"`, [req.params.shop]
        // )
        const OrderList = res.json("Hello");
        console.log(OrderList)
    }
    catch(err){
        console.error(err.message)
    }
});


app.listen(PORT, ()=>{console.log(`Server started on ${PORT}`)})